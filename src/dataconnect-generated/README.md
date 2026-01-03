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
  - [*GetFirstHotel*](#getfirsthotel)
  - [*GetHotelById*](#gethotelbyid)
  - [*ListHotelsByUser*](#listhotelsbyuser)
  - [*ListAllHotels*](#listallhotels)
- [**Mutations**](#mutations)
  - [*CreateRoom*](#createroom)
  - [*CreateHotel*](#createhotel)
  - [*UpdateRoomStatus*](#updateroomstatus)
  - [*CreateGuest*](#createguest)
  - [*CreateBooking*](#createbooking)

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
listAvailableRooms(vars: ListAvailableRoomsVariables): QueryPromise<ListAvailableRoomsData, ListAvailableRoomsVariables>;

interface ListAvailableRoomsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListAvailableRoomsVariables): QueryRef<ListAvailableRoomsData, ListAvailableRoomsVariables>;
}
export const listAvailableRoomsRef: ListAvailableRoomsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listAvailableRooms(dc: DataConnect, vars: ListAvailableRoomsVariables): QueryPromise<ListAvailableRoomsData, ListAvailableRoomsVariables>;

interface ListAvailableRoomsRef {
  ...
  (dc: DataConnect, vars: ListAvailableRoomsVariables): QueryRef<ListAvailableRoomsData, ListAvailableRoomsVariables>;
}
export const listAvailableRoomsRef: ListAvailableRoomsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listAvailableRoomsRef:
```typescript
const name = listAvailableRoomsRef.operationName;
console.log(name);
```

### Variables
The `ListAvailableRooms` query requires an argument of type `ListAvailableRoomsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListAvailableRoomsVariables {
  hotelId: UUIDString;
}
```
### Return Type
Recall that executing the `ListAvailableRooms` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListAvailableRoomsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListAvailableRoomsData {
  rooms: ({
    id: UUIDString;
    roomNumber: string;
    roomType: string;
    status: string;
    dailyRate?: number | null;
    capacity?: number | null;
    hotel: {
      id: UUIDString;
      name: string;
    } & Hotel_Key;
  } & Room_Key)[];
}
```
### Using `ListAvailableRooms`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listAvailableRooms, ListAvailableRoomsVariables } from '@dataconnect/generated';

// The `ListAvailableRooms` query requires an argument of type `ListAvailableRoomsVariables`:
const listAvailableRoomsVars: ListAvailableRoomsVariables = {
  hotelId: ..., 
};

// Call the `listAvailableRooms()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listAvailableRooms(listAvailableRoomsVars);
// Variables can be defined inline as well.
const { data } = await listAvailableRooms({ hotelId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listAvailableRooms(dataConnect, listAvailableRoomsVars);

console.log(data.rooms);

// Or, you can use the `Promise` API.
listAvailableRooms(listAvailableRoomsVars).then((response) => {
  const data = response.data;
  console.log(data.rooms);
});
```

### Using `ListAvailableRooms`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listAvailableRoomsRef, ListAvailableRoomsVariables } from '@dataconnect/generated';

// The `ListAvailableRooms` query requires an argument of type `ListAvailableRoomsVariables`:
const listAvailableRoomsVars: ListAvailableRoomsVariables = {
  hotelId: ..., 
};

// Call the `listAvailableRoomsRef()` function to get a reference to the query.
const ref = listAvailableRoomsRef(listAvailableRoomsVars);
// Variables can be defined inline as well.
const ref = listAvailableRoomsRef({ hotelId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listAvailableRoomsRef(dataConnect, listAvailableRoomsVars);

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

## GetHotelById
You can execute the `GetHotelById` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getHotelById(vars: GetHotelByIdVariables): QueryPromise<GetHotelByIdData, GetHotelByIdVariables>;

interface GetHotelByIdRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetHotelByIdVariables): QueryRef<GetHotelByIdData, GetHotelByIdVariables>;
}
export const getHotelByIdRef: GetHotelByIdRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getHotelById(dc: DataConnect, vars: GetHotelByIdVariables): QueryPromise<GetHotelByIdData, GetHotelByIdVariables>;

interface GetHotelByIdRef {
  ...
  (dc: DataConnect, vars: GetHotelByIdVariables): QueryRef<GetHotelByIdData, GetHotelByIdVariables>;
}
export const getHotelByIdRef: GetHotelByIdRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getHotelByIdRef:
```typescript
const name = getHotelByIdRef.operationName;
console.log(name);
```

### Variables
The `GetHotelById` query requires an argument of type `GetHotelByIdVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetHotelByIdVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetHotelById` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetHotelByIdData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetHotelByIdData {
  hotel?: {
    id: UUIDString;
    name: string;
    address: string;
    propertyId: string;
  } & Hotel_Key;
}
```
### Using `GetHotelById`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getHotelById, GetHotelByIdVariables } from '@dataconnect/generated';

// The `GetHotelById` query requires an argument of type `GetHotelByIdVariables`:
const getHotelByIdVars: GetHotelByIdVariables = {
  id: ..., 
};

// Call the `getHotelById()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getHotelById(getHotelByIdVars);
// Variables can be defined inline as well.
const { data } = await getHotelById({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getHotelById(dataConnect, getHotelByIdVars);

console.log(data.hotel);

// Or, you can use the `Promise` API.
getHotelById(getHotelByIdVars).then((response) => {
  const data = response.data;
  console.log(data.hotel);
});
```

### Using `GetHotelById`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getHotelByIdRef, GetHotelByIdVariables } from '@dataconnect/generated';

// The `GetHotelById` query requires an argument of type `GetHotelByIdVariables`:
const getHotelByIdVars: GetHotelByIdVariables = {
  id: ..., 
};

// Call the `getHotelByIdRef()` function to get a reference to the query.
const ref = getHotelByIdRef(getHotelByIdVars);
// Variables can be defined inline as well.
const ref = getHotelByIdRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getHotelByIdRef(dataConnect, getHotelByIdVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.hotel);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.hotel);
});
```

## ListHotelsByUser
You can execute the `ListHotelsByUser` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listHotelsByUser(vars: ListHotelsByUserVariables): QueryPromise<ListHotelsByUserData, ListHotelsByUserVariables>;

interface ListHotelsByUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListHotelsByUserVariables): QueryRef<ListHotelsByUserData, ListHotelsByUserVariables>;
}
export const listHotelsByUserRef: ListHotelsByUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listHotelsByUser(dc: DataConnect, vars: ListHotelsByUserVariables): QueryPromise<ListHotelsByUserData, ListHotelsByUserVariables>;

interface ListHotelsByUserRef {
  ...
  (dc: DataConnect, vars: ListHotelsByUserVariables): QueryRef<ListHotelsByUserData, ListHotelsByUserVariables>;
}
export const listHotelsByUserRef: ListHotelsByUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listHotelsByUserRef:
```typescript
const name = listHotelsByUserRef.operationName;
console.log(name);
```

### Variables
The `ListHotelsByUser` query requires an argument of type `ListHotelsByUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListHotelsByUserVariables {
  userId: string;
}
```
### Return Type
Recall that executing the `ListHotelsByUser` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListHotelsByUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListHotelsByUserData {
  user?: {
    userHotels_on_user: ({
      hotel: {
        id: UUIDString;
        name: string;
        address: string;
        propertyId: string;
      } & Hotel_Key;
    })[];
  };
}
```
### Using `ListHotelsByUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listHotelsByUser, ListHotelsByUserVariables } from '@dataconnect/generated';

// The `ListHotelsByUser` query requires an argument of type `ListHotelsByUserVariables`:
const listHotelsByUserVars: ListHotelsByUserVariables = {
  userId: ..., 
};

// Call the `listHotelsByUser()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listHotelsByUser(listHotelsByUserVars);
// Variables can be defined inline as well.
const { data } = await listHotelsByUser({ userId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listHotelsByUser(dataConnect, listHotelsByUserVars);

console.log(data.user);

// Or, you can use the `Promise` API.
listHotelsByUser(listHotelsByUserVars).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

### Using `ListHotelsByUser`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listHotelsByUserRef, ListHotelsByUserVariables } from '@dataconnect/generated';

// The `ListHotelsByUser` query requires an argument of type `ListHotelsByUserVariables`:
const listHotelsByUserVars: ListHotelsByUserVariables = {
  userId: ..., 
};

// Call the `listHotelsByUserRef()` function to get a reference to the query.
const ref = listHotelsByUserRef(listHotelsByUserVars);
// Variables can be defined inline as well.
const ref = listHotelsByUserRef({ userId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listHotelsByUserRef(dataConnect, listHotelsByUserVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.user);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

## ListAllHotels
You can execute the `ListAllHotels` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listAllHotels(): QueryPromise<ListAllHotelsData, undefined>;

interface ListAllHotelsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAllHotelsData, undefined>;
}
export const listAllHotelsRef: ListAllHotelsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listAllHotels(dc: DataConnect): QueryPromise<ListAllHotelsData, undefined>;

interface ListAllHotelsRef {
  ...
  (dc: DataConnect): QueryRef<ListAllHotelsData, undefined>;
}
export const listAllHotelsRef: ListAllHotelsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listAllHotelsRef:
```typescript
const name = listAllHotelsRef.operationName;
console.log(name);
```

### Variables
The `ListAllHotels` query has no variables.
### Return Type
Recall that executing the `ListAllHotels` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListAllHotelsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListAllHotelsData {
  hotels: ({
    id: UUIDString;
    name: string;
    address: string;
    propertyId: string;
  } & Hotel_Key)[];
}
```
### Using `ListAllHotels`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listAllHotels } from '@dataconnect/generated';


// Call the `listAllHotels()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listAllHotels();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listAllHotels(dataConnect);

console.log(data.hotels);

// Or, you can use the `Promise` API.
listAllHotels().then((response) => {
  const data = response.data;
  console.log(data.hotels);
});
```

### Using `ListAllHotels`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listAllHotelsRef } from '@dataconnect/generated';


// Call the `listAllHotelsRef()` function to get a reference to the query.
const ref = listAllHotelsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listAllHotelsRef(dataConnect);

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
  capacity?: number | null;
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
  capacity: ..., // optional
};

// Call the `createRoom()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createRoom(createRoomVars);
// Variables can be defined inline as well.
const { data } = await createRoom({ hotelId: ..., roomNumber: ..., roomType: ..., status: ..., dailyRate: ..., capacity: ..., });

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
  capacity: ..., // optional
};

// Call the `createRoomRef()` function to get a reference to the mutation.
const ref = createRoomRef(createRoomVars);
// Variables can be defined inline as well.
const ref = createRoomRef({ hotelId: ..., roomNumber: ..., roomType: ..., status: ..., dailyRate: ..., capacity: ..., });

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
  hotelId: UUIDString;
  checkInDate: DateString;
  checkOutDate: DateString;
  bookingStatus: string;
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
  hotelId: ..., 
  checkInDate: ..., 
  checkOutDate: ..., 
  bookingStatus: ..., 
};

// Call the `createBooking()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createBooking(createBookingVars);
// Variables can be defined inline as well.
const { data } = await createBooking({ guestId: ..., hotelId: ..., checkInDate: ..., checkOutDate: ..., bookingStatus: ..., });

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
  hotelId: ..., 
  checkInDate: ..., 
  checkOutDate: ..., 
  bookingStatus: ..., 
};

// Call the `createBookingRef()` function to get a reference to the mutation.
const ref = createBookingRef(createBookingVars);
// Variables can be defined inline as well.
const ref = createBookingRef({ guestId: ..., hotelId: ..., checkInDate: ..., checkOutDate: ..., bookingStatus: ..., });

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

