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

export interface CreateMaintenanceRequestData {
  maintenanceRequest_insert: MaintenanceRequest_Key;
}

export interface CreateMaintenanceRequestVariables {
  roomId: UUIDString;
  hotelId: UUIDString;
  description: string;
  requestDate: DateString;
}

export interface CreateNewGuestData {
  guest_insert: Guest_Key;
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

interface CreateNewGuestRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateNewGuestData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateNewGuestData, undefined>;
  operationName: string;
}
export const createNewGuestRef: CreateNewGuestRef;

export function createNewGuest(): MutationPromise<CreateNewGuestData, undefined>;
export function createNewGuest(dc: DataConnect): MutationPromise<CreateNewGuestData, undefined>;

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

