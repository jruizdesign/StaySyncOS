const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'gen-lang-client-0073207940-service',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

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

const createGuestRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateGuest', inputVars);
}
createGuestRef.operationName = 'CreateGuest';
exports.createGuestRef = createGuestRef;

exports.createGuest = function createGuest(dcOrVars, vars) {
  return executeMutation(createGuestRef(dcOrVars, vars));
};

const createBookingRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateBooking', inputVars);
}
createBookingRef.operationName = 'CreateBooking';
exports.createBookingRef = createBookingRef;

exports.createBooking = function createBooking(dcOrVars, vars) {
  return executeMutation(createBookingRef(dcOrVars, vars));
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

const listAvailableRoomsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAvailableRooms');
}
listAvailableRoomsRef.operationName = 'ListAvailableRooms';
exports.listAvailableRoomsRef = listAvailableRoomsRef;

exports.listAvailableRooms = function listAvailableRooms(dc) {
  return executeQuery(listAvailableRoomsRef(dc));
};

const createMaintenanceRequestRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateMaintenanceRequest', inputVars);
}
createMaintenanceRequestRef.operationName = 'CreateMaintenanceRequest';
exports.createMaintenanceRequestRef = createMaintenanceRequestRef;

exports.createMaintenanceRequest = function createMaintenanceRequest(dcOrVars, vars) {
  return executeMutation(createMaintenanceRequestRef(dcOrVars, vars));
};

const getHotelStaffRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetHotelStaff', inputVars);
}
getHotelStaffRef.operationName = 'GetHotelStaff';
exports.getHotelStaffRef = getHotelStaffRef;

exports.getHotelStaff = function getHotelStaff(dcOrVars, vars) {
  return executeQuery(getHotelStaffRef(dcOrVars, vars));
};
