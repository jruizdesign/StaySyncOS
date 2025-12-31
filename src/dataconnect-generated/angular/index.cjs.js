const { createHotelRef, getFirstHotelRef, createRoomRef, createGuestRef, createBookingRef, updateRoomStatusRef, listAvailableRoomsRef, createMaintenanceRequestRef, getHotelStaffRef } = require('../');
const { DataConnect, CallerSdkTypeEnum } = require('@angular/fire/data-connect');
const { injectDataConnectQuery, injectDataConnectMutation } = require('@tanstack-query-firebase/angular/data-connect');
const { inject, EnvironmentInjector } = require('@angular/core');

exports.injectCreateHotel = function injectCreateHotel(args, injector) {
  return injectDataConnectMutation(createHotelRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectGetFirstHotel = function injectGetFirstHotel(options, injector) {
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

exports.injectCreateRoom = function injectCreateRoom(args, injector) {
  return injectDataConnectMutation(createRoomRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectCreateGuest = function injectCreateGuest(args, injector) {
  return injectDataConnectMutation(createGuestRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectCreateBooking = function injectCreateBooking(args, injector) {
  return injectDataConnectMutation(createBookingRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectUpdateRoomStatus = function injectUpdateRoomStatus(args, injector) {
  return injectDataConnectMutation(updateRoomStatusRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectListAvailableRooms = function injectListAvailableRooms(options, injector) {
  const finalInjector = injector || inject(EnvironmentInjector);
  const dc = finalInjector.get(DataConnect);
  return injectDataConnectQuery(() => {
    const addOpn = options && options();
    return {
      queryFn: () =>  listAvailableRoomsRef(dc),
      ...addOpn
    };
  }, finalInjector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectCreateMaintenanceRequest = function injectCreateMaintenanceRequest(args, injector) {
  return injectDataConnectMutation(createMaintenanceRequestRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectGetHotelStaff = function injectGetHotelStaff(args, options, injector) {
  const finalInjector = injector || inject(EnvironmentInjector);
  const dc = finalInjector.get(DataConnect);
  const varsFactoryFn = (typeof args === 'function') ? args : () => args;
  return injectDataConnectQuery(() => {
    const addOpn = options && options();
    return {
      queryFn: () =>  getHotelStaffRef(dc, varsFactoryFn()),
      ...addOpn
    };
  }, finalInjector, CallerSdkTypeEnum.GeneratedAngular);
}

