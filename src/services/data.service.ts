import { Injectable, signal, computed, effect, inject, Signal } from '@angular/core';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { Firestore, collectionData, docData } from '@angular/fire/firestore';
import { collection, doc, addDoc, updateDoc, deleteDoc, setDoc, query, orderBy, where } from 'firebase/firestore';
import { Observable, of } from 'rxjs';
import { AiService } from './ai.service';
import { switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { injectListAvailableRooms, injectCreateRoom, injectCreateGuest, injectCreateBooking, injectCreateHotel, injectGetHotelById, injectUpdateRoomStatus, injectGetFirstHotel, injectListAllHotels, injectListHotelsByUser } from '../dataconnect-generated/angular';
import { ListAvailableRoomsData } from '../dataconnect-generated';

// Interfaces
export type Room = ListAvailableRoomsData['rooms'][0];

export interface Guest {
  id: string;
  hotelId: string;
  name: string;
  email: string;
  phone: string;
  currentStayId?: string | null;
  history: Stay[];
  notes: string;
}

export interface Stay {
  id: string;
  hotelId: string;
  guestId: string;
  roomId: string;
  checkIn: string; // ISO Date
  checkOutProjected: string; // ISO Date
  checkOutActual?: string | null;
  ratePerNight: number;
  totalPaid: number;
  status: 'Active' | 'Completed' | 'Cancelled' | 'Reserved';
  isIndefinite?: boolean;
}

export interface LogEntry {
  id: string;
  hotelId: string;
  timestamp: string;
  action: string;
  user: string;
  category: 'System' | 'Guest' | 'Finance' | 'Room' | 'Staff' | 'Maintenance' | 'Document';
  details: string;
}

export interface FinancialDocument {
  id: string;
  hotelId: string;
  type: 'Invoice' | 'Receipt';
  number: string; // e.g., INV-1001
  date: string;
  stayId: string;
  guestId: string;
  guestName: string;
  items: { description: string; quantity: number; unitPrice: number; total: number }[];
  totalAmount: number;
  notes?: string;
  tags?: string[];
  summary?: string;
}

export interface Staff {
  id: string;
  hotelId: string;
  name: string;
  role: 'Manager' | 'Reception' | 'Housekeeping' | 'Kitchen' | 'Maintenance';
  pin: string; // For clocking in
  status: 'Active' | 'Inactive';
  currentStatus: 'Clocked Out' | 'Clocked In' | 'On Break';
}

export interface TimeBreak {
  start: string;
  end?: string | null;
}

export interface TimeLog {
  id: string;
  hotelId: string;
  staffId: string;
  staffName: string;
  date: string;
  startTime: string;
  endTime?: string | null;
  breaks: TimeBreak[];
  totalHours: number; // Calculated hours excluding breaks
  status: 'Open' | 'Closed';
}

export interface Shift {
  id: string;
  hotelId: string;
  staffId: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  type: 'Regular' | 'Overtime' | 'TimeOff';
  notes?: string;
}

export interface MaintenanceRequest {
  id: string;
  hotelId: string;
  roomId: string;
  roomNumber: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High' | 'Emergency';
  status: 'Pending' | 'In Progress' | 'Completed';
  reportedBy: string;
  reportedAt: string; // ISO Date
  completedAt?: string; // ISO Date
  cost: number;
  notes?: string;
}

export interface StoredDocument {
  id: string;
  hotelId: string;
  title: string;
  category: 'ID' | 'Contract' | 'Invoice' | 'Report' | 'Other';
  uploadedBy: string;
  uploadedAt: string;
  fileType: string; // mime type
  data: string; // Base64
  tags: string[];
  guestId?: string; // Optional link to guest
  summary?: string;
}

export interface HotelConfig {
  name: string;
  address: string;
  email: string;
  phone: string;
  demoMode: boolean;
  maintenanceEmail: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  ai = inject(AiService);
  firestore = inject(Firestore);
  auth = inject(AuthService);

  // User Profile matching current User to Hotel
  userProfile = toSignal(
    this.auth.user$.pipe(
      switchMap(u => u ? docData(doc(this.firestore, `users/${u.uid}`)) : of(null))
    ),
    { initialValue: null }
  );

  // Multi-property selection
  selectedHotelId = signal<string | null>(null);

  currentHotelId = computed(() => {
    // 1. Manually selected
    if (this.selectedHotelId()) return this.selectedHotelId();

    // 2. Single hotel stored in profile
    const profile = this.userProfile();
    if (profile?.['hotelId']) return profile['hotelId'];

    // 3. First of multiple hotels (fallback)
    if (profile?.['hotelIds'] && Array.isArray(profile['hotelIds']) && profile['hotelIds'].length > 0) {
      // We don't auto-select here to force selection screen usage, but returns null/undefined if not selected
      // actually, returning null is good - it will disable queries until selected
      return null;
    }

    return undefined;
  });

  // Data Connect Queries & Mutations
  // Now dependent on currentHotelId
  roomsQuery = injectListAvailableRooms(
    () => ({ hotelId: this.currentHotelId() }),
    () => ({ enabled: !!this.currentHotelId() })
  );

  currentHotelQuery = injectGetHotelById(
    () => ({ id: this.currentHotelId() }),
    () => ({ enabled: !!this.currentHotelId() })
  );

  // Query to find any existing hotel (recovery mode)
  firstHotelQuery = injectGetFirstHotel();

  // Query all hotels for SuperAdmins
  allHotelsQuery = injectListAllHotels();

  // Query hotels for specific user
  hotelsByUserQuery = injectListHotelsByUser(
    () => ({ userId: this.auth.currentUser()?.id || '' }),
    () => ({ enabled: !!this.auth.currentUser()?.id })
  );

  createRoomMut = injectCreateRoom();
  createGuestMut = injectCreateGuest();
  createBookingMut = injectCreateBooking();
  createHotelMut = injectCreateHotel();
  updateRoomStatusMut = injectUpdateRoomStatus();

  async linkHotelToUser(hotelId: string) {
    const user = this.auth.currentUser();
    // Also try auth instance if signal is empty
    const uid = user?.id || this.auth.auth.currentUser?.uid;

    if (!uid) throw new Error("No user logged in to link.");

    await setDoc(doc(this.firestore, `users/${uid}`), { hotelId }, { merge: true });
    this.log('System', 'Recovery', `User linked to existing hotel ${hotelId}`);
    return true;
  }

  // Signals
  rooms = computed(() => {
    const data = this.roomsQuery.data();
    if (data?.rooms) {
      console.log('[DataService] Rooms updated:', data.rooms.length);
    }
    return data?.rooms ?? [];
  });

  guests = toSignal(
    toObservable(this.currentHotelId).pipe(
      switchMap(hotelId => hotelId
        ? collectionData(query(collection(this.firestore, 'guests'), where('hotelId', '==', hotelId)), { idField: 'id' }) as Observable<Guest[]>
        : of([]))
    ), { initialValue: [] as Guest[] }
  );

  stays = toSignal(
    toObservable(this.currentHotelId).pipe(
      switchMap(hotelId => hotelId
        ? collectionData(query(collection(this.firestore, 'stays'), where('hotelId', '==', hotelId)), { idField: 'id' }) as Observable<Stay[]>
        : of([]))
    ), { initialValue: [] as Stay[] }
  );

  logs = toSignal(
    toObservable(this.currentHotelId).pipe(
      switchMap(hotelId => hotelId
        ? collectionData(query(collection(this.firestore, 'logs'), where('hotelId', '==', hotelId), orderBy('timestamp', 'desc')), { idField: 'id' }) as Observable<LogEntry[]>
        : of([]))
    ), { initialValue: [] as LogEntry[] }
  );

  documents = toSignal(
    toObservable(this.currentHotelId).pipe(
      switchMap(hotelId => hotelId
        ? collectionData(query(collection(this.firestore, 'documents'), where('hotelId', '==', hotelId)), { idField: 'id' }) as Observable<FinancialDocument[]>
        : of([]))
    ), { initialValue: [] as FinancialDocument[] }
  );

  staff = toSignal(
    toObservable(this.currentHotelId).pipe(
      switchMap(hotelId => hotelId
        ? collectionData(query(collection(this.firestore, 'staff'), where('hotelId', '==', hotelId)), { idField: 'id' }) as Observable<Staff[]>
        : of([]))
    ), { initialValue: [] as Staff[] }
  );

  timeLogs = toSignal(
    toObservable(this.currentHotelId).pipe(
      switchMap(hotelId => hotelId
        ? collectionData(query(collection(this.firestore, 'timeLogs'), where('hotelId', '==', hotelId)), { idField: 'id' }) as Observable<TimeLog[]>
        : of([]))
    ), { initialValue: [] as TimeLog[] }
  );

  shifts = toSignal(
    toObservable(this.currentHotelId).pipe(
      switchMap(hotelId => hotelId
        ? collectionData(query(collection(this.firestore, 'shifts'), where('hotelId', '==', hotelId)), { idField: 'id' }) as Observable<Shift[]>
        : of([]))
    ), { initialValue: [] as Shift[] }
  );

  maintenanceRequests = toSignal(
    toObservable(this.currentHotelId).pipe(
      switchMap(hotelId => hotelId
        ? collectionData(query(collection(this.firestore, 'maintenance'), where('hotelId', '==', hotelId)), { idField: 'id' }) as Observable<MaintenanceRequest[]>
        : of([]))
    ), { initialValue: [] as MaintenanceRequest[] }
  );

  storedDocuments = toSignal(
    toObservable(this.currentHotelId).pipe(
      switchMap(hotelId => hotelId
        ? collectionData(query(collection(this.firestore, 'storedDocuments'), where('hotelId', '==', hotelId)), { idField: 'id' }) as Observable<StoredDocument[]>
        : of([]))
    ), { initialValue: [] as StoredDocument[] }
  );

  // Config - per hotel
  hotelConfigSignal = toSignal(
    toObservable(this.currentHotelId).pipe(
      switchMap(hotelId => hotelId
        ? docData(doc(this.firestore, 'hotelConfigs', hotelId)) as Observable<HotelConfig>
        : of(null))
    ), { initialValue: null }
  );

  // Computed wrapper to provide default if config is missing
  hotelConfig = computed(() => {
    const c = this.hotelConfigSignal();
    return c || {
      name: 'StaySyncOS Hotel',
      address: '',
      email: '',
      phone: '',
      demoMode: false,
      maintenanceEmail: ''
    };
  });

  constructor() { }

  // Helper to get collections references (internal use)
  private col(name: string) {
    return collection(this.firestore, name);
  }

  log(category: LogEntry['category'], action: string, details: string) {
    const hotelId = this.currentHotelId();
    if (!hotelId) return;

    const entry: LogEntry = {
      id: crypto.randomUUID(),
      hotelId,
      timestamp: new Date().toISOString(),
      action,
      user: 'Admin', // TODO: Get current user
      category,
      details
    };
    addDoc(collection(this.firestore, 'logs'), entry);
  }

  async addRoom(room: Omit<Room, 'id' | 'hotel' | 'status'> & { status?: string }) {
    const hotelId = this.currentHotelId();

    console.log('[DataService] Adding room:', room);
    if (!hotelId) {
      console.error("Cannot add room: No hotel linked to user.");
      return;
    }

    try {
      await this.createRoomMut.mutateAsync({
        hotelId: hotelId,
        roomNumber: room.roomNumber,
        roomType: room.roomType,
        status: room.status || 'Available',
        dailyRate: room.dailyRate,
        capacity: room.capacity ?? 2
      });
      this.log('Room', 'Create', `Room ${room.roomNumber} added.`);
      this.roomsQuery.refetch();
    } catch (e) {
      this.log('Room', 'Error', 'Failed to add room');
      console.error("Error adding room", e);
    }
  }

  async addRoomsBulk(roomsData: Omit<Room, 'id' | 'status' | 'hotel'>[]) {
    // Sequential execution for now
    for (const r of roomsData) {
      await this.addRoom(r);
    }
    this.log('System', 'Bulk Action', `Created ${roomsData.length} rooms via Wizard.`);
  }

  async updateRoomStatus(roomId: string, status: string) {
    try {
      await this.updateRoomStatusMut.mutateAsync({ id: roomId, status });
      this.log('Room', 'Status Update', `Room status updated to ${status}`);
    } catch (e) {
      console.error("Failed to update room status", e);
    }
  }

  factoryReset(seedDemoData: boolean) {
    // We only want to seed data here. 
    // The configuration (demoMode true/false) is now controlled by the Settings UI independently.
    if (seedDemoData) {
      const hotelId = this.currentHotelId();
      if (hotelId) {
        this.seedRooms(hotelId);
        this.seedStaff(hotelId);
        this.updateHotelDetails({ demoMode: true });
      }
    } else {
      this.updateHotelDetails({ demoMode: false });
    }
  }

  // Modified to be used by SetupComponent specifically
  async createHotelForUser(name: string, address: string, propertyId: string) {
    const user = this.auth.currentUser();
    console.log('[DataService] creating hotel for user:', user);

    if (!user) {
      console.error('[DataService] No user found directly in signal. Checking observable...');
      // Fallback: Check if observable has it (signal sync issue?)
      const u = this.auth.auth.currentUser;
      if (u) {
        console.log('[DataService] Found user in SDK directly:', u.uid);
        // Proceed with SDK user ID if signal is lagging
        try {
          const res = await this.createHotelMut.mutateAsync({
            name,
            address,
            propertyId
          });

          // @ts-ignore
          const newId = res.data?.hotel_insert as unknown as string;

          if (newId) {
            await setDoc(doc(this.firestore, `users/${u.uid}`), { hotelId: newId }, { merge: true });
            this.log('System', 'Initialization', 'Created hotel and linked to user.');
            await this.seedRooms(newId);
            this.seedStaff(newId);
            return newId;
          }
        } catch (e) {
          console.error("Failed to create hotel (SDK user)", e);
          throw e;
        }
      }
      return undefined;
    }

    try {
      const res = await this.createHotelMut.mutateAsync({
        name,
        address,
        propertyId
      });

      // @ts-ignore
      const newId = res.data?.hotel_insert as unknown as string;

      if (newId) {
        // Link to User
        await setDoc(doc(this.firestore, `users/${user.id}`), { hotelId: newId }, { merge: true });
        this.log('System', 'Initialization', 'Created hotel and linked to user.');

        // Seed initial rooms
        await this.seedRooms(newId);
        this.seedStaff(newId);
        return newId;
      }
    } catch (e) {
      console.error("Failed to create hotel", e);
      throw e; // Re-throw to show in UI
    }
    return undefined;
  }

  // Refactored seeding to take ID
  private async seedRooms(hotelId: string) {
    const roomsToCreate = [
      { roomNumber: '101', roomType: 'Single', dailyRate: 120 },
      { roomNumber: '102', roomType: 'Double', dailyRate: 180 },
      { roomNumber: '201', roomType: 'Suite', dailyRate: 350 },
      { roomNumber: '305', roomType: 'Single', dailyRate: 110 },
    ];

    for (const r of roomsToCreate) {
      await this.createRoomMut.mutateAsync({
        hotelId: hotelId,
        roomNumber: r.roomNumber,
        roomType: r.roomType,
        status: 'Available',
        dailyRate: r.dailyRate
      });
    }
    this.log('System', 'Seeding', 'Seeded initial rooms.');
  }

  private seedStaff(hotelIdInput?: string) {
    // const hotelId = hotelIdInput || this.currentHotelId();
    // if (!hotelId) return;
    // if (this.staff().length > 0) return;

    // const staff: Staff[] = [
    //   { id: crypto.randomUUID(), hotelId, name: 'Alice Manager', role: 'Manager', pin: '1234', status: 'Active', currentStatus: 'Clocked Out' },
    //   { id: crypto.randomUUID(), hotelId, name: 'Bob Reception', role: 'Reception', pin: '0000', status: 'Active', currentStatus: 'Clocked Out' },
    //   { id: crypto.randomUUID(), hotelId, name: 'Charlie Clean', role: 'Housekeeping', pin: '1111', status: 'Active', currentStatus: 'Clocked Out' },
    //   { id: crypto.randomUUID(), hotelId, name: 'Mike Fixit', role: 'Maintenance', pin: '2222', status: 'Active', currentStatus: 'Clocked Out' },
    // ];
    // staff.forEach(s => setDoc(doc(this.firestore, 'staff', s.id), s));
  }

  updateHotelDetails(details: Partial<HotelConfig>) {
    const hotelId = this.currentHotelId();
    console.log('[DataService] updateHotelDetails id:', hotelId, 'data:', details);
    if (!hotelId) {
      console.error('[DataService] updateHotelDetails failed: No hotel linked.');
      return;
    }

    setDoc(doc(this.firestore, 'hotelConfigs', hotelId), details, { merge: true })
      .then(() => console.log('[DataService] Hotel details saved to Firestore'))
      .catch(err => console.error('[DataService] Hotel details save failed', err));

    this.log('System', 'Config Update', 'Hotel details updated.');
  }

  // Legacy Actions (kept for other components)
  addGuest(guest: Omit<Guest, 'id' | 'hotelId'>) {
    const hotelId = this.currentHotelId();
    if (!hotelId) return;

    const newGuest: Guest = {
      ...guest,
      id: crypto.randomUUID(),
      hotelId
    } as Guest; // explicit cast since we are adding the missing fields

    setDoc(doc(this.firestore, 'guests', newGuest.id), newGuest);
    this.log('Guest', 'Guest Added', `Guest ${newGuest.name} added.`);
  }

  updateGuest(guest: Guest) {
    setDoc(doc(this.firestore, 'guests', guest.id), guest);
    this.log('Guest', 'Guest Update', `Guest ${guest.name} updated.`);
  }

  deleteGuest(guestId: string) {
    deleteDoc(doc(this.firestore, 'guests', guestId));
    this.log('Guest', 'Guest Deleted', `Guest record deleted.`);
  }

  createStay(stay: Stay) {
    const hotelId = this.currentHotelId();
    if (!hotelId) return;

    if (!stay.id) stay.id = crypto.randomUUID();
    stay.hotelId = hotelId;
    setDoc(doc(this.firestore, 'stays', stay.id), stay);
    this.log('Guest', 'Stay Created', `Stay start ${stay.checkIn}`);
  }

  /* Legacy methods replaced by implementations below */

  // --- Financial ---
  async makePayment(stayId: string, amount: number) {
    const stay = this.stays().find(s => s.id === stayId);
    if (!stay) return;

    const newTotal = (stay.totalPaid || 0) + amount;
    await updateDoc(doc(this.firestore, 'stays', stayId), { totalPaid: newTotal });

    // Also generate receipt
    const guest = this.guests().find(g => g.id === stay.guestId);
    if (guest) {
      const receipt = this.createDocument('Receipt', stayId, guest.id, guest.name, [
        { description: 'Payment Received', quantity: 1, unitPrice: amount, total: amount }
      ]);
      return receipt;
    }
    return null;
  }

  // --- Document Helpers ---
  private generateDocNumber(type: 'Invoice' | 'Receipt'): string {
    const prefix = type === 'Invoice' ? 'INV' : 'REC';
    const count = this.documents().filter(d => d.type === type).length + 1000;
    return `${prefix}-${count + 1}`;
  }

  createDocument(
    type: 'Invoice' | 'Receipt',
    stayId: string,
    guestId: string,
    guestName: string,
    items: { description: string; quantity: number; unitPrice: number; total: number }[],
    notes: string = ''
  ) {
    const hotelId = this.currentHotelId();
    if (!hotelId) return null;

    let totalAmount = 0;
    for (const item of items) {
      totalAmount += item.total;
    }
    const newDoc: FinancialDocument = {
      id: crypto.randomUUID(),
      hotelId,
      type,
      number: this.generateDocNumber(type),
      date: new Date().toISOString(),
      stayId,
      guestId,
      guestName,
      items,
      totalAmount,
      notes
    };

    setDoc(doc(this.firestore, 'documents', newDoc.id), newDoc);

    // Async AI Analysis for System Docs
    this.ai.analyzeSystemDocument(newDoc).then(res => {
      if (res.tags || res.summary) {
        updateDoc(doc(this.firestore, 'documents', newDoc.id), { ...res });
      }
    });

    return newDoc;
  }

  // --- Stats, Maintenance, etc ---
  activeStaysWithDebt = computed(() => {
    return this.stays()
      .filter(s => s.status === 'Active')
      .map(stay => {
        const guest = this.guests().find(g => g.id === stay.guestId);
        const room = this.rooms().find(r => r.id === stay.roomId);
        if (!room) return null;

        const checkInTime = new Date(stay.checkIn).getTime();
        const nowTime = Date.now();
        const daysStayed = Math.max(1, Math.ceil((nowTime - checkInTime) / (1000 * 60 * 60 * 24)));
        const totalCostSoFar = daysStayed * (room.dailyRate || 0);
        const debt = totalCostSoFar - stay.totalPaid;

        return {
          stay,
          guest,
          room,
          daysStayed,
          totalCostSoFar,
          debt,
          isIndefinite: !!stay.isIndefinite
        };
      })
      .filter(x => x !== null)
      .sort((a, b) => (b?.debt || 0) - (a?.debt || 0)); // Highest debt first
  });

  stats = computed(() => {
    const rooms = this.rooms();
    const occupied = rooms.filter(r => r.status === 'Occupied').length;
    const maintenance = rooms.filter(r => r.status === 'Maintenance').length;
    const available = rooms.filter(r => r.status === 'Available').length;

    return {
      totalRooms: rooms.length,
      occupancyRate: rooms.length ? Math.round((occupied / rooms.length) * 100) : 0,
      available,
      maintenance,
      recentActivityCount: this.logs().length
    };
  });

  // Staff helpers (clock in/out) needed by StaffManager
  clockIn(staffId: string) {
    const hotelId = this.currentHotelId();
    if (!hotelId) return;

    updateDoc(doc(this.firestore, 'staff', staffId), { currentStatus: 'Clocked In' });
    // Create TimeLog
    const newLog: TimeLog = {
      id: crypto.randomUUID(),
      hotelId,
      staffId,
      staffName: this.staff().find(s => s.id === staffId)?.name || 'Unknown',
      date: new Date().toISOString().split('T')[0],
      startTime: new Date().toISOString(),
      breaks: [],
      totalHours: 0,
      status: 'Open'
    };
    setDoc(doc(this.firestore, 'timeLogs', newLog.id), newLog);
  }

  clockOut(staffId: string) {
    updateDoc(doc(this.firestore, 'staff', staffId), { currentStatus: 'Clocked Out' });
    // Close TimeLog
    const log = this.timeLogs().find(l => l.staffId === staffId && l.status === 'Open');
    if (log) {
      const end = new Date().toISOString();
      const totalHours = this.calculateHours(log.startTime, end, log.breaks);
      updateDoc(doc(this.firestore, 'timeLogs', log.id), { endTime: end, status: 'Closed', totalHours });
    }
  }

  startBreak(staffId: string) {
    updateDoc(doc(this.firestore, 'staff', staffId), { currentStatus: 'On Break' });
    const log = this.timeLogs().find(l => l.staffId === staffId && l.status === 'Open');
    if (log) {
      const newBreaks = [...log.breaks, { start: new Date().toISOString() }];
      updateDoc(doc(this.firestore, 'timeLogs', log.id), { breaks: newBreaks });
    }
  }

  endBreak(staffId: string) {
    updateDoc(doc(this.firestore, 'staff', staffId), { currentStatus: 'Clocked In' });
    const log = this.timeLogs().find(l => l.staffId === staffId && l.status === 'Open');
    if (log) {
      const breaks = log.breaks.map(b => !b.end ? { ...b, end: new Date().toISOString() } : b);
      updateDoc(doc(this.firestore, 'timeLogs', log.id), { breaks });
    }
  }

  private calculateHours(start: string, end: string, breaks: TimeBreak[]): number {
    let duration = new Date(end).getTime() - new Date(start).getTime();
    breaks.forEach(b => {
      if (b.end) {
        duration -= (new Date(b.end).getTime() - new Date(b.start).getTime());
      }
    });
    return Math.max(0, duration / (1000 * 60 * 60)); // Return in hours
  }

  // Misc methods referenced in compilation errors
  addShift(shift: Omit<Shift, 'id' | 'hotelId'>) {
    const hotelId = this.currentHotelId();
    if (!hotelId) return;

    const id = crypto.randomUUID();
    const newShift: Shift = { ...shift, id, hotelId };
    setDoc(doc(this.firestore, 'shifts', id), newShift);
  }

  deleteShift(id: string) {
    deleteDoc(doc(this.firestore, 'shifts', id));
  }

  updateTimeLog(log: TimeLog) {
    setDoc(doc(this.firestore, 'timeLogs', log.id), log);
  }

  /* Financial methods already implemented above */

  bookStay(guest: Guest, roomId: string, checkIn: string, checkOut?: string) {
    const hotelId = this.currentHotelId();
    if (!hotelId) return;

    const stay: Stay = {
      id: crypto.randomUUID(),
      hotelId,
      guestId: guest.id,
      roomId: roomId,
      checkIn: checkIn,
      checkOutProjected: checkOut || new Date(new Date(checkIn).getTime() + 24 * 60 * 60 * 1000).toISOString(),
      ratePerNight: this.rooms().find(r => r.id === roomId)?.dailyRate || 100,
      totalPaid: 0,
      status: 'Reserved',
      isIndefinite: !checkOut
    };

    // Save/Update Guest (Add to history, but DO NOT check in yet)
    const updatedGuest = { ...guest, history: [...guest.history, stay] };
    this.updateGuest(updatedGuest);

    // Create Stay
    this.createStay(stay);

    // Update Room Status (Blocked)
    this.updateRoomStatus(stay.roomId, 'Occupied');

    this.log('Guest', 'Reservation', `Guest ${guest.name} reserved Room (ID: ${stay.roomId})`);
  }

  async checkIn(stayId: string) {
    const stay = this.stays().find(s => s.id === stayId);
    if (!stay) throw new Error("Stay not found");

    // 1. Verify ID Document
    const hasID = this.storedDocuments().some(d => d.guestId === stay.guestId && d.category === 'ID');
    if (!hasID) {
      throw new Error("Missing ID Document. Please upload guest ID before check-in.");
    }

    // 2. Update Stay Status
    await updateDoc(doc(this.firestore, 'stays', stayId), { status: 'Active' });

    // 3. Update Guest Status
    const guest = this.guests().find(g => g.id === stay.guestId);
    if (guest) {
      await updateDoc(doc(this.firestore, 'guests', guest.id), { currentStayId: stayId });
    }

    this.log('Guest', 'Check In', `Guest checked in (Stay ${stayId})`);
  }

  async checkOut(stayId: string, roomId?: string, guestId?: string) {
    const stay = this.stays().find(s => s.id === stayId);
    if (stay) {
      updateDoc(doc(this.firestore, 'stays', stayId), {
        status: 'Completed',
        checkOutActual: new Date().toISOString()
      });

      const rId = roomId || stay.roomId;
      if (rId) await this.updateRoomStatus(rId, 'Dirty');

      // Update Guest
      const gId = guestId || stay.guestId;
      if (gId) {
        const guest = this.guests().find(g => g.id === gId);
        if (guest) {
          updateDoc(doc(this.firestore, 'guests', gId), { currentStayId: null });
        }
      }
    }
  }

  // Update addMaintenanceRequest to be flexible
  addMaintenanceRequest(req: Partial<MaintenanceRequest> & { roomId: string, description: string }) {
    const hotelId = this.currentHotelId();
    if (!hotelId) throw new Error("No hotel linked");

    const room = this.rooms().find(r => r.id === req.roomId);
    const newReq: MaintenanceRequest = {
      id: crypto.randomUUID(),
      hotelId,
      roomId: req.roomId,
      roomNumber: room?.roomNumber || '?',
      description: req.description,
      priority: req.priority || 'Medium',
      status: 'Pending',
      reportedBy: req.reportedBy || 'System',
      reportedAt: new Date().toISOString(),
      cost: req.cost || 0,
      notes: req.notes || ''
    };
    setDoc(doc(this.firestore, 'maintenance', newReq.id), newReq);
    return newReq;
  }

  updateMaintenanceRequest(id: string, data: Partial<MaintenanceRequest> | string) {
    if (typeof data === 'string') {
      updateDoc(doc(this.firestore, 'maintenance', id), { status: data });
    } else {
      updateDoc(doc(this.firestore, 'maintenance', id), data);
    }
  }

  addStaff(staff: Omit<Staff, 'id' | 'hotelId'>) {
    const hotelId = this.currentHotelId();
    if (!hotelId) return;

    const newStaff: Staff = { ...staff, id: crypto.randomUUID(), hotelId } as Staff;
    setDoc(doc(this.firestore, 'staff', newStaff.id), newStaff);
  }

  uploadDocument(docData: Omit<StoredDocument, 'id' | 'uploadedAt' | 'hotelId'>) {
    const hotelId = this.currentHotelId();
    if (!hotelId) return; // Should handle error better

    const newDoc: StoredDocument = {
      ...docData,
      id: crypto.randomUUID(),
      hotelId,
      uploadedAt: new Date().toISOString()
    };
    setDoc(doc(this.firestore, 'storedDocuments', newDoc.id), newDoc);
    this.log('Document', 'Upload', `Document ${newDoc.title} uploaded.`);
    return newDoc;
  }

  deleteDocument(id: string) {
    deleteDoc(doc(this.firestore, 'storedDocuments', id));
    this.log('Document', 'Delete', `Document deleted.`);
  }

  updateDocument(id: string, data: Partial<StoredDocument>) {
    updateDoc(doc(this.firestore, 'storedDocuments', id), data);
    this.log('Document', 'Update', `Document updated.`);
  }

  importData(jsonString: string): boolean {
    // Import not supported in cloud mode for now (complex to overwrite relationships)
    return false;
  }

  getExportData(): string {
    return JSON.stringify({
      rooms: this.rooms(),
      guests: this.guests(),
    });
  }
}