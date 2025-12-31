# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `default`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `Angular README`, you can find it at [`dataconnect-generated/angular/README.md`](./angular/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetFirstHotel*](#getfirsthotel)
  - [*ListAvailableRooms*](#listavailablerooms)
  - [*GetHotelStaff*](#gethotelstaff)
- [**Mutations**](#mutations)
  - [*CreateHotel*](#createhotel)
  - [*CreateRoom*](#createroom)
  - [*CreateGuest*](#createguest)
  - [*CreateBooking*](#createbooking)
  - [*UpdateRoomStatus*](#updateroomstatus)
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

## GetFirstHotel
You can execute the `GetFirstHotel` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getFirstHotel(): QueryPromise<GetFirstHotelData, undefined>;

interface GetFirstHotelRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetFirstHotelData, undefined>;
}
export const getFirstHotelRef: GetFirstHotelRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getFirstHotel(dc: DataConnect): QueryPromise<GetFirstHotelData, undefined>;

interface GetFirstHotelRef {
  ...
  (dc: DataConnect): QueryRef<GetFirstHotelData, undefined>;
}
export const getFirstHotelRef: GetFirstHotelRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getFirstHotelRef:
```typescript
const name = getFirstHotelRef.operationName;
console.log(name);
```

### Variables
The `GetFirstHotel` query has no variables.
### Return Type
Recall that executing the `GetFirstHotel` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetFirstHotelData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetFirstHotelData {
  hotels: ({
    id: UUIDString;
    name: string;
  } & Hotel_Key)[];
}
```
### Using `GetFirstHotel`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getFirstHotel } from '@dataconnect/generated';


// Call the `getFirstHotel()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getFirstHotel();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getFirstHotel(dataConnect);

console.log(data.hotels);

// Or, you can use the `Promise` API.
getFirstHotel().then((response) => {
  const data = response.data;
  console.log(data.hotels);
});
```

### Using `GetFirstHotel`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getFirstHotelRef } from '@dataconnect/generated';


// Call the `getFirstHotelRef()` function to get a reference to the query.
const ref = getFirstHotelRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getFirstHotelRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.hotels);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.hotels);
});
```

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
    status: string;
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

## CreateHotel
You can execute the `CreateHotel` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createHotel(vars: CreateHotelVariables): MutationPromise<CreateHotelData, CreateHotelVariables>;

interface CreateHotelRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateHotelVariables): MutationRef<CreateHotelData, CreateHotelVariables>;
}
export const createHotelRef: CreateHotelRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createHotel(dc: DataConnect, vars: CreateHotelVariables): MutationPromise<CreateHotelData, CreateHotelVariables>;

interface CreateHotelRef {
  ...
  (dc: DataConnect, vars: CreateHotelVariables): MutationRef<CreateHotelData, CreateHotelVariables>;
}
export const createHotelRef: CreateHotelRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createHotelRef:
```typescript
const name = createHotelRef.operationName;
console.log(name);
```

### Variables
The `CreateHotel` mutation requires an argument of type `CreateHotelVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateHotelVariables {
  name: string;
  address: string;
  propertyId: string;
}
```
### Return Type
Recall that executing the `CreateHotel` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateHotelData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateHotelData {
  hotel_insert: Hotel_Key;
}
```
### Using `CreateHotel`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createHotel, CreateHotelVariables } from '@dataconnect/generated';

// The `CreateHotel` mutation requires an argument of type `CreateHotelVariables`:
const createHotelVars: CreateHotelVariables = {
  name: ..., 
  address: ..., 
  propertyId: ..., 
};

// Call the `createHotel()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createHotel(createHotelVars);
// Variables can be defined inline as well.
const { data } = await createHotel({ name: ..., address: ..., propertyId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createHotel(dataConnect, createHotelVars);

console.log(data.hotel_insert);

// Or, you can use the `Promise` API.
createHotel(createHotelVars).then((response) => {
  const data = response.data;
  console.log(data.hotel_insert);
});
```

### Using `CreateHotel`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createHotelRef, CreateHotelVariables } from '@dataconnect/generated';

// The `CreateHotel` mutation requires an argument of type `CreateHotelVariables`:
const createHotelVars: CreateHotelVariables = {
  name: ..., 
  address: ..., 
  propertyId: ..., 
};

// Call the `createHotelRef()` function to get a reference to the mutation.
const ref = createHotelRef(createHotelVars);
// Variables can be defined inline as well.
const ref = createHotelRef({ name: ..., address: ..., propertyId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createHotelRef(dataConnect, createHotelVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.hotel_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.hotel_insert);
});
```

## CreateRoom
You can execute the `CreateRoom` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createRoom(vars: CreateRoomVariables): MutationPromise<CreateRoomData, CreateRoomVariables>;

interface CreateRoomRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateRoomVariables): MutationRef<CreateRoomData, CreateRoomVariables>;
}
export const createRoomRef: CreateRoomRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createRoom(dc: DataConnect, vars: CreateRoomVariables): MutationPromise<CreateRoomData, CreateRoomVariables>;

interface CreateRoomRef {
  ...
  (dc: DataConnect, vars: CreateRoomVariables): MutationRef<CreateRoomData, CreateRoomVariables>;
}
export const createRoomRef: CreateRoomRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createRoomRef:
```typescript
const name = createRoomRef.operationName;
console.log(name);
```

### Variables
The `CreateRoom` mutation requires an argument of type `CreateRoomVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateRoomVariables {
  hotelId: UUIDString;
  roomNumber: string;
  roomType: string;
  status: string;
  dailyRate: number;
}
```
### Return Type
Recall that executing the `CreateRoom` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateRoomData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateRoomData {
  room_insert: Room_Key;
}
```
### Using `CreateRoom`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createRoom, CreateRoomVariables } from '@dataconnect/generated';

// The `CreateRoom` mutation requires an argument of type `CreateRoomVariables`:
const createRoomVars: CreateRoomVariables = {
  hotelId: ..., 
  roomNumber: ..., 
  roomType: ..., 
  status: ..., 
  dailyRate: ..., 
};

// Call the `createRoom()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createRoom(createRoomVars);
// Variables can be defined inline as well.
const { data } = await createRoom({ hotelId: ..., roomNumber: ..., roomType: ..., status: ..., dailyRate: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createRoom(dataConnect, createRoomVars);

console.log(data.room_insert);

// Or, you can use the `Promise` API.
createRoom(createRoomVars).then((response) => {
  const data = response.data;
  console.log(data.room_insert);
});
```

### Using `CreateRoom`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createRoomRef, CreateRoomVariables } from '@dataconnect/generated';

// The `CreateRoom` mutation requires an argument of type `CreateRoomVariables`:
const createRoomVars: CreateRoomVariables = {
  hotelId: ..., 
  roomNumber: ..., 
  roomType: ..., 
  status: ..., 
  dailyRate: ..., 
};

// Call the `createRoomRef()` function to get a reference to the mutation.
const ref = createRoomRef(createRoomVars);
// Variables can be defined inline as well.
const ref = createRoomRef({ hotelId: ..., roomNumber: ..., roomType: ..., status: ..., dailyRate: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createRoomRef(dataConnect, createRoomVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.room_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.room_insert);
});
```

## CreateGuest
You can execute the `CreateGuest` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createGuest(vars: CreateGuestVariables): MutationPromise<CreateGuestData, CreateGuestVariables>;

interface CreateGuestRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateGuestVariables): MutationRef<CreateGuestData, CreateGuestVariables>;
}
export const createGuestRef: CreateGuestRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createGuest(dc: DataConnect, vars: CreateGuestVariables): MutationPromise<CreateGuestData, CreateGuestVariables>;

interface CreateGuestRef {
  ...
  (dc: DataConnect, vars: CreateGuestVariables): MutationRef<CreateGuestData, CreateGuestVariables>;
}
export const createGuestRef: CreateGuestRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createGuestRef:
```typescript
const name = createGuestRef.operationName;
console.log(name);
```

### Variables
The `CreateGuest` mutation requires an argument of type `CreateGuestVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateGuestVariables {
  firstName: string;
  lastName: string;
  email: string;
}
```
### Return Type
Recall that executing the `CreateGuest` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateGuestData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateGuestData {
  guest_insert: Guest_Key;
}
```
### Using `CreateGuest`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createGuest, CreateGuestVariables } from '@dataconnect/generated';

// The `CreateGuest` mutation requires an argument of type `CreateGuestVariables`:
const createGuestVars: CreateGuestVariables = {
  firstName: ..., 
  lastName: ..., 
  email: ..., 
};

// Call the `createGuest()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createGuest(createGuestVars);
// Variables can be defined inline as well.
const { data } = await createGuest({ firstName: ..., lastName: ..., email: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createGuest(dataConnect, createGuestVars);

console.log(data.guest_insert);

// Or, you can use the `Promise` API.
createGuest(createGuestVars).then((response) => {
  const data = response.data;
  console.log(data.guest_insert);
});
```

### Using `CreateGuest`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createGuestRef, CreateGuestVariables } from '@dataconnect/generated';

// The `CreateGuest` mutation requires an argument of type `CreateGuestVariables`:
const createGuestVars: CreateGuestVariables = {
  firstName: ..., 
  lastName: ..., 
  email: ..., 
};

// Call the `createGuestRef()` function to get a reference to the mutation.
const ref = createGuestRef(createGuestVars);
// Variables can be defined inline as well.
const ref = createGuestRef({ firstName: ..., lastName: ..., email: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createGuestRef(dataConnect, createGuestVars);

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

## CreateBooking
You can execute the `CreateBooking` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createBooking(vars: CreateBookingVariables): MutationPromise<CreateBookingData, CreateBookingVariables>;

interface CreateBookingRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateBookingVariables): MutationRef<CreateBookingData, CreateBookingVariables>;
}
export const createBookingRef: CreateBookingRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createBooking(dc: DataConnect, vars: CreateBookingVariables): MutationPromise<CreateBookingData, CreateBookingVariables>;

interface CreateBookingRef {
  ...
  (dc: DataConnect, vars: CreateBookingVariables): MutationRef<CreateBookingData, CreateBookingVariables>;
}
export const createBookingRef: CreateBookingRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createBookingRef:
```typescript
const name = createBookingRef.operationName;
console.log(name);
```

### Variables
The `CreateBooking` mutation requires an argument of type `CreateBookingVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateBookingVariables {
  guestId: UUIDString;
  roomId: UUIDString;
  hotelId: UUIDString;
  checkInDate: DateString;
  checkOutDate: DateString;
  status: string;
}
```
### Return Type
Recall that executing the `CreateBooking` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateBookingData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateBookingData {
  booking_insert: Booking_Key;
}
```
### Using `CreateBooking`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createBooking, CreateBookingVariables } from '@dataconnect/generated';

// The `CreateBooking` mutation requires an argument of type `CreateBookingVariables`:
const createBookingVars: CreateBookingVariables = {
  guestId: ..., 
  roomId: ..., 
  hotelId: ..., 
  checkInDate: ..., 
  checkOutDate: ..., 
  status: ..., 
};

// Call the `createBooking()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createBooking(createBookingVars);
// Variables can be defined inline as well.
const { data } = await createBooking({ guestId: ..., roomId: ..., hotelId: ..., checkInDate: ..., checkOutDate: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createBooking(dataConnect, createBookingVars);

console.log(data.booking_insert);

// Or, you can use the `Promise` API.
createBooking(createBookingVars).then((response) => {
  const data = response.data;
  console.log(data.booking_insert);
});
```

### Using `CreateBooking`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createBookingRef, CreateBookingVariables } from '@dataconnect/generated';

// The `CreateBooking` mutation requires an argument of type `CreateBookingVariables`:
const createBookingVars: CreateBookingVariables = {
  guestId: ..., 
  roomId: ..., 
  hotelId: ..., 
  checkInDate: ..., 
  checkOutDate: ..., 
  status: ..., 
};

// Call the `createBookingRef()` function to get a reference to the mutation.
const ref = createBookingRef(createBookingVars);
// Variables can be defined inline as well.
const ref = createBookingRef({ guestId: ..., roomId: ..., hotelId: ..., checkInDate: ..., checkOutDate: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createBookingRef(dataConnect, createBookingVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.booking_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.booking_insert);
});
```

## UpdateRoomStatus
You can execute the `UpdateRoomStatus` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateRoomStatus(vars: UpdateRoomStatusVariables): MutationPromise<UpdateRoomStatusData, UpdateRoomStatusVariables>;

interface UpdateRoomStatusRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateRoomStatusVariables): MutationRef<UpdateRoomStatusData, UpdateRoomStatusVariables>;
}
export const updateRoomStatusRef: UpdateRoomStatusRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateRoomStatus(dc: DataConnect, vars: UpdateRoomStatusVariables): MutationPromise<UpdateRoomStatusData, UpdateRoomStatusVariables>;

interface UpdateRoomStatusRef {
  ...
  (dc: DataConnect, vars: UpdateRoomStatusVariables): MutationRef<UpdateRoomStatusData, UpdateRoomStatusVariables>;
}
export const updateRoomStatusRef: UpdateRoomStatusRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateRoomStatusRef:
```typescript
const name = updateRoomStatusRef.operationName;
console.log(name);
```

### Variables
The `UpdateRoomStatus` mutation requires an argument of type `UpdateRoomStatusVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateRoomStatusVariables {
  id: UUIDString;
  status: string;
}
```
### Return Type
Recall that executing the `UpdateRoomStatus` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateRoomStatusData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateRoomStatusData {
  room_update?: Room_Key | null;
}
```
### Using `UpdateRoomStatus`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateRoomStatus, UpdateRoomStatusVariables } from '@dataconnect/generated';

// The `UpdateRoomStatus` mutation requires an argument of type `UpdateRoomStatusVariables`:
const updateRoomStatusVars: UpdateRoomStatusVariables = {
  id: ..., 
  status: ..., 
};

// Call the `updateRoomStatus()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateRoomStatus(updateRoomStatusVars);
// Variables can be defined inline as well.
const { data } = await updateRoomStatus({ id: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateRoomStatus(dataConnect, updateRoomStatusVars);

console.log(data.room_update);

// Or, you can use the `Promise` API.
updateRoomStatus(updateRoomStatusVars).then((response) => {
  const data = response.data;
  console.log(data.room_update);
});
```

### Using `UpdateRoomStatus`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateRoomStatusRef, UpdateRoomStatusVariables } from '@dataconnect/generated';

// The `UpdateRoomStatus` mutation requires an argument of type `UpdateRoomStatusVariables`:
const updateRoomStatusVars: UpdateRoomStatusVariables = {
  id: ..., 
  status: ..., 
};

// Call the `updateRoomStatusRef()` function to get a reference to the mutation.
const ref = updateRoomStatusRef(updateRoomStatusVars);
// Variables can be defined inline as well.
const ref = updateRoomStatusRef({ id: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateRoomStatusRef(dataConnect, updateRoomStatusVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.room_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.room_update);
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

