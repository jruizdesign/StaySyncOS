import { listAvailableRoomsRef, createRoomRef, updateRoomStatusRef, createHotelRef, updateHotelConfigRef, getFirstHotelRef, getHotelByIdRef, listAllHotelsRef, listGuestsRef, createGuestDcRef, updateGuestDcRef, deleteGuestDcRef, listBookingsRef, createBookingDcRef, updateBookingDcRef, listLogsRef, createLogDcRef, listStaffRef, createStaffDcRef, updateStaffDcRef, listTimeLogsRef, createTimeLogDcRef, updateTimeLogDcRef, listFinancialDocumentsRef, createFinancialDocumentDcRef, upsertUserRef, linkUserToHotelRef, listHotelsByUserRef } from '../../';
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

export function injectUpdateRoomStatus(args, injector) {
  return injectDataConnectMutation(updateRoomStatusRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectCreateHotel(args, injector) {
  return injectDataConnectMutation(createHotelRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectUpdateHotelConfig(args, injector) {
  return injectDataConnectMutation(updateHotelConfigRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
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

export function injectListGuests(args, options, injector) {
  const finalInjector = injector || inject(EnvironmentInjector);
  const dc = finalInjector.get(DataConnect);
  const varsFactoryFn = (typeof args === 'function') ? args : () => args;
  return injectDataConnectQuery(() => {
    const addOpn = options && options();
    return {
      queryFn: () =>  listGuestsRef(dc, varsFactoryFn()),
      ...addOpn
    };
  }, finalInjector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectCreateGuestDc(args, injector) {
  return injectDataConnectMutation(createGuestDcRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectUpdateGuestDc(args, injector) {
  return injectDataConnectMutation(updateGuestDcRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectDeleteGuestDc(args, injector) {
  return injectDataConnectMutation(deleteGuestDcRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectListBookings(args, options, injector) {
  const finalInjector = injector || inject(EnvironmentInjector);
  const dc = finalInjector.get(DataConnect);
  const varsFactoryFn = (typeof args === 'function') ? args : () => args;
  return injectDataConnectQuery(() => {
    const addOpn = options && options();
    return {
      queryFn: () =>  listBookingsRef(dc, varsFactoryFn()),
      ...addOpn
    };
  }, finalInjector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectCreateBookingDc(args, injector) {
  return injectDataConnectMutation(createBookingDcRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectUpdateBookingDc(args, injector) {
  return injectDataConnectMutation(updateBookingDcRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectListLogs(args, options, injector) {
  const finalInjector = injector || inject(EnvironmentInjector);
  const dc = finalInjector.get(DataConnect);
  const varsFactoryFn = (typeof args === 'function') ? args : () => args;
  return injectDataConnectQuery(() => {
    const addOpn = options && options();
    return {
      queryFn: () =>  listLogsRef(dc, varsFactoryFn()),
      ...addOpn
    };
  }, finalInjector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectCreateLogDc(args, injector) {
  return injectDataConnectMutation(createLogDcRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectListStaff(args, options, injector) {
  const finalInjector = injector || inject(EnvironmentInjector);
  const dc = finalInjector.get(DataConnect);
  const varsFactoryFn = (typeof args === 'function') ? args : () => args;
  return injectDataConnectQuery(() => {
    const addOpn = options && options();
    return {
      queryFn: () =>  listStaffRef(dc, varsFactoryFn()),
      ...addOpn
    };
  }, finalInjector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectCreateStaffDc(args, injector) {
  return injectDataConnectMutation(createStaffDcRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectUpdateStaffDc(args, injector) {
  return injectDataConnectMutation(updateStaffDcRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectListTimeLogs(args, options, injector) {
  const finalInjector = injector || inject(EnvironmentInjector);
  const dc = finalInjector.get(DataConnect);
  const varsFactoryFn = (typeof args === 'function') ? args : () => args;
  return injectDataConnectQuery(() => {
    const addOpn = options && options();
    return {
      queryFn: () =>  listTimeLogsRef(dc, varsFactoryFn()),
      ...addOpn
    };
  }, finalInjector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectCreateTimeLogDc(args, injector) {
  return injectDataConnectMutation(createTimeLogDcRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectUpdateTimeLogDc(args, injector) {
  return injectDataConnectMutation(updateTimeLogDcRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectListFinancialDocuments(args, options, injector) {
  const finalInjector = injector || inject(EnvironmentInjector);
  const dc = finalInjector.get(DataConnect);
  const varsFactoryFn = (typeof args === 'function') ? args : () => args;
  return injectDataConnectQuery(() => {
    const addOpn = options && options();
    return {
      queryFn: () =>  listFinancialDocumentsRef(dc, varsFactoryFn()),
      ...addOpn
    };
  }, finalInjector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectCreateFinancialDocumentDc(args, injector) {
  return injectDataConnectMutation(createFinancialDocumentDcRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectUpsertUser(args, injector) {
  return injectDataConnectMutation(upsertUserRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectLinkUserToHotel(args, injector) {
  return injectDataConnectMutation(linkUserToHotelRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
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

