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
  - [*ListAllHotels*](#listallhotels)
  - [*ListGuests*](#listguests)
  - [*ListBookings*](#listbookings)
  - [*ListLogs*](#listlogs)
  - [*ListStaff*](#liststaff)
  - [*ListTimeLogs*](#listtimelogs)
  - [*ListFinancialDocuments*](#listfinancialdocuments)
  - [*ListHotelsByUser*](#listhotelsbyuser)
  - [*ListUsersDC*](#listusersdc)
- [**Mutations**](#mutations)
  - [*CreateRoom*](#createroom)
  - [*UpdateRoomStatus*](#updateroomstatus)
  - [*CreateHotel*](#createhotel)
  - [*UpdateHotelConfig*](#updatehotelconfig)
  - [*CreateGuestDC*](#createguestdc)
  - [*UpdateGuestDC*](#updateguestdc)
  - [*DeleteGuestDC*](#deleteguestdc)
  - [*CreateBookingDC*](#createbookingdc)
  - [*UpdateBookingDC*](#updatebookingdc)
  - [*CreateLogDC*](#createlogdc)
  - [*CreateStaffDC*](#createstaffdc)
  - [*UpdateStaffDC*](#updatestaffdc)
  - [*CreateTimeLogDC*](#createtimelogdc)
  - [*UpdateTimeLogDC*](#updatetimelogdc)
  - [*CreateFinancialDocumentDC*](#createfinancialdocumentdc)
  - [*UpsertUser*](#upsertuser)
  - [*LinkUserToHotel*](#linkusertohotel)

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
    email?: string | null;
    phoneNumber?: string | null;
    demoMode?: boolean | null;
    maintenanceEmail?: string | null;
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

## ListGuests
You can execute the `ListGuests` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listGuests(vars: ListGuestsVariables): QueryPromise<ListGuestsData, ListGuestsVariables>;

interface ListGuestsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListGuestsVariables): QueryRef<ListGuestsData, ListGuestsVariables>;
}
export const listGuestsRef: ListGuestsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listGuests(dc: DataConnect, vars: ListGuestsVariables): QueryPromise<ListGuestsData, ListGuestsVariables>;

interface ListGuestsRef {
  ...
  (dc: DataConnect, vars: ListGuestsVariables): QueryRef<ListGuestsData, ListGuestsVariables>;
}
export const listGuestsRef: ListGuestsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listGuestsRef:
```typescript
const name = listGuestsRef.operationName;
console.log(name);
```

### Variables
The `ListGuests` query requires an argument of type `ListGuestsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListGuestsVariables {
  hotelId: UUIDString;
}
```
### Return Type
Recall that executing the `ListGuests` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListGuestsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListGuestsData {
  guests: ({
    id: UUIDString;
    name: string;
    email: string;
    phoneNumber?: string | null;
    address?: string | null;
    notes?: string | null;
    history?: unknown | null;
  } & Guest_Key)[];
}
```
### Using `ListGuests`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listGuests, ListGuestsVariables } from '@dataconnect/generated';

// The `ListGuests` query requires an argument of type `ListGuestsVariables`:
const listGuestsVars: ListGuestsVariables = {
  hotelId: ..., 
};

// Call the `listGuests()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listGuests(listGuestsVars);
// Variables can be defined inline as well.
const { data } = await listGuests({ hotelId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listGuests(dataConnect, listGuestsVars);

console.log(data.guests);

// Or, you can use the `Promise` API.
listGuests(listGuestsVars).then((response) => {
  const data = response.data;
  console.log(data.guests);
});
```

### Using `ListGuests`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listGuestsRef, ListGuestsVariables } from '@dataconnect/generated';

// The `ListGuests` query requires an argument of type `ListGuestsVariables`:
const listGuestsVars: ListGuestsVariables = {
  hotelId: ..., 
};

// Call the `listGuestsRef()` function to get a reference to the query.
const ref = listGuestsRef(listGuestsVars);
// Variables can be defined inline as well.
const ref = listGuestsRef({ hotelId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listGuestsRef(dataConnect, listGuestsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.guests);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.guests);
});
```

## ListBookings
You can execute the `ListBookings` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listBookings(vars: ListBookingsVariables): QueryPromise<ListBookingsData, ListBookingsVariables>;

interface ListBookingsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListBookingsVariables): QueryRef<ListBookingsData, ListBookingsVariables>;
}
export const listBookingsRef: ListBookingsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listBookings(dc: DataConnect, vars: ListBookingsVariables): QueryPromise<ListBookingsData, ListBookingsVariables>;

interface ListBookingsRef {
  ...
  (dc: DataConnect, vars: ListBookingsVariables): QueryRef<ListBookingsData, ListBookingsVariables>;
}
export const listBookingsRef: ListBookingsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listBookingsRef:
```typescript
const name = listBookingsRef.operationName;
console.log(name);
```

### Variables
The `ListBookings` query requires an argument of type `ListBookingsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListBookingsVariables {
  hotelId: UUIDString;
}
```
### Return Type
Recall that executing the `ListBookings` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListBookingsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListBookingsData {
  bookings: ({
    id: UUIDString;
    checkInDate: TimestampString;
    checkOutDate: TimestampString;
    checkOutActual?: TimestampString | null;
    bookingStatus: string;
    specialRequests?: string | null;
    numberOfGuests?: number | null;
    ratePerNight?: number | null;
    totalPaid?: number | null;
    isIndefinite?: boolean | null;
    guest: {
      id: UUIDString;
      name: string;
    } & Guest_Key;
      room?: {
        id: UUIDString;
        roomNumber: string;
      } & Room_Key;
  } & Booking_Key)[];
}
```
### Using `ListBookings`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listBookings, ListBookingsVariables } from '@dataconnect/generated';

// The `ListBookings` query requires an argument of type `ListBookingsVariables`:
const listBookingsVars: ListBookingsVariables = {
  hotelId: ..., 
};

// Call the `listBookings()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listBookings(listBookingsVars);
// Variables can be defined inline as well.
const { data } = await listBookings({ hotelId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listBookings(dataConnect, listBookingsVars);

console.log(data.bookings);

// Or, you can use the `Promise` API.
listBookings(listBookingsVars).then((response) => {
  const data = response.data;
  console.log(data.bookings);
});
```

### Using `ListBookings`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listBookingsRef, ListBookingsVariables } from '@dataconnect/generated';

// The `ListBookings` query requires an argument of type `ListBookingsVariables`:
const listBookingsVars: ListBookingsVariables = {
  hotelId: ..., 
};

// Call the `listBookingsRef()` function to get a reference to the query.
const ref = listBookingsRef(listBookingsVars);
// Variables can be defined inline as well.
const ref = listBookingsRef({ hotelId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listBookingsRef(dataConnect, listBookingsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.bookings);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.bookings);
});
```

## ListLogs
You can execute the `ListLogs` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listLogs(vars: ListLogsVariables): QueryPromise<ListLogsData, ListLogsVariables>;

interface ListLogsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListLogsVariables): QueryRef<ListLogsData, ListLogsVariables>;
}
export const listLogsRef: ListLogsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listLogs(dc: DataConnect, vars: ListLogsVariables): QueryPromise<ListLogsData, ListLogsVariables>;

interface ListLogsRef {
  ...
  (dc: DataConnect, vars: ListLogsVariables): QueryRef<ListLogsData, ListLogsVariables>;
}
export const listLogsRef: ListLogsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listLogsRef:
```typescript
const name = listLogsRef.operationName;
console.log(name);
```

### Variables
The `ListLogs` query requires an argument of type `ListLogsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListLogsVariables {
  hotelId: UUIDString;
}
```
### Return Type
Recall that executing the `ListLogs` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListLogsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListLogsData {
  logs: ({
    id: UUIDString;
    timestamp: TimestampString;
    action: string;
    user: string;
    category: string;
    details: string;
  } & Log_Key)[];
}
```
### Using `ListLogs`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listLogs, ListLogsVariables } from '@dataconnect/generated';

// The `ListLogs` query requires an argument of type `ListLogsVariables`:
const listLogsVars: ListLogsVariables = {
  hotelId: ..., 
};

// Call the `listLogs()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listLogs(listLogsVars);
// Variables can be defined inline as well.
const { data } = await listLogs({ hotelId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listLogs(dataConnect, listLogsVars);

console.log(data.logs);

// Or, you can use the `Promise` API.
listLogs(listLogsVars).then((response) => {
  const data = response.data;
  console.log(data.logs);
});
```

### Using `ListLogs`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listLogsRef, ListLogsVariables } from '@dataconnect/generated';

// The `ListLogs` query requires an argument of type `ListLogsVariables`:
const listLogsVars: ListLogsVariables = {
  hotelId: ..., 
};

// Call the `listLogsRef()` function to get a reference to the query.
const ref = listLogsRef(listLogsVars);
// Variables can be defined inline as well.
const ref = listLogsRef({ hotelId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listLogsRef(dataConnect, listLogsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.logs);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.logs);
});
```

## ListStaff
You can execute the `ListStaff` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listStaff(vars: ListStaffVariables): QueryPromise<ListStaffData, ListStaffVariables>;

interface ListStaffRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListStaffVariables): QueryRef<ListStaffData, ListStaffVariables>;
}
export const listStaffRef: ListStaffRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listStaff(dc: DataConnect, vars: ListStaffVariables): QueryPromise<ListStaffData, ListStaffVariables>;

interface ListStaffRef {
  ...
  (dc: DataConnect, vars: ListStaffVariables): QueryRef<ListStaffData, ListStaffVariables>;
}
export const listStaffRef: ListStaffRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listStaffRef:
```typescript
const name = listStaffRef.operationName;
console.log(name);
```

### Variables
The `ListStaff` query requires an argument of type `ListStaffVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListStaffVariables {
  hotelId: UUIDString;
}
```
### Return Type
Recall that executing the `ListStaff` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListStaffData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListStaffData {
  staffs: ({
    id: UUIDString;
    firstName: string;
    lastName: string;
    role: string;
    pin?: string | null;
    status: string;
    currentStatus: string;
  } & Staff_Key)[];
}
```
### Using `ListStaff`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listStaff, ListStaffVariables } from '@dataconnect/generated';

// The `ListStaff` query requires an argument of type `ListStaffVariables`:
const listStaffVars: ListStaffVariables = {
  hotelId: ..., 
};

// Call the `listStaff()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listStaff(listStaffVars);
// Variables can be defined inline as well.
const { data } = await listStaff({ hotelId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listStaff(dataConnect, listStaffVars);

console.log(data.staffs);

// Or, you can use the `Promise` API.
listStaff(listStaffVars).then((response) => {
  const data = response.data;
  console.log(data.staffs);
});
```

### Using `ListStaff`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listStaffRef, ListStaffVariables } from '@dataconnect/generated';

// The `ListStaff` query requires an argument of type `ListStaffVariables`:
const listStaffVars: ListStaffVariables = {
  hotelId: ..., 
};

// Call the `listStaffRef()` function to get a reference to the query.
const ref = listStaffRef(listStaffVars);
// Variables can be defined inline as well.
const ref = listStaffRef({ hotelId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listStaffRef(dataConnect, listStaffVars);

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

## ListTimeLogs
You can execute the `ListTimeLogs` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listTimeLogs(vars: ListTimeLogsVariables): QueryPromise<ListTimeLogsData, ListTimeLogsVariables>;

interface ListTimeLogsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListTimeLogsVariables): QueryRef<ListTimeLogsData, ListTimeLogsVariables>;
}
export const listTimeLogsRef: ListTimeLogsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listTimeLogs(dc: DataConnect, vars: ListTimeLogsVariables): QueryPromise<ListTimeLogsData, ListTimeLogsVariables>;

interface ListTimeLogsRef {
  ...
  (dc: DataConnect, vars: ListTimeLogsVariables): QueryRef<ListTimeLogsData, ListTimeLogsVariables>;
}
export const listTimeLogsRef: ListTimeLogsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listTimeLogsRef:
```typescript
const name = listTimeLogsRef.operationName;
console.log(name);
```

### Variables
The `ListTimeLogs` query requires an argument of type `ListTimeLogsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListTimeLogsVariables {
  hotelId: UUIDString;
}
```
### Return Type
Recall that executing the `ListTimeLogs` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListTimeLogsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListTimeLogsData {
  timeLogs: ({
    id: UUIDString;
    date: DateString;
    startTime: TimestampString;
    endTime?: TimestampString | null;
    breaks?: unknown | null;
    totalHours?: number | null;
    status: string;
    staff: {
      id: UUIDString;
      firstName: string;
      lastName: string;
    } & Staff_Key;
  } & TimeLog_Key)[];
}
```
### Using `ListTimeLogs`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listTimeLogs, ListTimeLogsVariables } from '@dataconnect/generated';

// The `ListTimeLogs` query requires an argument of type `ListTimeLogsVariables`:
const listTimeLogsVars: ListTimeLogsVariables = {
  hotelId: ..., 
};

// Call the `listTimeLogs()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listTimeLogs(listTimeLogsVars);
// Variables can be defined inline as well.
const { data } = await listTimeLogs({ hotelId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listTimeLogs(dataConnect, listTimeLogsVars);

console.log(data.timeLogs);

// Or, you can use the `Promise` API.
listTimeLogs(listTimeLogsVars).then((response) => {
  const data = response.data;
  console.log(data.timeLogs);
});
```

### Using `ListTimeLogs`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listTimeLogsRef, ListTimeLogsVariables } from '@dataconnect/generated';

// The `ListTimeLogs` query requires an argument of type `ListTimeLogsVariables`:
const listTimeLogsVars: ListTimeLogsVariables = {
  hotelId: ..., 
};

// Call the `listTimeLogsRef()` function to get a reference to the query.
const ref = listTimeLogsRef(listTimeLogsVars);
// Variables can be defined inline as well.
const ref = listTimeLogsRef({ hotelId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listTimeLogsRef(dataConnect, listTimeLogsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.timeLogs);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.timeLogs);
});
```

## ListFinancialDocuments
You can execute the `ListFinancialDocuments` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listFinancialDocuments(vars: ListFinancialDocumentsVariables): QueryPromise<ListFinancialDocumentsData, ListFinancialDocumentsVariables>;

interface ListFinancialDocumentsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListFinancialDocumentsVariables): QueryRef<ListFinancialDocumentsData, ListFinancialDocumentsVariables>;
}
export const listFinancialDocumentsRef: ListFinancialDocumentsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listFinancialDocuments(dc: DataConnect, vars: ListFinancialDocumentsVariables): QueryPromise<ListFinancialDocumentsData, ListFinancialDocumentsVariables>;

interface ListFinancialDocumentsRef {
  ...
  (dc: DataConnect, vars: ListFinancialDocumentsVariables): QueryRef<ListFinancialDocumentsData, ListFinancialDocumentsVariables>;
}
export const listFinancialDocumentsRef: ListFinancialDocumentsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listFinancialDocumentsRef:
```typescript
const name = listFinancialDocumentsRef.operationName;
console.log(name);
```

### Variables
The `ListFinancialDocuments` query requires an argument of type `ListFinancialDocumentsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListFinancialDocumentsVariables {
  hotelId: UUIDString;
}
```
### Return Type
Recall that executing the `ListFinancialDocuments` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListFinancialDocumentsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListFinancialDocumentsData {
  financialDocuments: ({
    id: UUIDString;
    docType: string;
    number: string;
    date: TimestampString;
    totalAmount: number;
    notes?: string | null;
    summary?: string | null;
    items?: unknown | null;
    guest?: {
      id: UUIDString;
      name: string;
    } & Guest_Key;
      booking?: {
        id: UUIDString;
      } & Booking_Key;
  } & FinancialDocument_Key)[];
}
```
### Using `ListFinancialDocuments`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listFinancialDocuments, ListFinancialDocumentsVariables } from '@dataconnect/generated';

// The `ListFinancialDocuments` query requires an argument of type `ListFinancialDocumentsVariables`:
const listFinancialDocumentsVars: ListFinancialDocumentsVariables = {
  hotelId: ..., 
};

// Call the `listFinancialDocuments()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listFinancialDocuments(listFinancialDocumentsVars);
// Variables can be defined inline as well.
const { data } = await listFinancialDocuments({ hotelId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listFinancialDocuments(dataConnect, listFinancialDocumentsVars);

console.log(data.financialDocuments);

// Or, you can use the `Promise` API.
listFinancialDocuments(listFinancialDocumentsVars).then((response) => {
  const data = response.data;
  console.log(data.financialDocuments);
});
```

### Using `ListFinancialDocuments`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listFinancialDocumentsRef, ListFinancialDocumentsVariables } from '@dataconnect/generated';

// The `ListFinancialDocuments` query requires an argument of type `ListFinancialDocumentsVariables`:
const listFinancialDocumentsVars: ListFinancialDocumentsVariables = {
  hotelId: ..., 
};

// Call the `listFinancialDocumentsRef()` function to get a reference to the query.
const ref = listFinancialDocumentsRef(listFinancialDocumentsVars);
// Variables can be defined inline as well.
const ref = listFinancialDocumentsRef({ hotelId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listFinancialDocumentsRef(dataConnect, listFinancialDocumentsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.financialDocuments);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.financialDocuments);
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
        demoMode?: boolean | null;
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

## ListUsersDC
You can execute the `ListUsersDC` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listUsersDc(): QueryPromise<ListUsersDcData, undefined>;

interface ListUsersDcRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUsersDcData, undefined>;
}
export const listUsersDcRef: ListUsersDcRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listUsersDc(dc: DataConnect): QueryPromise<ListUsersDcData, undefined>;

interface ListUsersDcRef {
  ...
  (dc: DataConnect): QueryRef<ListUsersDcData, undefined>;
}
export const listUsersDcRef: ListUsersDcRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listUsersDcRef:
```typescript
const name = listUsersDcRef.operationName;
console.log(name);
```

### Variables
The `ListUsersDC` query has no variables.
### Return Type
Recall that executing the `ListUsersDC` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListUsersDcData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListUsersDcData {
  users: ({
    id: string;
    email: string;
    role: string;
  } & User_Key)[];
}
```
### Using `ListUsersDC`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listUsersDc } from '@dataconnect/generated';


// Call the `listUsersDc()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listUsersDc();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listUsersDc(dataConnect);

console.log(data.users);

// Or, you can use the `Promise` API.
listUsersDc().then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

### Using `ListUsersDC`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listUsersDcRef } from '@dataconnect/generated';


// Call the `listUsersDcRef()` function to get a reference to the query.
const ref = listUsersDcRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listUsersDcRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.users);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.users);
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

## UpdateHotelConfig
You can execute the `UpdateHotelConfig` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateHotelConfig(vars: UpdateHotelConfigVariables): MutationPromise<UpdateHotelConfigData, UpdateHotelConfigVariables>;

interface UpdateHotelConfigRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateHotelConfigVariables): MutationRef<UpdateHotelConfigData, UpdateHotelConfigVariables>;
}
export const updateHotelConfigRef: UpdateHotelConfigRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateHotelConfig(dc: DataConnect, vars: UpdateHotelConfigVariables): MutationPromise<UpdateHotelConfigData, UpdateHotelConfigVariables>;

interface UpdateHotelConfigRef {
  ...
  (dc: DataConnect, vars: UpdateHotelConfigVariables): MutationRef<UpdateHotelConfigData, UpdateHotelConfigVariables>;
}
export const updateHotelConfigRef: UpdateHotelConfigRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateHotelConfigRef:
```typescript
const name = updateHotelConfigRef.operationName;
console.log(name);
```

### Variables
The `UpdateHotelConfig` mutation requires an argument of type `UpdateHotelConfigVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateHotelConfigVariables {
  id: UUIDString;
  name?: string | null;
  address?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  demoMode?: boolean | null;
  maintenanceEmail?: string | null;
}
```
### Return Type
Recall that executing the `UpdateHotelConfig` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateHotelConfigData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateHotelConfigData {
  hotel_update?: Hotel_Key | null;
}
```
### Using `UpdateHotelConfig`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateHotelConfig, UpdateHotelConfigVariables } from '@dataconnect/generated';

// The `UpdateHotelConfig` mutation requires an argument of type `UpdateHotelConfigVariables`:
const updateHotelConfigVars: UpdateHotelConfigVariables = {
  id: ..., 
  name: ..., // optional
  address: ..., // optional
  email: ..., // optional
  phoneNumber: ..., // optional
  demoMode: ..., // optional
  maintenanceEmail: ..., // optional
};

// Call the `updateHotelConfig()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateHotelConfig(updateHotelConfigVars);
// Variables can be defined inline as well.
const { data } = await updateHotelConfig({ id: ..., name: ..., address: ..., email: ..., phoneNumber: ..., demoMode: ..., maintenanceEmail: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateHotelConfig(dataConnect, updateHotelConfigVars);

console.log(data.hotel_update);

// Or, you can use the `Promise` API.
updateHotelConfig(updateHotelConfigVars).then((response) => {
  const data = response.data;
  console.log(data.hotel_update);
});
```

### Using `UpdateHotelConfig`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateHotelConfigRef, UpdateHotelConfigVariables } from '@dataconnect/generated';

// The `UpdateHotelConfig` mutation requires an argument of type `UpdateHotelConfigVariables`:
const updateHotelConfigVars: UpdateHotelConfigVariables = {
  id: ..., 
  name: ..., // optional
  address: ..., // optional
  email: ..., // optional
  phoneNumber: ..., // optional
  demoMode: ..., // optional
  maintenanceEmail: ..., // optional
};

// Call the `updateHotelConfigRef()` function to get a reference to the mutation.
const ref = updateHotelConfigRef(updateHotelConfigVars);
// Variables can be defined inline as well.
const ref = updateHotelConfigRef({ id: ..., name: ..., address: ..., email: ..., phoneNumber: ..., demoMode: ..., maintenanceEmail: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateHotelConfigRef(dataConnect, updateHotelConfigVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.hotel_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.hotel_update);
});
```

## CreateGuestDC
You can execute the `CreateGuestDC` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createGuestDc(vars: CreateGuestDcVariables): MutationPromise<CreateGuestDcData, CreateGuestDcVariables>;

interface CreateGuestDcRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateGuestDcVariables): MutationRef<CreateGuestDcData, CreateGuestDcVariables>;
}
export const createGuestDcRef: CreateGuestDcRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createGuestDc(dc: DataConnect, vars: CreateGuestDcVariables): MutationPromise<CreateGuestDcData, CreateGuestDcVariables>;

interface CreateGuestDcRef {
  ...
  (dc: DataConnect, vars: CreateGuestDcVariables): MutationRef<CreateGuestDcData, CreateGuestDcVariables>;
}
export const createGuestDcRef: CreateGuestDcRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createGuestDcRef:
```typescript
const name = createGuestDcRef.operationName;
console.log(name);
```

### Variables
The `CreateGuestDC` mutation requires an argument of type `CreateGuestDcVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateGuestDcVariables {
  hotelId: UUIDString;
  name: string;
  email: string;
  phoneNumber?: string | null;
  address?: string | null;
  notes?: string | null;
}
```
### Return Type
Recall that executing the `CreateGuestDC` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateGuestDcData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateGuestDcData {
  guest_insert: Guest_Key;
}
```
### Using `CreateGuestDC`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createGuestDc, CreateGuestDcVariables } from '@dataconnect/generated';

// The `CreateGuestDC` mutation requires an argument of type `CreateGuestDcVariables`:
const createGuestDcVars: CreateGuestDcVariables = {
  hotelId: ..., 
  name: ..., 
  email: ..., 
  phoneNumber: ..., // optional
  address: ..., // optional
  notes: ..., // optional
};

// Call the `createGuestDc()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createGuestDc(createGuestDcVars);
// Variables can be defined inline as well.
const { data } = await createGuestDc({ hotelId: ..., name: ..., email: ..., phoneNumber: ..., address: ..., notes: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createGuestDc(dataConnect, createGuestDcVars);

console.log(data.guest_insert);

// Or, you can use the `Promise` API.
createGuestDc(createGuestDcVars).then((response) => {
  const data = response.data;
  console.log(data.guest_insert);
});
```

### Using `CreateGuestDC`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createGuestDcRef, CreateGuestDcVariables } from '@dataconnect/generated';

// The `CreateGuestDC` mutation requires an argument of type `CreateGuestDcVariables`:
const createGuestDcVars: CreateGuestDcVariables = {
  hotelId: ..., 
  name: ..., 
  email: ..., 
  phoneNumber: ..., // optional
  address: ..., // optional
  notes: ..., // optional
};

// Call the `createGuestDcRef()` function to get a reference to the mutation.
const ref = createGuestDcRef(createGuestDcVars);
// Variables can be defined inline as well.
const ref = createGuestDcRef({ hotelId: ..., name: ..., email: ..., phoneNumber: ..., address: ..., notes: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createGuestDcRef(dataConnect, createGuestDcVars);

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

## UpdateGuestDC
You can execute the `UpdateGuestDC` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateGuestDc(vars: UpdateGuestDcVariables): MutationPromise<UpdateGuestDcData, UpdateGuestDcVariables>;

interface UpdateGuestDcRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateGuestDcVariables): MutationRef<UpdateGuestDcData, UpdateGuestDcVariables>;
}
export const updateGuestDcRef: UpdateGuestDcRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateGuestDc(dc: DataConnect, vars: UpdateGuestDcVariables): MutationPromise<UpdateGuestDcData, UpdateGuestDcVariables>;

interface UpdateGuestDcRef {
  ...
  (dc: DataConnect, vars: UpdateGuestDcVariables): MutationRef<UpdateGuestDcData, UpdateGuestDcVariables>;
}
export const updateGuestDcRef: UpdateGuestDcRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateGuestDcRef:
```typescript
const name = updateGuestDcRef.operationName;
console.log(name);
```

### Variables
The `UpdateGuestDC` mutation requires an argument of type `UpdateGuestDcVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateGuestDcVariables {
  id: UUIDString;
  name?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  address?: string | null;
  notes?: string | null;
  history?: unknown | null;
}
```
### Return Type
Recall that executing the `UpdateGuestDC` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateGuestDcData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateGuestDcData {
  guest_update?: Guest_Key | null;
}
```
### Using `UpdateGuestDC`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateGuestDc, UpdateGuestDcVariables } from '@dataconnect/generated';

// The `UpdateGuestDC` mutation requires an argument of type `UpdateGuestDcVariables`:
const updateGuestDcVars: UpdateGuestDcVariables = {
  id: ..., 
  name: ..., // optional
  email: ..., // optional
  phoneNumber: ..., // optional
  address: ..., // optional
  notes: ..., // optional
  history: ..., // optional
};

// Call the `updateGuestDc()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateGuestDc(updateGuestDcVars);
// Variables can be defined inline as well.
const { data } = await updateGuestDc({ id: ..., name: ..., email: ..., phoneNumber: ..., address: ..., notes: ..., history: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateGuestDc(dataConnect, updateGuestDcVars);

console.log(data.guest_update);

// Or, you can use the `Promise` API.
updateGuestDc(updateGuestDcVars).then((response) => {
  const data = response.data;
  console.log(data.guest_update);
});
```

### Using `UpdateGuestDC`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateGuestDcRef, UpdateGuestDcVariables } from '@dataconnect/generated';

// The `UpdateGuestDC` mutation requires an argument of type `UpdateGuestDcVariables`:
const updateGuestDcVars: UpdateGuestDcVariables = {
  id: ..., 
  name: ..., // optional
  email: ..., // optional
  phoneNumber: ..., // optional
  address: ..., // optional
  notes: ..., // optional
  history: ..., // optional
};

// Call the `updateGuestDcRef()` function to get a reference to the mutation.
const ref = updateGuestDcRef(updateGuestDcVars);
// Variables can be defined inline as well.
const ref = updateGuestDcRef({ id: ..., name: ..., email: ..., phoneNumber: ..., address: ..., notes: ..., history: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateGuestDcRef(dataConnect, updateGuestDcVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.guest_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.guest_update);
});
```

## DeleteGuestDC
You can execute the `DeleteGuestDC` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteGuestDc(vars: DeleteGuestDcVariables): MutationPromise<DeleteGuestDcData, DeleteGuestDcVariables>;

interface DeleteGuestDcRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteGuestDcVariables): MutationRef<DeleteGuestDcData, DeleteGuestDcVariables>;
}
export const deleteGuestDcRef: DeleteGuestDcRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteGuestDc(dc: DataConnect, vars: DeleteGuestDcVariables): MutationPromise<DeleteGuestDcData, DeleteGuestDcVariables>;

interface DeleteGuestDcRef {
  ...
  (dc: DataConnect, vars: DeleteGuestDcVariables): MutationRef<DeleteGuestDcData, DeleteGuestDcVariables>;
}
export const deleteGuestDcRef: DeleteGuestDcRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteGuestDcRef:
```typescript
const name = deleteGuestDcRef.operationName;
console.log(name);
```

### Variables
The `DeleteGuestDC` mutation requires an argument of type `DeleteGuestDcVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteGuestDcVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteGuestDC` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteGuestDcData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteGuestDcData {
  guest_delete?: Guest_Key | null;
}
```
### Using `DeleteGuestDC`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteGuestDc, DeleteGuestDcVariables } from '@dataconnect/generated';

// The `DeleteGuestDC` mutation requires an argument of type `DeleteGuestDcVariables`:
const deleteGuestDcVars: DeleteGuestDcVariables = {
  id: ..., 
};

// Call the `deleteGuestDc()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteGuestDc(deleteGuestDcVars);
// Variables can be defined inline as well.
const { data } = await deleteGuestDc({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteGuestDc(dataConnect, deleteGuestDcVars);

console.log(data.guest_delete);

// Or, you can use the `Promise` API.
deleteGuestDc(deleteGuestDcVars).then((response) => {
  const data = response.data;
  console.log(data.guest_delete);
});
```

### Using `DeleteGuestDC`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteGuestDcRef, DeleteGuestDcVariables } from '@dataconnect/generated';

// The `DeleteGuestDC` mutation requires an argument of type `DeleteGuestDcVariables`:
const deleteGuestDcVars: DeleteGuestDcVariables = {
  id: ..., 
};

// Call the `deleteGuestDcRef()` function to get a reference to the mutation.
const ref = deleteGuestDcRef(deleteGuestDcVars);
// Variables can be defined inline as well.
const ref = deleteGuestDcRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteGuestDcRef(dataConnect, deleteGuestDcVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.guest_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.guest_delete);
});
```

## CreateBookingDC
You can execute the `CreateBookingDC` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createBookingDc(vars: CreateBookingDcVariables): MutationPromise<CreateBookingDcData, CreateBookingDcVariables>;

interface CreateBookingDcRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateBookingDcVariables): MutationRef<CreateBookingDcData, CreateBookingDcVariables>;
}
export const createBookingDcRef: CreateBookingDcRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createBookingDc(dc: DataConnect, vars: CreateBookingDcVariables): MutationPromise<CreateBookingDcData, CreateBookingDcVariables>;

interface CreateBookingDcRef {
  ...
  (dc: DataConnect, vars: CreateBookingDcVariables): MutationRef<CreateBookingDcData, CreateBookingDcVariables>;
}
export const createBookingDcRef: CreateBookingDcRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createBookingDcRef:
```typescript
const name = createBookingDcRef.operationName;
console.log(name);
```

### Variables
The `CreateBookingDC` mutation requires an argument of type `CreateBookingDcVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateBookingDcVariables {
  hotelId: UUIDString;
  guestId: UUIDString;
  roomId?: UUIDString | null;
  checkInDate: TimestampString;
  checkOutDate: TimestampString;
  bookingStatus: string;
  ratePerNight?: number | null;
  totalPaid?: number | null;
  isIndefinite?: boolean | null;
}
```
### Return Type
Recall that executing the `CreateBookingDC` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateBookingDcData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateBookingDcData {
  booking_insert: Booking_Key;
}
```
### Using `CreateBookingDC`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createBookingDc, CreateBookingDcVariables } from '@dataconnect/generated';

// The `CreateBookingDC` mutation requires an argument of type `CreateBookingDcVariables`:
const createBookingDcVars: CreateBookingDcVariables = {
  hotelId: ..., 
  guestId: ..., 
  roomId: ..., // optional
  checkInDate: ..., 
  checkOutDate: ..., 
  bookingStatus: ..., 
  ratePerNight: ..., // optional
  totalPaid: ..., // optional
  isIndefinite: ..., // optional
};

// Call the `createBookingDc()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createBookingDc(createBookingDcVars);
// Variables can be defined inline as well.
const { data } = await createBookingDc({ hotelId: ..., guestId: ..., roomId: ..., checkInDate: ..., checkOutDate: ..., bookingStatus: ..., ratePerNight: ..., totalPaid: ..., isIndefinite: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createBookingDc(dataConnect, createBookingDcVars);

console.log(data.booking_insert);

// Or, you can use the `Promise` API.
createBookingDc(createBookingDcVars).then((response) => {
  const data = response.data;
  console.log(data.booking_insert);
});
```

### Using `CreateBookingDC`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createBookingDcRef, CreateBookingDcVariables } from '@dataconnect/generated';

// The `CreateBookingDC` mutation requires an argument of type `CreateBookingDcVariables`:
const createBookingDcVars: CreateBookingDcVariables = {
  hotelId: ..., 
  guestId: ..., 
  roomId: ..., // optional
  checkInDate: ..., 
  checkOutDate: ..., 
  bookingStatus: ..., 
  ratePerNight: ..., // optional
  totalPaid: ..., // optional
  isIndefinite: ..., // optional
};

// Call the `createBookingDcRef()` function to get a reference to the mutation.
const ref = createBookingDcRef(createBookingDcVars);
// Variables can be defined inline as well.
const ref = createBookingDcRef({ hotelId: ..., guestId: ..., roomId: ..., checkInDate: ..., checkOutDate: ..., bookingStatus: ..., ratePerNight: ..., totalPaid: ..., isIndefinite: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createBookingDcRef(dataConnect, createBookingDcVars);

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

## UpdateBookingDC
You can execute the `UpdateBookingDC` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateBookingDc(vars: UpdateBookingDcVariables): MutationPromise<UpdateBookingDcData, UpdateBookingDcVariables>;

interface UpdateBookingDcRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateBookingDcVariables): MutationRef<UpdateBookingDcData, UpdateBookingDcVariables>;
}
export const updateBookingDcRef: UpdateBookingDcRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateBookingDc(dc: DataConnect, vars: UpdateBookingDcVariables): MutationPromise<UpdateBookingDcData, UpdateBookingDcVariables>;

interface UpdateBookingDcRef {
  ...
  (dc: DataConnect, vars: UpdateBookingDcVariables): MutationRef<UpdateBookingDcData, UpdateBookingDcVariables>;
}
export const updateBookingDcRef: UpdateBookingDcRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateBookingDcRef:
```typescript
const name = updateBookingDcRef.operationName;
console.log(name);
```

### Variables
The `UpdateBookingDC` mutation requires an argument of type `UpdateBookingDcVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateBookingDcVariables {
  id: UUIDString;
  bookingStatus?: string | null;
  checkOutActual?: TimestampString | null;
  totalPaid?: number | null;
}
```
### Return Type
Recall that executing the `UpdateBookingDC` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateBookingDcData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateBookingDcData {
  booking_update?: Booking_Key | null;
}
```
### Using `UpdateBookingDC`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateBookingDc, UpdateBookingDcVariables } from '@dataconnect/generated';

// The `UpdateBookingDC` mutation requires an argument of type `UpdateBookingDcVariables`:
const updateBookingDcVars: UpdateBookingDcVariables = {
  id: ..., 
  bookingStatus: ..., // optional
  checkOutActual: ..., // optional
  totalPaid: ..., // optional
};

// Call the `updateBookingDc()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateBookingDc(updateBookingDcVars);
// Variables can be defined inline as well.
const { data } = await updateBookingDc({ id: ..., bookingStatus: ..., checkOutActual: ..., totalPaid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateBookingDc(dataConnect, updateBookingDcVars);

console.log(data.booking_update);

// Or, you can use the `Promise` API.
updateBookingDc(updateBookingDcVars).then((response) => {
  const data = response.data;
  console.log(data.booking_update);
});
```

### Using `UpdateBookingDC`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateBookingDcRef, UpdateBookingDcVariables } from '@dataconnect/generated';

// The `UpdateBookingDC` mutation requires an argument of type `UpdateBookingDcVariables`:
const updateBookingDcVars: UpdateBookingDcVariables = {
  id: ..., 
  bookingStatus: ..., // optional
  checkOutActual: ..., // optional
  totalPaid: ..., // optional
};

// Call the `updateBookingDcRef()` function to get a reference to the mutation.
const ref = updateBookingDcRef(updateBookingDcVars);
// Variables can be defined inline as well.
const ref = updateBookingDcRef({ id: ..., bookingStatus: ..., checkOutActual: ..., totalPaid: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateBookingDcRef(dataConnect, updateBookingDcVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.booking_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.booking_update);
});
```

## CreateLogDC
You can execute the `CreateLogDC` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createLogDc(vars: CreateLogDcVariables): MutationPromise<CreateLogDcData, CreateLogDcVariables>;

interface CreateLogDcRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateLogDcVariables): MutationRef<CreateLogDcData, CreateLogDcVariables>;
}
export const createLogDcRef: CreateLogDcRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createLogDc(dc: DataConnect, vars: CreateLogDcVariables): MutationPromise<CreateLogDcData, CreateLogDcVariables>;

interface CreateLogDcRef {
  ...
  (dc: DataConnect, vars: CreateLogDcVariables): MutationRef<CreateLogDcData, CreateLogDcVariables>;
}
export const createLogDcRef: CreateLogDcRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createLogDcRef:
```typescript
const name = createLogDcRef.operationName;
console.log(name);
```

### Variables
The `CreateLogDC` mutation requires an argument of type `CreateLogDcVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateLogDcVariables {
  hotelId: UUIDString;
  action: string;
  user: string;
  category: string;
  details: string;
}
```
### Return Type
Recall that executing the `CreateLogDC` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateLogDcData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateLogDcData {
  log_insert: Log_Key;
}
```
### Using `CreateLogDC`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createLogDc, CreateLogDcVariables } from '@dataconnect/generated';

// The `CreateLogDC` mutation requires an argument of type `CreateLogDcVariables`:
const createLogDcVars: CreateLogDcVariables = {
  hotelId: ..., 
  action: ..., 
  user: ..., 
  category: ..., 
  details: ..., 
};

// Call the `createLogDc()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createLogDc(createLogDcVars);
// Variables can be defined inline as well.
const { data } = await createLogDc({ hotelId: ..., action: ..., user: ..., category: ..., details: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createLogDc(dataConnect, createLogDcVars);

console.log(data.log_insert);

// Or, you can use the `Promise` API.
createLogDc(createLogDcVars).then((response) => {
  const data = response.data;
  console.log(data.log_insert);
});
```

### Using `CreateLogDC`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createLogDcRef, CreateLogDcVariables } from '@dataconnect/generated';

// The `CreateLogDC` mutation requires an argument of type `CreateLogDcVariables`:
const createLogDcVars: CreateLogDcVariables = {
  hotelId: ..., 
  action: ..., 
  user: ..., 
  category: ..., 
  details: ..., 
};

// Call the `createLogDcRef()` function to get a reference to the mutation.
const ref = createLogDcRef(createLogDcVars);
// Variables can be defined inline as well.
const ref = createLogDcRef({ hotelId: ..., action: ..., user: ..., category: ..., details: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createLogDcRef(dataConnect, createLogDcVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.log_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.log_insert);
});
```

## CreateStaffDC
You can execute the `CreateStaffDC` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createStaffDc(vars: CreateStaffDcVariables): MutationPromise<CreateStaffDcData, CreateStaffDcVariables>;

interface CreateStaffDcRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateStaffDcVariables): MutationRef<CreateStaffDcData, CreateStaffDcVariables>;
}
export const createStaffDcRef: CreateStaffDcRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createStaffDc(dc: DataConnect, vars: CreateStaffDcVariables): MutationPromise<CreateStaffDcData, CreateStaffDcVariables>;

interface CreateStaffDcRef {
  ...
  (dc: DataConnect, vars: CreateStaffDcVariables): MutationRef<CreateStaffDcData, CreateStaffDcVariables>;
}
export const createStaffDcRef: CreateStaffDcRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createStaffDcRef:
```typescript
const name = createStaffDcRef.operationName;
console.log(name);
```

### Variables
The `CreateStaffDC` mutation requires an argument of type `CreateStaffDcVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateStaffDcVariables {
  hotelId: UUIDString;
  firstName: string;
  lastName: string;
  role: string;
  status: string;
  currentStatus: string;
  pin?: string | null;
}
```
### Return Type
Recall that executing the `CreateStaffDC` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateStaffDcData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateStaffDcData {
  staff_insert: Staff_Key;
}
```
### Using `CreateStaffDC`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createStaffDc, CreateStaffDcVariables } from '@dataconnect/generated';

// The `CreateStaffDC` mutation requires an argument of type `CreateStaffDcVariables`:
const createStaffDcVars: CreateStaffDcVariables = {
  hotelId: ..., 
  firstName: ..., 
  lastName: ..., 
  role: ..., 
  status: ..., 
  currentStatus: ..., 
  pin: ..., // optional
};

// Call the `createStaffDc()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createStaffDc(createStaffDcVars);
// Variables can be defined inline as well.
const { data } = await createStaffDc({ hotelId: ..., firstName: ..., lastName: ..., role: ..., status: ..., currentStatus: ..., pin: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createStaffDc(dataConnect, createStaffDcVars);

console.log(data.staff_insert);

// Or, you can use the `Promise` API.
createStaffDc(createStaffDcVars).then((response) => {
  const data = response.data;
  console.log(data.staff_insert);
});
```

### Using `CreateStaffDC`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createStaffDcRef, CreateStaffDcVariables } from '@dataconnect/generated';

// The `CreateStaffDC` mutation requires an argument of type `CreateStaffDcVariables`:
const createStaffDcVars: CreateStaffDcVariables = {
  hotelId: ..., 
  firstName: ..., 
  lastName: ..., 
  role: ..., 
  status: ..., 
  currentStatus: ..., 
  pin: ..., // optional
};

// Call the `createStaffDcRef()` function to get a reference to the mutation.
const ref = createStaffDcRef(createStaffDcVars);
// Variables can be defined inline as well.
const ref = createStaffDcRef({ hotelId: ..., firstName: ..., lastName: ..., role: ..., status: ..., currentStatus: ..., pin: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createStaffDcRef(dataConnect, createStaffDcVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.staff_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.staff_insert);
});
```

## UpdateStaffDC
You can execute the `UpdateStaffDC` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateStaffDc(vars: UpdateStaffDcVariables): MutationPromise<UpdateStaffDcData, UpdateStaffDcVariables>;

interface UpdateStaffDcRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateStaffDcVariables): MutationRef<UpdateStaffDcData, UpdateStaffDcVariables>;
}
export const updateStaffDcRef: UpdateStaffDcRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateStaffDc(dc: DataConnect, vars: UpdateStaffDcVariables): MutationPromise<UpdateStaffDcData, UpdateStaffDcVariables>;

interface UpdateStaffDcRef {
  ...
  (dc: DataConnect, vars: UpdateStaffDcVariables): MutationRef<UpdateStaffDcData, UpdateStaffDcVariables>;
}
export const updateStaffDcRef: UpdateStaffDcRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateStaffDcRef:
```typescript
const name = updateStaffDcRef.operationName;
console.log(name);
```

### Variables
The `UpdateStaffDC` mutation requires an argument of type `UpdateStaffDcVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateStaffDcVariables {
  id: UUIDString;
  currentStatus?: string | null;
  status?: string | null;
}
```
### Return Type
Recall that executing the `UpdateStaffDC` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateStaffDcData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateStaffDcData {
  staff_update?: Staff_Key | null;
}
```
### Using `UpdateStaffDC`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateStaffDc, UpdateStaffDcVariables } from '@dataconnect/generated';

// The `UpdateStaffDC` mutation requires an argument of type `UpdateStaffDcVariables`:
const updateStaffDcVars: UpdateStaffDcVariables = {
  id: ..., 
  currentStatus: ..., // optional
  status: ..., // optional
};

// Call the `updateStaffDc()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateStaffDc(updateStaffDcVars);
// Variables can be defined inline as well.
const { data } = await updateStaffDc({ id: ..., currentStatus: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateStaffDc(dataConnect, updateStaffDcVars);

console.log(data.staff_update);

// Or, you can use the `Promise` API.
updateStaffDc(updateStaffDcVars).then((response) => {
  const data = response.data;
  console.log(data.staff_update);
});
```

### Using `UpdateStaffDC`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateStaffDcRef, UpdateStaffDcVariables } from '@dataconnect/generated';

// The `UpdateStaffDC` mutation requires an argument of type `UpdateStaffDcVariables`:
const updateStaffDcVars: UpdateStaffDcVariables = {
  id: ..., 
  currentStatus: ..., // optional
  status: ..., // optional
};

// Call the `updateStaffDcRef()` function to get a reference to the mutation.
const ref = updateStaffDcRef(updateStaffDcVars);
// Variables can be defined inline as well.
const ref = updateStaffDcRef({ id: ..., currentStatus: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateStaffDcRef(dataConnect, updateStaffDcVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.staff_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.staff_update);
});
```

## CreateTimeLogDC
You can execute the `CreateTimeLogDC` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createTimeLogDc(vars: CreateTimeLogDcVariables): MutationPromise<CreateTimeLogDcData, CreateTimeLogDcVariables>;

interface CreateTimeLogDcRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateTimeLogDcVariables): MutationRef<CreateTimeLogDcData, CreateTimeLogDcVariables>;
}
export const createTimeLogDcRef: CreateTimeLogDcRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createTimeLogDc(dc: DataConnect, vars: CreateTimeLogDcVariables): MutationPromise<CreateTimeLogDcData, CreateTimeLogDcVariables>;

interface CreateTimeLogDcRef {
  ...
  (dc: DataConnect, vars: CreateTimeLogDcVariables): MutationRef<CreateTimeLogDcData, CreateTimeLogDcVariables>;
}
export const createTimeLogDcRef: CreateTimeLogDcRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createTimeLogDcRef:
```typescript
const name = createTimeLogDcRef.operationName;
console.log(name);
```

### Variables
The `CreateTimeLogDC` mutation requires an argument of type `CreateTimeLogDcVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateTimeLogDcVariables {
  hotelId: UUIDString;
  staffId: UUIDString;
  date: DateString;
  startTime: TimestampString;
  status: string;
}
```
### Return Type
Recall that executing the `CreateTimeLogDC` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateTimeLogDcData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateTimeLogDcData {
  timeLog_insert: TimeLog_Key;
}
```
### Using `CreateTimeLogDC`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createTimeLogDc, CreateTimeLogDcVariables } from '@dataconnect/generated';

// The `CreateTimeLogDC` mutation requires an argument of type `CreateTimeLogDcVariables`:
const createTimeLogDcVars: CreateTimeLogDcVariables = {
  hotelId: ..., 
  staffId: ..., 
  date: ..., 
  startTime: ..., 
  status: ..., 
};

// Call the `createTimeLogDc()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createTimeLogDc(createTimeLogDcVars);
// Variables can be defined inline as well.
const { data } = await createTimeLogDc({ hotelId: ..., staffId: ..., date: ..., startTime: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createTimeLogDc(dataConnect, createTimeLogDcVars);

console.log(data.timeLog_insert);

// Or, you can use the `Promise` API.
createTimeLogDc(createTimeLogDcVars).then((response) => {
  const data = response.data;
  console.log(data.timeLog_insert);
});
```

### Using `CreateTimeLogDC`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createTimeLogDcRef, CreateTimeLogDcVariables } from '@dataconnect/generated';

// The `CreateTimeLogDC` mutation requires an argument of type `CreateTimeLogDcVariables`:
const createTimeLogDcVars: CreateTimeLogDcVariables = {
  hotelId: ..., 
  staffId: ..., 
  date: ..., 
  startTime: ..., 
  status: ..., 
};

// Call the `createTimeLogDcRef()` function to get a reference to the mutation.
const ref = createTimeLogDcRef(createTimeLogDcVars);
// Variables can be defined inline as well.
const ref = createTimeLogDcRef({ hotelId: ..., staffId: ..., date: ..., startTime: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createTimeLogDcRef(dataConnect, createTimeLogDcVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.timeLog_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.timeLog_insert);
});
```

## UpdateTimeLogDC
You can execute the `UpdateTimeLogDC` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateTimeLogDc(vars: UpdateTimeLogDcVariables): MutationPromise<UpdateTimeLogDcData, UpdateTimeLogDcVariables>;

interface UpdateTimeLogDcRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateTimeLogDcVariables): MutationRef<UpdateTimeLogDcData, UpdateTimeLogDcVariables>;
}
export const updateTimeLogDcRef: UpdateTimeLogDcRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateTimeLogDc(dc: DataConnect, vars: UpdateTimeLogDcVariables): MutationPromise<UpdateTimeLogDcData, UpdateTimeLogDcVariables>;

interface UpdateTimeLogDcRef {
  ...
  (dc: DataConnect, vars: UpdateTimeLogDcVariables): MutationRef<UpdateTimeLogDcData, UpdateTimeLogDcVariables>;
}
export const updateTimeLogDcRef: UpdateTimeLogDcRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateTimeLogDcRef:
```typescript
const name = updateTimeLogDcRef.operationName;
console.log(name);
```

### Variables
The `UpdateTimeLogDC` mutation requires an argument of type `UpdateTimeLogDcVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateTimeLogDcVariables {
  id: UUIDString;
  endTime?: TimestampString | null;
  breaks?: unknown | null;
  totalHours?: number | null;
  status?: string | null;
}
```
### Return Type
Recall that executing the `UpdateTimeLogDC` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateTimeLogDcData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateTimeLogDcData {
  timeLog_update?: TimeLog_Key | null;
}
```
### Using `UpdateTimeLogDC`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateTimeLogDc, UpdateTimeLogDcVariables } from '@dataconnect/generated';

// The `UpdateTimeLogDC` mutation requires an argument of type `UpdateTimeLogDcVariables`:
const updateTimeLogDcVars: UpdateTimeLogDcVariables = {
  id: ..., 
  endTime: ..., // optional
  breaks: ..., // optional
  totalHours: ..., // optional
  status: ..., // optional
};

// Call the `updateTimeLogDc()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateTimeLogDc(updateTimeLogDcVars);
// Variables can be defined inline as well.
const { data } = await updateTimeLogDc({ id: ..., endTime: ..., breaks: ..., totalHours: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateTimeLogDc(dataConnect, updateTimeLogDcVars);

console.log(data.timeLog_update);

// Or, you can use the `Promise` API.
updateTimeLogDc(updateTimeLogDcVars).then((response) => {
  const data = response.data;
  console.log(data.timeLog_update);
});
```

### Using `UpdateTimeLogDC`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateTimeLogDcRef, UpdateTimeLogDcVariables } from '@dataconnect/generated';

// The `UpdateTimeLogDC` mutation requires an argument of type `UpdateTimeLogDcVariables`:
const updateTimeLogDcVars: UpdateTimeLogDcVariables = {
  id: ..., 
  endTime: ..., // optional
  breaks: ..., // optional
  totalHours: ..., // optional
  status: ..., // optional
};

// Call the `updateTimeLogDcRef()` function to get a reference to the mutation.
const ref = updateTimeLogDcRef(updateTimeLogDcVars);
// Variables can be defined inline as well.
const ref = updateTimeLogDcRef({ id: ..., endTime: ..., breaks: ..., totalHours: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateTimeLogDcRef(dataConnect, updateTimeLogDcVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.timeLog_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.timeLog_update);
});
```

## CreateFinancialDocumentDC
You can execute the `CreateFinancialDocumentDC` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createFinancialDocumentDc(vars: CreateFinancialDocumentDcVariables): MutationPromise<CreateFinancialDocumentDcData, CreateFinancialDocumentDcVariables>;

interface CreateFinancialDocumentDcRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateFinancialDocumentDcVariables): MutationRef<CreateFinancialDocumentDcData, CreateFinancialDocumentDcVariables>;
}
export const createFinancialDocumentDcRef: CreateFinancialDocumentDcRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createFinancialDocumentDc(dc: DataConnect, vars: CreateFinancialDocumentDcVariables): MutationPromise<CreateFinancialDocumentDcData, CreateFinancialDocumentDcVariables>;

interface CreateFinancialDocumentDcRef {
  ...
  (dc: DataConnect, vars: CreateFinancialDocumentDcVariables): MutationRef<CreateFinancialDocumentDcData, CreateFinancialDocumentDcVariables>;
}
export const createFinancialDocumentDcRef: CreateFinancialDocumentDcRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createFinancialDocumentDcRef:
```typescript
const name = createFinancialDocumentDcRef.operationName;
console.log(name);
```

### Variables
The `CreateFinancialDocumentDC` mutation requires an argument of type `CreateFinancialDocumentDcVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateFinancialDocumentDcVariables {
  hotelId: UUIDString;
  docType: string;
  number: string;
  date: TimestampString;
  guestId?: UUIDString | null;
  guestName: string;
  totalAmount: number;
  notes?: string | null;
  items?: unknown | null;
  bookingId?: UUIDString | null;
}
```
### Return Type
Recall that executing the `CreateFinancialDocumentDC` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateFinancialDocumentDcData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateFinancialDocumentDcData {
  financialDocument_insert: FinancialDocument_Key;
}
```
### Using `CreateFinancialDocumentDC`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createFinancialDocumentDc, CreateFinancialDocumentDcVariables } from '@dataconnect/generated';

// The `CreateFinancialDocumentDC` mutation requires an argument of type `CreateFinancialDocumentDcVariables`:
const createFinancialDocumentDcVars: CreateFinancialDocumentDcVariables = {
  hotelId: ..., 
  docType: ..., 
  number: ..., 
  date: ..., 
  guestId: ..., // optional
  guestName: ..., 
  totalAmount: ..., 
  notes: ..., // optional
  items: ..., // optional
  bookingId: ..., // optional
};

// Call the `createFinancialDocumentDc()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createFinancialDocumentDc(createFinancialDocumentDcVars);
// Variables can be defined inline as well.
const { data } = await createFinancialDocumentDc({ hotelId: ..., docType: ..., number: ..., date: ..., guestId: ..., guestName: ..., totalAmount: ..., notes: ..., items: ..., bookingId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createFinancialDocumentDc(dataConnect, createFinancialDocumentDcVars);

console.log(data.financialDocument_insert);

// Or, you can use the `Promise` API.
createFinancialDocumentDc(createFinancialDocumentDcVars).then((response) => {
  const data = response.data;
  console.log(data.financialDocument_insert);
});
```

### Using `CreateFinancialDocumentDC`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createFinancialDocumentDcRef, CreateFinancialDocumentDcVariables } from '@dataconnect/generated';

// The `CreateFinancialDocumentDC` mutation requires an argument of type `CreateFinancialDocumentDcVariables`:
const createFinancialDocumentDcVars: CreateFinancialDocumentDcVariables = {
  hotelId: ..., 
  docType: ..., 
  number: ..., 
  date: ..., 
  guestId: ..., // optional
  guestName: ..., 
  totalAmount: ..., 
  notes: ..., // optional
  items: ..., // optional
  bookingId: ..., // optional
};

// Call the `createFinancialDocumentDcRef()` function to get a reference to the mutation.
const ref = createFinancialDocumentDcRef(createFinancialDocumentDcVars);
// Variables can be defined inline as well.
const ref = createFinancialDocumentDcRef({ hotelId: ..., docType: ..., number: ..., date: ..., guestId: ..., guestName: ..., totalAmount: ..., notes: ..., items: ..., bookingId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createFinancialDocumentDcRef(dataConnect, createFinancialDocumentDcVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.financialDocument_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.financialDocument_insert);
});
```

## UpsertUser
You can execute the `UpsertUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
upsertUser(vars: UpsertUserVariables): MutationPromise<UpsertUserData, UpsertUserVariables>;

interface UpsertUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertUserVariables): MutationRef<UpsertUserData, UpsertUserVariables>;
}
export const upsertUserRef: UpsertUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertUser(dc: DataConnect, vars: UpsertUserVariables): MutationPromise<UpsertUserData, UpsertUserVariables>;

interface UpsertUserRef {
  ...
  (dc: DataConnect, vars: UpsertUserVariables): MutationRef<UpsertUserData, UpsertUserVariables>;
}
export const upsertUserRef: UpsertUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertUserRef:
```typescript
const name = upsertUserRef.operationName;
console.log(name);
```

### Variables
The `UpsertUser` mutation requires an argument of type `UpsertUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertUserVariables {
  id: string;
  email: string;
  role: string;
}
```
### Return Type
Recall that executing the `UpsertUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertUserData {
  user_upsert: User_Key;
}
```
### Using `UpsertUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertUser, UpsertUserVariables } from '@dataconnect/generated';

// The `UpsertUser` mutation requires an argument of type `UpsertUserVariables`:
const upsertUserVars: UpsertUserVariables = {
  id: ..., 
  email: ..., 
  role: ..., 
};

// Call the `upsertUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertUser(upsertUserVars);
// Variables can be defined inline as well.
const { data } = await upsertUser({ id: ..., email: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertUser(dataConnect, upsertUserVars);

console.log(data.user_upsert);

// Or, you can use the `Promise` API.
upsertUser(upsertUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_upsert);
});
```

### Using `UpsertUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertUserRef, UpsertUserVariables } from '@dataconnect/generated';

// The `UpsertUser` mutation requires an argument of type `UpsertUserVariables`:
const upsertUserVars: UpsertUserVariables = {
  id: ..., 
  email: ..., 
  role: ..., 
};

// Call the `upsertUserRef()` function to get a reference to the mutation.
const ref = upsertUserRef(upsertUserVars);
// Variables can be defined inline as well.
const ref = upsertUserRef({ id: ..., email: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertUserRef(dataConnect, upsertUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_upsert);
});
```

## LinkUserToHotel
You can execute the `LinkUserToHotel` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
linkUserToHotel(vars: LinkUserToHotelVariables): MutationPromise<LinkUserToHotelData, LinkUserToHotelVariables>;

interface LinkUserToHotelRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: LinkUserToHotelVariables): MutationRef<LinkUserToHotelData, LinkUserToHotelVariables>;
}
export const linkUserToHotelRef: LinkUserToHotelRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
linkUserToHotel(dc: DataConnect, vars: LinkUserToHotelVariables): MutationPromise<LinkUserToHotelData, LinkUserToHotelVariables>;

interface LinkUserToHotelRef {
  ...
  (dc: DataConnect, vars: LinkUserToHotelVariables): MutationRef<LinkUserToHotelData, LinkUserToHotelVariables>;
}
export const linkUserToHotelRef: LinkUserToHotelRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the linkUserToHotelRef:
```typescript
const name = linkUserToHotelRef.operationName;
console.log(name);
```

### Variables
The `LinkUserToHotel` mutation requires an argument of type `LinkUserToHotelVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface LinkUserToHotelVariables {
  userId: string;
  hotelId: UUIDString;
}
```
### Return Type
Recall that executing the `LinkUserToHotel` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `LinkUserToHotelData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface LinkUserToHotelData {
  userHotel_insert: UserHotel_Key;
}
```
### Using `LinkUserToHotel`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, linkUserToHotel, LinkUserToHotelVariables } from '@dataconnect/generated';

// The `LinkUserToHotel` mutation requires an argument of type `LinkUserToHotelVariables`:
const linkUserToHotelVars: LinkUserToHotelVariables = {
  userId: ..., 
  hotelId: ..., 
};

// Call the `linkUserToHotel()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await linkUserToHotel(linkUserToHotelVars);
// Variables can be defined inline as well.
const { data } = await linkUserToHotel({ userId: ..., hotelId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await linkUserToHotel(dataConnect, linkUserToHotelVars);

console.log(data.userHotel_insert);

// Or, you can use the `Promise` API.
linkUserToHotel(linkUserToHotelVars).then((response) => {
  const data = response.data;
  console.log(data.userHotel_insert);
});
```

### Using `LinkUserToHotel`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, linkUserToHotelRef, LinkUserToHotelVariables } from '@dataconnect/generated';

// The `LinkUserToHotel` mutation requires an argument of type `LinkUserToHotelVariables`:
const linkUserToHotelVars: LinkUserToHotelVariables = {
  userId: ..., 
  hotelId: ..., 
};

// Call the `linkUserToHotelRef()` function to get a reference to the mutation.
const ref = linkUserToHotelRef(linkUserToHotelVars);
// Variables can be defined inline as well.
const ref = linkUserToHotelRef({ userId: ..., hotelId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = linkUserToHotelRef(dataConnect, linkUserToHotelVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.userHotel_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.userHotel_insert);
});
```

