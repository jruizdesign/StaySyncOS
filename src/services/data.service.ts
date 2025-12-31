import { Injectable, signal, computed, effect, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Firestore, collection, collectionData, doc, docData, addDoc, updateDoc, deleteDoc, setDoc, query, orderBy } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AiService } from './ai.service';
import { injectListAvailableRooms, injectCreateRoom, injectCreateGuest, injectCreateBooking, injectCreateHotel, injectGetFirstHotel, injectUpdateRoomStatus } from '../dataconnect-generated/angular';
import { ListAvailableRoomsData } from '../dataconnect-generated';

// Interfaces
export type Room = ListAvailableRoomsData['rooms'][0];

export interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  currentStayId?: string | null;
  history: Stay[];
  notes: string;
}

export interface Stay {
  id: string;
  guestId: string;
  roomId: string;
  checkIn: string; // ISO Date
  checkOutProjected: string; // ISO Date
  checkOutActual?: string | null;
  ratePerNight: number;
  totalPaid: number;
  status: 'Active' | 'Completed' | 'Cancelled';
  isIndefinite?: boolean;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  action: string;
  user: string;
  category: 'System' | 'Guest' | 'Finance' | 'Room' | 'Staff' | 'Maintenance' | 'Document';
  details: string;
}

export interface FinancialDocument {
  id: string;
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
  staffId: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  type: 'Regular' | 'Overtime' | 'TimeOff';
  notes?: string;
}

export interface MaintenanceRequest {
  id: string;
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
  title: string;
  category: 'ID' | 'Contract' | 'Invoice' | 'Report' | 'Other';
  uploadedBy: string;
  uploadedAt: string;
  fileType: string; // mime type
  data: string; // Base64
  tags: string[];
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

  // Data Connect Queries & Mutations
  roomsQuery = injectListAvailableRooms();
  firstHotelQuery = injectGetFirstHotel();

  createRoomMut = injectCreateRoom();
  createGuestMut = injectCreateGuest();
  createBookingMut = injectCreateBooking();
  createHotelMut = injectCreateHotel();
  updateRoomStatusMut = injectUpdateRoomStatus();

  // Signals
  rooms = computed(() => this.roomsQuery.data()?.rooms ?? []);

  guests = toSignal(collectionData(collection(this.firestore, 'guests'), { idField: 'id' }) as Observable<Guest[]>, { initialValue: [] as Guest[] });
  stays = toSignal(collectionData(collection(this.firestore, 'stays'), { idField: 'id' }) as Observable<Stay[]>, { initialValue: [] as Stay[] });
  logs = toSignal(collectionData(query(collection(this.firestore, 'logs'), orderBy('timestamp', 'desc')), { idField: 'id' }) as Observable<LogEntry[]>, { initialValue: [] as LogEntry[] });
  documents = toSignal(collectionData(collection(this.firestore, 'documents'), { idField: 'id' }) as Observable<FinancialDocument[]>, { initialValue: [] as FinancialDocument[] });

  staff = toSignal(collectionData(collection(this.firestore, 'staff'), { idField: 'id' }) as Observable<Staff[]>, { initialValue: [] as Staff[] });
  timeLogs = toSignal(collectionData(collection(this.firestore, 'timeLogs'), { idField: 'id' }) as Observable<TimeLog[]>, { initialValue: [] as TimeLog[] });
  shifts = toSignal(collectionData(collection(this.firestore, 'shifts'), { idField: 'id' }) as Observable<Shift[]>, { initialValue: [] as Shift[] });

  maintenanceRequests = toSignal(collectionData(collection(this.firestore, 'maintenance'), { idField: 'id' }) as Observable<MaintenanceRequest[]>, { initialValue: [] as MaintenanceRequest[] });
  storedDocuments = toSignal(collectionData(collection(this.firestore, 'storedDocuments'), { idField: 'id' }) as Observable<StoredDocument[]>, { initialValue: [] as StoredDocument[] });

  // Config - Using a specific document 'config/main'
  private configDoc = doc(this.firestore, 'config/main');
  hotelConfigSignal = toSignal(docData(this.configDoc) as Observable<HotelConfig>, { initialValue: null });

  // Computed wrapper to provide default if config is missing
  hotelConfig = computed(() => {
    const c = this.hotelConfigSignal();
    return c || {
      name: 'StaySyncOS Demo Hotel',
      address: '123 Luxury Blvd, Metropolis, NY',
      email: 'contact@staysyncos.com',
      phone: '(555) 019-2834',
      demoMode: true,
      maintenanceEmail: 'maintenance@staysyncos.com'
    };
  });

  constructor() { }

  // Helper to get collections references (internal use)
  private col(name: string) {
    return collection(this.firestore, name);
  }

  log(category: LogEntry['category'], action: string, details: string) {
    const entry: LogEntry = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      action,
      user: 'Admin', // TODO: Get current user
      category,
      details
    };
    addDoc(collection(this.firestore, 'logs'), entry);
  }

  async addRoom(room: Omit<Room, 'id' | 'status'>) {
    const hotel = this.firstHotelQuery.data()?.hotels?.[0];
    if (!hotel) {
      console.error("Cannot add room: No hotel record found.");
      return;
    }

    try {
      await this.createRoomMut.mutateAsync({
        hotelId: hotel.id,
        roomNumber: room.roomNumber,
        roomType: room.roomType,
        status: 'Available',
        dailyRate: room.dailyRate ?? 100
      });
      this.log('Room', 'Room Created', `Room ${room.roomNumber} added.`);
    } catch (e) {
      console.error("Failed to add room", e);
    }
  }

  async addRoomsBulk(roomsData: Omit<Room, 'id' | 'status'>[]) {
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
    if (seedDemoData) {
      this.seedData();
      this.seedStaff();
    }
  }

  private async seedData() {
    // 1. Ensure Hotel Exists
    let hotel = this.firstHotelQuery.data()?.hotels?.[0];

    if (!hotel) {
      try {
        const res = await this.createHotelMut.mutateAsync({
          name: "StaySyncOS Demo Hotel",
          address: "123 Luxury Blvd, Metropolis, NY",
          propertyId: "PROP-001"
        });
        if (res.data?.hotel_insert?.id) {
          hotel = { id: res.data.hotel_insert.id, name: "StaySyncOS Demo Hotel" };
          this.log('System', 'Initialization', 'Created default hotel record.');
        }
      } catch (e) {
        console.error("Failed to create hotel", e);
        return;
      }
    }

    if (!hotel) return;

    // 2. Seed Rooms if empty
    if ((this.rooms()?.length || 0) === 0) {
      const roomsToCreate = [
        { roomNumber: '101', roomType: 'Single', dailyRate: 120 },
        { roomNumber: '102', roomType: 'Double', dailyRate: 180 },
        { roomNumber: '201', roomType: 'Suite', dailyRate: 350 },
        { roomNumber: '305', roomType: 'Single', dailyRate: 110 },
      ];

      for (const r of roomsToCreate) {
        await this.createRoomMut.mutateAsync({
          hotelId: hotel.id,
          roomNumber: r.roomNumber,
          roomType: r.roomType,
          status: 'Available',
          dailyRate: r.dailyRate
        });
      }
      this.log('System', 'Seeding', 'Seeded initial rooms.');
    }
  }

  private seedStaff() {
    if (this.staff().length > 0) return;

    const staff: Staff[] = [
      { id: 'st1', name: 'Alice Manager', role: 'Manager', pin: '1234', status: 'Active', currentStatus: 'Clocked Out' },
      { id: 'st2', name: 'Bob Reception', role: 'Reception', pin: '0000', status: 'Active', currentStatus: 'Clocked Out' },
      { id: 'st3', name: 'Charlie Clean', role: 'Housekeeping', pin: '1111', status: 'Active', currentStatus: 'Clocked Out' },
      { id: 'st4', name: 'Mike Fixit', role: 'Maintenance', pin: '2222', status: 'Active', currentStatus: 'Clocked Out' },
    ];
    staff.forEach(s => setDoc(doc(this.firestore, 'staff', s.id), s));
  }

  updateHotelDetails(details: Partial<HotelConfig>) {
    setDoc(this.configDoc, details, { merge: true });
    this.log('System', 'Config Update', 'Hotel details updated.');
  }

  // Legacy Actions (kept for other components)
  addGuest(guest: Guest) {
    if (!guest.id) guest.id = crypto.randomUUID();
    setDoc(doc(this.firestore, 'guests', guest.id), guest);
    this.log('Guest', 'Guest Added', `Guest ${guest.name} added.`);
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
    if (!stay.id) stay.id = crypto.randomUUID();
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
    const totalAmount = items.reduce((sum, item) => sum + item.total, 0);
    const newDoc: FinancialDocument = {
      id: crypto.randomUUID(),
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
    updateDoc(doc(this.firestore, 'staff', staffId), { currentStatus: 'Clocked In' });
    // Create TimeLog
    const newLog: TimeLog = {
      id: crypto.randomUUID(),
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
  addShift(shift: Omit<Shift, 'id'>) {
    const id = crypto.randomUUID();
    setDoc(doc(this.firestore, 'shifts', id), { ...shift, id });
  }

  deleteShift(id: string) {
    deleteDoc(doc(this.firestore, 'shifts', id));
  }

  updateTimeLog(log: TimeLog) {
    setDoc(doc(this.firestore, 'timeLogs', log.id), log);
  }

  /* Financial methods already implemented above */

  bookStay(guest: Guest, roomId: string, checkIn: string, checkOut?: string) {
    const stay: Stay = {
      id: crypto.randomUUID(),
      guestId: guest.id,
      roomId: roomId,
      checkIn: checkIn,
      checkOutProjected: checkOut || new Date(new Date(checkIn).getTime() + 24 * 60 * 60 * 1000).toISOString(),
      ratePerNight: this.rooms().find(r => r.id === roomId)?.dailyRate || 100,
      totalPaid: 0,
      status: 'Active',
      isIndefinite: !checkOut
    };

    // Save/Update Guest
    const updatedGuest = { ...guest, currentStayId: stay.id, history: [...guest.history, stay] };
    this.updateGuest(updatedGuest);

    // Create Stay
    this.createStay(stay);

    // Update Room Status
    this.updateRoomStatus(stay.roomId, 'Occupied');

    this.log('Guest', 'Check In', `Guest ${guest.name} checked into Room (ID: ${stay.roomId})`);
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
    const room = this.rooms().find(r => r.id === req.roomId);
    const newReq: MaintenanceRequest = {
      id: crypto.randomUUID(),
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

  addStaff(staff: Omit<Staff, 'id'>) {
    const newStaff = { ...staff, id: crypto.randomUUID() };
    setDoc(doc(this.firestore, 'staff', newStaff.id), newStaff);
  }

  uploadDocument(docData: Omit<StoredDocument, 'id' | 'uploadedAt'>) {
    const newDoc: StoredDocument = {
      ...docData,
      id: crypto.randomUUID(),
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