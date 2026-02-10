import { Injectable, signal, computed, effect, inject, Signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../environment';
import { Observable, of, from } from 'rxjs';
import { AiService } from './ai.service';
import { switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

// Interfaces remain largely the same, but adapted slightly if needed
// Interfaces mapped to supabase/schema.json
export interface Room {
  id: string; // bigint in DB, string in App
  hotelId: string; // property_id
  roomNumber: string; // room_number
  roomTypeId: string; // room_type_id
  status: string; // status
  // Joined fields
  roomType?: string; // from room_types.name
  dailyRate?: number; // from room_types.base_price
  capacity?: number; // from room_types.occupancy_adults
}

export interface Guest {
  id: string;
  hotelId: string; // property_id
  firstName: string; // first_name
  lastName: string; // last_name
  email: string; // email
  phone: string; // phone
  isVip: boolean; // is_vip
  // Computed/Joined
  name?: string; // firstName + lastName
  currentStayId?: string | null;
  history?: any[]; // not in guest table directly
  notes?: string; // not in guest table in JSON?
}

export interface Stay { // Maps to 'bookings' table
  id: string;
  hotelId: string; // property_id
  guestId: string; // guest_id
  roomId?: string; // joined from booking_rooms? or just not in booking table directly?
  // In JSON schema, 'booking_rooms' links bookings to rooms. 'bookings' has no room_id.
  // We will need to join booking_rooms.
  checkInDate: string; // check_in_date
  checkOutDate: string; // check_out_date
  status: 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled' | 'Active' | 'Reserved' | 'Completed'; // booking status
  totalPaid: number; // total_amount? or calculated from folios?
  isIndefinite?: boolean;

  // Frontend compat
  checkIn?: string;
  checkOutProjected?: string;
  ratePerNight?: number;
}

export interface LogEntry {
  id: string;
  hotelId: string;
  timestamp: string; // created_at
  action: string;
  user_id?: string; // user_id
  table_name?: string; // table_name
  details: string; // old_values/new_values?
  category?: string; // Compat
  user?: string; // Compat
}

export interface FinancialDocument { // Maps to 'folios' or 'invoices' (not in JSON?)
  // JSON has 'folios'. 
  id: string;
  hotelId: string;
  status?: string;
  // ... adapt as needed
  items?: any[];
  totalAmount?: number;
  guestName?: string;
  guestId?: string;
  stayId?: string;
  type?: 'Invoice' | 'Receipt';
  number?: string;
  date?: string;
  notes?: string;
}

export interface Staff { // Maps to 'users' with role
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role?: string;
  status?: string;
  pin?: string;
}

// ... other interfaces as needed

// Simple Query Interface to match previous Inject patterns
export interface QueryResult<T> {
  data: Signal<T | undefined>;
  isLoading: Signal<boolean>;
  error: Signal<any>;
  refetch: () => Promise<void>;
  isFetching: Signal<boolean>; // Added for compatibility
}

export interface HotelConfig {
  id?: string;
  organizationId?: string;
  name: string;
  address: string;
  email: string;
  phone: string;
  demoMode: boolean;
  maintenanceEmail: string;
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
  reportedAt: string;
  completedAt?: string;
  cost: number;
  notes?: string;
}

export interface StoredDocument {
  id: string;
  hotelId: string;
  title: string;
  category: string;
  uploadedBy: string;
  uploadedAt: string;
  fileType: string;
  data: string;
  tags: string[];
  guestId?: string;
  summary?: string;
}

export interface TimeLog {
  id: string;
  hotelId: string;
  staffId: string;
  staffName: string;
  date: string;
  startTime: string;
  endTime?: string | null;
  totalHours: number;
  status: 'Open' | 'Closed';
}

export interface Shift {
  id: string;
  hotelId: string;
  staffId: string;
  date: string;
  startTime: string;
  endTime: string;
  type: 'Regular' | 'Overtime' | 'TimeOff';
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  ai = inject(AiService);
  auth = inject(AuthService);

  private supabase: SupabaseClient = createClient(environment.supabaseUrl, environment.supabasePublishableKey);

  // User Profile
  userProfile = signal<any>(null);

  // Multi-property selection
  selectedHotelId = signal<string | null>(null);

  currentHotelId = computed(() => {
    if (this.selectedHotelId()) return this.selectedHotelId();
    const profile = this.userProfile();
    if (profile?.role === 'SuperAdmin') return null;
    if (profile?.property_id) return profile.property_id;
    return undefined;
  });

  // Network Status
  isOnline = signal(navigator.onLine);
  connectionStatus = computed(() => {
    if (!this.isOnline()) return 'Offline';
    if (this.roomsQuery.error()) return 'Error';
    return 'Connected';
  });

  private setupNetworkListeners() {
    window.addEventListener('online', () => this.isOnline.set(true));
    window.addEventListener('offline', () => this.isOnline.set(false));
  }

  currentHotelQuery = injectQuery(() => ({
    queryKey: ['hotel', this.currentHotelId()],
    queryFn: async () => {
      const hid = this.currentHotelId();
      if (!hid) return { hotel: null };
      const { data, error } = await this.supabase.from('properties').select('*').eq('id', hid).single();
      if (error) throw error;
      return {
        hotel: {
          id: data.id,
          organizationId: data.organization_id, // Ensure snake_case matches DB result if untyped
          name: data.name,
          address: data.location || '',
          email: '',
          phoneNumber: '',
          maintenanceEmail: '',
          demoMode: false
        }
      };
    },
    enabled: !!this.currentHotelId()
  }));

  timeLogsQuery = { data: signal({ timeLogs: [] }), isLoading: signal(false), error: signal(null), refetch: async () => { } };

  // --- QUERIES ---

  roomTypesQuery = injectQuery(() => ({
    queryKey: ['roomTypes', this.currentHotelId()],
    queryFn: async () => {
      const { data, error } = await this.supabase.from('room_types').select('*').eq('property_id', this.currentHotelId());
      if (error) throw error;
      return { roomTypes: data || [] };
    },
    enabled: !!this.currentHotelId()
  }));

  roomsQuery = injectQuery(() => ({
    queryKey: ['rooms', this.currentHotelId()],
    queryFn: async () => {
      const { data, error } = await this.supabase
        .from('rooms')
        .select(`*, room_types ( name, price_per_night, max_occupancy )`)
        .eq('property_id', this.currentHotelId());
      if (error) throw error;
      return {
        rooms: (data || []).map((r: any) => ({
          id: r.id,
          hotelId: r.property_id,
          roomNumber: r.room_number || r.number,
          roomTypeId: r.room_type_id,
          status: r.status,
          roomType: r.room_types?.name,
          dailyRate: r.room_types?.price_per_night,
          capacity: r.room_types?.max_occupancy || 2
        }))
      };
    },
    enabled: !!this.currentHotelId()
  }));

  guestsQuery = injectQuery(() => ({
    queryKey: ['guests', this.currentHotelId()],
    queryFn: async () => {
      const { data, error } = await this.supabase.from('guests').select('*').eq('property_id', this.currentHotelId());
      if (error) throw error;
      return { guests: (data || []).map((g: any) => ({ ...g, firstName: g.first_name, lastName: g.last_name, isVip: g.vip_status })) };
    },
    enabled: !!this.currentHotelId()
  }));

  bookingsQuery = injectQuery(() => ({
    queryKey: ['bookings', this.currentHotelId()],
    queryFn: async () => {
      const { data, error } = await this.supabase
        .from('reservations')
        .select(`*, guest:guests(first_name, last_name, id), room:rooms(id, room_number)`)
        .eq('property_id', this.currentHotelId());
      if (error) throw error;
      return {
        bookings: (data || []).map((b: any) => ({
          id: b.id,
          guestId: b.guest_id,
          roomId: b.room_id,
          checkInDate: b.check_in,
          checkOutDate: b.check_out,
          status: b.status,
          totalPaid: b.total_amount,
          isIndefinite: b.is_indefinite
        }))
      };
    },
    enabled: !!this.currentHotelId()
  }));

  logsQuery = injectQuery(() => ({
    queryKey: ['audit-logs', this.hotelConfig()?.organizationId],
    queryFn: async () => {
      const { data, error } = await this.supabase
        .from('system_logs')
        .select('*')
        .eq('property_id', this.currentHotelId())
        .order('created_at', { ascending: false })
        .limit(100);
      if (error) throw error;
      return { logs: data || [] };
    },
    enabled: !!this.currentHotelId()
  }));

  financialDocsQuery = injectQuery(() => ({
    queryKey: ['invoices', this.currentHotelId()],
    queryFn: async () => {
      const { data, error } = await this.supabase.from('invoices').select('*').eq('property_id', this.currentHotelId());
      if (error) throw error;
      return { financialDocuments: data || [] };
    },
    enabled: !!this.currentHotelId()
  }));

  staffQuery = { data: signal({ staffs: [] }), isLoading: signal(false), error: signal(null), refetch: async () => { } };
  maintenanceQuery = { data: signal({ maintenanceRequests: [] }), isLoading: signal(false), error: signal(null), refetch: async () => { } };
  shiftsQuery = { data: signal({ shifts: [] }), isLoading: signal(false), error: signal(null), refetch: async () => { } };
  housekeepingQuery = { data: signal({ housekeepingTasks: [] }), isLoading: signal(false), error: signal(null), refetch: async () => { } };
  inventoryQuery = { data: signal({ inventoryItems: [] }), isLoading: signal(false), error: signal(null), refetch: async () => { } };
  amenitiesQuery = { data: signal({ amenities: [] }), isLoading: signal(false), error: signal(null), refetch: async () => { } };
  storedDocumentsQuery = { data: signal({ storedDocuments: [] }), isLoading: signal(false), error: signal(null), refetch: async () => { } };
  aiUsageQuery = { data: signal({ aiUsage: [] }), isLoading: signal(false), error: signal(null), refetch: async () => { } };

  getUserByEmailQuery = { data: signal(null), isLoading: signal(false), error: signal(null), refetch: async () => { } };




  // --- MUTATIONS ---
  // To replace injectCreate... we expose methods directly or objects with mutate/mutateAsync

  createRoomMut = {
    mutateAsync: async (vars: any) => {
      // room_types needs to exist first?
      const { error } = await this.supabase.from('rooms').insert({
        property_id: vars.hotelId,
        room_number: vars.roomNumber,
        status: vars.status,
        room_type_id: vars.roomTypeId // Required
      });
      if (error) throw error;
      this.roomsQuery.refetch();
      return { data: { room_insert: { id: 'new' } } };
    }
  };

  updateRoomStatusMut = {
    mutateAsync: async (vars: any) => {
      const { error } = await this.supabase.from('rooms').update({ status: vars.status }).eq('id', vars.id);
      if (error) throw error;
      this.roomsQuery.refetch();
    }
  };

  // Stubs for other mutations to prevent compile errors
  createHotelMut = { mutateAsync: async (v: any) => ({ data: { hotel_insert: { id: 'new-hotel-id' } } }) };
  updateHotelConfigMut = { mutateAsync: async (v: any) => { } };
  deleteHotelMut = { mutateAsync: async (v: any) => { } };
  upsertUserMut = { mutateAsync: async (v: any) => { } };
  linkUserToHotelMut = { mutateAsync: async (v: any) => { } };
  createGuestMut = {
    mutateAsync: async (v: any) => {
      const { error } = await this.supabase.from('guests').insert({
        property_id: v.hotelId,
        first_name: v.first_name,
        last_name: v.last_name,
        email: v.email,
        phone: v.phone || v.phoneNumber,
        is_vip: v.is_vip,
        // notes: v.notes // Removed: Not in sqltableScheme
      });
      if (error) throw error;
      this.guestsQuery.refetch();
    }
  };

  updateGuestMut = {
    mutateAsync: async (v: any) => {
      const { error } = await this.supabase.from('guests').update({
        first_name: v.firstName,
        last_name: v.lastName,
        email: v.email,
        phone: v.phone || v.phoneNumber,
        is_vip: v.isVip,
        // notes: v.notes // Removed: Not in sqltableScheme
      }).eq('id', v.id);
      if (error) throw error;
      this.guestsQuery.refetch();
    }
  };

  deleteGuestMut = {
    mutateAsync: async (v: string) => {
      const { error } = await this.supabase.from('guests').delete().eq('id', v);
      if (error) throw error;
      this.guestsQuery.refetch();
    }
  };

  createBookingMut = {
    mutateAsync: async (v: any) => {
      const dbStatus = v.status === 'Reserved' ? 'confirmed'
        : v.status === 'Active' ? 'checked_in'
          : v.status === 'Completed' ? 'checked_out'
            : v.status === 'Cancelled' ? 'cancelled'
              : v.status || 'confirmed';

      const { data, error } = await this.supabase.from('reservations').insert({
        property_id: v.hotelId,
        guest_id: v.guestId,
        room_id: v.roomId,
        check_in: v.checkInDate,
        check_out: v.checkOutDate,
        status: dbStatus,
        total_amount: v.totalPaid || 0
      }).select().single();

      if (error) throw error;
      // booking_rooms table does not exist in current schema, room_id is on reservations table
      this.bookingsQuery.refetch();
      this.roomsQuery.refetch();
    }
  };

  updateBookingMut = {
    mutateAsync: async (v: any) => {
      const updatePayload: any = {};
      if (v.status) {
        updatePayload.status = v.status === 'Reserved' ? 'confirmed'
          : v.status === 'Active' ? 'checked_in'
            : v.status === 'Completed' ? 'checked_out'
              : v.status === 'Cancelled' ? 'cancelled'
                : v.status;
      }
      if (v.bookingStatus) { // distinct form status in checkIn/Out
        const s = v.bookingStatus;
        updatePayload.status = s === 'Reserved' ? 'confirmed'
          : s === 'Active' ? 'checked_in'
            : s === 'Completed' ? 'checked_out'
              : s === 'Cancelled' ? 'cancelled'
                : s;
      }

      if (v.checkInDate) updatePayload.check_in = v.checkInDate;
      if (v.checkOutDate) updatePayload.check_out = v.checkOutDate;
      if (v.totalPaid !== undefined) updatePayload.total_amount = v.totalPaid;

      if (Object.keys(updatePayload).length > 0) {
        const { error } = await this.supabase.from('reservations').update(updatePayload).eq('id', v.id);
        if (error) throw error;
      }
      this.bookingsQuery.refetch();
    }
  };
  createLogMut = { mutate: (v: any) => { } };
  createStaffMut = { mutateAsync: async (v: any) => { this.staffQuery.refetch(); } };
  updateStaffMut = { mutateAsync: async (v: any) => { this.staffQuery.refetch(); } };
  createTimeLogMut = { mutateAsync: async (v: any) => { } };
  updateTimeLogMut = { mutateAsync: async (v: any) => { } };
  createFinancialDocMut = { mutateAsync: async (v: any) => { } };
  createMaintenanceMut = { mutateAsync: async (v: any) => { this.maintenanceQuery.refetch(); } };
  createShiftMut = { mutateAsync: async (v: any) => { } };
  createHousekeepingMut = { mutateAsync: async (v: any) => { } };
  upsertInventoryMut = { mutateAsync: async (v: any) => { } };
  createAmenityMut = { mutateAsync: async (v: any) => { } };
  createStoredDocMut = { mutateAsync: async (v: any) => { } };
  logAiUsageMut = { mutateAsync: async (v: any) => { } };

  // Queries used in constructor or elsewhere
  firstHotelQuery = { data: signal(null), isFetching: signal(false), isLoading: signal(false) };
  allHotelsQuery = { data: signal(null), isFetching: signal(false), isLoading: signal(false), refetch: async () => { } };
  hotelsByUserQuery = { data: signal(null), isFetching: signal(false), isLoading: signal(false), refetch: async () => { } };


  constructor() {
    this.setupNetworkListeners();

    effect(() => {
      const uid = this.auth.currentUser()?.id;
      if (uid) {
        this.fetchUserProfile(uid);
      }
    });

    // Listen for AI usage and log to database
    this.ai.usage$.subscribe(u => {
      this.logAiUsage(u.feature, u.model, u.promptTokens, u.responseTokens);
    });
  }

  async fetchUserProfile(uid: string) {
    const { data } = await this.supabase.from('users').select('*').eq('id', uid).single();
    if (data) {
      this.userProfile.set({
        ...data,
        role: data.is_super_admin ? 'SuperAdmin' : 'Staff' // Map role from is_super_admin
      });
    }
  }

  async ensureUserExists(uid: string, email: string, role: string) {
    // Upsert user in Supabase
    await this.supabase.from('users').upsert({ id: uid, email, first_name: 'Unknown', last_name: 'User' }).select();
  }

  async linkHotelToUser(hotelId: string) {
    // Need to insert into 'organization_members' or 'user_roles'?
    // Ignoring for now to focus on core data
    return true;
  }

  // --- SIGNALS for Components ---
  // Using the data from the queries to populate the view models

  rooms = computed(() => this.roomsQuery.data()?.rooms || []);
  roomsLoading = computed(() => this.roomsQuery.isLoading());

  guests = computed(() => {
    const data = this.guestsQuery.data()?.guests || [];
    return data.map(g => ({
      id: g.id,
      hotelId: this.currentHotelId()!,
      firstName: g.firstName,
      lastName: g.lastName,
      name: g.name,
      email: g.email,
      phone: g.phone,
      phoneNumber: g.phoneNumber,
      isVip: g.isVip,
      notes: g.notes,
      history: []
    } as Guest));
  });

  stays = computed(() => {
    const data = this.bookingsQuery.data()?.bookings || [];
    return data.map(b => ({
      id: b.id,
      hotelId: this.currentHotelId()!,
      guestId: b.guestId,
      roomId: b.roomId,
      checkInDate: b.checkInDate,
      checkOutDate: b.checkOutDate,
      // Compat fields
      checkIn: b.checkInDate,
      checkOutProjected: b.checkOutDate,
      totalPaid: b.totalPaid,
      status: b.status as any,
      ratePerNight: 0, // TODO calculate
      isIndefinite: b.isIndefinite
    } as Stay));
  });

  logs = computed(() => this.logsQuery.data()?.logs || []);
  documents = computed(() => this.financialDocsQuery.data()?.financialDocuments || []);
  staff = computed(() => this.staffQuery.data()?.staffs || []);
  timeLogs = computed(() => []); // Missing
  shifts = computed(() => []); // Missing
  maintenanceRequests = computed(() => this.maintenanceQuery.data()?.maintenanceRequests || []);
  storedDocuments = computed(() => this.storedDocumentsQuery.data()?.storedDocuments || []);
  housekeepingTasks = computed(() => this.housekeepingQuery.data()?.housekeepingTasks || []);
  inventory = computed(() => this.inventoryQuery.data()?.inventoryItems || []);
  amenities = computed(() => this.amenitiesQuery.data()?.amenities || []);

  hotelConfig = computed(() => {
    const data = this.currentHotelQuery.data()?.hotel;
    return {
      id: data?.id,
      // organizationId: data?.organizationId, // Not in properties table
      name: data?.name || 'StaySyncOS Hotel',
      address: data?.address || '',
      email: data?.email || '',
      phone: data?.phoneNumber || '',
      demoMode: data?.demoMode || false,
      maintenanceEmail: data?.maintenanceEmail || ''
    } as HotelConfig;
  });

  log(category: string, action: string, details: string) {
    const hotelId = this.currentHotelId();
    if (!hotelId) return;

    this.supabase.from('system_logs').insert({
      property_id: hotelId,
      type: category,
      event: action,
      details: details
      // user_id?
    }).then(res => {
      //
    });
  }

  async logAiUsage(feature: string, model: string, promptTokens: number, responseTokens: number) {
    const hotelId = this.currentHotelId();
    if (!hotelId) return;
    // Table ai_usage_logs does not exist in schema
    // this.supabase.from('ai_usage_logs').insert({ ... });
    // AI usage logging disabled as table does not exist
  }

  // Legacy methods (kept for compatibility)
  async addRoom(room: any) {
    let typeId = room.roomTypeId;
    // If no ID but has name, lookup or create
    if (!typeId && room.roomType) {
      const types = this.roomTypesQuery.data()?.roomTypes || [];
      const match = types.find((t: any) => t.name === room.roomType);
      if (match) {
        typeId = match.id;
      } else {
        // Create default type if missing
        const { data, error } = await this.supabase.from('room_types').insert({
          property_id: this.currentHotelId(),
          name: room.roomType,
          price_per_night: room.dailyRate || 100,
          max_occupancy: room.capacity || 2
        }).select().single();
        if (data) typeId = data.id;
      }
    }

    await this.createRoomMut.mutateAsync({
      hotelId: this.currentHotelId(),
      ...room,
      roomTypeId: typeId
    });
  }

  async updateRoomStatus(roomId: string, status: string) {
    await this.updateRoomStatusMut.mutateAsync({ id: roomId, status });
  }



  async createHotelForUser(name: string, address: string, propertyId: string) {
    // Stub
    return "id";
  }

  private async seedRooms(hotelId: string) {
    // Implement simple seed if needed
  }

  private seedStaff(hotelId: string) { }

  async updateHotelDetails(details: any) {
    // Stub
  }

  async deleteHotel(id: string) {
    // Stub
  }

  async enableDemoModeForAll() {
    // Stub
  }

  async linkUserByEmail(email: string, role: string, name: string, pin: string) {
    // Stub
    return "dummy-id";
  }

  async addGuest(guest: any) {
    const nameParts = (guest.name || '').split(' ');
    const firstName = guest.firstName || nameParts[0] || 'Unknown';
    const lastName = guest.lastName || nameParts.slice(1).join(' ') || 'Guest';

    await this.createGuestMut.mutateAsync({
      hotelId: this.currentHotelId(),
      first_name: firstName,
      last_name: lastName,
      ...guest
    });
  }

  async updateGuest(guest: any) {
    await this.updateGuestMut.mutateAsync({
      firstName: guest.firstName,
      lastName: guest.lastName,
      ...guest
    });
  }

  async addRoomsBulk(rooms: any[]) {
    const cleanRooms = rooms.map(r => ({
      property_id: this.currentHotelId(),
      organization_id: this.hotelConfig().organizationId,
      room_number: r.roomNumber,
      room_type_id: r.roomTypeId, // Ensure caller passes this
      status: 'Available'
    }));

    // Note: If roomTypeId is missing, we might need to look it up, but for now assuming caller fixes it
    const { error } = await this.supabase.from('rooms').insert(cleanRooms);
    if (error) throw error;
    this.roomsQuery.refetch();
  }

  getExportData() {
    return JSON.stringify({
      rooms: this.rooms(),
      guests: this.guests(),
      bookings: this.stays(),
      hotel: this.hotelConfig()
    }, null, 2);
  }

  importData(json: string): boolean {
    try {
      const data = JSON.parse(json);
      console.log('Importing data (mock implementation):', data);
      // Real import would likely need to clear tables and re-insert, which is risky.
      // For now, we'll just log and return true to satisfy the UI.
      alert('Import logic not fully implemented for SQL backend safety.');
      return true;
    } catch (e) {
      console.error('Import failed', e);
      return false;
    }
  }

  async factoryReset(enableDemo: boolean) {
    // Stub
    console.log('Factory Reset / Demo Mode:', enableDemo);
  }

  // --- Staff Time Tracking ---
  async clockIn(staffId: string) {
    // Stub
    console.log('Clock In', staffId);
  }

  async clockOut(staffId: string) {
    // Stub
    console.log('Clock Out', staffId);
  }

  async startBreak(staffId: string) {
    console.log('Start Break', staffId);
  }

  async endBreak(staffId: string) {
    console.log('End Break', staffId);
  }

  async addShift(shift: any) {
    console.log('Add Shift', shift);
  }

  async deleteShift(id: string) {
    console.log('Delete Shift', id);
  }

  async updateTimeLog(log: any) {
    console.log('Update Time Log', log);
  }

  async deleteGuest(guestId: string) {
    await this.deleteGuestMut.mutateAsync(guestId);
  }

  async createStay(stay: any) {
    await this.createBookingMut.mutateAsync({
      hotelId: this.currentHotelId(),
      ...stay,
      status: stay.status || 'Reserved',
    });
  }

  async bookStay(guest: any, roomId: string, checkIn: string, checkOut?: string) {
    await this.createBookingMut.mutateAsync({
      hotelId: this.currentHotelId(),
      guestId: guest.id,
      roomId: roomId,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      status: 'Reserved',
      isIndefinite: !checkOut
    });
  }

  async updateStay(stay: any) {
    await this.updateBookingMut.mutateAsync(stay);
  }

  async checkIn(stayId: string) {
    const stay = this.stays().find(s => s.id === stayId);
    if (stay) {
      await this.updateBookingMut.mutateAsync({ ...stay, bookingStatus: 'Active', checkInDate: new Date().toISOString() });
    }
  }

  async checkOut(stayId: string) {
    const stay = this.stays().find(s => s.id === stayId);
    if (stay) {
      await this.updateBookingMut.mutateAsync({ ...stay, bookingStatus: 'Completed', checkOutActual: new Date().toISOString() });
    }
  }

  async cancelStay(stayId: string) {
    const stay = this.stays().find(s => s.id === stayId);
    if (stay) {
      await this.updateBookingMut.mutateAsync({ ...stay, bookingStatus: 'Cancelled' });
    }
  }

  async makePayment(stayId: string, amount: number) {
    const stay = this.stays().find(s => s.id === stayId);
    if (!stay) return;

    await this.updateBookingMut.mutateAsync({
      ...stay,
      totalPaid: (stay.totalPaid || 0) + amount
    });

    const doc: FinancialDocument = {
      id: 'new-receipt-' + Date.now(),
      hotelId: this.currentHotelId()!,
      stayId: stayId,
      status: 'Issued',
      guestId: stay.guestId,
      type: 'Invoice',
      number: 'RCPT-' + Date.now().toString().slice(-6),
      date: new Date().toISOString(),
      totalAmount: amount,
      guestName: 'Guest',
      items: [{ description: 'Payment Received', quantity: 1, unitPrice: amount, total: amount }]
    } as any;

    return doc;
  }















  async addStaff(staff: any) {
    // Stub
  }

  activeStaysWithDebt = computed(() => {
    return this.stays()
      .map(stay => {
        const checkIn = new Date(stay.checkIn);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - checkIn.getTime());
        const daysStayed = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
        const totalCostSoFar = daysStayed * stay.ratePerNight;
        const debt = totalCostSoFar - stay.totalPaid;

        return {
          stay,
          guest: this.guests().find(g => g.id === stay.guestId),
          room: this.rooms().find(r => r.id === stay.roomId),
          daysStayed,
          totalCostSoFar,
          debt
        };
      })
      .filter(item => item.debt > 0);
  });

  stats = computed(() => {
    const available = this.rooms().filter(r => r.status === 'Clean').length;
    const maintenance = this.maintenanceRequests().filter(m => m.status !== 'Completed').length;
    const occupied = this.stays().filter(s => s.status === 'Active').length;
    const reserved = this.stays().filter(s => s.status === 'Reserved').length;
    const totalRooms = this.rooms().length;
    const occupancyRate = totalRooms > 0 ? Math.round((occupied / totalRooms) * 100) : 0;

    return { available, maintenance, occupied, reserved, occupancyRate };
  });

  async uploadDocument(docArgs: any) {
    // Stub: in real app, upload to Supabase Storage
    // content is in docArgs.data (base64) or docArgs.file
    console.log('Uploading', docArgs.title, docArgs.category);
    return { id: 'new-doc', url: '' };
  }

  async deleteDocument(id: string) {
    // Stub
    console.log('Deleting doc', id);
    this.financialDocsQuery.refetch();
  }

  async addMaintenanceRequest(req: any) {
    await this.createMaintenanceMut.mutateAsync({
      hotelId: this.currentHotelId(),
      ...req
    });
  }

  async updateMaintenanceRequest(id: string, updates: any) {
    // Stub
  }
}

// --- InjectQuery Implementation ---
export function injectQuery<T>(optionsFn: () => { queryKey: any[], queryFn: () => Promise<T>, enabled?: boolean }) {
  const data = signal<T | undefined>(undefined);
  const isLoading = signal(false);
  const error = signal<any>(null);
  const isFetching = signal(false);

  // Store options in a computed to track dependencies AND refetch when they change
  const optionsSignal = computed(() => optionsFn());

  const refetch = async () => {
    const opts = optionsFn(); // Get latest options
    if (opts.enabled === false) return;
    isLoading.set(true);
    isFetching.set(true);
    try {
      const res = await opts.queryFn();
      data.set(res);
      error.set(null);
    } catch (e) {
      console.error('Query Error:', e);
      error.set(e);
    } finally {
      isLoading.set(false);
      isFetching.set(false);
    }
  };

  effect(() => {
    const opts = optionsSignal(); // Dependency tracking
    if (opts.enabled !== false) {
      refetch();
    }
  }, { allowSignalWrites: true });

  return { data, isLoading, error, refetch, isFetching };
}