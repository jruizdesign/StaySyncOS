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
  hotelId: UUIDString;
  checkInDate: DateString;
  checkOutDate: DateString;
  bookingStatus: string;
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

