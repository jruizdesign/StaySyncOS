import { createHotelRef, getFirstHotelRef, createRoomRef, createGuestRef, createBookingRef, updateRoomStatusRef, listAvailableRoomsRef, createMaintenanceRequestRef, getHotelStaffRef } from '../../';
import { DataConnect, CallerSdkTypeEnum } from '@angular/fire/data-connect';
import { injectDataConnectQuery, injectDataConnectMutation } from '../../tanstack-query-shim';
import { inject, EnvironmentInjector } from '@angular/core';
export function injectCreateHotel(args, injector) {
  return injectDataConnectMutation(createHotelRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectGetFirstHotel(options, injector) {
  const finalInjector = injector || inject(EnvironmentInjector);
  const dc = finalInjector.get(DataConnect);
  return injectDataConnectQuery(() => {
    const addOpn = options && options();
    return {
      queryFn: () => getFirstHotelRef(dc),
      ...addOpn
    };
  }, finalInjector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectCreateRoom(args, injector) {
  return injectDataConnectMutation(createRoomRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectCreateGuest(args, injector) {
  return injectDataConnectMutation(createGuestRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectCreateBooking(args, injector) {
  return injectDataConnectMutation(createBookingRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectUpdateRoomStatus(args, injector) {
  return injectDataConnectMutation(updateRoomStatusRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectListAvailableRooms(options, injector) {
  const finalInjector = injector || inject(EnvironmentInjector);
  const dc = finalInjector.get(DataConnect);
  return injectDataConnectQuery(() => {
    const addOpn = options && options();
    return {
      queryFn: () => listAvailableRoomsRef(dc),
      ...addOpn
    };
  }, finalInjector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectCreateMaintenanceRequest(args, injector) {
  return injectDataConnectMutation(createMaintenanceRequestRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectGetHotelStaff(args, options, injector) {
  const finalInjector = injector || inject(EnvironmentInjector);
  const dc = finalInjector.get(DataConnect);
  const varsFactoryFn = (typeof args === 'function') ? args : () => args;
  return injectDataConnectQuery(() => {
    const addOpn = options && options();
    return {
      queryFn: () => getHotelStaffRef(dc, varsFactoryFn()),
      ...addOpn
    };
  }, finalInjector, CallerSdkTypeEnum.GeneratedAngular);
}

