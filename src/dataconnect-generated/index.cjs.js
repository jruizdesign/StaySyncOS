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
