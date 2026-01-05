import { ListAvailableRoomsData, ListAvailableRoomsVariables, CreateRoomData, CreateRoomVariables, UpdateRoomStatusData, UpdateRoomStatusVariables, CreateHotelData, CreateHotelVariables, UpdateHotelConfigData, UpdateHotelConfigVariables, DeleteHotelData, DeleteHotelVariables, GetFirstHotelData, GetHotelByIdData, GetHotelByIdVariables, ListAllHotelsData, ListGuestsData, ListGuestsVariables, CreateGuestDcData, CreateGuestDcVariables, UpdateGuestDcData, UpdateGuestDcVariables, DeleteGuestDcData, DeleteGuestDcVariables, ListBookingsData, ListBookingsVariables, CreateBookingDcData, CreateBookingDcVariables, UpdateBookingDcData, UpdateBookingDcVariables, ListLogsData, ListLogsVariables, CreateLogDcData, CreateLogDcVariables, ListStaffData, ListStaffVariables, CreateStaffDcData, CreateStaffDcVariables, UpdateStaffDcData, UpdateStaffDcVariables, ListTimeLogsData, ListTimeLogsVariables, CreateTimeLogDcData, CreateTimeLogDcVariables, UpdateTimeLogDcData, UpdateTimeLogDcVariables, ListFinancialDocumentsData, ListFinancialDocumentsVariables, CreateFinancialDocumentDcData, CreateFinancialDocumentDcVariables, UpsertUserData, UpsertUserVariables, LinkUserToHotelData, LinkUserToHotelVariables, ListHotelsByUserData, ListHotelsByUserVariables, ListUsersDcData, GetUserByEmailData, GetUserByEmailVariables, ListMaintenanceData, ListMaintenanceVariables, CreateMaintenanceDcData, CreateMaintenanceDcVariables, ListShiftsData, ListShiftsVariables, CreateShiftDcData, CreateShiftDcVariables, ListHousekeepingData, ListHousekeepingVariables, CreateHousekeepingTaskDcData, CreateHousekeepingTaskDcVariables, ListInventoryData, ListInventoryVariables, UpsertInventoryItemDcData, UpsertInventoryItemDcVariables, ListAmenitiesData, ListAmenitiesVariables, CreateAmenityDcData, CreateAmenityDcVariables, ListStoredDocumentsData, ListStoredDocumentsVariables, CreateStoredDocumentDcData, CreateStoredDocumentDcVariables, LogAiUsageData, LogAiUsageVariables, ListAiUsageData, ListAiUsageVariables, SeedRoomsData, SeedRoomsVariables, SeedStaffData, SeedStaffVariables, SeedInventoryData, SeedInventoryVariables, SeedAmenitiesData, SeedAmenitiesVariables } from '../';
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

type DeleteHotelOptions = DataConnectMutationOptionsUndefinedMutationFn<DeleteHotelData, FirebaseError, DeleteHotelVariables>;
export function injectDeleteHotel(options?: DeleteHotelOptions, injector?: Injector): CreateDataConnectMutationResult<DeleteHotelData, DeleteHotelVariables, DeleteHotelVariables>;

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

export type ListUsersDcOptions = () => Omit<CreateDataConnectQueryOptions<ListUsersDcData, undefined>, 'queryFn'>;
export function injectListUsersDc(options?: ListUsersDcOptions, injector?: Injector): CreateDataConnectQueryResult<ListUsersDcData, undefined>;

type GetUserByEmailArgs = GetUserByEmailVariables | (() => GetUserByEmailVariables);
export type GetUserByEmailOptions = () => Omit<CreateDataConnectQueryOptions<GetUserByEmailData, GetUserByEmailVariables>, 'queryFn'>;
export function injectGetUserByEmail(args: GetUserByEmailArgs, options?: GetUserByEmailOptions, injector?: Injector): CreateDataConnectQueryResult<GetUserByEmailData, GetUserByEmailVariables>;

type ListMaintenanceArgs = ListMaintenanceVariables | (() => ListMaintenanceVariables);
export type ListMaintenanceOptions = () => Omit<CreateDataConnectQueryOptions<ListMaintenanceData, ListMaintenanceVariables>, 'queryFn'>;
export function injectListMaintenance(args: ListMaintenanceArgs, options?: ListMaintenanceOptions, injector?: Injector): CreateDataConnectQueryResult<ListMaintenanceData, ListMaintenanceVariables>;

type CreateMaintenanceDcOptions = DataConnectMutationOptionsUndefinedMutationFn<CreateMaintenanceDcData, FirebaseError, CreateMaintenanceDcVariables>;
export function injectCreateMaintenanceDc(options?: CreateMaintenanceDcOptions, injector?: Injector): CreateDataConnectMutationResult<CreateMaintenanceDcData, CreateMaintenanceDcVariables, CreateMaintenanceDcVariables>;

type ListShiftsArgs = ListShiftsVariables | (() => ListShiftsVariables);
export type ListShiftsOptions = () => Omit<CreateDataConnectQueryOptions<ListShiftsData, ListShiftsVariables>, 'queryFn'>;
export function injectListShifts(args: ListShiftsArgs, options?: ListShiftsOptions, injector?: Injector): CreateDataConnectQueryResult<ListShiftsData, ListShiftsVariables>;

type CreateShiftDcOptions = DataConnectMutationOptionsUndefinedMutationFn<CreateShiftDcData, FirebaseError, CreateShiftDcVariables>;
export function injectCreateShiftDc(options?: CreateShiftDcOptions, injector?: Injector): CreateDataConnectMutationResult<CreateShiftDcData, CreateShiftDcVariables, CreateShiftDcVariables>;

type ListHousekeepingArgs = ListHousekeepingVariables | (() => ListHousekeepingVariables);
export type ListHousekeepingOptions = () => Omit<CreateDataConnectQueryOptions<ListHousekeepingData, ListHousekeepingVariables>, 'queryFn'>;
export function injectListHousekeeping(args: ListHousekeepingArgs, options?: ListHousekeepingOptions, injector?: Injector): CreateDataConnectQueryResult<ListHousekeepingData, ListHousekeepingVariables>;

type CreateHousekeepingTaskDcOptions = DataConnectMutationOptionsUndefinedMutationFn<CreateHousekeepingTaskDcData, FirebaseError, CreateHousekeepingTaskDcVariables>;
export function injectCreateHousekeepingTaskDc(options?: CreateHousekeepingTaskDcOptions, injector?: Injector): CreateDataConnectMutationResult<CreateHousekeepingTaskDcData, CreateHousekeepingTaskDcVariables, CreateHousekeepingTaskDcVariables>;

type ListInventoryArgs = ListInventoryVariables | (() => ListInventoryVariables);
export type ListInventoryOptions = () => Omit<CreateDataConnectQueryOptions<ListInventoryData, ListInventoryVariables>, 'queryFn'>;
export function injectListInventory(args: ListInventoryArgs, options?: ListInventoryOptions, injector?: Injector): CreateDataConnectQueryResult<ListInventoryData, ListInventoryVariables>;

type UpsertInventoryItemDcOptions = DataConnectMutationOptionsUndefinedMutationFn<UpsertInventoryItemDcData, FirebaseError, UpsertInventoryItemDcVariables>;
export function injectUpsertInventoryItemDc(options?: UpsertInventoryItemDcOptions, injector?: Injector): CreateDataConnectMutationResult<UpsertInventoryItemDcData, UpsertInventoryItemDcVariables, UpsertInventoryItemDcVariables>;

type ListAmenitiesArgs = ListAmenitiesVariables | (() => ListAmenitiesVariables);
export type ListAmenitiesOptions = () => Omit<CreateDataConnectQueryOptions<ListAmenitiesData, ListAmenitiesVariables>, 'queryFn'>;
export function injectListAmenities(args: ListAmenitiesArgs, options?: ListAmenitiesOptions, injector?: Injector): CreateDataConnectQueryResult<ListAmenitiesData, ListAmenitiesVariables>;

type CreateAmenityDcOptions = DataConnectMutationOptionsUndefinedMutationFn<CreateAmenityDcData, FirebaseError, CreateAmenityDcVariables>;
export function injectCreateAmenityDc(options?: CreateAmenityDcOptions, injector?: Injector): CreateDataConnectMutationResult<CreateAmenityDcData, CreateAmenityDcVariables, CreateAmenityDcVariables>;

type ListStoredDocumentsArgs = ListStoredDocumentsVariables | (() => ListStoredDocumentsVariables);
export type ListStoredDocumentsOptions = () => Omit<CreateDataConnectQueryOptions<ListStoredDocumentsData, ListStoredDocumentsVariables>, 'queryFn'>;
export function injectListStoredDocuments(args: ListStoredDocumentsArgs, options?: ListStoredDocumentsOptions, injector?: Injector): CreateDataConnectQueryResult<ListStoredDocumentsData, ListStoredDocumentsVariables>;

type CreateStoredDocumentDcOptions = DataConnectMutationOptionsUndefinedMutationFn<CreateStoredDocumentDcData, FirebaseError, CreateStoredDocumentDcVariables>;
export function injectCreateStoredDocumentDc(options?: CreateStoredDocumentDcOptions, injector?: Injector): CreateDataConnectMutationResult<CreateStoredDocumentDcData, CreateStoredDocumentDcVariables, CreateStoredDocumentDcVariables>;

type LogAiUsageOptions = DataConnectMutationOptionsUndefinedMutationFn<LogAiUsageData, FirebaseError, LogAiUsageVariables>;
export function injectLogAiUsage(options?: LogAiUsageOptions, injector?: Injector): CreateDataConnectMutationResult<LogAiUsageData, LogAiUsageVariables, LogAiUsageVariables>;

type ListAiUsageArgs = ListAiUsageVariables | (() => ListAiUsageVariables);
export type ListAiUsageOptions = () => Omit<CreateDataConnectQueryOptions<ListAiUsageData, ListAiUsageVariables>, 'queryFn'>;
export function injectListAiUsage(args: ListAiUsageArgs, options?: ListAiUsageOptions, injector?: Injector): CreateDataConnectQueryResult<ListAiUsageData, ListAiUsageVariables>;

type SeedRoomsOptions = DataConnectMutationOptionsUndefinedMutationFn<SeedRoomsData, FirebaseError, SeedRoomsVariables>;
export function injectSeedRooms(options?: SeedRoomsOptions, injector?: Injector): CreateDataConnectMutationResult<SeedRoomsData, SeedRoomsVariables, SeedRoomsVariables>;

type SeedStaffOptions = DataConnectMutationOptionsUndefinedMutationFn<SeedStaffData, FirebaseError, SeedStaffVariables>;
export function injectSeedStaff(options?: SeedStaffOptions, injector?: Injector): CreateDataConnectMutationResult<SeedStaffData, SeedStaffVariables, SeedStaffVariables>;

type SeedInventoryOptions = DataConnectMutationOptionsUndefinedMutationFn<SeedInventoryData, FirebaseError, SeedInventoryVariables>;
export function injectSeedInventory(options?: SeedInventoryOptions, injector?: Injector): CreateDataConnectMutationResult<SeedInventoryData, SeedInventoryVariables, SeedInventoryVariables>;

type SeedAmenitiesOptions = DataConnectMutationOptionsUndefinedMutationFn<SeedAmenitiesData, FirebaseError, SeedAmenitiesVariables>;
export function injectSeedAmenities(options?: SeedAmenitiesOptions, injector?: Injector): CreateDataConnectMutationResult<SeedAmenitiesData, SeedAmenitiesVariables, SeedAmenitiesVariables>;
