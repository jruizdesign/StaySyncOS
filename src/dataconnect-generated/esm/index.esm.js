import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'default',
  service: 'gen-lang-client-0073207940-service',
  location: 'us-central1'
};

export const getFirstHotelRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetFirstHotel');
}
getFirstHotelRef.operationName = 'GetFirstHotel';

export function getFirstHotel(dc) {
  return executeQuery(getFirstHotelRef(dc));
}

export const listAvailableRoomsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAvailableRooms');
}
listAvailableRoomsRef.operationName = 'ListAvailableRooms';

export function listAvailableRooms(dc) {
  return executeQuery(listAvailableRoomsRef(dc));
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

export const createHotelRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateHotel', inputVars);
}
createHotelRef.operationName = 'CreateHotel';

export function createHotel(dcOrVars, vars) {
  return executeMutation(createHotelRef(dcOrVars, vars));
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

export const createGuestRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateGuest', inputVars);
}
createGuestRef.operationName = 'CreateGuest';

export function createGuest(dcOrVars, vars) {
  return executeMutation(createGuestRef(dcOrVars, vars));
}

export const createBookingRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateBooking', inputVars);
}
createBookingRef.operationName = 'CreateBooking';

export function createBooking(dcOrVars, vars) {
  return executeMutation(createBookingRef(dcOrVars, vars));
}

