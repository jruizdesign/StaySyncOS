import { Injectable, signal, computed, effect, inject, Signal } from '@angular/core';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { Firestore, collectionData, docData } from '@angular/fire/firestore';
import { collection, doc, addDoc, updateDoc, deleteDoc, setDoc, query, orderBy, where } from 'firebase/firestore';
import { Observable, of } from 'rxjs';
import { AiService } from './ai.service';
import { switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { injectListAvailableRooms, injectCreateRoom, injectCreateHotel, injectGetHotelById, injectUpdateRoomStatus, injectGetFirstHotel, injectListAllHotels, injectListHotelsByUser, injectUpsertUser, injectLinkUserToHotel, injectListGuests, injectCreateGuestDc, injectUpdateGuestDc, injectDeleteGuestDc, injectListBookings, injectCreateBookingDc, injectUpdateBookingDc, injectListLogs, injectCreateLogDc, injectListStaff, injectCreateStaffDc, injectUpdateStaffDc, injectListTimeLogs, injectCreateTimeLogDc, injectUpdateTimeLogDc, injectListFinancialDocuments, injectCreateFinancialDocumentDc, injectUpdateHotelConfig } from '../dataconnect-generated/angular';
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

    const profile = this.userProfile();

    // SuperAdmins must ALWAYS select a property manually
    if (profile?.['role'] === 'SuperAdmin') return null;

    // 2. Single hotel stored in profile (Managers/Staff)
    if (profile?.['hotelId']) return profile['hotelId'];

    // 3. Fallback for multiple hotels
    if (profile?.['hotelIds'] && Array.isArray(profile['hotelIds']) && profile['hotelIds'].length > 0) {
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

  guestsQuery = injectListGuests(
    () => ({ hotelId: this.currentHotelId()! }),
    () => ({ enabled: !!this.currentHotelId() })
  );

  bookingsQuery = injectListBookings(
    () => ({ hotelId: this.currentHotelId()! }),
    () => ({ enabled: !!this.currentHotelId() })
  );

  logsQuery = injectListLogs(
    () => ({ hotelId: this.currentHotelId()! }),
    () => ({ enabled: !!this.currentHotelId() })
  );

  staffQuery = injectListStaff(
    () => ({ hotelId: this.currentHotelId()! }),
    () => ({ enabled: !!this.currentHotelId() })
  );

  timeLogsQuery = injectListTimeLogs(
    () => ({ hotelId: this.currentHotelId()! }),
    () => ({ enabled: !!this.currentHotelId() })
  );

  financialDocsQuery = injectListFinancialDocuments(
    () => ({ hotelId: this.currentHotelId()! }),
    () => ({ enabled: !!this.currentHotelId() })
  );

  // Mutations
  createRoomMut = injectCreateRoom();
  updateRoomStatusMut = injectUpdateRoomStatus();
  createHotelMut = injectCreateHotel();
  updateHotelConfigMut = injectUpdateHotelConfig();
  upsertUserMut = injectUpsertUser();
  linkUserToHotelMut = injectLinkUserToHotel();

  createGuestMut = injectCreateGuestDc();
  updateGuestMut = injectUpdateGuestDc();
  deleteGuestMut = injectDeleteGuestDc();

  createBookingMut = injectCreateBookingDc();
  updateBookingMut = injectUpdateBookingDc();

  createLogMut = injectCreateLogDc();

  createStaffMut = injectCreateStaffDc();
  updateStaffMut = injectUpdateStaffDc();

  createTimeLogMut = injectCreateTimeLogDc();
  updateTimeLogMut = injectUpdateTimeLogDc();

  createFinancialDocMut = injectCreateFinancialDocumentDc();

  // Query to find any existing hotel (recovery mode)
  firstHotelQuery = injectGetFirstHotel();

  // Query all hotels for SuperAdmins
  allHotelsQuery = injectListAllHotels();

  // Query hotels for specific user
  hotelsByUserQuery = injectListHotelsByUser(
    () => ({ userId: this.auth.currentUser()?.id || '' }),
    () => ({ enabled: !!this.auth.currentUser()?.id })
  );

  async ensureUserExists(uid: string, email: string, role: string) {
    try {
      await this.upsertUserMut.mutateAsync({ id: uid, email, role });
      console.log('[DataService] User synced to Data Connect:', uid);
    } catch (e) {
      console.error('[DataService] Failed to sync user to Data Connect', e);
    }
  }

  async linkHotelToUser(hotelId: string) {
    const user = this.auth.currentUser();
    // Also try auth instance if signal is empty
    const uid = user?.id || this.auth.auth.currentUser?.uid;

    if (!uid) throw new Error("No user logged in to link.");

    // Link in Firestore
    await setDoc(doc(this.firestore, `users/${uid}`), { hotelId }, { merge: true });

    // Link in Data Connect
    try {
      await this.linkUserToHotelMut.mutateAsync({ userId: uid, hotelId });
      console.log('[DataService] User linked to hotel in Data Connect:', hotelId);
    } catch (e) {
      console.error('[DataService] Data Connect linking failed (might already exist):', e);
    }

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

  guests = computed(() => {
    const data = this.guestsQuery.data();
    return (data?.guests ?? []).map(g => ({
      id: g.id,
      hotelId: this.currentHotelId()!,
      name: g.name,
      email: g.email,
      phone: g.phoneNumber || '',
      notes: g.notes || '',
      history: g.history || []
    } as Guest));
  });

  stays = computed(() => {
    const data = this.bookingsQuery.data();
    return (data?.bookings ?? []).map(b => ({
      id: b.id,
      hotelId: this.currentHotelId()!,
      guestId: b.guest.id,
      roomId: b.room?.id || '',
      checkIn: b.checkInDate,
      checkOutProjected: b.checkOutDate,
      checkOutActual: b.checkOutActual,
      ratePerNight: b.ratePerNight || 0,
      totalPaid: b.totalPaid || 0,
      status: b.bookingStatus as any,
      isIndefinite: b.isIndefinite
    } as Stay));
  });

  logs = computed(() => {
    const data = this.logsQuery.data();
    return (data?.logs ?? []).map(l => ({
      id: l.id,
      hotelId: this.currentHotelId()!,
      timestamp: l.timestamp,
      action: l.action,
      user: l.user,
      category: l.category as any,
      details: l.details
    } as LogEntry));
  });

  documents = computed(() => {
    const data = this.financialDocsQuery.data();
    return (data?.financialDocuments ?? []).map(d => ({
      id: d.id,
      hotelId: this.currentHotelId()!,
      type: d.type as any,
      number: d.number,
      date: d.date,
      stayId: d.booking?.id || '',
      guestId: d.guest?.id || '',
      guestName: d.guestName,
      items: d.items || [],
      totalAmount: d.totalAmount,
      notes: d.notes || '',
      summary: d.summary || ''
    } as FinancialDocument));
  });

  staff = computed(() => {
    const data = this.staffQuery.data();
    return (data?.staffs ?? []).map(s => ({
      id: s.id,
      hotelId: this.currentHotelId()!,
      name: `${s.firstName} ${s.lastName}`.trim(),
      role: s.role as any,
      pin: s.pin || '',
      status: s.status as any,
      currentStatus: s.currentStatus as any
    } as Staff));
  });

  timeLogs = computed(() => {
    const data = this.timeLogsQuery.data();
    return (data?.timeLogs ?? []).map(t => ({
      id: t.id,
      hotelId: this.currentHotelId()!,
      staffId: t.staff.id,
      staffName: `${t.staff.firstName} ${t.staff.lastName}`.trim(),
      date: t.date,
      startTime: t.startTime,
      endTime: t.endTime,
      breaks: t.breaks || [],
      totalHours: t.totalHours || 0,
      status: t.status as any
    } as TimeLog));
  });

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
  hotelConfig = computed(() => {
    const data = this.currentHotelQuery.data();
    const hotel = data?.hotel;
    return {
      name: hotel?.name || 'StaySyncOS Hotel',
      address: hotel?.address || '',
      email: hotel?.email || '',
      phone: hotel?.phoneNumber || '',
      demoMode: hotel?.demoMode || false,
      maintenanceEmail: hotel?.maintenanceEmail || ''
    } as HotelConfig;
  });

  constructor() {
    // Sync profile role to AuthService
    effect(() => {
      const profile = this.userProfile();
      if (profile && profile['role']) {
        this.auth.profileRole.set(profile['role']);
      }
    });
  }

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

    // Double Write
    addDoc(collection(this.firestore, 'logs'), entry);
    this.createLogMut.mutate({
      hotelId,
      action,
      user: 'Admin',
      category: category,
      details
    });
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

          const newId = res.data?.hotel_insert.id;

          if (newId) {
            // Ensure user exists in DC
            await this.ensureUserExists(u.uid, u.email || '', 'Manager');
            // Link in DC
            await this.linkUserToHotelMut.mutateAsync({ userId: u.uid, hotelId: newId });

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

      const newId = res.data?.hotel_insert.id;

      if (newId) {
        // Ensure user exists in DC
        await this.ensureUserExists(user.id, user.email, user.role);
        // Link in DC
        await this.linkUserToHotelMut.mutateAsync({ userId: user.id, hotelId: newId });

        // Link in Firestore
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
    const hotelId = hotelIdInput || this.currentHotelId();
    if (!hotelId) return;

    const staffData = [
      { first: 'Alice', last: 'Manager', role: 'Manager' },
      { first: 'Bob', last: 'Reception', role: 'Reception' },
    ];

    staffData.forEach(async s => {
      await this.createStaffMut.mutateAsync({
        hotelId,
        firstName: s.first,
        lastName: s.last,
        role: s.role,
        status: 'Active',
        currentStatus: 'Clocked Out',
        pin: '1234'
      });
    });
  }

  async updateHotelDetails(details: Partial<HotelConfig>) {
    const hotelId = this.currentHotelId();
    if (!hotelId) return;

    // Double Write
    await setDoc(doc(this.firestore, 'hotelConfigs', hotelId), details, { merge: true });
    await this.updateHotelConfigMut.mutateAsync({
      id: hotelId,
      name: details.name,
      address: details.address,
      email: details.email,
      phoneNumber: details.phone,
      demoMode: details.demoMode,
      maintenanceEmail: details.maintenanceEmail
    });

    this.log('System', 'Config Update', 'Hotel details updated.');
    this.currentHotelQuery.refetch();
  }

  // Legacy Actions (kept for other components)
  async addGuest(guest: Omit<Guest, 'id' | 'hotelId'>) {
    const hotelId = this.currentHotelId();
    if (!hotelId) return;

    const id = crypto.randomUUID();
    const newGuest: Guest = {
      ...guest,
      id,
      hotelId
    } as Guest;

    // Double Write
    await setDoc(doc(this.firestore, 'guests', id), newGuest);
    await this.createGuestMut.mutateAsync({
      hotelId,
      name: guest.name,
      email: guest.email,
      phoneNumber: guest.phone,
      notes: guest.notes
    });

    this.log('Guest', 'Guest Added', `Guest ${newGuest.name} added.`);
    this.guestsQuery.refetch();
  }

  async updateGuest(guest: Guest) {
    // Double Write
    await setDoc(doc(this.firestore, 'guests', guest.id), guest);
    await this.updateGuestMut.mutateAsync({
      id: guest.id,
      name: guest.name,
      email: guest.email,
      phoneNumber: guest.phone,
      notes: guest.notes,
      history: guest.history
    });

    this.log('Guest', 'Guest Update', `Guest ${guest.name} updated.`);
    this.guestsQuery.refetch();
  }

  async deleteGuest(guestId: string) {
    // Double Write
    await deleteDoc(doc(this.firestore, 'guests', guestId));
    await this.deleteGuestMut.mutateAsync({ id: guestId });

    this.log('Guest', 'Guest Deleted', `Guest record deleted.`);
    this.guestsQuery.refetch();
  }

  async createStay(stay: Stay) {
    const hotelId = this.currentHotelId();
    if (!hotelId) return;

    if (!stay.id) stay.id = crypto.randomUUID();
    stay.hotelId = hotelId;

    // Double Write
    await setDoc(doc(this.firestore, 'stays', stay.id), stay);
    await this.createBookingMut.mutateAsync({
      hotelId,
      guestId: stay.guestId,
      roomId: stay.roomId,
      checkInDate: stay.checkIn,
      checkOutDate: stay.checkOutProjected,
      bookingStatus: stay.status,
      ratePerNight: stay.ratePerNight,
      totalPaid: stay.totalPaid,
      isIndefinite: stay.isIndefinite
    });

    this.log('Guest', 'Stay Created', `Stay start ${stay.checkIn}`);
    this.bookingsQuery.refetch();
  }

  /* Legacy methods replaced by implementations below */

  // --- Financial ---
  async makePayment(stayId: string, amount: number) {
    const stay = this.stays().find(s => s.id === stayId);
    if (!stay) return;

    const newTotal = (stay.totalPaid || 0) + amount;
    // Double Write
    await updateDoc(doc(this.firestore, 'stays', stayId), { totalPaid: newTotal });
    await this.updateBookingMut.mutateAsync({ id: stayId, totalPaid: newTotal });

    // Also generate receipt
    const guest = this.guests().find(g => g.id === stay.guestId);
    if (guest) {
      const receipt = await this.createDocument('Receipt', stayId, guest.id, guest.name, [
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

  async createDocument(
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

    // Double Write
    await setDoc(doc(this.firestore, 'documents', newDoc.id), newDoc);
    await this.createFinancialDocMut.mutateAsync({
      hotelId,
      type,
      number: newDoc.number,
      date: newDoc.date,
      guestId,
      guestName,
      totalAmount,
      notes,
      items,
      bookingId: stayId
    });

    // Async AI Analysis for System Docs
    this.ai.analyzeSystemDocument(newDoc).then(res => {
      if (res.tags || res.summary) {
        updateDoc(doc(this.firestore, 'documents', newDoc.id), { ...res });
        // Optional: Update DC as well but skipping for brevity as it's secondary
      }
    });

    this.financialDocsQuery.refetch();
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
  async clockIn(staffId: string) {
    const hotelId = this.currentHotelId();
    if (!hotelId) return;

    // Double Write
    await updateDoc(doc(this.firestore, 'staff', staffId), { currentStatus: 'Clocked In' });
    await this.updateStaffMut.mutateAsync({ id: staffId, currentStatus: 'Clocked In' });

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

    // Double Write
    await setDoc(doc(this.firestore, 'timeLogs', newLog.id), newLog);
    await this.createTimeLogMut.mutateAsync({
      hotelId,
      staffId,
      date: newLog.date,
      startTime: newLog.startTime,
      status: 'Open'
    });

    this.staffQuery.refetch();
    this.timeLogsQuery.refetch();
  }

  async clockOut(staffId: string) {
    // Double Write
    await updateDoc(doc(this.firestore, 'staff', staffId), { currentStatus: 'Clocked Out' });
    await this.updateStaffMut.mutateAsync({ id: staffId, currentStatus: 'Clocked Out' });

    // Close TimeLog
    const log = this.timeLogs().find(l => l.staffId === staffId && l.status === 'Open');
    if (log) {
      const end = new Date().toISOString();
      const totalHours = this.calculateHours(log.startTime, end, log.breaks);

      // Double Write
      await updateDoc(doc(this.firestore, 'timeLogs', log.id), { endTime: end, status: 'Closed', totalHours });
      await this.updateTimeLogMut.mutateAsync({ id: log.id, endTime: end, status: 'Closed', totalHours });
    }

    this.staffQuery.refetch();
    this.timeLogsQuery.refetch();
  }

  async startBreak(staffId: string) {
    // Double Write
    await updateDoc(doc(this.firestore, 'staff', staffId), { currentStatus: 'On Break' });
    await this.updateStaffMut.mutateAsync({ id: staffId, currentStatus: 'On Break' });

    const log = this.timeLogs().find(l => l.staffId === staffId && l.status === 'Open');
    if (log) {
      const newBreaks = [...log.breaks, { start: new Date().toISOString() }];
      // Double Write
      await updateDoc(doc(this.firestore, 'timeLogs', log.id), { breaks: newBreaks });
      await this.updateTimeLogMut.mutateAsync({ id: log.id, breaks: newBreaks });
    }

    this.staffQuery.refetch();
    this.timeLogsQuery.refetch();
  }

  async endBreak(staffId: string) {
    // Double Write
    await updateDoc(doc(this.firestore, 'staff', staffId), { currentStatus: 'Clocked In' });
    await this.updateStaffMut.mutateAsync({ id: staffId, currentStatus: 'Clocked In' });

    const log = this.timeLogs().find(l => l.staffId === staffId && l.status === 'Open');
    if (log) {
      const breaks = log.breaks.map(b => !b.end ? { ...b, end: new Date().toISOString() } : b);
      // Double Write
      await updateDoc(doc(this.firestore, 'timeLogs', log.id), { breaks });
      await this.updateTimeLogMut.mutateAsync({ id: log.id, breaks });
    }

    this.staffQuery.refetch();
    this.timeLogsQuery.refetch();
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
  async addShift(shift: Omit<Shift, 'id' | 'hotelId'>) {
    const hotelId = this.currentHotelId();
    if (!hotelId) return;

    const id = crypto.randomUUID();
    const newShift: Shift = { ...shift, id, hotelId };
    await setDoc(doc(this.firestore, 'shifts', id), newShift);
    // TODO: Add Shift mutation to DC if needed, but keeping Firestore-only for shifts for now to keep it simple unless requested.
  }

  async deleteShift(id: string) {
    await deleteDoc(doc(this.firestore, 'shifts', id));
  }

  async updateTimeLog(log: TimeLog) {
    await setDoc(doc(this.firestore, 'timeLogs', log.id), log);
    await this.updateTimeLogMut.mutateAsync({
      id: log.id,
      endTime: log.endTime,
      breaks: log.breaks,
      totalHours: log.totalHours,
      status: log.status
    });
    this.timeLogsQuery.refetch();
  }

  /* Financial methods already implemented above */

  async bookStay(guest: Guest, roomId: string, checkIn: string, checkOut?: string) {
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

    // Save/Update Guest (Add to history)
    const updatedGuest = { ...guest, history: [...guest.history, stay] };
    await this.updateGuest(updatedGuest);

    // Create Stay
    await this.createStay(stay);

    // Update Room Status (Blocked)
    await this.updateRoomStatus(stay.roomId, 'Occupied');

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
    await this.updateBookingMut.mutateAsync({ id: stayId, bookingStatus: 'Active' });

    // 3. Update Guest Status
    const guest = this.guests().find(g => g.id === stay.guestId);
    if (guest) {
      await updateDoc(doc(this.firestore, 'guests', guest.id), { currentStayId: stayId });
      // Update in DC via generic update (could add specific currentStayId to schema if needed)
    }

    this.log('Guest', 'Check In', `Guest checked in (Stay ${stayId})`);
    this.bookingsQuery.refetch();
  }

  async checkOut(stayId: string, roomId?: string, guestId?: string) {
    const stay = this.stays().find(s => s.id === stayId);
    if (stay) {
      const now = new Date().toISOString();
      // Double Write
      await updateDoc(doc(this.firestore, 'stays', stayId), {
        status: 'Completed',
        checkOutActual: now
      });
      await this.updateBookingMut.mutateAsync({ id: stayId, bookingStatus: 'Completed', checkOutActual: now });

      const rId = roomId || stay.roomId;
      if (rId) await this.updateRoomStatus(rId, 'Dirty');

      // Update Guest
      const gId = guestId || stay.guestId;
      if (gId) {
        const guest = this.guests().find(g => g.id === gId);
        if (guest) {
          await updateDoc(doc(this.firestore, 'guests', gId), { currentStayId: null });
        }
      }
    }
    this.bookingsQuery.refetch();
  }

  // Update addMaintenanceRequest to be flexible
  async addMaintenanceRequest(req: Partial<MaintenanceRequest> & { roomId: string, description: string }) {
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
    await setDoc(doc(this.firestore, 'maintenance', newReq.id), newReq);
    // Optional: Add to DC if needed.
    return newReq;
  }

  async updateMaintenanceRequest(id: string, data: Partial<MaintenanceRequest> | string) {
    if (typeof data === 'string') {
      await updateDoc(doc(this.firestore, 'maintenance', id), { status: data });
    } else {
      await updateDoc(doc(this.firestore, 'maintenance', id), data);
    }
  }

  async addStaff(staff: Omit<Staff, 'id' | 'hotelId'>) {
    const hotelId = this.currentHotelId();
    if (!hotelId) return;

    const id = crypto.randomUUID();
    const newStaff: Staff = { ...staff, id, hotelId } as Staff;

    // Double Write
    await setDoc(doc(this.firestore, 'staff', id), newStaff);
    const [first, ...lastArr] = staff.name.split(' ');
    await this.createStaffMut.mutateAsync({
      hotelId,
      firstName: first,
      lastName: lastArr.join(' '),
      role: staff.role,
      status: staff.status,
      currentStatus: staff.currentStatus,
      pin: staff.pin
    });

    this.staffQuery.refetch();
  }

  async uploadDocument(docData: Omit<StoredDocument, 'id' | 'uploadedAt' | 'hotelId'>) {
    const hotelId = this.currentHotelId();
    if (!hotelId) return;

    const id = crypto.randomUUID();
    const newDoc: StoredDocument = {
      ...docData,
      id,
      hotelId,
      uploadedAt: new Date().toISOString()
    };
    await setDoc(doc(this.firestore, 'storedDocuments', id), newDoc);
    // TODO: Add StoredDocument to DC if needed.

    this.log('Document', 'Upload', `Document ${newDoc.title} uploaded.`);
    return newDoc;
  }

  async deleteDocument(id: string) {
    await deleteDoc(doc(this.firestore, 'storedDocuments', id));
    this.log('Document', 'Delete', `Document deleted.`);
  }

  async updateDocument(id: string, data: Partial<StoredDocument>) {
    await updateDoc(doc(this.firestore, 'storedDocuments', id), data);
    this.log('Document', 'Update', `Document updated.`);
  }

  importData(jsonString: string): boolean {
    return false;
  }

  getExportData(): string {
    return JSON.stringify({
      rooms: this.rooms(),
      guests: this.guests(),
    });
  }
}