# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `default`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `Angular README`, you can find it at [`dataconnect-generated/angular/README.md`](./angular/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListAvailableRooms*](#listavailablerooms)
  - [*GetHotelStaff*](#gethotelstaff)
- [**Mutations**](#mutations)
  - [*CreateNewGuest*](#createnewguest)
  - [*CreateMaintenanceRequest*](#createmaintenancerequest)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `default`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `default` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListAvailableRooms
You can execute the `ListAvailableRooms` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listAvailableRooms(): QueryPromise<ListAvailableRoomsData, undefined>;

interface ListAvailableRoomsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAvailableRoomsData, undefined>;
}
export const listAvailableRoomsRef: ListAvailableRoomsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listAvailableRooms(dc: DataConnect): QueryPromise<ListAvailableRoomsData, undefined>;

interface ListAvailableRoomsRef {
  ...
  (dc: DataConnect): QueryRef<ListAvailableRoomsData, undefined>;
}
export const listAvailableRoomsRef: ListAvailableRoomsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listAvailableRoomsRef:
```typescript
const name = listAvailableRoomsRef.operationName;
console.log(name);
```

### Variables
The `ListAvailableRooms` query has no variables.
### Return Type
Recall that executing the `ListAvailableRooms` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListAvailableRoomsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListAvailableRoomsData {
  rooms: ({
    id: UUIDString;
    roomNumber: string;
    roomType: string;
    capacity?: number | null;
    dailyRate?: number | null;
  } & Room_Key)[];
}
```
### Using `ListAvailableRooms`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listAvailableRooms } from '@dataconnect/generated';


// Call the `listAvailableRooms()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listAvailableRooms();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listAvailableRooms(dataConnect);

console.log(data.rooms);

// Or, you can use the `Promise` API.
listAvailableRooms().then((response) => {
  const data = response.data;
  console.log(data.rooms);
});
```

### Using `ListAvailableRooms`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listAvailableRoomsRef } from '@dataconnect/generated';


// Call the `listAvailableRoomsRef()` function to get a reference to the query.
const ref = listAvailableRoomsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listAvailableRoomsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.rooms);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.rooms);
});
```

## GetHotelStaff
You can execute the `GetHotelStaff` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getHotelStaff(vars: GetHotelStaffVariables): QueryPromise<GetHotelStaffData, GetHotelStaffVariables>;

interface GetHotelStaffRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetHotelStaffVariables): QueryRef<GetHotelStaffData, GetHotelStaffVariables>;
}
export const getHotelStaffRef: GetHotelStaffRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getHotelStaff(dc: DataConnect, vars: GetHotelStaffVariables): QueryPromise<GetHotelStaffData, GetHotelStaffVariables>;

interface GetHotelStaffRef {
  ...
  (dc: DataConnect, vars: GetHotelStaffVariables): QueryRef<GetHotelStaffData, GetHotelStaffVariables>;
}
export const getHotelStaffRef: GetHotelStaffRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getHotelStaffRef:
```typescript
const name = getHotelStaffRef.operationName;
console.log(name);
```

### Variables
The `GetHotelStaff` query requires an argument of type `GetHotelStaffVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetHotelStaffVariables {
  hotelId: UUIDString;
}
```
### Return Type
Recall that executing the `GetHotelStaff` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetHotelStaffData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetHotelStaffData {
  staffs: ({
    id: UUIDString;
    firstName: string;
    lastName: string;
    email?: string | null;
    role: string;
  } & Staff_Key)[];
}
```
### Using `GetHotelStaff`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getHotelStaff, GetHotelStaffVariables } from '@dataconnect/generated';

// The `GetHotelStaff` query requires an argument of type `GetHotelStaffVariables`:
const getHotelStaffVars: GetHotelStaffVariables = {
  hotelId: ..., 
};

// Call the `getHotelStaff()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getHotelStaff(getHotelStaffVars);
// Variables can be defined inline as well.
const { data } = await getHotelStaff({ hotelId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getHotelStaff(dataConnect, getHotelStaffVars);

console.log(data.staffs);

// Or, you can use the `Promise` API.
getHotelStaff(getHotelStaffVars).then((response) => {
  const data = response.data;
  console.log(data.staffs);
});
```

### Using `GetHotelStaff`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getHotelStaffRef, GetHotelStaffVariables } from '@dataconnect/generated';

// The `GetHotelStaff` query requires an argument of type `GetHotelStaffVariables`:
const getHotelStaffVars: GetHotelStaffVariables = {
  hotelId: ..., 
};

// Call the `getHotelStaffRef()` function to get a reference to the query.
const ref = getHotelStaffRef(getHotelStaffVars);
// Variables can be defined inline as well.
const ref = getHotelStaffRef({ hotelId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getHotelStaffRef(dataConnect, getHotelStaffVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.staffs);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.staffs);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `default` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateNewGuest
You can execute the `CreateNewGuest` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createNewGuest(): MutationPromise<CreateNewGuestData, undefined>;

interface CreateNewGuestRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateNewGuestData, undefined>;
}
export const createNewGuestRef: CreateNewGuestRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createNewGuest(dc: DataConnect): MutationPromise<CreateNewGuestData, undefined>;

interface CreateNewGuestRef {
  ...
  (dc: DataConnect): MutationRef<CreateNewGuestData, undefined>;
}
export const createNewGuestRef: CreateNewGuestRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createNewGuestRef:
```typescript
const name = createNewGuestRef.operationName;
console.log(name);
```

### Variables
The `CreateNewGuest` mutation has no variables.
### Return Type
Recall that executing the `CreateNewGuest` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateNewGuestData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateNewGuestData {
  guest_insert: Guest_Key;
}
```
### Using `CreateNewGuest`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createNewGuest } from '@dataconnect/generated';


// Call the `createNewGuest()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createNewGuest();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createNewGuest(dataConnect);

console.log(data.guest_insert);

// Or, you can use the `Promise` API.
createNewGuest().then((response) => {
  const data = response.data;
  console.log(data.guest_insert);
});
```

### Using `CreateNewGuest`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createNewGuestRef } from '@dataconnect/generated';


// Call the `createNewGuestRef()` function to get a reference to the mutation.
const ref = createNewGuestRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createNewGuestRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.guest_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.guest_insert);
});
```

## CreateMaintenanceRequest
You can execute the `CreateMaintenanceRequest` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createMaintenanceRequest(vars: CreateMaintenanceRequestVariables): MutationPromise<CreateMaintenanceRequestData, CreateMaintenanceRequestVariables>;

interface CreateMaintenanceRequestRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateMaintenanceRequestVariables): MutationRef<CreateMaintenanceRequestData, CreateMaintenanceRequestVariables>;
}
export const createMaintenanceRequestRef: CreateMaintenanceRequestRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createMaintenanceRequest(dc: DataConnect, vars: CreateMaintenanceRequestVariables): MutationPromise<CreateMaintenanceRequestData, CreateMaintenanceRequestVariables>;

interface CreateMaintenanceRequestRef {
  ...
  (dc: DataConnect, vars: CreateMaintenanceRequestVariables): MutationRef<CreateMaintenanceRequestData, CreateMaintenanceRequestVariables>;
}
export const createMaintenanceRequestRef: CreateMaintenanceRequestRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createMaintenanceRequestRef:
```typescript
const name = createMaintenanceRequestRef.operationName;
console.log(name);
```

### Variables
The `CreateMaintenanceRequest` mutation requires an argument of type `CreateMaintenanceRequestVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateMaintenanceRequestVariables {
  roomId: UUIDString;
  hotelId: UUIDString;
  description: string;
  requestDate: DateString;
}
```
### Return Type
Recall that executing the `CreateMaintenanceRequest` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateMaintenanceRequestData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateMaintenanceRequestData {
  maintenanceRequest_insert: MaintenanceRequest_Key;
}
```
### Using `CreateMaintenanceRequest`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createMaintenanceRequest, CreateMaintenanceRequestVariables } from '@dataconnect/generated';

// The `CreateMaintenanceRequest` mutation requires an argument of type `CreateMaintenanceRequestVariables`:
const createMaintenanceRequestVars: CreateMaintenanceRequestVariables = {
  roomId: ..., 
  hotelId: ..., 
  description: ..., 
  requestDate: ..., 
};

// Call the `createMaintenanceRequest()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createMaintenanceRequest(createMaintenanceRequestVars);
// Variables can be defined inline as well.
const { data } = await createMaintenanceRequest({ roomId: ..., hotelId: ..., description: ..., requestDate: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createMaintenanceRequest(dataConnect, createMaintenanceRequestVars);

console.log(data.maintenanceRequest_insert);

// Or, you can use the `Promise` API.
createMaintenanceRequest(createMaintenanceRequestVars).then((response) => {
  const data = response.data;
  console.log(data.maintenanceRequest_insert);
});
```

### Using `CreateMaintenanceRequest`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createMaintenanceRequestRef, CreateMaintenanceRequestVariables } from '@dataconnect/generated';

// The `CreateMaintenanceRequest` mutation requires an argument of type `CreateMaintenanceRequestVariables`:
const createMaintenanceRequestVars: CreateMaintenanceRequestVariables = {
  roomId: ..., 
  hotelId: ..., 
  description: ..., 
  requestDate: ..., 
};

// Call the `createMaintenanceRequestRef()` function to get a reference to the mutation.
const ref = createMaintenanceRequestRef(createMaintenanceRequestVars);
// Variables can be defined inline as well.
const ref = createMaintenanceRequestRef({ roomId: ..., hotelId: ..., description: ..., requestDate: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createMaintenanceRequestRef(dataConnect, createMaintenanceRequestVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.maintenanceRequest_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.maintenanceRequest_insert);
});
```

