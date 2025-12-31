import { GetFirstHotelData, ListAvailableRoomsData, CreateRoomData, CreateRoomVariables, CreateHotelData, CreateHotelVariables, UpdateRoomStatusData, UpdateRoomStatusVariables, CreateGuestData, CreateGuestVariables, CreateBookingData, CreateBookingVariables } from '../';
import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise} from '@angular/fire/data-connect';
import { CreateQueryResult, CreateMutationResult} from '@tanstack/angular-query-experimental';
import { CreateDataConnectQueryResult, CreateDataConnectQueryOptions, CreateDataConnectMutationResult, DataConnectMutationOptionsUndefinedMutationFn } from '@tanstack-query-firebase/angular/data-connect';
import { FirebaseError } from 'firebase/app';
import { Injector } from '@angular/core';

export type GetFirstHotelOptions = () => Omit<CreateDataConnectQueryOptions<GetFirstHotelData, undefined>, 'queryFn'>;
export function injectGetFirstHotel(options?: GetFirstHotelOptions, injector?: Injector): CreateDataConnectQueryResult<GetFirstHotelData, undefined>;

export type ListAvailableRoomsOptions = () => Omit<CreateDataConnectQueryOptions<ListAvailableRoomsData, undefined>, 'queryFn'>;
export function injectListAvailableRooms(options?: ListAvailableRoomsOptions, injector?: Injector): CreateDataConnectQueryResult<ListAvailableRoomsData, undefined>;

type CreateRoomOptions = DataConnectMutationOptionsUndefinedMutationFn<CreateRoomData, FirebaseError, CreateRoomVariables>;
export function injectCreateRoom(options?: CreateRoomOptions, injector?: Injector): CreateDataConnectMutationResult<CreateRoomData, CreateRoomVariables, CreateRoomVariables>;

type CreateHotelOptions = DataConnectMutationOptionsUndefinedMutationFn<CreateHotelData, FirebaseError, CreateHotelVariables>;
export function injectCreateHotel(options?: CreateHotelOptions, injector?: Injector): CreateDataConnectMutationResult<CreateHotelData, CreateHotelVariables, CreateHotelVariables>;

type UpdateRoomStatusOptions = DataConnectMutationOptionsUndefinedMutationFn<UpdateRoomStatusData, FirebaseError, UpdateRoomStatusVariables>;
export function injectUpdateRoomStatus(options?: UpdateRoomStatusOptions, injector?: Injector): CreateDataConnectMutationResult<UpdateRoomStatusData, UpdateRoomStatusVariables, UpdateRoomStatusVariables>;

type CreateGuestOptions = DataConnectMutationOptionsUndefinedMutationFn<CreateGuestData, FirebaseError, CreateGuestVariables>;
export function injectCreateGuest(options?: CreateGuestOptions, injector?: Injector): CreateDataConnectMutationResult<CreateGuestData, CreateGuestVariables, CreateGuestVariables>;

type CreateBookingOptions = DataConnectMutationOptionsUndefinedMutationFn<CreateBookingData, FirebaseError, CreateBookingVariables>;
export function injectCreateBooking(options?: CreateBookingOptions, injector?: Injector): CreateDataConnectMutationResult<CreateBookingData, CreateBookingVariables, CreateBookingVariables>;
