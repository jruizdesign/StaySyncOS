const { listAvailableRoomsRef, createRoomRef, createHotelRef, updateRoomStatusRef, createGuestRef, createBookingRef, getFirstHotelRef } = require('../');
const { DataConnect, CallerSdkTypeEnum } = require('@angular/fire/data-connect');
const { injectDataConnectQuery, injectDataConnectMutation } = require('@tanstack-query-firebase/angular/data-connect');
const { inject, EnvironmentInjector } = require('@angular/core');

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

exports.injectCreateRoom = function injectCreateRoom(args, injector) {
  return injectDataConnectMutation(createRoomRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectCreateHotel = function injectCreateHotel(args, injector) {
  return injectDataConnectMutation(createHotelRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectUpdateRoomStatus = function injectUpdateRoomStatus(args, injector) {
  return injectDataConnectMutation(updateRoomStatusRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectCreateGuest = function injectCreateGuest(args, injector) {
  return injectDataConnectMutation(createGuestRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectCreateBooking = function injectCreateBooking(args, injector) {
  return injectDataConnectMutation(createBookingRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
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

