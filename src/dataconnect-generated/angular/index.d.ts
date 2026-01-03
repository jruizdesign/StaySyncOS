import { ListAvailableRoomsData, ListAvailableRoomsVariables, CreateRoomData, CreateRoomVariables, UpdateRoomStatusData, UpdateRoomStatusVariables, CreateHotelData, CreateHotelVariables, UpdateHotelConfigData, UpdateHotelConfigVariables, GetFirstHotelData, GetHotelByIdData, GetHotelByIdVariables, ListAllHotelsData, ListGuestsData, ListGuestsVariables, CreateGuestDcData, CreateGuestDcVariables, UpdateGuestDcData, UpdateGuestDcVariables, DeleteGuestDcData, DeleteGuestDcVariables, ListBookingsData, ListBookingsVariables, CreateBookingDcData, CreateBookingDcVariables, UpdateBookingDcData, UpdateBookingDcVariables, ListLogsData, ListLogsVariables, CreateLogDcData, CreateLogDcVariables, ListStaffData, ListStaffVariables, CreateStaffDcData, CreateStaffDcVariables, UpdateStaffDcData, UpdateStaffDcVariables, ListTimeLogsData, ListTimeLogsVariables, CreateTimeLogDcData, CreateTimeLogDcVariables, UpdateTimeLogDcData, UpdateTimeLogDcVariables, ListFinancialDocumentsData, ListFinancialDocumentsVariables, CreateFinancialDocumentDcData, CreateFinancialDocumentDcVariables, UpsertUserData, UpsertUserVariables, LinkUserToHotelData, LinkUserToHotelVariables, ListHotelsByUserData, ListHotelsByUserVariables } from '../';
import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise} from '@angular/fire/data-connect';
import { CreateQueryResult, CreateMutationResult} from '@tanstack/angular-query-experimental';
import { CreateDataConnectQueryResult, CreateDataConnectQueryOptions, CreateDataConnectMutationResult, DataConnectMutationOptionsUndefinedMutationFn } from '@tanstack-query-firebase/angular/data-connect';
import { FirebaseError } from 'firebase/app';
import { Injector } from '@angular/core';

type ListAvailableRoomsArgs = ListAvailableRoomsVariables | (() => ListAvailableRoomsVariables);
export type ListAvailableRoomsOptions = () => Omit<CreateDataConnectQueryOptions<ListAvailableRoomsData, ListAvailableRoomsVariables>, 'queryFn'>;
export function injectListAvailableRooms(args: ListAvailableRoomsArgs, options?: ListAvailableRoomsOptions, injector?: Injector): CreateDataConnectQueryResult<ListAvailableRoomsData, ListAvailableRoomsVariables>;

type CreateRoomOptions = DataConnectMutationOptionsUndefinedMutationFn<CreateRoomData, FirebaseError, CreateRoomVariables>;
export function injectCreateRoom(options?: CreateRoomOptions, injector?: Injector): CreateDataConnectMutationResult<CreateRoomData, CreateRoomVariables, CreateRoomVariables>;

type UpdateRoomStatusOptions = DataConnectMutationOptionsUndefinedMutationFn<UpdateRoomStatusData, FirebaseError, UpdateRoomStatusVariables>;
export function injectUpdateRoomStatus(options?: UpdateRoomStatusOptions, injector?: Injector): CreateDataConnectMutationResult<UpdateRoomStatusData, UpdateRoomStatusVariables, UpdateRoomStatusVariables>;

type CreateHotelOptions = DataConnectMutationOptionsUndefinedMutationFn<CreateHotelData, FirebaseError, CreateHotelVariables>;
export function injectCreateHotel(options?: CreateHotelOptions, injector?: Injector): CreateDataConnectMutationResult<CreateHotelData, CreateHotelVariables, CreateHotelVariables>;

type UpdateHotelConfigOptions = DataConnectMutationOptionsUndefinedMutationFn<UpdateHotelConfigData, FirebaseError, UpdateHotelConfigVariables>;
export function injectUpdateHotelConfig(options?: UpdateHotelConfigOptions, injector?: Injector): CreateDataConnectMutationResult<UpdateHotelConfigData, UpdateHotelConfigVariables, UpdateHotelConfigVariables>;

export type GetFirstHotelOptions = () => Omit<CreateDataConnectQueryOptions<GetFirstHotelData, undefined>, 'queryFn'>;
export function injectGetFirstHotel(options?: GetFirstHotelOptions, injector?: Injector): CreateDataConnectQueryResult<GetFirstHotelData, undefined>;

type GetHotelByIdArgs = GetHotelByIdVariables | (() => GetHotelByIdVariables);
export type GetHotelByIdOptions = () => Omit<CreateDataConnectQueryOptions<GetHotelByIdData, GetHotelByIdVariables>, 'queryFn'>;
export function injectGetHotelById(args: GetHotelByIdArgs, options?: GetHotelByIdOptions, injector?: Injector): CreateDataConnectQueryResult<GetHotelByIdData, GetHotelByIdVariables>;

export type ListAllHotelsOptions = () => Omit<CreateDataConnectQueryOptions<ListAllHotelsData, undefined>, 'queryFn'>;
export function injectListAllHotels(options?: ListAllHotelsOptions, injector?: Injector): CreateDataConnectQueryResult<ListAllHotelsData, undefined>;

type ListGuestsArgs = ListGuestsVariables | (() => ListGuestsVariables);
export type ListGuestsOptions = () => Omit<CreateDataConnectQueryOptions<ListGuestsData, ListGuestsVariables>, 'queryFn'>;
export function injectListGuests(args: ListGuestsArgs, options?: ListGuestsOptions, injector?: Injector): CreateDataConnectQueryResult<ListGuestsData, ListGuestsVariables>;

type CreateGuestDcOptions = DataConnectMutationOptionsUndefinedMutationFn<CreateGuestDcData, FirebaseError, CreateGuestDcVariables>;
export function injectCreateGuestDc(options?: CreateGuestDcOptions, injector?: Injector): CreateDataConnectMutationResult<CreateGuestDcData, CreateGuestDcVariables, CreateGuestDcVariables>;

type UpdateGuestDcOptions = DataConnectMutationOptionsUndefinedMutationFn<UpdateGuestDcData, FirebaseError, UpdateGuestDcVariables>;
export function injectUpdateGuestDc(options?: UpdateGuestDcOptions, injector?: Injector): CreateDataConnectMutationResult<UpdateGuestDcData, UpdateGuestDcVariables, UpdateGuestDcVariables>;

type DeleteGuestDcOptions = DataConnectMutationOptionsUndefinedMutationFn<DeleteGuestDcData, FirebaseError, DeleteGuestDcVariables>;
export function injectDeleteGuestDc(options?: DeleteGuestDcOptions, injector?: Injector): CreateDataConnectMutationResult<DeleteGuestDcData, DeleteGuestDcVariables, DeleteGuestDcVariables>;

type ListBookingsArgs = ListBookingsVariables | (() => ListBookingsVariables);
export type ListBookingsOptions = () => Omit<CreateDataConnectQueryOptions<ListBookingsData, ListBookingsVariables>, 'queryFn'>;
export function injectListBookings(args: ListBookingsArgs, options?: ListBookingsOptions, injector?: Injector): CreateDataConnectQueryResult<ListBookingsData, ListBookingsVariables>;

type CreateBookingDcOptions = DataConnectMutationOptionsUndefinedMutationFn<CreateBookingDcData, FirebaseError, CreateBookingDcVariables>;
export function injectCreateBookingDc(options?: CreateBookingDcOptions, injector?: Injector): CreateDataConnectMutationResult<CreateBookingDcData, CreateBookingDcVariables, CreateBookingDcVariables>;

type UpdateBookingDcOptions = DataConnectMutationOptionsUndefinedMutationFn<UpdateBookingDcData, FirebaseError, UpdateBookingDcVariables>;
export function injectUpdateBookingDc(options?: UpdateBookingDcOptions, injector?: Injector): CreateDataConnectMutationResult<UpdateBookingDcData, UpdateBookingDcVariables, UpdateBookingDcVariables>;

type ListLogsArgs = ListLogsVariables | (() => ListLogsVariables);
export type ListLogsOptions = () => Omit<CreateDataConnectQueryOptions<ListLogsData, ListLogsVariables>, 'queryFn'>;
export function injectListLogs(args: ListLogsArgs, options?: ListLogsOptions, injector?: Injector): CreateDataConnectQueryResult<ListLogsData, ListLogsVariables>;

type CreateLogDcOptions = DataConnectMutationOptionsUndefinedMutationFn<CreateLogDcData, FirebaseError, CreateLogDcVariables>;
export function injectCreateLogDc(options?: CreateLogDcOptions, injector?: Injector): CreateDataConnectMutationResult<CreateLogDcData, CreateLogDcVariables, CreateLogDcVariables>;

type ListStaffArgs = ListStaffVariables | (() => ListStaffVariables);
export type ListStaffOptions = () => Omit<CreateDataConnectQueryOptions<ListStaffData, ListStaffVariables>, 'queryFn'>;
export function injectListStaff(args: ListStaffArgs, options?: ListStaffOptions, injector?: Injector): CreateDataConnectQueryResult<ListStaffData, ListStaffVariables>;

type CreateStaffDcOptions = DataConnectMutationOptionsUndefinedMutationFn<CreateStaffDcData, FirebaseError, CreateStaffDcVariables>;
export function injectCreateStaffDc(options?: CreateStaffDcOptions, injector?: Injector): CreateDataConnectMutationResult<CreateStaffDcData, CreateStaffDcVariables, CreateStaffDcVariables>;

type UpdateStaffDcOptions = DataConnectMutationOptionsUndefinedMutationFn<UpdateStaffDcData, FirebaseError, UpdateStaffDcVariables>;
export function injectUpdateStaffDc(options?: UpdateStaffDcOptions, injector?: Injector): CreateDataConnectMutationResult<UpdateStaffDcData, UpdateStaffDcVariables, UpdateStaffDcVariables>;

type ListTimeLogsArgs = ListTimeLogsVariables | (() => ListTimeLogsVariables);
export type ListTimeLogsOptions = () => Omit<CreateDataConnectQueryOptions<ListTimeLogsData, ListTimeLogsVariables>, 'queryFn'>;
export function injectListTimeLogs(args: ListTimeLogsArgs, options?: ListTimeLogsOptions, injector?: Injector): CreateDataConnectQueryResult<ListTimeLogsData, ListTimeLogsVariables>;

type CreateTimeLogDcOptions = DataConnectMutationOptionsUndefinedMutationFn<CreateTimeLogDcData, FirebaseError, CreateTimeLogDcVariables>;
export function injectCreateTimeLogDc(options?: CreateTimeLogDcOptions, injector?: Injector): CreateDataConnectMutationResult<CreateTimeLogDcData, CreateTimeLogDcVariables, CreateTimeLogDcVariables>;

type UpdateTimeLogDcOptions = DataConnectMutationOptionsUndefinedMutationFn<UpdateTimeLogDcData, FirebaseError, UpdateTimeLogDcVariables>;
export function injectUpdateTimeLogDc(options?: UpdateTimeLogDcOptions, injector?: Injector): CreateDataConnectMutationResult<UpdateTimeLogDcData, UpdateTimeLogDcVariables, UpdateTimeLogDcVariables>;

type ListFinancialDocumentsArgs = ListFinancialDocumentsVariables | (() => ListFinancialDocumentsVariables);
export type ListFinancialDocumentsOptions = () => Omit<CreateDataConnectQueryOptions<ListFinancialDocumentsData, ListFinancialDocumentsVariables>, 'queryFn'>;
export function injectListFinancialDocuments(args: ListFinancialDocumentsArgs, options?: ListFinancialDocumentsOptions, injector?: Injector): CreateDataConnectQueryResult<ListFinancialDocumentsData, ListFinancialDocumentsVariables>;

type CreateFinancialDocumentDcOptions = DataConnectMutationOptionsUndefinedMutationFn<CreateFinancialDocumentDcData, FirebaseError, CreateFinancialDocumentDcVariables>;
export function injectCreateFinancialDocumentDc(options?: CreateFinancialDocumentDcOptions, injector?: Injector): CreateDataConnectMutationResult<CreateFinancialDocumentDcData, CreateFinancialDocumentDcVariables, CreateFinancialDocumentDcVariables>;

type UpsertUserOptions = DataConnectMutationOptionsUndefinedMutationFn<UpsertUserData, FirebaseError, UpsertUserVariables>;
export function injectUpsertUser(options?: UpsertUserOptions, injector?: Injector): CreateDataConnectMutationResult<UpsertUserData, UpsertUserVariables, UpsertUserVariables>;

type LinkUserToHotelOptions = DataConnectMutationOptionsUndefinedMutationFn<LinkUserToHotelData, FirebaseError, LinkUserToHotelVariables>;
export function injectLinkUserToHotel(options?: LinkUserToHotelOptions, injector?: Injector): CreateDataConnectMutationResult<LinkUserToHotelData, LinkUserToHotelVariables, LinkUserToHotelVariables>;

type ListHotelsByUserArgs = ListHotelsByUserVariables | (() => ListHotelsByUserVariables);
export type ListHotelsByUserOptions = () => Omit<CreateDataConnectQueryOptions<ListHotelsByUserData, ListHotelsByUserVariables>, 'queryFn'>;
export function injectListHotelsByUser(args: ListHotelsByUserArgs, options?: ListHotelsByUserOptions, injector?: Injector): CreateDataConnectQueryResult<ListHotelsByUserData, ListHotelsByUserVariables>;
