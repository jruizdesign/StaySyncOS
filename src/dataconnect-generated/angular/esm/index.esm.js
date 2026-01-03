import { listAvailableRoomsRef, createRoomRef, createHotelRef, updateRoomStatusRef, createGuestRef, createBookingRef, getFirstHotelRef, getHotelByIdRef, listHotelsByUserRef, listAllHotelsRef } from '../../';
import { DataConnect, CallerSdkTypeEnum } from '@angular/fire/data-connect';
import { injectDataConnectQuery, injectDataConnectMutation } from '@tanstack-query-firebase/angular/data-connect';
import { inject, EnvironmentInjector } from '@angular/core';
export function injectListAvailableRooms(args, options, injector) {
  const finalInjector = injector || inject(EnvironmentInjector);
  const dc = finalInjector.get(DataConnect);
  const varsFactoryFn = (typeof args === 'function') ? args : () => args;
  return injectDataConnectQuery(() => {
    const addOpn = options && options();
    return {
      queryFn: () =>  listAvailableRoomsRef(dc, varsFactoryFn()),
      ...addOpn
    };
  }, finalInjector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectCreateRoom(args, injector) {
  return injectDataConnectMutation(createRoomRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectCreateHotel(args, injector) {
  return injectDataConnectMutation(createHotelRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectUpdateRoomStatus(args, injector) {
  return injectDataConnectMutation(updateRoomStatusRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectCreateGuest(args, injector) {
  return injectDataConnectMutation(createGuestRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectCreateBooking(args, injector) {
  return injectDataConnectMutation(createBookingRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectGetFirstHotel(options, injector) {
  const finalInjector = injector || inject(EnvironmentInjector);
  const dc = finalInjector.get(DataConnect);
  return injectDataConnectQuery(() => {
    const addOpn = options && options();
    return {
      queryFn: () =>  getFirstHotelRef(dc),
      ...addOpn
    };
  }, finalInjector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectGetHotelById(args, options, injector) {
  const finalInjector = injector || inject(EnvironmentInjector);
  const dc = finalInjector.get(DataConnect);
  const varsFactoryFn = (typeof args === 'function') ? args : () => args;
  return injectDataConnectQuery(() => {
    const addOpn = options && options();
    return {
      queryFn: () =>  getHotelByIdRef(dc, varsFactoryFn()),
      ...addOpn
    };
  }, finalInjector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectListHotelsByUser(args, options, injector) {
  const finalInjector = injector || inject(EnvironmentInjector);
  const dc = finalInjector.get(DataConnect);
  const varsFactoryFn = (typeof args === 'function') ? args : () => args;
  return injectDataConnectQuery(() => {
    const addOpn = options && options();
    return {
      queryFn: () =>  listHotelsByUserRef(dc, varsFactoryFn()),
      ...addOpn
    };
  }, finalInjector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectListAllHotels(options, injector) {
  const finalInjector = injector || inject(EnvironmentInjector);
  const dc = finalInjector.get(DataConnect);
  return injectDataConnectQuery(() => {
    const addOpn = options && options();
    return {
      queryFn: () =>  listAllHotelsRef(dc),
      ...addOpn
    };
  }, finalInjector, CallerSdkTypeEnum.GeneratedAngular);
}

