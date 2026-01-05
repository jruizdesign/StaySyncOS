import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface Amenity_Key {
  id: UUIDString;
  __typename?: 'Amenity_Key';
}

export interface Booking_Key {
  id: UUIDString;
  __typename?: 'Booking_Key';
}

export interface CreateBookingDcData {
  booking_insert: Booking_Key;
}

export interface CreateBookingDcVariables {
  hotelId: UUIDString;
  guestId: UUIDString;
  roomId?: UUIDString | null;
  checkInDate: TimestampString;
  checkOutDate: TimestampString;
  bookingStatus: string;
  ratePerNight?: number | null;
  totalPaid?: number | null;
  isIndefinite?: boolean | null;
}

export interface CreateFinancialDocumentDcData {
  financialDocument_insert: FinancialDocument_Key;
}

export interface CreateFinancialDocumentDcVariables {
  hotelId: UUIDString;
  docType: string;
  number: string;
  date: TimestampString;
  guestId?: UUIDString | null;
  guestName: string;
  totalAmount: number;
  notes?: string | null;
  items?: unknown | null;
  bookingId?: UUIDString | null;
}

export interface CreateGuestDcData {
  guest_insert: Guest_Key;
}

export interface CreateGuestDcVariables {
  hotelId: UUIDString;
  name: string;
  email: string;
  phoneNumber?: string | null;
  address?: string | null;
  notes?: string | null;
}

export interface CreateHotelData {
  hotel_insert: Hotel_Key;
}

export interface CreateHotelVariables {
  name: string;
  address: string;
  propertyId: string;
}

export interface CreateLogDcData {
  log_insert: Log_Key;
}

export interface CreateLogDcVariables {
  hotelId: UUIDString;
  action: string;
  user: string;
  category: string;
  details: string;
}

export interface CreateRoomData {
  room_insert: Room_Key;
}

export interface CreateRoomVariables {
  hotelId: UUIDString;
  roomNumber: string;
  roomType: string;
  status: string;
  dailyRate: number;
  capacity?: number | null;
}

export interface CreateStaffDcData {
  staff_insert: Staff_Key;
}

export interface CreateStaffDcVariables {
  hotelId: UUIDString;
  firstName: string;
  lastName: string;
  role: string;
  status: string;
  currentStatus: string;
  pin?: string | null;
}

export interface CreateTimeLogDcData {
  timeLog_insert: TimeLog_Key;
}

export interface CreateTimeLogDcVariables {
  hotelId: UUIDString;
  staffId: UUIDString;
  date: DateString;
  startTime: TimestampString;
  status: string;
}

export interface DeleteGuestDcData {
  guest_delete?: Guest_Key | null;
}

export interface DeleteGuestDcVariables {
  id: UUIDString;
}

export interface Department_Key {
  id: UUIDString;
  __typename?: 'Department_Key';
}

export interface FinancialDocument_Key {
  id: UUIDString;
  __typename?: 'FinancialDocument_Key';
}

export interface GetFirstHotelData {
  hotels: ({
    id: UUIDString;
    name: string;
  } & Hotel_Key)[];
}

export interface GetHotelByIdData {
  hotel?: {
    id: UUIDString;
    name: string;
    address: string;
    propertyId: string;
    email?: string | null;
    phoneNumber?: string | null;
    demoMode?: boolean | null;
    maintenanceEmail?: string | null;
  } & Hotel_Key;
}

export interface GetHotelByIdVariables {
  id: UUIDString;
}

export interface Guest_Key {
  id: UUIDString;
  __typename?: 'Guest_Key';
}

export interface Hotel_Key {
  id: UUIDString;
  __typename?: 'Hotel_Key';
}

export interface HousekeepingTask_Key {
  id: UUIDString;
  __typename?: 'HousekeepingTask_Key';
}

export interface InventoryItem_Key {
  id: UUIDString;
  __typename?: 'InventoryItem_Key';
}

export interface LinkUserToHotelData {
  userHotel_insert: UserHotel_Key;
}

export interface LinkUserToHotelVariables {
  userId: string;
  hotelId: UUIDString;
}

export interface ListAllHotelsData {
  hotels: ({
    id: UUIDString;
    name: string;
    address: string;
    propertyId: string;
  } & Hotel_Key)[];
}

export interface ListAvailableRoomsData {
  rooms: ({
    id: UUIDString;
    roomNumber: string;
    roomType: string;
    status: string;
    dailyRate?: number | null;
    capacity?: number | null;
    hotel: {
      id: UUIDString;
      name: string;
    } & Hotel_Key;
  } & Room_Key)[];
}

export interface ListAvailableRoomsVariables {
  hotelId: UUIDString;
}

export interface ListBookingsData {
  bookings: ({
    id: UUIDString;
    checkInDate: TimestampString;
    checkOutDate: TimestampString;
    checkOutActual?: TimestampString | null;
    bookingStatus: string;
    specialRequests?: string | null;
    numberOfGuests?: number | null;
    ratePerNight?: number | null;
    totalPaid?: number | null;
    isIndefinite?: boolean | null;
    guest: {
      id: UUIDString;
      name: string;
    } & Guest_Key;
      room?: {
        id: UUIDString;
        roomNumber: string;
      } & Room_Key;
  } & Booking_Key)[];
}

export interface ListBookingsVariables {
  hotelId: UUIDString;
}

export interface ListFinancialDocumentsData {
  financialDocuments: ({
    id: UUIDString;
    docType: string;
    number: string;
    date: TimestampString;
    totalAmount: number;
    notes?: string | null;
    summary?: string | null;
    items?: unknown | null;
    guest?: {
      id: UUIDString;
      name: string;
    } & Guest_Key;
      booking?: {
        id: UUIDString;
      } & Booking_Key;
  } & FinancialDocument_Key)[];
}

export interface ListFinancialDocumentsVariables {
  hotelId: UUIDString;
}

export interface ListGuestsData {
  guests: ({
    id: UUIDString;
    name: string;
    email: string;
    phoneNumber?: string | null;
    address?: string | null;
    notes?: string | null;
    history?: unknown | null;
  } & Guest_Key)[];
}

export interface ListGuestsVariables {
  hotelId: UUIDString;
}

export interface ListHotelsByUserData {
  user?: {
    userHotels_on_user: ({
      hotel: {
        id: UUIDString;
        name: string;
        address: string;
        propertyId: string;
        demoMode?: boolean | null;
      } & Hotel_Key;
    })[];
  };
}

export interface ListHotelsByUserVariables {
  userId: string;
}

export interface ListLogsData {
  logs: ({
    id: UUIDString;
    timestamp: TimestampString;
    action: string;
    user: string;
    category: string;
    details: string;
  } & Log_Key)[];
}

export interface ListLogsVariables {
  hotelId: UUIDString;
}

export interface ListStaffData {
  staffs: ({
    id: UUIDString;
    firstName: string;
    lastName: string;
    role: string;
    pin?: string | null;
    status: string;
    currentStatus: string;
  } & Staff_Key)[];
}

export interface ListStaffVariables {
  hotelId: UUIDString;
}

export interface ListTimeLogsData {
  timeLogs: ({
    id: UUIDString;
    date: DateString;
    startTime: TimestampString;
    endTime?: TimestampString | null;
    breaks?: unknown | null;
    totalHours?: number | null;
    status: string;
    staff: {
      id: UUIDString;
      firstName: string;
      lastName: string;
    } & Staff_Key;
  } & TimeLog_Key)[];
}

export interface ListTimeLogsVariables {
  hotelId: UUIDString;
}

export interface ListUsersDcData {
  users: ({
    id: string;
    email: string;
    role: string;
  } & User_Key)[];
}

export interface Log_Key {
  id: UUIDString;
  __typename?: 'Log_Key';
}

export interface MaintenanceRequest_Key {
  id: UUIDString;
  __typename?: 'MaintenanceRequest_Key';
}

export interface Room_Key {
  id: UUIDString;
  __typename?: 'Room_Key';
}

export interface Shift_Key {
  id: UUIDString;
  __typename?: 'Shift_Key';
}

export interface Staff_Key {
  id: UUIDString;
  __typename?: 'Staff_Key';
}

export interface StoredDocument_Key {
  id: UUIDString;
  __typename?: 'StoredDocument_Key';
}

export interface TimeLog_Key {
  id: UUIDString;
  __typename?: 'TimeLog_Key';
}

export interface UpdateBookingDcData {
  booking_update?: Booking_Key | null;
}

export interface UpdateBookingDcVariables {
  id: UUIDString;
  bookingStatus?: string | null;
  checkOutActual?: TimestampString | null;
  totalPaid?: number | null;
}

export interface UpdateGuestDcData {
  guest_update?: Guest_Key | null;
}

export interface UpdateGuestDcVariables {
  id: UUIDString;
  name?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  address?: string | null;
  notes?: string | null;
  history?: unknown | null;
}

export interface UpdateHotelConfigData {
  hotel_update?: Hotel_Key | null;
}

export interface UpdateHotelConfigVariables {
  id: UUIDString;
  name?: string | null;
  address?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  demoMode?: boolean | null;
  maintenanceEmail?: string | null;
}

export interface UpdateRoomStatusData {
  room_update?: Room_Key | null;
}

export interface UpdateRoomStatusVariables {
  id: UUIDString;
  status: string;
}

export interface UpdateStaffDcData {
  staff_update?: Staff_Key | null;
}

export interface UpdateStaffDcVariables {
  id: UUIDString;
  currentStatus?: string | null;
  status?: string | null;
}

export interface UpdateTimeLogDcData {
  timeLog_update?: TimeLog_Key | null;
}

export interface UpdateTimeLogDcVariables {
  id: UUIDString;
  endTime?: TimestampString | null;
  breaks?: unknown | null;
  totalHours?: number | null;
  status?: string | null;
}

export interface UpsertUserData {
  user_upsert: User_Key;
}

export interface UpsertUserVariables {
  id: string;
  email: string;
  role: string;
}

export interface UserHotel_Key {
  userId: string;
  hotelId: UUIDString;
  __typename?: 'UserHotel_Key';
}

export interface User_Key {
  id: string;
  __typename?: 'User_Key';
}

interface ListAvailableRoomsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListAvailableRoomsVariables): QueryRef<ListAvailableRoomsData, ListAvailableRoomsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListAvailableRoomsVariables): QueryRef<ListAvailableRoomsData, ListAvailableRoomsVariables>;
  operationName: string;
}
export const listAvailableRoomsRef: ListAvailableRoomsRef;

export function listAvailableRooms(vars: ListAvailableRoomsVariables): QueryPromise<ListAvailableRoomsData, ListAvailableRoomsVariables>;
export function listAvailableRooms(dc: DataConnect, vars: ListAvailableRoomsVariables): QueryPromise<ListAvailableRoomsData, ListAvailableRoomsVariables>;

interface CreateRoomRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateRoomVariables): MutationRef<CreateRoomData, CreateRoomVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateRoomVariables): MutationRef<CreateRoomData, CreateRoomVariables>;
  operationName: string;
}
export const createRoomRef: CreateRoomRef;

export function createRoom(vars: CreateRoomVariables): MutationPromise<CreateRoomData, CreateRoomVariables>;
export function createRoom(dc: DataConnect, vars: CreateRoomVariables): MutationPromise<CreateRoomData, CreateRoomVariables>;

interface UpdateRoomStatusRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateRoomStatusVariables): MutationRef<UpdateRoomStatusData, UpdateRoomStatusVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateRoomStatusVariables): MutationRef<UpdateRoomStatusData, UpdateRoomStatusVariables>;
  operationName: string;
}
export const updateRoomStatusRef: UpdateRoomStatusRef;

export function updateRoomStatus(vars: UpdateRoomStatusVariables): MutationPromise<UpdateRoomStatusData, UpdateRoomStatusVariables>;
export function updateRoomStatus(dc: DataConnect, vars: UpdateRoomStatusVariables): MutationPromise<UpdateRoomStatusData, UpdateRoomStatusVariables>;

interface CreateHotelRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateHotelVariables): MutationRef<CreateHotelData, CreateHotelVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateHotelVariables): MutationRef<CreateHotelData, CreateHotelVariables>;
  operationName: string;
}
export const createHotelRef: CreateHotelRef;

export function createHotel(vars: CreateHotelVariables): MutationPromise<CreateHotelData, CreateHotelVariables>;
export function createHotel(dc: DataConnect, vars: CreateHotelVariables): MutationPromise<CreateHotelData, CreateHotelVariables>;

interface UpdateHotelConfigRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateHotelConfigVariables): MutationRef<UpdateHotelConfigData, UpdateHotelConfigVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateHotelConfigVariables): MutationRef<UpdateHotelConfigData, UpdateHotelConfigVariables>;
  operationName: string;
}
export const updateHotelConfigRef: UpdateHotelConfigRef;

export function updateHotelConfig(vars: UpdateHotelConfigVariables): MutationPromise<UpdateHotelConfigData, UpdateHotelConfigVariables>;
export function updateHotelConfig(dc: DataConnect, vars: UpdateHotelConfigVariables): MutationPromise<UpdateHotelConfigData, UpdateHotelConfigVariables>;

interface GetFirstHotelRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetFirstHotelData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetFirstHotelData, undefined>;
  operationName: string;
}
export const getFirstHotelRef: GetFirstHotelRef;

export function getFirstHotel(): QueryPromise<GetFirstHotelData, undefined>;
export function getFirstHotel(dc: DataConnect): QueryPromise<GetFirstHotelData, undefined>;

interface GetHotelByIdRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetHotelByIdVariables): QueryRef<GetHotelByIdData, GetHotelByIdVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetHotelByIdVariables): QueryRef<GetHotelByIdData, GetHotelByIdVariables>;
  operationName: string;
}
export const getHotelByIdRef: GetHotelByIdRef;

export function getHotelById(vars: GetHotelByIdVariables): QueryPromise<GetHotelByIdData, GetHotelByIdVariables>;
export function getHotelById(dc: DataConnect, vars: GetHotelByIdVariables): QueryPromise<GetHotelByIdData, GetHotelByIdVariables>;

interface ListAllHotelsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAllHotelsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListAllHotelsData, undefined>;
  operationName: string;
}
export const listAllHotelsRef: ListAllHotelsRef;

export function listAllHotels(): QueryPromise<ListAllHotelsData, undefined>;
export function listAllHotels(dc: DataConnect): QueryPromise<ListAllHotelsData, undefined>;

interface ListGuestsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListGuestsVariables): QueryRef<ListGuestsData, ListGuestsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListGuestsVariables): QueryRef<ListGuestsData, ListGuestsVariables>;
  operationName: string;
}
export const listGuestsRef: ListGuestsRef;

export function listGuests(vars: ListGuestsVariables): QueryPromise<ListGuestsData, ListGuestsVariables>;
export function listGuests(dc: DataConnect, vars: ListGuestsVariables): QueryPromise<ListGuestsData, ListGuestsVariables>;

interface CreateGuestDcRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateGuestDcVariables): MutationRef<CreateGuestDcData, CreateGuestDcVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateGuestDcVariables): MutationRef<CreateGuestDcData, CreateGuestDcVariables>;
  operationName: string;
}
export const createGuestDcRef: CreateGuestDcRef;

export function createGuestDc(vars: CreateGuestDcVariables): MutationPromise<CreateGuestDcData, CreateGuestDcVariables>;
export function createGuestDc(dc: DataConnect, vars: CreateGuestDcVariables): MutationPromise<CreateGuestDcData, CreateGuestDcVariables>;

interface UpdateGuestDcRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateGuestDcVariables): MutationRef<UpdateGuestDcData, UpdateGuestDcVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateGuestDcVariables): MutationRef<UpdateGuestDcData, UpdateGuestDcVariables>;
  operationName: string;
}
export const updateGuestDcRef: UpdateGuestDcRef;

export function updateGuestDc(vars: UpdateGuestDcVariables): MutationPromise<UpdateGuestDcData, UpdateGuestDcVariables>;
export function updateGuestDc(dc: DataConnect, vars: UpdateGuestDcVariables): MutationPromise<UpdateGuestDcData, UpdateGuestDcVariables>;

interface DeleteGuestDcRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteGuestDcVariables): MutationRef<DeleteGuestDcData, DeleteGuestDcVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteGuestDcVariables): MutationRef<DeleteGuestDcData, DeleteGuestDcVariables>;
  operationName: string;
}
export const deleteGuestDcRef: DeleteGuestDcRef;

export function deleteGuestDc(vars: DeleteGuestDcVariables): MutationPromise<DeleteGuestDcData, DeleteGuestDcVariables>;
export function deleteGuestDc(dc: DataConnect, vars: DeleteGuestDcVariables): MutationPromise<DeleteGuestDcData, DeleteGuestDcVariables>;

interface ListBookingsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListBookingsVariables): QueryRef<ListBookingsData, ListBookingsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListBookingsVariables): QueryRef<ListBookingsData, ListBookingsVariables>;
  operationName: string;
}
export const listBookingsRef: ListBookingsRef;

export function listBookings(vars: ListBookingsVariables): QueryPromise<ListBookingsData, ListBookingsVariables>;
export function listBookings(dc: DataConnect, vars: ListBookingsVariables): QueryPromise<ListBookingsData, ListBookingsVariables>;

interface CreateBookingDcRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateBookingDcVariables): MutationRef<CreateBookingDcData, CreateBookingDcVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateBookingDcVariables): MutationRef<CreateBookingDcData, CreateBookingDcVariables>;
  operationName: string;
}
export const createBookingDcRef: CreateBookingDcRef;

export function createBookingDc(vars: CreateBookingDcVariables): MutationPromise<CreateBookingDcData, CreateBookingDcVariables>;
export function createBookingDc(dc: DataConnect, vars: CreateBookingDcVariables): MutationPromise<CreateBookingDcData, CreateBookingDcVariables>;

interface UpdateBookingDcRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateBookingDcVariables): MutationRef<UpdateBookingDcData, UpdateBookingDcVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateBookingDcVariables): MutationRef<UpdateBookingDcData, UpdateBookingDcVariables>;
  operationName: string;
}
export const updateBookingDcRef: UpdateBookingDcRef;

export function updateBookingDc(vars: UpdateBookingDcVariables): MutationPromise<UpdateBookingDcData, UpdateBookingDcVariables>;
export function updateBookingDc(dc: DataConnect, vars: UpdateBookingDcVariables): MutationPromise<UpdateBookingDcData, UpdateBookingDcVariables>;

interface ListLogsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListLogsVariables): QueryRef<ListLogsData, ListLogsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListLogsVariables): QueryRef<ListLogsData, ListLogsVariables>;
  operationName: string;
}
export const listLogsRef: ListLogsRef;

export function listLogs(vars: ListLogsVariables): QueryPromise<ListLogsData, ListLogsVariables>;
export function listLogs(dc: DataConnect, vars: ListLogsVariables): QueryPromise<ListLogsData, ListLogsVariables>;

interface CreateLogDcRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateLogDcVariables): MutationRef<CreateLogDcData, CreateLogDcVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateLogDcVariables): MutationRef<CreateLogDcData, CreateLogDcVariables>;
  operationName: string;
}
export const createLogDcRef: CreateLogDcRef;

export function createLogDc(vars: CreateLogDcVariables): MutationPromise<CreateLogDcData, CreateLogDcVariables>;
export function createLogDc(dc: DataConnect, vars: CreateLogDcVariables): MutationPromise<CreateLogDcData, CreateLogDcVariables>;

interface ListStaffRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListStaffVariables): QueryRef<ListStaffData, ListStaffVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListStaffVariables): QueryRef<ListStaffData, ListStaffVariables>;
  operationName: string;
}
export const listStaffRef: ListStaffRef;

export function listStaff(vars: ListStaffVariables): QueryPromise<ListStaffData, ListStaffVariables>;
export function listStaff(dc: DataConnect, vars: ListStaffVariables): QueryPromise<ListStaffData, ListStaffVariables>;

interface CreateStaffDcRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateStaffDcVariables): MutationRef<CreateStaffDcData, CreateStaffDcVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateStaffDcVariables): MutationRef<CreateStaffDcData, CreateStaffDcVariables>;
  operationName: string;
}
export const createStaffDcRef: CreateStaffDcRef;

export function createStaffDc(vars: CreateStaffDcVariables): MutationPromise<CreateStaffDcData, CreateStaffDcVariables>;
export function createStaffDc(dc: DataConnect, vars: CreateStaffDcVariables): MutationPromise<CreateStaffDcData, CreateStaffDcVariables>;

interface UpdateStaffDcRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateStaffDcVariables): MutationRef<UpdateStaffDcData, UpdateStaffDcVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateStaffDcVariables): MutationRef<UpdateStaffDcData, UpdateStaffDcVariables>;
  operationName: string;
}
export const updateStaffDcRef: UpdateStaffDcRef;

export function updateStaffDc(vars: UpdateStaffDcVariables): MutationPromise<UpdateStaffDcData, UpdateStaffDcVariables>;
export function updateStaffDc(dc: DataConnect, vars: UpdateStaffDcVariables): MutationPromise<UpdateStaffDcData, UpdateStaffDcVariables>;

interface ListTimeLogsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListTimeLogsVariables): QueryRef<ListTimeLogsData, ListTimeLogsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListTimeLogsVariables): QueryRef<ListTimeLogsData, ListTimeLogsVariables>;
  operationName: string;
}
export const listTimeLogsRef: ListTimeLogsRef;

export function listTimeLogs(vars: ListTimeLogsVariables): QueryPromise<ListTimeLogsData, ListTimeLogsVariables>;
export function listTimeLogs(dc: DataConnect, vars: ListTimeLogsVariables): QueryPromise<ListTimeLogsData, ListTimeLogsVariables>;

interface CreateTimeLogDcRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateTimeLogDcVariables): MutationRef<CreateTimeLogDcData, CreateTimeLogDcVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateTimeLogDcVariables): MutationRef<CreateTimeLogDcData, CreateTimeLogDcVariables>;
  operationName: string;
}
export const createTimeLogDcRef: CreateTimeLogDcRef;

export function createTimeLogDc(vars: CreateTimeLogDcVariables): MutationPromise<CreateTimeLogDcData, CreateTimeLogDcVariables>;
export function createTimeLogDc(dc: DataConnect, vars: CreateTimeLogDcVariables): MutationPromise<CreateTimeLogDcData, CreateTimeLogDcVariables>;

interface UpdateTimeLogDcRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateTimeLogDcVariables): MutationRef<UpdateTimeLogDcData, UpdateTimeLogDcVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateTimeLogDcVariables): MutationRef<UpdateTimeLogDcData, UpdateTimeLogDcVariables>;
  operationName: string;
}
export const updateTimeLogDcRef: UpdateTimeLogDcRef;

export function updateTimeLogDc(vars: UpdateTimeLogDcVariables): MutationPromise<UpdateTimeLogDcData, UpdateTimeLogDcVariables>;
export function updateTimeLogDc(dc: DataConnect, vars: UpdateTimeLogDcVariables): MutationPromise<UpdateTimeLogDcData, UpdateTimeLogDcVariables>;

interface ListFinancialDocumentsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListFinancialDocumentsVariables): QueryRef<ListFinancialDocumentsData, ListFinancialDocumentsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListFinancialDocumentsVariables): QueryRef<ListFinancialDocumentsData, ListFinancialDocumentsVariables>;
  operationName: string;
}
export const listFinancialDocumentsRef: ListFinancialDocumentsRef;

export function listFinancialDocuments(vars: ListFinancialDocumentsVariables): QueryPromise<ListFinancialDocumentsData, ListFinancialDocumentsVariables>;
export function listFinancialDocuments(dc: DataConnect, vars: ListFinancialDocumentsVariables): QueryPromise<ListFinancialDocumentsData, ListFinancialDocumentsVariables>;

interface CreateFinancialDocumentDcRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateFinancialDocumentDcVariables): MutationRef<CreateFinancialDocumentDcData, CreateFinancialDocumentDcVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateFinancialDocumentDcVariables): MutationRef<CreateFinancialDocumentDcData, CreateFinancialDocumentDcVariables>;
  operationName: string;
}
export const createFinancialDocumentDcRef: CreateFinancialDocumentDcRef;

export function createFinancialDocumentDc(vars: CreateFinancialDocumentDcVariables): MutationPromise<CreateFinancialDocumentDcData, CreateFinancialDocumentDcVariables>;
export function createFinancialDocumentDc(dc: DataConnect, vars: CreateFinancialDocumentDcVariables): MutationPromise<CreateFinancialDocumentDcData, CreateFinancialDocumentDcVariables>;

interface UpsertUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertUserVariables): MutationRef<UpsertUserData, UpsertUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertUserVariables): MutationRef<UpsertUserData, UpsertUserVariables>;
  operationName: string;
}
export const upsertUserRef: UpsertUserRef;

export function upsertUser(vars: UpsertUserVariables): MutationPromise<UpsertUserData, UpsertUserVariables>;
export function upsertUser(dc: DataConnect, vars: UpsertUserVariables): MutationPromise<UpsertUserData, UpsertUserVariables>;

interface LinkUserToHotelRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: LinkUserToHotelVariables): MutationRef<LinkUserToHotelData, LinkUserToHotelVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: LinkUserToHotelVariables): MutationRef<LinkUserToHotelData, LinkUserToHotelVariables>;
  operationName: string;
}
export const linkUserToHotelRef: LinkUserToHotelRef;

export function linkUserToHotel(vars: LinkUserToHotelVariables): MutationPromise<LinkUserToHotelData, LinkUserToHotelVariables>;
export function linkUserToHotel(dc: DataConnect, vars: LinkUserToHotelVariables): MutationPromise<LinkUserToHotelData, LinkUserToHotelVariables>;

interface ListHotelsByUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListHotelsByUserVariables): QueryRef<ListHotelsByUserData, ListHotelsByUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListHotelsByUserVariables): QueryRef<ListHotelsByUserData, ListHotelsByUserVariables>;
  operationName: string;
}
export const listHotelsByUserRef: ListHotelsByUserRef;

export function listHotelsByUser(vars: ListHotelsByUserVariables): QueryPromise<ListHotelsByUserData, ListHotelsByUserVariables>;
export function listHotelsByUser(dc: DataConnect, vars: ListHotelsByUserVariables): QueryPromise<ListHotelsByUserData, ListHotelsByUserVariables>;

interface ListUsersDcRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUsersDcData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListUsersDcData, undefined>;
  operationName: string;
}
export const listUsersDcRef: ListUsersDcRef;

export function listUsersDc(): QueryPromise<ListUsersDcData, undefined>;
export function listUsersDc(dc: DataConnect): QueryPromise<ListUsersDcData, undefined>;

