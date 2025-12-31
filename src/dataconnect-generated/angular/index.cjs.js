const { createNewGuestRef, listAvailableRoomsRef, createMaintenanceRequestRef, getHotelStaffRef } = require('../');
const { DataConnect, CallerSdkTypeEnum } = require('@angular/fire/data-connect');
const { injectDataConnectQuery, injectDataConnectMutation } = require('@tanstack-query-firebase/angular/data-connect');
const { inject, EnvironmentInjector } = require('@angular/core');

exports.injectCreateNewGuest = function injectCreateNewGuest(args, injector) {
  return injectDataConnectMutation(createNewGuestRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
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

