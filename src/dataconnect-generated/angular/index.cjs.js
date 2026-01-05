const { listAvailableRoomsRef, createRoomRef, updateRoomStatusRef, createHotelRef, updateHotelConfigRef, getFirstHotelRef, getHotelByIdRef, listAllHotelsRef, listGuestsRef, createGuestDcRef, updateGuestDcRef, deleteGuestDcRef, listBookingsRef, createBookingDcRef, updateBookingDcRef, listLogsRef, createLogDcRef, listStaffRef, createStaffDcRef, updateStaffDcRef, listTimeLogsRef, createTimeLogDcRef, updateTimeLogDcRef, listFinancialDocumentsRef, createFinancialDocumentDcRef, upsertUserRef, linkUserToHotelRef, listHotelsByUserRef, listUsersDcRef, listMaintenanceRef, createMaintenanceDcRef, listShiftsRef, createShiftDcRef, listHousekeepingRef, createHousekeepingTaskDcRef, listInventoryRef, upsertInventoryItemDcRef, listAmenitiesRef, createAmenityDcRef, listStoredDocumentsRef, createStoredDocumentDcRef, seedRoomsRef, seedStaffRef, seedInventoryRef, seedAmenitiesRef } = require('../');
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

exports.injectUpdateRoomStatus = function injectUpdateRoomStatus(args, injector) {
  return injectDataConnectMutation(updateRoomStatusRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectCreateHotel = function injectCreateHotel(args, injector) {
  return injectDataConnectMutation(createHotelRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectUpdateHotelConfig = function injectUpdateHotelConfig(args, injector) {
  return injectDataConnectMutation(updateHotelConfigRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
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

exports.injectListGuests = function injectListGuests(args, options, injector) {
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

exports.injectCreateGuestDc = function injectCreateGuestDc(args, injector) {
  return injectDataConnectMutation(createGuestDcRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectUpdateGuestDc = function injectUpdateGuestDc(args, injector) {
  return injectDataConnectMutation(updateGuestDcRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectDeleteGuestDc = function injectDeleteGuestDc(args, injector) {
  return injectDataConnectMutation(deleteGuestDcRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectListBookings = function injectListBookings(args, options, injector) {
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

exports.injectCreateBookingDc = function injectCreateBookingDc(args, injector) {
  return injectDataConnectMutation(createBookingDcRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectUpdateBookingDc = function injectUpdateBookingDc(args, injector) {
  return injectDataConnectMutation(updateBookingDcRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectListLogs = function injectListLogs(args, options, injector) {
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

exports.injectCreateLogDc = function injectCreateLogDc(args, injector) {
  return injectDataConnectMutation(createLogDcRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectListStaff = function injectListStaff(args, options, injector) {
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

exports.injectCreateStaffDc = function injectCreateStaffDc(args, injector) {
  return injectDataConnectMutation(createStaffDcRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectUpdateStaffDc = function injectUpdateStaffDc(args, injector) {
  return injectDataConnectMutation(updateStaffDcRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectListTimeLogs = function injectListTimeLogs(args, options, injector) {
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

exports.injectCreateTimeLogDc = function injectCreateTimeLogDc(args, injector) {
  return injectDataConnectMutation(createTimeLogDcRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectUpdateTimeLogDc = function injectUpdateTimeLogDc(args, injector) {
  return injectDataConnectMutation(updateTimeLogDcRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectListFinancialDocuments = function injectListFinancialDocuments(args, options, injector) {
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

exports.injectCreateFinancialDocumentDc = function injectCreateFinancialDocumentDc(args, injector) {
  return injectDataConnectMutation(createFinancialDocumentDcRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectUpsertUser = function injectUpsertUser(args, injector) {
  return injectDataConnectMutation(upsertUserRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectLinkUserToHotel = function injectLinkUserToHotel(args, injector) {
  return injectDataConnectMutation(linkUserToHotelRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
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

exports.injectListUsersDc = function injectListUsersDc(options, injector) {
  const finalInjector = injector || inject(EnvironmentInjector);
  const dc = finalInjector.get(DataConnect);
  return injectDataConnectQuery(() => {
    const addOpn = options && options();
    return {
      queryFn: () =>  listUsersDcRef(dc),
      ...addOpn
    };
  }, finalInjector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectListMaintenance = function injectListMaintenance(args, options, injector) {
  const finalInjector = injector || inject(EnvironmentInjector);
  const dc = finalInjector.get(DataConnect);
  const varsFactoryFn = (typeof args === 'function') ? args : () => args;
  return injectDataConnectQuery(() => {
    const addOpn = options && options();
    return {
      queryFn: () =>  listMaintenanceRef(dc, varsFactoryFn()),
      ...addOpn
    };
  }, finalInjector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectCreateMaintenanceDc = function injectCreateMaintenanceDc(args, injector) {
  return injectDataConnectMutation(createMaintenanceDcRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectListShifts = function injectListShifts(args, options, injector) {
  const finalInjector = injector || inject(EnvironmentInjector);
  const dc = finalInjector.get(DataConnect);
  const varsFactoryFn = (typeof args === 'function') ? args : () => args;
  return injectDataConnectQuery(() => {
    const addOpn = options && options();
    return {
      queryFn: () =>  listShiftsRef(dc, varsFactoryFn()),
      ...addOpn
    };
  }, finalInjector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectCreateShiftDc = function injectCreateShiftDc(args, injector) {
  return injectDataConnectMutation(createShiftDcRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectListHousekeeping = function injectListHousekeeping(args, options, injector) {
  const finalInjector = injector || inject(EnvironmentInjector);
  const dc = finalInjector.get(DataConnect);
  const varsFactoryFn = (typeof args === 'function') ? args : () => args;
  return injectDataConnectQuery(() => {
    const addOpn = options && options();
    return {
      queryFn: () =>  listHousekeepingRef(dc, varsFactoryFn()),
      ...addOpn
    };
  }, finalInjector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectCreateHousekeepingTaskDc = function injectCreateHousekeepingTaskDc(args, injector) {
  return injectDataConnectMutation(createHousekeepingTaskDcRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectListInventory = function injectListInventory(args, options, injector) {
  const finalInjector = injector || inject(EnvironmentInjector);
  const dc = finalInjector.get(DataConnect);
  const varsFactoryFn = (typeof args === 'function') ? args : () => args;
  return injectDataConnectQuery(() => {
    const addOpn = options && options();
    return {
      queryFn: () =>  listInventoryRef(dc, varsFactoryFn()),
      ...addOpn
    };
  }, finalInjector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectUpsertInventoryItemDc = function injectUpsertInventoryItemDc(args, injector) {
  return injectDataConnectMutation(upsertInventoryItemDcRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectListAmenities = function injectListAmenities(args, options, injector) {
  const finalInjector = injector || inject(EnvironmentInjector);
  const dc = finalInjector.get(DataConnect);
  const varsFactoryFn = (typeof args === 'function') ? args : () => args;
  return injectDataConnectQuery(() => {
    const addOpn = options && options();
    return {
      queryFn: () =>  listAmenitiesRef(dc, varsFactoryFn()),
      ...addOpn
    };
  }, finalInjector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectCreateAmenityDc = function injectCreateAmenityDc(args, injector) {
  return injectDataConnectMutation(createAmenityDcRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectListStoredDocuments = function injectListStoredDocuments(args, options, injector) {
  const finalInjector = injector || inject(EnvironmentInjector);
  const dc = finalInjector.get(DataConnect);
  const varsFactoryFn = (typeof args === 'function') ? args : () => args;
  return injectDataConnectQuery(() => {
    const addOpn = options && options();
    return {
      queryFn: () =>  listStoredDocumentsRef(dc, varsFactoryFn()),
      ...addOpn
    };
  }, finalInjector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectCreateStoredDocumentDc = function injectCreateStoredDocumentDc(args, injector) {
  return injectDataConnectMutation(createStoredDocumentDcRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectSeedRooms = function injectSeedRooms(args, injector) {
  return injectDataConnectMutation(seedRoomsRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectSeedStaff = function injectSeedStaff(args, injector) {
  return injectDataConnectMutation(seedStaffRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectSeedInventory = function injectSeedInventory(args, injector) {
  return injectDataConnectMutation(seedInventoryRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectSeedAmenities = function injectSeedAmenities(args, injector) {
  return injectDataConnectMutation(seedAmenitiesRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

