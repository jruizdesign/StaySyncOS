import { Injectable, signal, computed, effect, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Firestore, collection, collectionData, doc, addDoc, updateDoc, deleteDoc, setDoc, query, orderBy } from '@angular/fire/firestore';
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

  // Simulating Firestore Collections
  hotelConfig = signal<HotelConfig>({
    name: 'StaySyncOS Demo Hotel',
    address: '123 Luxury Blvd, Metropolis, NY',
    email: 'contact@staysyncos.com',
    phone: '(555) 019-2834',
    demoMode: true,
    maintenanceEmail: 'maintenance@staysyncos.com'
  });

  rooms = signal<Room[]>([]);
  guests = signal<Guest[]>([]);
  stays = signal<Stay[]>([]);
  logs = signal<LogEntry[]>([]);
  documents = signal<FinancialDocument[]>([]);

  // Staff Signals
  staff = signal<Staff[]>([]);
  timeLogs = signal<TimeLog[]>([]);
  shifts = signal<Shift[]>([]);

  // Maintenance Signals
  maintenanceRequests = signal<MaintenanceRequest[]>([]);

  // Document Center Signals
  storedDocuments = signal<StoredDocument[]>([]);

  constructor() {
    this.loadFromStorage();
    // Only seed if absolutely empty (first run)
    if (this.rooms().length === 0 && this.hotelConfig().demoMode) this.seedData();
    if (this.staff().length === 0 && this.hotelConfig().demoMode) this.seedStaff();

    // Auto-save effect
    effect(() => {
      localStorage.setItem('nexus_config', JSON.stringify(this.hotelConfig()));
      localStorage.setItem('nexus_rooms', JSON.stringify(this.rooms()));
      localStorage.setItem('nexus_guests', JSON.stringify(this.guests()));
      localStorage.setItem('nexus_stays', JSON.stringify(this.stays()));
      localStorage.setItem('nexus_logs', JSON.stringify(this.logs()));
      localStorage.setItem('nexus_docs', JSON.stringify(this.documents()));
      localStorage.setItem('nexus_staff', JSON.stringify(this.staff()));
      localStorage.setItem('nexus_timelogs', JSON.stringify(this.timeLogs()));
      localStorage.setItem('nexus_shifts', JSON.stringify(this.shifts()));
      localStorage.setItem('nexus_maintenance', JSON.stringify(this.maintenanceRequests()));
      localStorage.setItem('nexus_stored_docs', JSON.stringify(this.storedDocuments()));
    });
  }

  private loadFromStorage() {
    try {
      const config = localStorage.getItem('nexus_config');
      if (config) this.hotelConfig.set(JSON.parse(config));

      this.rooms.set(JSON.parse(localStorage.getItem('nexus_rooms') || '[]'));
      this.guests.set(JSON.parse(localStorage.getItem('nexus_guests') || '[]'));
      this.stays.set(JSON.parse(localStorage.getItem('nexus_stays') || '[]'));
      this.logs.set(JSON.parse(localStorage.getItem('nexus_logs') || '[]'));
      this.documents.set(JSON.parse(localStorage.getItem('nexus_docs') || '[]'));
      this.staff.set(JSON.parse(localStorage.getItem('nexus_staff') || '[]'));
      this.timeLogs.set(JSON.parse(localStorage.getItem('nexus_timelogs') || '[]'));
      this.shifts.set(JSON.parse(localStorage.getItem('nexus_shifts') || '[]'));
      this.maintenanceRequests.set(JSON.parse(localStorage.getItem('nexus_maintenance') || '[]'));
      this.storedDocuments.set(JSON.parse(localStorage.getItem('nexus_stored_docs') || '[]'));
    } catch (e) {
      console.error('Failed to load data', e);
    }
  }

  // --- Global Data Management ---

  getExportData(): string {
    const data = {
      version: '1.0',
      timestamp: new Date().toISOString(),
      config: this.hotelConfig(),
      rooms: this.rooms(),
      guests: this.guests(),
      stays: this.stays(),
      logs: this.logs(),
      documents: this.documents(),
      staff: this.staff(),
      timeLogs: this.timeLogs(),
      shifts: this.shifts(),
      maintenance: this.maintenanceRequests(),
      storedDocuments: this.storedDocuments()
    };
    return JSON.stringify(data, null, 2);
  }

  importData(jsonString: string): boolean {
    try {
      const data = JSON.parse(jsonString);
      if (!data.version || !data.config) throw new Error("Invalid Backup File");

      this.hotelConfig.set(data.config);
      this.rooms.set(data.rooms || []);
      this.guests.set(data.guests || []);
      this.stays.set(data.stays || []);
      this.logs.set(data.logs || []);
      this.documents.set(data.documents || []);
      this.staff.set(data.staff || []);
      this.timeLogs.set(data.timeLogs || []);
      this.shifts.set(data.shifts || []);
      this.maintenanceRequests.set(data.maintenance || []);
      this.storedDocuments.set(data.storedDocuments || []);

      this.log('System', 'Data Restore', 'System restored from backup file.');
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  factoryReset(seedDemoData: boolean) {
    // Clear all signals
    this.rooms.set([]);
    this.guests.set([]);
    this.stays.set([]);
    this.logs.set([]);
    this.documents.set([]);
    this.staff.set([]);
    this.timeLogs.set([]);
    this.shifts.set([]);
    this.maintenanceRequests.set([]);
    this.storedDocuments.set([]);

    // Update config
    this.hotelConfig.update(c => ({ ...c, demoMode: seedDemoData }));

    if (seedDemoData) {
      this.seedData();
      this.seedStaff();
      this.log('System', 'Factory Reset', 'System reset to Demo Mode.');
    } else {
      this.log('System', 'Factory Reset', 'System reset to clean slate for new property.');
    }
  }

  updateHotelDetails(details: Partial<HotelConfig>) {
    this.hotelConfig.update(current => ({ ...current, ...details }));
    this.log('System', 'Config Update', 'Hotel details updated.');
  }

  private seedData() {
    // Initial Seed
    this.rooms.set([
      { id: '101', number: '101', type: 'Single', price: 120, status: 'Occupied', amenities: ['Wifi', 'TV'] },
      { id: '102', number: '102', type: 'Double', price: 180, status: 'Available', amenities: ['Wifi', 'TV', 'Mini-bar'] },
      { id: '201', number: '201', type: 'Suite', price: 350, status: 'Maintenance', amenities: ['Wifi', 'TV', 'Jacuzzi', 'View'] },
      { id: '305', number: '305', type: 'Single', price: 110, status: 'Available', amenities: ['Wifi'] },
    ]);

    const guestId = 'g1';
    const stayId = 's1';

    this.guests.set([
      {
        id: guestId,
        name: 'John Doe',
        email: 'john@example.com',
        phone: '555-0123',
        currentStayId: stayId,
        history: [],
        notes: 'VIP Guest'
      }
    ]);

    this.stays.set([
      {
        id: stayId,
        guestId: guestId,
        roomId: '101',
        checkIn: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
        checkOutProjected: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // in 2 days
        ratePerNight: 120,
        totalPaid: 200, // Partial payment
        status: 'Active'
      }
    ]);

    // Seed Maintenance
    this.maintenanceRequests.set([
      {
        id: 'm1',
        roomId: '201',
        roomNumber: '201',
        description: 'Jacuzzi drain clogged',
        priority: 'High',
        status: 'In Progress',
        reportedBy: 'Charlie Clean',
        reportedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        cost: 0,
        notes: 'Plumber contacted'
      }
    ]);

    // Seed an initial document
    this.createDocument('Invoice', stayId, guestId, 'John Doe', [
      { description: 'Room Charge (5 nights)', quantity: 5, unitPrice: 120, total: 600 }
    ], 'Initial Stay Invoice');

    this.log('System', 'System initialized with seed data', 'System');
  }

  private seedStaff() {
    this.staff.set([
      { id: 'st1', name: 'Alice Manager', role: 'Manager', pin: '1234', status: 'Active', currentStatus: 'Clocked Out' },
      { id: 'st2', name: 'Bob Reception', role: 'Reception', pin: '0000', status: 'Active', currentStatus: 'Clocked Out' },
      { id: 'st3', name: 'Charlie Clean', role: 'Housekeeping', pin: '1111', status: 'Active', currentStatus: 'Clocked Out' },
      { id: 'st4', name: 'Mike Fixit', role: 'Maintenance', pin: '2222', status: 'Active', currentStatus: 'Clocked Out' },
    ]);

    // Seed Shifts for today and tomorrow
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

    this.shifts.set([
      { id: 'sh1', staffId: 'st1', date: today, startTime: '09:00', endTime: '17:00', type: 'Regular' },
      { id: 'sh2', staffId: 'st2', date: today, startTime: '07:00', endTime: '15:00', type: 'Regular' },
      { id: 'sh3', staffId: 'st3', date: tomorrow, startTime: '08:00', endTime: '16:00', type: 'Regular' },
    ]);
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

    this.documents.update(docs => [newDoc, ...docs]);

    // Async AI Analysis for System Docs
    this.ai.analyzeSystemDocument(newDoc).then(res => {
      if (res.tags || res.summary) {
        this.documents.update(docs => docs.map(d => d.id === newDoc.id ? { ...d, ...res } : d));
      }
    });

    return newDoc;
  }

  // --- Actions ---

  log(category: LogEntry['category'], action: string, details: string) {
    const newLog: LogEntry = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      user: 'System', // Could be dynamic
      category,
      action,
      details
    };
    this.logs.update(l => [newLog, ...l]);
  }

  addRoom(room: Omit<Room, 'id' | 'status'>) {
    const newRoom: Room = { ...room, id: crypto.randomUUID(), status: 'Available' };
    this.rooms.update(r => [...r, newRoom]);
    this.log('Room', 'Room Created', `Room ${room.number} added.`);
  }

  addRoomsBulk(roomsData: Omit<Room, 'id' | 'status'>[]) {
    const newRooms: Room[] = roomsData.map(r => ({
      ...r,
      id: crypto.randomUUID(),
      status: 'Available'
    }));
    this.rooms.update(current => [...current, ...newRooms]);
    this.log('System', 'Bulk Action', `Created ${newRooms.length} rooms via Wizard.`);
  }

  updateRoomStatus(roomId: string, status: Room['status']) {
    this.rooms.update(rooms => rooms.map(r => r.id === roomId ? { ...r, status } : r));
    const room = this.rooms().find(r => r.id === roomId);
    if (room) {
      this.log('Room', 'Status Change', `Room ${room.number} status set to ${status}`);
    }
  }

  createStay(guest: Guest, roomId: string, nights: number) {
    // Legacy helper wrapper for bookStay
    const checkIn = new Date();
    const checkOut = new Date(checkIn);
    checkOut.setDate(checkOut.getDate() + nights);

    return this.bookStay(guest, roomId, checkIn.toISOString(), checkOut.toISOString());
  }

  bookStay(guest: Guest, roomId: string, checkInDate: string, checkOutDate?: string) {
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
      // For indefinite, we just estimate 1 night for now to start, or charge a deposit
      nights = 1;
    }

    const totalProjected = rate * nights;

    // If indefinite, set projected to far future so stats don't think it's ending today, 
    // but UI will know it's indefinite
    const projectedDate = checkOutDate
      ? new Date(checkOutDate).toISOString()
      : new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(); // 1 year out placeholder

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

    this.stays.update(s => [...s, newStay]);
    this.rooms.update(rooms => rooms.map(r => r.id === roomId ? { ...r, status: 'Occupied' } : r));
    this.guests.update(guests => guests.map(g => g.id === guest.id ? { ...g, currentStayId: stayId } : g));

    // Initial Invoice
    // If Indefinite, maybe only charge 1 night deposit or similar. We'll do simple logic:
    const desc = isIndefinite
      ? `Room Deposit (Indefinite Stay) - ${room.type}`
      : `Room Charge (${nights} nights) - ${room.type}`;

    this.createDocument('Invoice', stayId, guest.id, guest.name, [
      { description: desc, quantity: nights, unitPrice: rate, total: totalProjected }
    ], 'Check-in Invoice');

    this.log('Guest', 'Check In', `${guest.name} booked Room ${room.number}${isIndefinite ? ' (Indefinite)' : ''}`);
  }

  makePayment(stayId: string, amount: number) {
    let guestName = 'Unknown Guest';
    let guestId = '';

    this.stays.update(stays => stays.map(s => {
      if (s.id === stayId) {
        const guest = this.guests().find(g => g.id === s.guestId);
        if (guest) {
          guestName = guest.name;
          guestId = guest.id;
        }
        return { ...s, totalPaid: s.totalPaid + amount };
      }
      return s;
    }));

    let doc: FinancialDocument | null = null;
    if (guestId) {
      doc = this.createDocument('Receipt', stayId, guestId, guestName, [
        { description: 'Payment Received', quantity: 1, unitPrice: amount, total: amount }
      ], 'Payment Thank You');
    }

    this.log('Finance', 'Payment Received', `Payment of $${amount} for stay ${stayId}`);
    return doc;
  }

  checkOut(stayId: string) {
    const stay = this.stays().find(s => s.id === stayId);
    if (!stay || stay.status !== 'Active') return;

    const guest = this.guests().find(g => g.id === stay.guestId);
    if (!guest) return;

    // Calculate Final Cost based on Actual time
    const checkInTime = new Date(stay.checkIn).getTime();
    const nowTime = Date.now();
    const daysStayed = Math.max(1, Math.ceil((nowTime - checkInTime) / (1000 * 60 * 60 * 24)));
    const totalCost = daysStayed * stay.ratePerNight;
    const debt = totalCost - stay.totalPaid;

    // Update Stay
    this.stays.update(stays => stays.map(s => {
      if (s.id === stayId) {
        return {
          ...s,
          status: 'Completed',
          checkOutActual: new Date().toISOString()
        };
      }
      return s;
    }));

    // Update Room to Dirty
    this.rooms.update(rooms => rooms.map(r => r.id === stay.roomId ? { ...r, status: 'Dirty' } : r));

    // Update Guest
    this.guests.update(guests => guests.map(g => {
      if (g.id === stay.guestId) {
        return {
          ...g,
          currentStayId: null,
          history: [...g.history, { ...stay, status: 'Completed', checkOutActual: new Date().toISOString() }]
        };
      }
      return g;
    }));

    // Generate Final Document
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

  // --- Maintenance Logic ---

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

    this.maintenanceRequests.update(curr => [newReq, ...curr]);
    this.updateRoomStatus(req.roomId, 'Maintenance');
    this.log('Maintenance', 'Request Created', `Issue reported in Room ${room.number}: ${req.description}`);

    return newReq;
  }

  updateMaintenanceRequest(id: string, updates: Partial<MaintenanceRequest>) {
    this.maintenanceRequests.update(reqs => reqs.map(r => r.id === id ? { ...r, ...updates } : r));

    const req = this.maintenanceRequests().find(r => r.id === id);
    if (req) {
      if (updates.status === 'Completed') {
        this.updateRoomStatus(req.roomId, 'Available');
        this.log('Maintenance', 'Issue Resolved', `Maintenance completed for Room ${req.roomNumber}. Total Cost: $${updates.cost || req.cost}`);
      } else {
        this.log('Maintenance', 'Update', `Request ${id.substring(0, 6)} updated.`);
      }
    }
  }

  // --- Document Center Logic ---
  uploadDocument(docData: Omit<StoredDocument, 'id' | 'uploadedAt'>): StoredDocument {
    const newDoc: StoredDocument = {
      ...docData,
      id: crypto.randomUUID(),
      uploadedAt: new Date().toISOString()
    };
    this.storedDocuments.update(docs => [newDoc, ...docs]);
    this.log('Document', 'Upload', `Document uploaded: ${newDoc.title}`);
    return newDoc;
  }

  updateDocument(id: string, updates: Partial<StoredDocument>) {
    this.storedDocuments.update(docs => docs.map(d => d.id === id ? { ...d, ...updates } : d));
    this.log('Document', 'Update', `Document AI analysis completed: ${id.substring(0, 6)}`);
  }

  deleteDocument(id: string) {
    const doc = this.storedDocuments().find(d => d.id === id);
    if (doc) {
      this.storedDocuments.update(docs => docs.filter(d => d.id !== id));
      this.log('Document', 'Delete', `Document deleted: ${doc.title}`);
    }
  }

  // --- Staff & Time Logic ---

  addStaff(staffData: Omit<Staff, 'id' | 'status' | 'currentStatus'>) {
    const newStaff: Staff = {
      ...staffData,
      id: crypto.randomUUID(),
      status: 'Active',
      currentStatus: 'Clocked Out'
    };
    this.staff.update(s => [...s, newStaff]);
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

    this.timeLogs.update(logs => [newLog, ...logs]);
    this.updateStaffStatus(staffId, 'Clocked In');
    this.log('Staff', 'Clock In', `${s.name} started shift.`);
  }

  clockOut(staffId: string) {
    const s = this.staff().find(u => u.id === staffId);
    if (!s || s.currentStatus === 'Clocked Out') return;

    // Find open log
    this.timeLogs.update(logs => logs.map(l => {
      if (l.staffId === staffId && l.status === 'Open') {
        const endTime = new Date().toISOString();
        // Close any open break implicitly
        const updatedBreaks = l.breaks.map(b => !b.end ? { ...b, end: endTime } : b);

        return {
          ...l,
          endTime,
          breaks: updatedBreaks,
          status: 'Closed',
          totalHours: this.calculateHours(l.startTime, endTime, updatedBreaks)
        };
      }
      return l;
    }));

    this.updateStaffStatus(staffId, 'Clocked Out');
    this.log('Staff', 'Clock Out', `${s.name} ended shift.`);
  }

  startBreak(staffId: string) {
    const s = this.staff().find(u => u.id === staffId);
    if (!s || s.currentStatus !== 'Clocked In') return;

    this.timeLogs.update(logs => logs.map(l => {
      if (l.staffId === staffId && l.status === 'Open') {
        return { ...l, breaks: [...l.breaks, { start: new Date().toISOString() }] };
      }
      return l;
    }));

    this.updateStaffStatus(staffId, 'On Break');
    this.log('Staff', 'Break Start', `${s.name} went on break.`);
  }

  endBreak(staffId: string) {
    const s = this.staff().find(u => u.id === staffId);
    if (!s || s.currentStatus !== 'On Break') return;

    this.timeLogs.update(logs => logs.map(l => {
      if (l.staffId === staffId && l.status === 'Open') {
        const updatedBreaks = l.breaks.map(b => !b.end ? { ...b, end: new Date().toISOString() } : b);
        return { ...l, breaks: updatedBreaks };
      }
      return l;
    }));

    this.updateStaffStatus(staffId, 'Clocked In');
    this.log('Staff', 'Break End', `${s.name} returned from break.`);
  }

  updateTimeLog(updatedLog: TimeLog) {
    // Recalculate hours if edited manually
    if (updatedLog.endTime) {
      updatedLog.totalHours = this.calculateHours(updatedLog.startTime, updatedLog.endTime, updatedLog.breaks);
    }
    this.timeLogs.update(logs => logs.map(l => l.id === updatedLog.id ? updatedLog : l));
    this.log('Staff', 'Log Edit', `Time log updated manually for ${updatedLog.staffName}`);
  }

  // --- Schedule/Shift Logic ---
  addShift(shift: Omit<Shift, 'id'>) {
    const newShift: Shift = { ...shift, id: crypto.randomUUID() };
    this.shifts.update(s => [...s, newShift]);
    this.log('Staff', 'Shift Added', `Shift scheduled for staff ${shift.staffId} on ${shift.date}`);
  }

  deleteShift(shiftId: string) {
    this.shifts.update(s => s.filter(shift => shift.id !== shiftId));
  }

  private updateStaffStatus(staffId: string, status: Staff['currentStatus']) {
    this.staff.update(list => list.map(s => s.id === staffId ? { ...s, currentStatus: status } : s));
  }

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
}