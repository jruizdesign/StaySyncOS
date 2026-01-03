const { listAvailableRoomsRef, createRoomRef, createHotelRef, updateRoomStatusRef, createGuestRef, createBookingRef, getFirstHotelRef, getHotelByIdRef, listHotelsByUserRef, listAllHotelsRef } = require('../');
const { DataConnect, CallerSdkTypeEnum } = require('@angular/fire/data-connect');
const { injectDataConnectQuery, injectDataConnectMutation } = require('@tanstack-query-firebase/angular/data-connect');
const { inject, EnvironmentInjector } = require('@angular/core');

exports.injectListAvailableRooms = function injectListAvailableRooms(args, options, injector) {
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

exports.injectGetHotelById = function injectGetHotelById(args, options, injector) {
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

exports.injectListHotelsByUser = function injectListHotelsByUser(args, options, injector) {
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

exports.injectListAllHotels = function injectListAllHotels(options, injector) {
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

