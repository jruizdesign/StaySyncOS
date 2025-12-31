const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'gen-lang-client-0073207940-service',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

const createNewGuestRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateNewGuest');
}
createNewGuestRef.operationName = 'CreateNewGuest';
exports.createNewGuestRef = createNewGuestRef;

exports.createNewGuest = function createNewGuest(dc) {
  return executeMutation(createNewGuestRef(dc));
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
