import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface Booking_Key {
  id: UUIDString;
  __typename?: 'Booking_Key';
}

export interface CreateBookingData {
  booking_insert: Booking_Key;
}

export interface CreateBookingVariables {
  guestId: UUIDString;
  roomId: UUIDString;
  hotelId: UUIDString;
  checkInDate: DateString;
  checkOutDate: DateString;
  status: string;
}

export interface CreateGuestData {
  guest_insert: Guest_Key;
}

export interface CreateGuestVariables {
  firstName: string;
  lastName: string;
  email: string;
}

export interface CreateHotelData {
  hotel_insert: Hotel_Key;
}

export interface CreateHotelVariables {
  name: string;
  address: string;
  propertyId: string;
}

export interface CreateMaintenanceRequestData {
  maintenanceRequest_insert: MaintenanceRequest_Key;
}

export interface CreateMaintenanceRequestVariables {
  roomId: UUIDString;
  hotelId: UUIDString;
  description: string;
  requestDate: DateString;
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
}

export interface GetFirstHotelData {
  hotels: ({
    id: UUIDString;
    name: string;
  } & Hotel_Key)[];
}

export interface GetHotelStaffData {
  staffs: ({
    id: UUIDString;
    firstName: string;
    lastName: string;
    email?: string | null;
    role: string;
  } & Staff_Key)[];
}

export interface GetHotelStaffVariables {
  hotelId: UUIDString;
}

export interface Guest_Key {
  id: UUIDString;
  __typename?: 'Guest_Key';
}

export interface Hotel_Key {
  id: UUIDString;
  __typename?: 'Hotel_Key';
}

export interface ListAvailableRoomsData {
  rooms: ({
    id: UUIDString;
    roomNumber: string;
    roomType: string;
    capacity?: number | null;
    dailyRate?: number | null;
    status: string;
  } & Room_Key)[];
}

export interface MaintenanceRequest_Key {
  id: UUIDString;
  __typename?: 'MaintenanceRequest_Key';
}

export interface Room_Key {
  id: UUIDString;
  __typename?: 'Room_Key';
}

export interface Staff_Key {
  id: UUIDString;
  __typename?: 'Staff_Key';
}

export interface UpdateRoomStatusData {
  room_update?: Room_Key | null;
}

export interface UpdateRoomStatusVariables {
  id: UUIDString;
  status: string;
}

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

interface CreateGuestRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateGuestVariables): MutationRef<CreateGuestData, CreateGuestVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateGuestVariables): MutationRef<CreateGuestData, CreateGuestVariables>;
  operationName: string;
}
export const createGuestRef: CreateGuestRef;

export function createGuest(vars: CreateGuestVariables): MutationPromise<CreateGuestData, CreateGuestVariables>;
export function createGuest(dc: DataConnect, vars: CreateGuestVariables): MutationPromise<CreateGuestData, CreateGuestVariables>;

interface CreateBookingRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateBookingVariables): MutationRef<CreateBookingData, CreateBookingVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateBookingVariables): MutationRef<CreateBookingData, CreateBookingVariables>;
  operationName: string;
}
export const createBookingRef: CreateBookingRef;

export function createBooking(vars: CreateBookingVariables): MutationPromise<CreateBookingData, CreateBookingVariables>;
export function createBooking(dc: DataConnect, vars: CreateBookingVariables): MutationPromise<CreateBookingData, CreateBookingVariables>;

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

interface ListAvailableRoomsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAvailableRoomsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListAvailableRoomsData, undefined>;
  operationName: string;
}
export const listAvailableRoomsRef: ListAvailableRoomsRef;

export function listAvailableRooms(): QueryPromise<ListAvailableRoomsData, undefined>;
export function listAvailableRooms(dc: DataConnect): QueryPromise<ListAvailableRoomsData, undefined>;

interface CreateMaintenanceRequestRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateMaintenanceRequestVariables): MutationRef<CreateMaintenanceRequestData, CreateMaintenanceRequestVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateMaintenanceRequestVariables): MutationRef<CreateMaintenanceRequestData, CreateMaintenanceRequestVariables>;
  operationName: string;
}
export const createMaintenanceRequestRef: CreateMaintenanceRequestRef;

export function createMaintenanceRequest(vars: CreateMaintenanceRequestVariables): MutationPromise<CreateMaintenanceRequestData, CreateMaintenanceRequestVariables>;
export function createMaintenanceRequest(dc: DataConnect, vars: CreateMaintenanceRequestVariables): MutationPromise<CreateMaintenanceRequestData, CreateMaintenanceRequestVariables>;

interface GetHotelStaffRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetHotelStaffVariables): QueryRef<GetHotelStaffData, GetHotelStaffVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetHotelStaffVariables): QueryRef<GetHotelStaffData, GetHotelStaffVariables>;
  operationName: string;
}
export const getHotelStaffRef: GetHotelStaffRef;

export function getHotelStaff(vars: GetHotelStaffVariables): QueryPromise<GetHotelStaffData, GetHotelStaffVariables>;
export function getHotelStaff(dc: DataConnect, vars: GetHotelStaffVariables): QueryPromise<GetHotelStaffData, GetHotelStaffVariables>;

