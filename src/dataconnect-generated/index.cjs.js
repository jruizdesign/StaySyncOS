const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'gen-lang-client-0073207940-service',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

const listAvailableRoomsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAvailableRooms', inputVars);
}
listAvailableRoomsRef.operationName = 'ListAvailableRooms';
exports.listAvailableRoomsRef = listAvailableRoomsRef;

exports.listAvailableRooms = function listAvailableRooms(dcOrVars, vars) {
  return executeQuery(listAvailableRoomsRef(dcOrVars, vars));
};

const createRoomRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateRoom', inputVars);
}
createRoomRef.operationName = 'CreateRoom';
exports.createRoomRef = createRoomRef;

exports.createRoom = function createRoom(dcOrVars, vars) {
  return executeMutation(createRoomRef(dcOrVars, vars));
};

const updateRoomStatusRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateRoomStatus', inputVars);
}
updateRoomStatusRef.operationName = 'UpdateRoomStatus';
exports.updateRoomStatusRef = updateRoomStatusRef;

exports.updateRoomStatus = function updateRoomStatus(dcOrVars, vars) {
  return executeMutation(updateRoomStatusRef(dcOrVars, vars));
};

const createHotelRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateHotel', inputVars);
}
createHotelRef.operationName = 'CreateHotel';
exports.createHotelRef = createHotelRef;

exports.createHotel = function createHotel(dcOrVars, vars) {
  return executeMutation(createHotelRef(dcOrVars, vars));
};

const updateHotelConfigRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateHotelConfig', inputVars);
}
updateHotelConfigRef.operationName = 'UpdateHotelConfig';
exports.updateHotelConfigRef = updateHotelConfigRef;

exports.updateHotelConfig = function updateHotelConfig(dcOrVars, vars) {
  return executeMutation(updateHotelConfigRef(dcOrVars, vars));
};

const getFirstHotelRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetFirstHotel');
}
getFirstHotelRef.operationName = 'GetFirstHotel';
exports.getFirstHotelRef = getFirstHotelRef;

exports.getFirstHotel = function getFirstHotel(dc) {
  return executeQuery(getFirstHotelRef(dc));
};

const getHotelByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetHotelById', inputVars);
}
getHotelByIdRef.operationName = 'GetHotelById';
exports.getHotelByIdRef = getHotelByIdRef;

exports.getHotelById = function getHotelById(dcOrVars, vars) {
  return executeQuery(getHotelByIdRef(dcOrVars, vars));
};

const listAllHotelsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAllHotels');
}
listAllHotelsRef.operationName = 'ListAllHotels';
exports.listAllHotelsRef = listAllHotelsRef;

exports.listAllHotels = function listAllHotels(dc) {
  return executeQuery(listAllHotelsRef(dc));
};

const listGuestsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListGuests', inputVars);
}
listGuestsRef.operationName = 'ListGuests';
exports.listGuestsRef = listGuestsRef;

exports.listGuests = function listGuests(dcOrVars, vars) {
  return executeQuery(listGuestsRef(dcOrVars, vars));
};

const createGuestDcRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateGuestDC', inputVars);
}
createGuestDcRef.operationName = 'CreateGuestDC';
exports.createGuestDcRef = createGuestDcRef;

exports.createGuestDc = function createGuestDc(dcOrVars, vars) {
  return executeMutation(createGuestDcRef(dcOrVars, vars));
};

const updateGuestDcRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateGuestDC', inputVars);
}
updateGuestDcRef.operationName = 'UpdateGuestDC';
exports.updateGuestDcRef = updateGuestDcRef;

exports.updateGuestDc = function updateGuestDc(dcOrVars, vars) {
  return executeMutation(updateGuestDcRef(dcOrVars, vars));
};

const deleteGuestDcRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteGuestDC', inputVars);
}
deleteGuestDcRef.operationName = 'DeleteGuestDC';
exports.deleteGuestDcRef = deleteGuestDcRef;

exports.deleteGuestDc = function deleteGuestDc(dcOrVars, vars) {
  return executeMutation(deleteGuestDcRef(dcOrVars, vars));
};

const listBookingsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListBookings', inputVars);
}
listBookingsRef.operationName = 'ListBookings';
exports.listBookingsRef = listBookingsRef;

exports.listBookings = function listBookings(dcOrVars, vars) {
  return executeQuery(listBookingsRef(dcOrVars, vars));
};

const createBookingDcRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateBookingDC', inputVars);
}
createBookingDcRef.operationName = 'CreateBookingDC';
exports.createBookingDcRef = createBookingDcRef;

exports.createBookingDc = function createBookingDc(dcOrVars, vars) {
  return executeMutation(createBookingDcRef(dcOrVars, vars));
};

const updateBookingDcRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateBookingDC', inputVars);
}
updateBookingDcRef.operationName = 'UpdateBookingDC';
exports.updateBookingDcRef = updateBookingDcRef;

exports.updateBookingDc = function updateBookingDc(dcOrVars, vars) {
  return executeMutation(updateBookingDcRef(dcOrVars, vars));
};

const listLogsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListLogs', inputVars);
}
listLogsRef.operationName = 'ListLogs';
exports.listLogsRef = listLogsRef;

exports.listLogs = function listLogs(dcOrVars, vars) {
  return executeQuery(listLogsRef(dcOrVars, vars));
};

const createLogDcRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateLogDC', inputVars);
}
createLogDcRef.operationName = 'CreateLogDC';
exports.createLogDcRef = createLogDcRef;

exports.createLogDc = function createLogDc(dcOrVars, vars) {
  return executeMutation(createLogDcRef(dcOrVars, vars));
};

const listStaffRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListStaff', inputVars);
}
listStaffRef.operationName = 'ListStaff';
exports.listStaffRef = listStaffRef;

exports.listStaff = function listStaff(dcOrVars, vars) {
  return executeQuery(listStaffRef(dcOrVars, vars));
};

const createStaffDcRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateStaffDC', inputVars);
}
createStaffDcRef.operationName = 'CreateStaffDC';
exports.createStaffDcRef = createStaffDcRef;

exports.createStaffDc = function createStaffDc(dcOrVars, vars) {
  return executeMutation(createStaffDcRef(dcOrVars, vars));
};

const updateStaffDcRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateStaffDC', inputVars);
}
updateStaffDcRef.operationName = 'UpdateStaffDC';
exports.updateStaffDcRef = updateStaffDcRef;

exports.updateStaffDc = function updateStaffDc(dcOrVars, vars) {
  return executeMutation(updateStaffDcRef(dcOrVars, vars));
};

const listTimeLogsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListTimeLogs', inputVars);
}
listTimeLogsRef.operationName = 'ListTimeLogs';
exports.listTimeLogsRef = listTimeLogsRef;

exports.listTimeLogs = function listTimeLogs(dcOrVars, vars) {
  return executeQuery(listTimeLogsRef(dcOrVars, vars));
};

const createTimeLogDcRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateTimeLogDC', inputVars);
}
createTimeLogDcRef.operationName = 'CreateTimeLogDC';
exports.createTimeLogDcRef = createTimeLogDcRef;

exports.createTimeLogDc = function createTimeLogDc(dcOrVars, vars) {
  return executeMutation(createTimeLogDcRef(dcOrVars, vars));
};

const updateTimeLogDcRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateTimeLogDC', inputVars);
}
updateTimeLogDcRef.operationName = 'UpdateTimeLogDC';
exports.updateTimeLogDcRef = updateTimeLogDcRef;

exports.updateTimeLogDc = function updateTimeLogDc(dcOrVars, vars) {
  return executeMutation(updateTimeLogDcRef(dcOrVars, vars));
};

const listFinancialDocumentsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListFinancialDocuments', inputVars);
}
listFinancialDocumentsRef.operationName = 'ListFinancialDocuments';
exports.listFinancialDocumentsRef = listFinancialDocumentsRef;

exports.listFinancialDocuments = function listFinancialDocuments(dcOrVars, vars) {
  return executeQuery(listFinancialDocumentsRef(dcOrVars, vars));
};

const createFinancialDocumentDcRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateFinancialDocumentDC', inputVars);
}
createFinancialDocumentDcRef.operationName = 'CreateFinancialDocumentDC';
exports.createFinancialDocumentDcRef = createFinancialDocumentDcRef;

exports.createFinancialDocumentDc = function createFinancialDocumentDc(dcOrVars, vars) {
  return executeMutation(createFinancialDocumentDcRef(dcOrVars, vars));
};

const upsertUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertUser', inputVars);
}
upsertUserRef.operationName = 'UpsertUser';
exports.upsertUserRef = upsertUserRef;

exports.upsertUser = function upsertUser(dcOrVars, vars) {
  return executeMutation(upsertUserRef(dcOrVars, vars));
};

const linkUserToHotelRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'LinkUserToHotel', inputVars);
}
linkUserToHotelRef.operationName = 'LinkUserToHotel';
exports.linkUserToHotelRef = linkUserToHotelRef;

exports.linkUserToHotel = function linkUserToHotel(dcOrVars, vars) {
  return executeMutation(linkUserToHotelRef(dcOrVars, vars));
};

const listHotelsByUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListHotelsByUser', inputVars);
}
listHotelsByUserRef.operationName = 'ListHotelsByUser';
exports.listHotelsByUserRef = listHotelsByUserRef;

exports.listHotelsByUser = function listHotelsByUser(dcOrVars, vars) {
  return executeQuery(listHotelsByUserRef(dcOrVars, vars));
};

const listUsersDcRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListUsersDC');
}
listUsersDcRef.operationName = 'ListUsersDC';
exports.listUsersDcRef = listUsersDcRef;

exports.listUsersDc = function listUsersDc(dc) {
  return executeQuery(listUsersDcRef(dc));
};
