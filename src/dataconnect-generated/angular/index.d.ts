import { CreateNewGuestData, ListAvailableRoomsData, CreateMaintenanceRequestData, CreateMaintenanceRequestVariables, GetHotelStaffData, GetHotelStaffVariables } from '../';
import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise} from '@angular/fire/data-connect';
import { CreateQueryResult, CreateMutationResult} from '@tanstack/angular-query-experimental';
import { CreateDataConnectQueryResult, CreateDataConnectQueryOptions, CreateDataConnectMutationResult, DataConnectMutationOptionsUndefinedMutationFn } from '@tanstack-query-firebase/angular/data-connect';
import { FirebaseError } from 'firebase/app';
import { Injector } from '@angular/core';

type CreateNewGuestOptions = DataConnectMutationOptionsUndefinedMutationFn<CreateNewGuestData, FirebaseError, undefined>;
export function injectCreateNewGuest(options?: CreateNewGuestOptions, injector?: Injector): CreateDataConnectMutationResult<CreateNewGuestData, undefined, >;

export type ListAvailableRoomsOptions = () => Omit<CreateDataConnectQueryOptions<ListAvailableRoomsData, undefined>, 'queryFn'>;
export function injectListAvailableRooms(options?: ListAvailableRoomsOptions, injector?: Injector): CreateDataConnectQueryResult<ListAvailableRoomsData, undefined>;

type CreateMaintenanceRequestOptions = DataConnectMutationOptionsUndefinedMutationFn<CreateMaintenanceRequestData, FirebaseError, CreateMaintenanceRequestVariables>;
export function injectCreateMaintenanceRequest(options?: CreateMaintenanceRequestOptions, injector?: Injector): CreateDataConnectMutationResult<CreateMaintenanceRequestData, CreateMaintenanceRequestVariables, CreateMaintenanceRequestVariables>;

type GetHotelStaffArgs = GetHotelStaffVariables | (() => GetHotelStaffVariables);
export type GetHotelStaffOptions = () => Omit<CreateDataConnectQueryOptions<GetHotelStaffData, GetHotelStaffVariables>, 'queryFn'>;
export function injectGetHotelStaff(args: GetHotelStaffArgs, options?: GetHotelStaffOptions, injector?: Injector): CreateDataConnectQueryResult<GetHotelStaffData, GetHotelStaffVariables>;
