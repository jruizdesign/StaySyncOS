import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'default',
  service: 'gen-lang-client-0073207940-service',
  location: 'us-central1'
};

export const listAvailableRoomsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAvailableRooms', inputVars);
}
listAvailableRoomsRef.operationName = 'ListAvailableRooms';

export function listAvailableRooms(dcOrVars, vars) {
  return executeQuery(listAvailableRoomsRef(dcOrVars, vars));
}

export const createRoomRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateRoom', inputVars);
}
createRoomRef.operationName = 'CreateRoom';

export function createRoom(dcOrVars, vars) {
  return executeMutation(createRoomRef(dcOrVars, vars));
}

export const updateRoomStatusRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateRoomStatus', inputVars);
}
updateRoomStatusRef.operationName = 'UpdateRoomStatus';

export function updateRoomStatus(dcOrVars, vars) {
  return executeMutation(updateRoomStatusRef(dcOrVars, vars));
}

export const createHotelRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateHotel', inputVars);
}
createHotelRef.operationName = 'CreateHotel';

export function createHotel(dcOrVars, vars) {
  return executeMutation(createHotelRef(dcOrVars, vars));
}

export const updateHotelConfigRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateHotelConfig', inputVars);
}
updateHotelConfigRef.operationName = 'UpdateHotelConfig';

export function updateHotelConfig(dcOrVars, vars) {
  return executeMutation(updateHotelConfigRef(dcOrVars, vars));
}

export const getFirstHotelRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetFirstHotel');
}
getFirstHotelRef.operationName = 'GetFirstHotel';

export function getFirstHotel(dc) {
  return executeQuery(getFirstHotelRef(dc));
}

export const getHotelByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetHotelById', inputVars);
}
getHotelByIdRef.operationName = 'GetHotelById';

export function getHotelById(dcOrVars, vars) {
  return executeQuery(getHotelByIdRef(dcOrVars, vars));
}

export const listAllHotelsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAllHotels');
}
listAllHotelsRef.operationName = 'ListAllHotels';

export function listAllHotels(dc) {
  return executeQuery(listAllHotelsRef(dc));
}

export const listGuestsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListGuests', inputVars);
}
listGuestsRef.operationName = 'ListGuests';

export function listGuests(dcOrVars, vars) {
  return executeQuery(listGuestsRef(dcOrVars, vars));
}

export const createGuestDcRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateGuestDC', inputVars);
}
createGuestDcRef.operationName = 'CreateGuestDC';

export function createGuestDc(dcOrVars, vars) {
  return executeMutation(createGuestDcRef(dcOrVars, vars));
}

export const updateGuestDcRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateGuestDC', inputVars);
}
updateGuestDcRef.operationName = 'UpdateGuestDC';

export function updateGuestDc(dcOrVars, vars) {
  return executeMutation(updateGuestDcRef(dcOrVars, vars));
}

export const deleteGuestDcRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteGuestDC', inputVars);
}
deleteGuestDcRef.operationName = 'DeleteGuestDC';

export function deleteGuestDc(dcOrVars, vars) {
  return executeMutation(deleteGuestDcRef(dcOrVars, vars));
}

export const listBookingsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListBookings', inputVars);
}
listBookingsRef.operationName = 'ListBookings';

export function listBookings(dcOrVars, vars) {
  return executeQuery(listBookingsRef(dcOrVars, vars));
}

export const createBookingDcRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateBookingDC', inputVars);
}
createBookingDcRef.operationName = 'CreateBookingDC';

export function createBookingDc(dcOrVars, vars) {
  return executeMutation(createBookingDcRef(dcOrVars, vars));
}

export const updateBookingDcRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateBookingDC', inputVars);
}
updateBookingDcRef.operationName = 'UpdateBookingDC';

export function updateBookingDc(dcOrVars, vars) {
  return executeMutation(updateBookingDcRef(dcOrVars, vars));
}

export const listLogsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListLogs', inputVars);
}
listLogsRef.operationName = 'ListLogs';

export function listLogs(dcOrVars, vars) {
  return executeQuery(listLogsRef(dcOrVars, vars));
}

export const createLogDcRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateLogDC', inputVars);
}
createLogDcRef.operationName = 'CreateLogDC';

export function createLogDc(dcOrVars, vars) {
  return executeMutation(createLogDcRef(dcOrVars, vars));
}

export const listStaffRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListStaff', inputVars);
}
listStaffRef.operationName = 'ListStaff';

export function listStaff(dcOrVars, vars) {
  return executeQuery(listStaffRef(dcOrVars, vars));
}

export const createStaffDcRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateStaffDC', inputVars);
}
createStaffDcRef.operationName = 'CreateStaffDC';

export function createStaffDc(dcOrVars, vars) {
  return executeMutation(createStaffDcRef(dcOrVars, vars));
}

export const updateStaffDcRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateStaffDC', inputVars);
}
updateStaffDcRef.operationName = 'UpdateStaffDC';

export function updateStaffDc(dcOrVars, vars) {
  return executeMutation(updateStaffDcRef(dcOrVars, vars));
}

export const listTimeLogsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListTimeLogs', inputVars);
}
listTimeLogsRef.operationName = 'ListTimeLogs';

export function listTimeLogs(dcOrVars, vars) {
  return executeQuery(listTimeLogsRef(dcOrVars, vars));
}

export const createTimeLogDcRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateTimeLogDC', inputVars);
}
createTimeLogDcRef.operationName = 'CreateTimeLogDC';

export function createTimeLogDc(dcOrVars, vars) {
  return executeMutation(createTimeLogDcRef(dcOrVars, vars));
}

export const updateTimeLogDcRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateTimeLogDC', inputVars);
}
updateTimeLogDcRef.operationName = 'UpdateTimeLogDC';

export function updateTimeLogDc(dcOrVars, vars) {
  return executeMutation(updateTimeLogDcRef(dcOrVars, vars));
}

export const listFinancialDocumentsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListFinancialDocuments', inputVars);
}
listFinancialDocumentsRef.operationName = 'ListFinancialDocuments';

export function listFinancialDocuments(dcOrVars, vars) {
  return executeQuery(listFinancialDocumentsRef(dcOrVars, vars));
}

export const createFinancialDocumentDcRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateFinancialDocumentDC', inputVars);
}
createFinancialDocumentDcRef.operationName = 'CreateFinancialDocumentDC';

export function createFinancialDocumentDc(dcOrVars, vars) {
  return executeMutation(createFinancialDocumentDcRef(dcOrVars, vars));
}

export const upsertUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertUser', inputVars);
}
upsertUserRef.operationName = 'UpsertUser';

export function upsertUser(dcOrVars, vars) {
  return executeMutation(upsertUserRef(dcOrVars, vars));
}

export const linkUserToHotelRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'LinkUserToHotel', inputVars);
}
linkUserToHotelRef.operationName = 'LinkUserToHotel';

export function linkUserToHotel(dcOrVars, vars) {
  return executeMutation(linkUserToHotelRef(dcOrVars, vars));
}

export const listHotelsByUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListHotelsByUser', inputVars);
}
listHotelsByUserRef.operationName = 'ListHotelsByUser';

export function listHotelsByUser(dcOrVars, vars) {
  return executeQuery(listHotelsByUserRef(dcOrVars, vars));
}

export const listUsersDcRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListUsersDC');
}
listUsersDcRef.operationName = 'ListUsersDC';

export function listUsersDc(dc) {
  return executeQuery(listUsersDcRef(dc));
}

export const listMaintenanceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListMaintenance', inputVars);
}
listMaintenanceRef.operationName = 'ListMaintenance';

export function listMaintenance(dcOrVars, vars) {
  return executeQuery(listMaintenanceRef(dcOrVars, vars));
}

export const createMaintenanceDcRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateMaintenanceDC', inputVars);
}
createMaintenanceDcRef.operationName = 'CreateMaintenanceDC';

export function createMaintenanceDc(dcOrVars, vars) {
  return executeMutation(createMaintenanceDcRef(dcOrVars, vars));
}

export const listShiftsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListShifts', inputVars);
}
listShiftsRef.operationName = 'ListShifts';

export function listShifts(dcOrVars, vars) {
  return executeQuery(listShiftsRef(dcOrVars, vars));
}

export const createShiftDcRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateShiftDC', inputVars);
}
createShiftDcRef.operationName = 'CreateShiftDC';

export function createShiftDc(dcOrVars, vars) {
  return executeMutation(createShiftDcRef(dcOrVars, vars));
}

export const listHousekeepingRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListHousekeeping', inputVars);
}
listHousekeepingRef.operationName = 'ListHousekeeping';

export function listHousekeeping(dcOrVars, vars) {
  return executeQuery(listHousekeepingRef(dcOrVars, vars));
}

export const createHousekeepingTaskDcRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateHousekeepingTaskDC', inputVars);
}
createHousekeepingTaskDcRef.operationName = 'CreateHousekeepingTaskDC';

export function createHousekeepingTaskDc(dcOrVars, vars) {
  return executeMutation(createHousekeepingTaskDcRef(dcOrVars, vars));
}

export const listInventoryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListInventory', inputVars);
}
listInventoryRef.operationName = 'ListInventory';

export function listInventory(dcOrVars, vars) {
  return executeQuery(listInventoryRef(dcOrVars, vars));
}

export const upsertInventoryItemDcRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertInventoryItemDC', inputVars);
}
upsertInventoryItemDcRef.operationName = 'UpsertInventoryItemDC';

export function upsertInventoryItemDc(dcOrVars, vars) {
  return executeMutation(upsertInventoryItemDcRef(dcOrVars, vars));
}

export const listAmenitiesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAmenities', inputVars);
}
listAmenitiesRef.operationName = 'ListAmenities';

export function listAmenities(dcOrVars, vars) {
  return executeQuery(listAmenitiesRef(dcOrVars, vars));
}

export const createAmenityDcRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateAmenityDC', inputVars);
}
createAmenityDcRef.operationName = 'CreateAmenityDC';

export function createAmenityDc(dcOrVars, vars) {
  return executeMutation(createAmenityDcRef(dcOrVars, vars));
}

export const listStoredDocumentsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListStoredDocuments', inputVars);
}
listStoredDocumentsRef.operationName = 'ListStoredDocuments';

export function listStoredDocuments(dcOrVars, vars) {
  return executeQuery(listStoredDocumentsRef(dcOrVars, vars));
}

export const createStoredDocumentDcRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateStoredDocumentDC', inputVars);
}
createStoredDocumentDcRef.operationName = 'CreateStoredDocumentDC';

export function createStoredDocumentDc(dcOrVars, vars) {
  return executeMutation(createStoredDocumentDcRef(dcOrVars, vars));
}

export const seedRoomsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedRooms', inputVars);
}
seedRoomsRef.operationName = 'SeedRooms';

export function seedRooms(dcOrVars, vars) {
  return executeMutation(seedRoomsRef(dcOrVars, vars));
}

export const seedStaffRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedStaff', inputVars);
}
seedStaffRef.operationName = 'SeedStaff';

export function seedStaff(dcOrVars, vars) {
  return executeMutation(seedStaffRef(dcOrVars, vars));
}

export const seedInventoryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedInventory', inputVars);
}
seedInventoryRef.operationName = 'SeedInventory';

export function seedInventory(dcOrVars, vars) {
  return executeMutation(seedInventoryRef(dcOrVars, vars));
}

export const seedAmenitiesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedAmenities', inputVars);
}
seedAmenitiesRef.operationName = 'SeedAmenities';

export function seedAmenities(dcOrVars, vars) {
  return executeMutation(seedAmenitiesRef(dcOrVars, vars));
}

