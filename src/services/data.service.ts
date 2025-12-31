import { Injectable, signal, computed, effect, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Firestore, collection, collectionData, doc, docData, addDoc, updateDoc, deleteDoc, setDoc, query, orderBy } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AiService } from './ai.service';

export interface Room {
  id: string;
  number: string;
  type: 'Single' | 'Double' | 'Suite' | 'Penthouse';
  price: number;
  status: 'Available' | 'Occupied' | 'Maintenance' | 'Dirty';
  amenities: string[];
}

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

// --- New Staff Interfaces ---
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

  // Firestore Collections as Signals with Explicit Casting
  rooms = toSignal(collectionData(collection(this.firestore, 'rooms'), { idField: 'id' }) as Observable<Room[]>, { initialValue: [] as Room[] });
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

  // Computed wrapper to provide default if config is missing (or not loaded yet)
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

  // --- Actions ---

  log(category: LogEntry['category'], action: string, details: string) {
    const newLog: LogEntry = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      user: 'System',
      category,
      action,
      details
    };
    addDoc(this.col('logs'), newLog);
  }

  addRoom(room: Omit<Room, 'id' | 'status'>) {
    const newRoom: Room = { ...room, id: crypto.randomUUID(), status: 'Available' };
    setDoc(doc(this.firestore, 'rooms', newRoom.id), newRoom);
    this.log('Room', 'Room Created', `Room ${room.number} added.`);
  }

  addRoomsBulk(roomsData: Omit<Room, 'id' | 'status'>[]) {
    roomsData.forEach(r => {
      this.addRoom(r);
    });
    this.log('System', 'Bulk Action', `Created ${roomsData.length} rooms via Wizard.`);
  }

  updateRoomStatus(roomId: string, status: Room['status']) {
    updateDoc(doc(this.firestore, 'rooms', roomId), { status });
    this.log('Room', 'Status Change', `Room ${roomId} status set to ${status}`);
  }

  // --- Guest Actions ---
  addGuest(guest: Omit<Guest, 'id'>) {
    const newGuest: Guest = {
      ...guest,
      id: crypto.randomUUID()
    };
    setDoc(doc(this.firestore, 'guests', newGuest.id), newGuest);
    this.log('Guest', 'Guest Created', `Added guest: ${newGuest.name}`);
    return newGuest;
  }

  updateGuest(id: string, updates: Partial<Guest>) {
    updateDoc(doc(this.firestore, 'guests', id), updates);
    this.log('Guest', 'Update', `Guest ${id} updated.`);
  }

  deleteGuest(id: string) {
    deleteDoc(doc(this.firestore, 'guests', id));
    this.log('Guest', 'Delete', `Guest ${id} deleted.`);
  }

  // --- Stay Actions ---

  createStay(guest: Guest, roomId: string, nights: number) {
    const checkIn = new Date();
    const checkOut = new Date(checkIn);
    checkOut.setDate(checkOut.getDate() + nights);
    return this.bookStay(guest, roomId, checkIn.toISOString(), checkOut.toISOString());
  }

  async bookStay(guest: Guest, roomId: string, checkInDate: string, checkOutDate?: string) {
    const room = this.rooms().find(r => r.id === roomId);
    if (!room || room.status !== 'Available') return;

    const stayId = crypto.randomUUID();
    const rate = room.price;

    const checkInTime = new Date(checkInDate).getTime();
    let nights = 1;
    let isIndefinite = false;

    if (checkOutDate) {
      const checkOutTime = new Date(checkOutDate).getTime();
      nights = Math.max(1, Math.ceil((checkOutTime - checkInTime) / (1000 * 60 * 60 * 24)));
    } else {
      isIndefinite = true;
      nights = 1;
    }

    const totalProjected = rate * nights;
    const projectedDate = checkOutDate
      ? new Date(checkOutDate).toISOString()
      : new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString();

    const newStay: Stay = {
      id: stayId,
      guestId: guest.id,
      roomId: roomId,
      checkIn: new Date(checkInDate).toISOString(),
      checkOutProjected: projectedDate,
      ratePerNight: rate,
      totalPaid: 0,
      status: 'Active',
      isIndefinite: isIndefinite
    };

    await setDoc(doc(this.firestore, 'stays', stayId), newStay);
    await updateDoc(doc(this.firestore, 'rooms', roomId), { status: 'Occupied' });

    await updateDoc(doc(this.firestore, 'guests', guest.id), { currentStayId: stayId });


    const desc = isIndefinite
      ? `Room Deposit (Indefinite Stay) - ${room.type}`
      : `Room Charge (${nights} nights) - ${room.type}`;

    this.createDocument('Invoice', stayId, guest.id, guest.name, [
      { description: desc, quantity: nights, unitPrice: rate, total: totalProjected }
    ], 'Check-in Invoice');

    this.log('Guest', 'Check In', `${guest.name} booked Room ${room.number}${isIndefinite ? ' (Indefinite)' : ''}`);
  }

  async makePayment(stayId: string, amount: number) {
    const stay = this.stays().find(s => s.id === stayId);
    if (!stay) return null;

    await updateDoc(doc(this.firestore, 'stays', stayId), { totalPaid: stay.totalPaid + amount });

    const guest = this.guests().find(g => g.id === stay.guestId);
    let docRef = null;

    if (guest) {
      docRef = this.createDocument('Receipt', stayId, guest.id, guest.name, [
        { description: 'Payment Received', quantity: 1, unitPrice: amount, total: amount }
      ], 'Payment Thank You');
    }

    this.log('Finance', 'Payment Received', `Payment of $${amount} for stay ${stayId}`);
    return docRef;
  }

  async checkOut(stayId: string) {
    const stay = this.stays().find(s => s.id === stayId);
    if (!stay || stay.status !== 'Active') return;

    const guest = this.guests().find(g => g.id === stay.guestId);
    if (!guest) return;

    const checkInTime = new Date(stay.checkIn).getTime();
    const nowTime = Date.now();
    const daysStayed = Math.max(1, Math.ceil((nowTime - checkInTime) / (1000 * 60 * 60 * 24)));
    const totalCost = daysStayed * stay.ratePerNight;
    const debt = totalCost - stay.totalPaid;

    // Update Stay
    await updateDoc(doc(this.firestore, 'stays', stayId), {
      status: 'Completed',
      checkOutActual: new Date().toISOString()
    });

    // Update Room
    await updateDoc(doc(this.firestore, 'rooms', stay.roomId), { status: 'Dirty' });

    // Update Guest
    await updateDoc(doc(this.firestore, 'guests', guest.id), { currentStayId: null });

    if (debt > 0) {
      this.createDocument('Invoice', stayId, guest.id, guest.name, [
        { description: `Final Adjustment (${daysStayed} nights total)`, quantity: 1, unitPrice: debt, total: debt }
      ], 'Final Balance Due on Checkout');
      this.log('Guest', 'Check Out', `${guest.name} checked out with outstanding balance: $${debt}`);
    } else {
      this.createDocument('Receipt', stayId, guest.id, guest.name, [
        { description: 'Final Statement - Balance Cleared', quantity: 1, unitPrice: 0, total: 0 }
      ], 'Checkout Complete');
      this.log('Guest', 'Check Out', `${guest.name} checked out successfully.`);
    }
  }

  addMaintenanceRequest(req: Omit<MaintenanceRequest, 'id' | 'reportedAt' | 'cost' | 'status' | 'roomNumber'>) {
    const room = this.rooms().find(r => r.id === req.roomId);
    if (!room) return null;

    const newReq: MaintenanceRequest = {
      ...req,
      id: crypto.randomUUID(),
      roomNumber: room.number,
      reportedAt: new Date().toISOString(),
      status: 'Pending',
      cost: 0
    };

    setDoc(doc(this.firestore, 'maintenance', newReq.id), newReq);
    this.updateRoomStatus(req.roomId, 'Maintenance');
    this.log('Maintenance', 'Request Created', `Issue reported in Room ${room.number}: ${req.description}`);

    return newReq;
  }

  updateMaintenanceRequest(id: string, updates: Partial<MaintenanceRequest>) {
    updateDoc(doc(this.firestore, 'maintenance', id), updates);

    if (updates.status === 'Completed') {
      const req = this.maintenanceRequests().find(r => r.id === id);
      if (req) {
        this.updateRoomStatus(req.roomId, 'Available');
        this.log('Maintenance', 'Issue Resolved', `Maintenance completed.`);
      }
    } else {
      this.log('Maintenance', 'Update', `Request ${id.substring(0, 6)} updated.`);
    }
  }

  uploadDocument(docData: Omit<StoredDocument, 'id' | 'uploadedAt'>): StoredDocument {
    const newDoc: StoredDocument = {
      ...docData,
      id: crypto.randomUUID(),
      uploadedAt: new Date().toISOString()
    };
    setDoc(doc(this.firestore, 'storedDocuments', newDoc.id), newDoc);
    this.log('Document', 'Upload', `Document uploaded: ${newDoc.title}`);
    return newDoc;
  }

  updateDocument(id: string, updates: Partial<StoredDocument>) {
    updateDoc(doc(this.firestore, 'storedDocuments', id), updates);
    this.log('Document', 'Update', `Document updated: ${id.substring(0, 6)}`);
  }

  deleteDocument(id: string) {
    deleteDoc(doc(this.firestore, 'storedDocuments', id));
    this.log('Document', 'Delete', `Document deleted`);
  }

  addStaff(staffData: Omit<Staff, 'id' | 'status' | 'currentStatus'>) {
    const newStaff: Staff = {
      ...staffData,
      id: crypto.randomUUID(),
      status: 'Active',
      currentStatus: 'Clocked Out'
    };
    setDoc(doc(this.firestore, 'staff', newStaff.id), newStaff);
    this.log('Staff', 'Staff Created', `Added ${newStaff.name} to team.`);
  }

  clockIn(staffId: string) {
    const s = this.staff().find(u => u.id === staffId);
    if (!s || s.currentStatus !== 'Clocked Out') return;

    const newLog: TimeLog = {
      id: crypto.randomUUID(),
      staffId,
      staffName: s.name,
      date: new Date().toISOString().split('T')[0],
      startTime: new Date().toISOString(),
      breaks: [],
      totalHours: 0,
      status: 'Open'
    };

    setDoc(doc(this.firestore, 'timeLogs', newLog.id), newLog);
    updateDoc(doc(this.firestore, 'staff', staffId), { currentStatus: 'Clocked In' });
    this.log('Staff', 'Clock In', `${s.name} started shift.`);
  }

  clockOut(staffId: string) {
    const s = this.staff().find(u => u.id === staffId);
    if (!s || s.currentStatus === 'Clocked Out') return;

    // Find open log
    const openLog = this.timeLogs().find(l => l.staffId === staffId && l.status === 'Open');
    if (openLog) {
      const endTime = new Date().toISOString();
      const updatedBreaks = openLog.breaks.map(b => !b.end ? { ...b, end: endTime } : b);

      updateDoc(doc(this.firestore, 'timeLogs', openLog.id), {
        endTime,
        breaks: updatedBreaks,
        status: 'Closed',
        totalHours: this.calculateHours(openLog.startTime, endTime, updatedBreaks)
      });
    }

    updateDoc(doc(this.firestore, 'staff', staffId), { currentStatus: 'Clocked Out' });
    this.log('Staff', 'Clock Out', `${s.name} ended shift.`);
  }

  startBreak(staffId: string) {
    const s = this.staff().find(u => u.id === staffId);
    if (!s || s.currentStatus !== 'Clocked In') return;

    const openLog = this.timeLogs().find(l => l.staffId === staffId && l.status === 'Open');
    if (openLog) {
      const newBreaks = [...openLog.breaks, { start: new Date().toISOString() }];
      updateDoc(doc(this.firestore, 'timeLogs', openLog.id), { breaks: newBreaks });
    }

    updateDoc(doc(this.firestore, 'staff', staffId), { currentStatus: 'On Break' });
    this.log('Staff', 'Break Start', `${s.name} went on break.`);
  }

  endBreak(staffId: string) {
    const s = this.staff().find(u => u.id === staffId);
    if (!s || s.currentStatus !== 'On Break') return;

    const openLog = this.timeLogs().find(l => l.staffId === staffId && l.status === 'Open');
    if (openLog) {
      const updatedBreaks = openLog.breaks.map(b => !b.end ? { ...b, end: new Date().toISOString() } : b);
      updateDoc(doc(this.firestore, 'timeLogs', openLog.id), { breaks: updatedBreaks });
    }

    updateDoc(doc(this.firestore, 'staff', staffId), { currentStatus: 'Clocked In' });
    this.log('Staff', 'Break End', `${s.name} returned from break.`);
  }

  updateTimeLog(updatedLog: TimeLog) {
    if (updatedLog.endTime) {
      updatedLog.totalHours = this.calculateHours(updatedLog.startTime, updatedLog.endTime, updatedLog.breaks);
    }
    setDoc(doc(this.firestore, 'timeLogs', updatedLog.id), updatedLog);
    this.log('Staff', 'Log Edit', `Time log updated manually for ${updatedLog.staffName}`);
  }

  addShift(shift: Omit<Shift, 'id'>) {
    const newShift: Shift = { ...shift, id: crypto.randomUUID() };
    setDoc(doc(this.firestore, 'shifts', newShift.id), newShift);
    this.log('Staff', 'Shift Added', `Shift scheduled for staff ${shift.staffId} on ${shift.date}`);
  }

  deleteShift(shiftId: string) {
    deleteDoc(doc(this.firestore, 'shifts', shiftId));
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


  // --- Computed Views ---

  activeStaysWithDebt = computed(() => {
    return this.stays()
      .filter(s => s.status === 'Active')
      .map(stay => {
        const guest = this.guests().find(g => g.id === stay.guestId);
        const room = this.rooms().find(r => r.id === stay.roomId);

        const checkInTime = new Date(stay.checkIn).getTime();
        const nowTime = Date.now();
        const daysStayed = Math.max(1, Math.ceil((nowTime - checkInTime) / (1000 * 60 * 60 * 24)));
        const totalCostSoFar = daysStayed * stay.ratePerNight;
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
      .sort((a, b) => b.debt - a.debt); // Highest debt first
  });

  stats = computed(() => {
    const rooms = this.rooms();
    const occupied = rooms.filter(r => r.status === 'Occupied').length;
    const maintenance = rooms.filter(r => r.status === 'Maintenance').length;
    const available = rooms.filter(r => r.status === 'Available').length;

    // Financials today (simplified)
    const todayLogs = this.logs().filter(l =>
      l.category === 'Finance' &&
      new Date(l.timestamp).toDateString() === new Date().toDateString()
    );

    return {
      totalRooms: rooms.length,
      occupancyRate: rooms.length ? Math.round((occupied / rooms.length) * 100) : 0,
      available,
      maintenance,
      recentActivityCount: this.logs().length
    };
  });

  // --- Utils ---
  private calculateHours(start: string, end: string, breaks: TimeBreak[]): number {
    let duration = new Date(end).getTime() - new Date(start).getTime();

    // Subtract breaks
    breaks.forEach(b => {
      if (b.end) {
        duration -= (new Date(b.end).getTime() - new Date(b.start).getTime());
      }
    });

    return Math.max(0, duration / (1000 * 60 * 60)); // Return in hours
  }

  // --- Maintenance / Admin ---
  factoryReset(seedDemoData: boolean) {
    if (seedDemoData) {
      this.seedData();
      this.seedStaff();
    }
  }

  updateHotelDetails(details: Partial<HotelConfig>) {
    setDoc(this.configDoc, details, { merge: true });
    this.log('System', 'Config Update', 'Hotel details updated.');
  }

  private seedData() {
    // Only seed if empty
    if (this.rooms().length > 0) return;

    const rooms: Room[] = [
      { id: '101', number: '101', type: 'Single', price: 120, status: 'Occupied', amenities: ['Wifi', 'TV'] },
      { id: '102', number: '102', type: 'Double', price: 180, status: 'Available', amenities: ['Wifi', 'TV', 'Mini-bar'] },
      { id: '201', number: '201', type: 'Suite', price: 350, status: 'Maintenance', amenities: ['Wifi', 'TV', 'Jacuzzi', 'View'] },
      { id: '305', number: '305', type: 'Single', price: 110, status: 'Available', amenities: ['Wifi'] },
    ];
    rooms.forEach(r => setDoc(doc(this.firestore, 'rooms', r.id), r));

    const guestId = 'g1';
    const stayId = 's1';

    const guests: Guest[] = [
      {
        id: guestId,
        name: 'John Doe',
        email: 'john@example.com',
        phone: '555-0123',
        currentStayId: stayId,
        history: [],
        notes: 'VIP Guest'
      }
    ];
    guests.forEach(g => setDoc(doc(this.firestore, 'guests', g.id), g));

    const stays: Stay[] = [
      {
        id: stayId,
        guestId: guestId,
        roomId: '101',
        checkIn: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        checkOutProjected: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        ratePerNight: 120,
        totalPaid: 200,
        status: 'Active'
      }
    ];
    stays.forEach(s => setDoc(doc(this.firestore, 'stays', s.id), s));

    // Seed an initial document
    this.createDocument('Invoice', stayId, guestId, 'John Doe', [
      { description: 'Room Charge (5 nights)', quantity: 5, unitPrice: 120, total: 600 }
    ], 'Initial Stay Invoice');

    this.log('System', 'System initialized with seed data', 'System');
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