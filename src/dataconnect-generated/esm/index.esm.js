import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'default',
  service: 'gen-lang-client-0073207940-service',
  location: 'us-central1'
};

export const createNewGuestRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateNewGuest');
}
createNewGuestRef.operationName = 'CreateNewGuest';

export function createNewGuest(dc) {
  return executeMutation(createNewGuestRef(dc));
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

export const createMaintenanceRequestRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateMaintenanceRequest', inputVars);
}
createMaintenanceRequestRef.operationName = 'CreateMaintenanceRequest';

export function createMaintenanceRequest(dcOrVars, vars) {
  return executeMutation(createMaintenanceRequestRef(dcOrVars, vars));
}

export const getHotelStaffRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetHotelStaff', inputVars);
}
getHotelStaffRef.operationName = 'GetHotelStaff';

export function getHotelStaff(dcOrVars, vars) {
  return executeQuery(getHotelStaffRef(dcOrVars, vars));
}

