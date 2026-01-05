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
  - [*GetUserByEmail*](#getuserbyemail)
  - [*ListMaintenance*](#listmaintenance)
  - [*ListShifts*](#listshifts)
  - [*ListHousekeeping*](#listhousekeeping)
  - [*ListInventory*](#listinventory)
  - [*ListAmenities*](#listamenities)
  - [*ListStoredDocuments*](#liststoreddocuments)
  - [*ListAiUsage*](#listaiusage)
- [**Mutations**](#mutations)
  - [*CreateRoom*](#createroom)
  - [*UpdateRoomStatus*](#updateroomstatus)
  - [*CreateHotel*](#createhotel)
  - [*UpdateHotelConfig*](#updatehotelconfig)
  - [*DeleteHotel*](#deletehotel)
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
  - [*CreateMaintenanceDC*](#createmaintenancedc)
  - [*CreateShiftDC*](#createshiftdc)
  - [*CreateHousekeepingTaskDC*](#createhousekeepingtaskdc)
  - [*UpsertInventoryItemDC*](#upsertinventoryitemdc)
  - [*CreateAmenityDC*](#createamenitydc)
  - [*CreateStoredDocumentDC*](#createstoreddocumentdc)
  - [*LogAiUsage*](#logaiusage)
  - [*SeedRooms*](#seedrooms)
  - [*SeedStaff*](#seedstaff)
  - [*SeedInventory*](#seedinventory)
  - [*SeedAmenities*](#seedamenities)

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

## GetUserByEmail
You can execute the `GetUserByEmail` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getUserByEmail(vars: GetUserByEmailVariables): QueryPromise<GetUserByEmailData, GetUserByEmailVariables>;

interface GetUserByEmailRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserByEmailVariables): QueryRef<GetUserByEmailData, GetUserByEmailVariables>;
}
export const getUserByEmailRef: GetUserByEmailRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUserByEmail(dc: DataConnect, vars: GetUserByEmailVariables): QueryPromise<GetUserByEmailData, GetUserByEmailVariables>;

interface GetUserByEmailRef {
  ...
  (dc: DataConnect, vars: GetUserByEmailVariables): QueryRef<GetUserByEmailData, GetUserByEmailVariables>;
}
export const getUserByEmailRef: GetUserByEmailRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserByEmailRef:
```typescript
const name = getUserByEmailRef.operationName;
console.log(name);
```

### Variables
The `GetUserByEmail` query requires an argument of type `GetUserByEmailVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetUserByEmailVariables {
  email: string;
}
```
### Return Type
Recall that executing the `GetUserByEmail` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserByEmailData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetUserByEmailData {
  users: ({
    id: string;
    email: string;
    role: string;
  } & User_Key)[];
}
```
### Using `GetUserByEmail`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUserByEmail, GetUserByEmailVariables } from '@dataconnect/generated';

// The `GetUserByEmail` query requires an argument of type `GetUserByEmailVariables`:
const getUserByEmailVars: GetUserByEmailVariables = {
  email: ..., 
};

// Call the `getUserByEmail()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUserByEmail(getUserByEmailVars);
// Variables can be defined inline as well.
const { data } = await getUserByEmail({ email: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUserByEmail(dataConnect, getUserByEmailVars);

console.log(data.users);

// Or, you can use the `Promise` API.
getUserByEmail(getUserByEmailVars).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

### Using `GetUserByEmail`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserByEmailRef, GetUserByEmailVariables } from '@dataconnect/generated';

// The `GetUserByEmail` query requires an argument of type `GetUserByEmailVariables`:
const getUserByEmailVars: GetUserByEmailVariables = {
  email: ..., 
};

// Call the `getUserByEmailRef()` function to get a reference to the query.
const ref = getUserByEmailRef(getUserByEmailVars);
// Variables can be defined inline as well.
const ref = getUserByEmailRef({ email: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserByEmailRef(dataConnect, getUserByEmailVars);

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

## ListMaintenance
You can execute the `ListMaintenance` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listMaintenance(vars: ListMaintenanceVariables): QueryPromise<ListMaintenanceData, ListMaintenanceVariables>;

interface ListMaintenanceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListMaintenanceVariables): QueryRef<ListMaintenanceData, ListMaintenanceVariables>;
}
export const listMaintenanceRef: ListMaintenanceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listMaintenance(dc: DataConnect, vars: ListMaintenanceVariables): QueryPromise<ListMaintenanceData, ListMaintenanceVariables>;

interface ListMaintenanceRef {
  ...
  (dc: DataConnect, vars: ListMaintenanceVariables): QueryRef<ListMaintenanceData, ListMaintenanceVariables>;
}
export const listMaintenanceRef: ListMaintenanceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listMaintenanceRef:
```typescript
const name = listMaintenanceRef.operationName;
console.log(name);
```

### Variables
The `ListMaintenance` query requires an argument of type `ListMaintenanceVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListMaintenanceVariables {
  hotelId: UUIDString;
}
```
### Return Type
Recall that executing the `ListMaintenance` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListMaintenanceData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListMaintenanceData {
  maintenanceRequests: ({
    id: UUIDString;
    description: string;
    priority: string;
    status: string;
    reportedBy: string;
    reportedAt: TimestampString;
    completedAt?: TimestampString | null;
    cost?: number | null;
    notes?: string | null;
    room: {
      id: UUIDString;
      roomNumber: string;
    } & Room_Key;
  } & MaintenanceRequest_Key)[];
}
```
### Using `ListMaintenance`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listMaintenance, ListMaintenanceVariables } from '@dataconnect/generated';

// The `ListMaintenance` query requires an argument of type `ListMaintenanceVariables`:
const listMaintenanceVars: ListMaintenanceVariables = {
  hotelId: ..., 
};

// Call the `listMaintenance()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listMaintenance(listMaintenanceVars);
// Variables can be defined inline as well.
const { data } = await listMaintenance({ hotelId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listMaintenance(dataConnect, listMaintenanceVars);

console.log(data.maintenanceRequests);

// Or, you can use the `Promise` API.
listMaintenance(listMaintenanceVars).then((response) => {
  const data = response.data;
  console.log(data.maintenanceRequests);
});
```

### Using `ListMaintenance`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listMaintenanceRef, ListMaintenanceVariables } from '@dataconnect/generated';

// The `ListMaintenance` query requires an argument of type `ListMaintenanceVariables`:
const listMaintenanceVars: ListMaintenanceVariables = {
  hotelId: ..., 
};

// Call the `listMaintenanceRef()` function to get a reference to the query.
const ref = listMaintenanceRef(listMaintenanceVars);
// Variables can be defined inline as well.
const ref = listMaintenanceRef({ hotelId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listMaintenanceRef(dataConnect, listMaintenanceVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.maintenanceRequests);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.maintenanceRequests);
});
```

## ListShifts
You can execute the `ListShifts` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listShifts(vars: ListShiftsVariables): QueryPromise<ListShiftsData, ListShiftsVariables>;

interface ListShiftsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListShiftsVariables): QueryRef<ListShiftsData, ListShiftsVariables>;
}
export const listShiftsRef: ListShiftsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listShifts(dc: DataConnect, vars: ListShiftsVariables): QueryPromise<ListShiftsData, ListShiftsVariables>;

interface ListShiftsRef {
  ...
  (dc: DataConnect, vars: ListShiftsVariables): QueryRef<ListShiftsData, ListShiftsVariables>;
}
export const listShiftsRef: ListShiftsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listShiftsRef:
```typescript
const name = listShiftsRef.operationName;
console.log(name);
```

### Variables
The `ListShifts` query requires an argument of type `ListShiftsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListShiftsVariables {
  hotelId: UUIDString;
}
```
### Return Type
Recall that executing the `ListShifts` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListShiftsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListShiftsData {
  shifts: ({
    id: UUIDString;
    date: DateString;
    startTime: string;
    endTime: string;
    shiftType: string;
    notes?: string | null;
    staff: {
      id: UUIDString;
      firstName: string;
      lastName: string;
    } & Staff_Key;
  } & Shift_Key)[];
}
```
### Using `ListShifts`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listShifts, ListShiftsVariables } from '@dataconnect/generated';

// The `ListShifts` query requires an argument of type `ListShiftsVariables`:
const listShiftsVars: ListShiftsVariables = {
  hotelId: ..., 
};

// Call the `listShifts()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listShifts(listShiftsVars);
// Variables can be defined inline as well.
const { data } = await listShifts({ hotelId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listShifts(dataConnect, listShiftsVars);

console.log(data.shifts);

// Or, you can use the `Promise` API.
listShifts(listShiftsVars).then((response) => {
  const data = response.data;
  console.log(data.shifts);
});
```

### Using `ListShifts`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listShiftsRef, ListShiftsVariables } from '@dataconnect/generated';

// The `ListShifts` query requires an argument of type `ListShiftsVariables`:
const listShiftsVars: ListShiftsVariables = {
  hotelId: ..., 
};

// Call the `listShiftsRef()` function to get a reference to the query.
const ref = listShiftsRef(listShiftsVars);
// Variables can be defined inline as well.
const ref = listShiftsRef({ hotelId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listShiftsRef(dataConnect, listShiftsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.shifts);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.shifts);
});
```

## ListHousekeeping
You can execute the `ListHousekeeping` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listHousekeeping(vars: ListHousekeepingVariables): QueryPromise<ListHousekeepingData, ListHousekeepingVariables>;

interface ListHousekeepingRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListHousekeepingVariables): QueryRef<ListHousekeepingData, ListHousekeepingVariables>;
}
export const listHousekeepingRef: ListHousekeepingRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listHousekeeping(dc: DataConnect, vars: ListHousekeepingVariables): QueryPromise<ListHousekeepingData, ListHousekeepingVariables>;

interface ListHousekeepingRef {
  ...
  (dc: DataConnect, vars: ListHousekeepingVariables): QueryRef<ListHousekeepingData, ListHousekeepingVariables>;
}
export const listHousekeepingRef: ListHousekeepingRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listHousekeepingRef:
```typescript
const name = listHousekeepingRef.operationName;
console.log(name);
```

### Variables
The `ListHousekeeping` query requires an argument of type `ListHousekeepingVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListHousekeepingVariables {
  hotelId: UUIDString;
}
```
### Return Type
Recall that executing the `ListHousekeeping` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListHousekeepingData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListHousekeepingData {
  housekeepingTasks: ({
    id: UUIDString;
    status: string;
    priority: string;
    notes?: string | null;
    scheduledFor: TimestampString;
    completedAt?: TimestampString | null;
    room: {
      id: UUIDString;
      roomNumber: string;
    } & Room_Key;
      assignedTo?: {
        id: UUIDString;
        firstName: string;
        lastName: string;
      } & Staff_Key;
  } & HousekeepingTask_Key)[];
}
```
### Using `ListHousekeeping`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listHousekeeping, ListHousekeepingVariables } from '@dataconnect/generated';

// The `ListHousekeeping` query requires an argument of type `ListHousekeepingVariables`:
const listHousekeepingVars: ListHousekeepingVariables = {
  hotelId: ..., 
};

// Call the `listHousekeeping()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listHousekeeping(listHousekeepingVars);
// Variables can be defined inline as well.
const { data } = await listHousekeeping({ hotelId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listHousekeeping(dataConnect, listHousekeepingVars);

console.log(data.housekeepingTasks);

// Or, you can use the `Promise` API.
listHousekeeping(listHousekeepingVars).then((response) => {
  const data = response.data;
  console.log(data.housekeepingTasks);
});
```

### Using `ListHousekeeping`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listHousekeepingRef, ListHousekeepingVariables } from '@dataconnect/generated';

// The `ListHousekeeping` query requires an argument of type `ListHousekeepingVariables`:
const listHousekeepingVars: ListHousekeepingVariables = {
  hotelId: ..., 
};

// Call the `listHousekeepingRef()` function to get a reference to the query.
const ref = listHousekeepingRef(listHousekeepingVars);
// Variables can be defined inline as well.
const ref = listHousekeepingRef({ hotelId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listHousekeepingRef(dataConnect, listHousekeepingVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.housekeepingTasks);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.housekeepingTasks);
});
```

## ListInventory
You can execute the `ListInventory` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listInventory(vars: ListInventoryVariables): QueryPromise<ListInventoryData, ListInventoryVariables>;

interface ListInventoryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListInventoryVariables): QueryRef<ListInventoryData, ListInventoryVariables>;
}
export const listInventoryRef: ListInventoryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listInventory(dc: DataConnect, vars: ListInventoryVariables): QueryPromise<ListInventoryData, ListInventoryVariables>;

interface ListInventoryRef {
  ...
  (dc: DataConnect, vars: ListInventoryVariables): QueryRef<ListInventoryData, ListInventoryVariables>;
}
export const listInventoryRef: ListInventoryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listInventoryRef:
```typescript
const name = listInventoryRef.operationName;
console.log(name);
```

### Variables
The `ListInventory` query requires an argument of type `ListInventoryVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListInventoryVariables {
  hotelId: UUIDString;
}
```
### Return Type
Recall that executing the `ListInventory` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListInventoryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListInventoryData {
  inventoryItems: ({
    id: UUIDString;
    name: string;
    category: string;
    quantity: number;
    minQuantity: number;
    unit: string;
  } & InventoryItem_Key)[];
}
```
### Using `ListInventory`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listInventory, ListInventoryVariables } from '@dataconnect/generated';

// The `ListInventory` query requires an argument of type `ListInventoryVariables`:
const listInventoryVars: ListInventoryVariables = {
  hotelId: ..., 
};

// Call the `listInventory()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listInventory(listInventoryVars);
// Variables can be defined inline as well.
const { data } = await listInventory({ hotelId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listInventory(dataConnect, listInventoryVars);

console.log(data.inventoryItems);

// Or, you can use the `Promise` API.
listInventory(listInventoryVars).then((response) => {
  const data = response.data;
  console.log(data.inventoryItems);
});
```

### Using `ListInventory`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listInventoryRef, ListInventoryVariables } from '@dataconnect/generated';

// The `ListInventory` query requires an argument of type `ListInventoryVariables`:
const listInventoryVars: ListInventoryVariables = {
  hotelId: ..., 
};

// Call the `listInventoryRef()` function to get a reference to the query.
const ref = listInventoryRef(listInventoryVars);
// Variables can be defined inline as well.
const ref = listInventoryRef({ hotelId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listInventoryRef(dataConnect, listInventoryVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.inventoryItems);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.inventoryItems);
});
```

## ListAmenities
You can execute the `ListAmenities` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listAmenities(vars: ListAmenitiesVariables): QueryPromise<ListAmenitiesData, ListAmenitiesVariables>;

interface ListAmenitiesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListAmenitiesVariables): QueryRef<ListAmenitiesData, ListAmenitiesVariables>;
}
export const listAmenitiesRef: ListAmenitiesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listAmenities(dc: DataConnect, vars: ListAmenitiesVariables): QueryPromise<ListAmenitiesData, ListAmenitiesVariables>;

interface ListAmenitiesRef {
  ...
  (dc: DataConnect, vars: ListAmenitiesVariables): QueryRef<ListAmenitiesData, ListAmenitiesVariables>;
}
export const listAmenitiesRef: ListAmenitiesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listAmenitiesRef:
```typescript
const name = listAmenitiesRef.operationName;
console.log(name);
```

### Variables
The `ListAmenities` query requires an argument of type `ListAmenitiesVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListAmenitiesVariables {
  hotelId: UUIDString;
}
```
### Return Type
Recall that executing the `ListAmenities` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListAmenitiesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListAmenitiesData {
  amenities: ({
    id: UUIDString;
    name: string;
    description?: string | null;
    location?: string | null;
    status: string;
  } & Amenity_Key)[];
}
```
### Using `ListAmenities`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listAmenities, ListAmenitiesVariables } from '@dataconnect/generated';

// The `ListAmenities` query requires an argument of type `ListAmenitiesVariables`:
const listAmenitiesVars: ListAmenitiesVariables = {
  hotelId: ..., 
};

// Call the `listAmenities()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listAmenities(listAmenitiesVars);
// Variables can be defined inline as well.
const { data } = await listAmenities({ hotelId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listAmenities(dataConnect, listAmenitiesVars);

console.log(data.amenities);

// Or, you can use the `Promise` API.
listAmenities(listAmenitiesVars).then((response) => {
  const data = response.data;
  console.log(data.amenities);
});
```

### Using `ListAmenities`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listAmenitiesRef, ListAmenitiesVariables } from '@dataconnect/generated';

// The `ListAmenities` query requires an argument of type `ListAmenitiesVariables`:
const listAmenitiesVars: ListAmenitiesVariables = {
  hotelId: ..., 
};

// Call the `listAmenitiesRef()` function to get a reference to the query.
const ref = listAmenitiesRef(listAmenitiesVars);
// Variables can be defined inline as well.
const ref = listAmenitiesRef({ hotelId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listAmenitiesRef(dataConnect, listAmenitiesVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.amenities);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.amenities);
});
```

## ListStoredDocuments
You can execute the `ListStoredDocuments` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listStoredDocuments(vars: ListStoredDocumentsVariables): QueryPromise<ListStoredDocumentsData, ListStoredDocumentsVariables>;

interface ListStoredDocumentsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListStoredDocumentsVariables): QueryRef<ListStoredDocumentsData, ListStoredDocumentsVariables>;
}
export const listStoredDocumentsRef: ListStoredDocumentsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listStoredDocuments(dc: DataConnect, vars: ListStoredDocumentsVariables): QueryPromise<ListStoredDocumentsData, ListStoredDocumentsVariables>;

interface ListStoredDocumentsRef {
  ...
  (dc: DataConnect, vars: ListStoredDocumentsVariables): QueryRef<ListStoredDocumentsData, ListStoredDocumentsVariables>;
}
export const listStoredDocumentsRef: ListStoredDocumentsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listStoredDocumentsRef:
```typescript
const name = listStoredDocumentsRef.operationName;
console.log(name);
```

### Variables
The `ListStoredDocuments` query requires an argument of type `ListStoredDocumentsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListStoredDocumentsVariables {
  hotelId: UUIDString;
}
```
### Return Type
Recall that executing the `ListStoredDocuments` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListStoredDocumentsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListStoredDocumentsData {
  storedDocuments: ({
    id: UUIDString;
    title: string;
    category: string;
    uploadedBy: string;
    uploadedAt: TimestampString;
    fileType: string;
    data: string;
    tags?: unknown | null;
    summary?: string | null;
    guest?: {
      id: UUIDString;
      name: string;
    } & Guest_Key;
  } & StoredDocument_Key)[];
}
```
### Using `ListStoredDocuments`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listStoredDocuments, ListStoredDocumentsVariables } from '@dataconnect/generated';

// The `ListStoredDocuments` query requires an argument of type `ListStoredDocumentsVariables`:
const listStoredDocumentsVars: ListStoredDocumentsVariables = {
  hotelId: ..., 
};

// Call the `listStoredDocuments()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listStoredDocuments(listStoredDocumentsVars);
// Variables can be defined inline as well.
const { data } = await listStoredDocuments({ hotelId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listStoredDocuments(dataConnect, listStoredDocumentsVars);

console.log(data.storedDocuments);

// Or, you can use the `Promise` API.
listStoredDocuments(listStoredDocumentsVars).then((response) => {
  const data = response.data;
  console.log(data.storedDocuments);
});
```

### Using `ListStoredDocuments`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listStoredDocumentsRef, ListStoredDocumentsVariables } from '@dataconnect/generated';

// The `ListStoredDocuments` query requires an argument of type `ListStoredDocumentsVariables`:
const listStoredDocumentsVars: ListStoredDocumentsVariables = {
  hotelId: ..., 
};

// Call the `listStoredDocumentsRef()` function to get a reference to the query.
const ref = listStoredDocumentsRef(listStoredDocumentsVars);
// Variables can be defined inline as well.
const ref = listStoredDocumentsRef({ hotelId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listStoredDocumentsRef(dataConnect, listStoredDocumentsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.storedDocuments);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.storedDocuments);
});
```

## ListAiUsage
You can execute the `ListAiUsage` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listAiUsage(vars: ListAiUsageVariables): QueryPromise<ListAiUsageData, ListAiUsageVariables>;

interface ListAiUsageRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListAiUsageVariables): QueryRef<ListAiUsageData, ListAiUsageVariables>;
}
export const listAiUsageRef: ListAiUsageRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listAiUsage(dc: DataConnect, vars: ListAiUsageVariables): QueryPromise<ListAiUsageData, ListAiUsageVariables>;

interface ListAiUsageRef {
  ...
  (dc: DataConnect, vars: ListAiUsageVariables): QueryRef<ListAiUsageData, ListAiUsageVariables>;
}
export const listAiUsageRef: ListAiUsageRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listAiUsageRef:
```typescript
const name = listAiUsageRef.operationName;
console.log(name);
```

### Variables
The `ListAiUsage` query requires an argument of type `ListAiUsageVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListAiUsageVariables {
  hotelId: UUIDString;
}
```
### Return Type
Recall that executing the `ListAiUsage` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListAiUsageData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListAiUsageData {
  aiUsages: ({
    id: UUIDString;
    userId: string;
    timestamp: TimestampString;
    feature: string;
    model: string;
    totalTokens?: number | null;
  } & AiUsage_Key)[];
}
```
### Using `ListAiUsage`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listAiUsage, ListAiUsageVariables } from '@dataconnect/generated';

// The `ListAiUsage` query requires an argument of type `ListAiUsageVariables`:
const listAiUsageVars: ListAiUsageVariables = {
  hotelId: ..., 
};

// Call the `listAiUsage()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listAiUsage(listAiUsageVars);
// Variables can be defined inline as well.
const { data } = await listAiUsage({ hotelId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listAiUsage(dataConnect, listAiUsageVars);

console.log(data.aiUsages);

// Or, you can use the `Promise` API.
listAiUsage(listAiUsageVars).then((response) => {
  const data = response.data;
  console.log(data.aiUsages);
});
```

### Using `ListAiUsage`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listAiUsageRef, ListAiUsageVariables } from '@dataconnect/generated';

// The `ListAiUsage` query requires an argument of type `ListAiUsageVariables`:
const listAiUsageVars: ListAiUsageVariables = {
  hotelId: ..., 
};

// Call the `listAiUsageRef()` function to get a reference to the query.
const ref = listAiUsageRef(listAiUsageVars);
// Variables can be defined inline as well.
const ref = listAiUsageRef({ hotelId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listAiUsageRef(dataConnect, listAiUsageVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.aiUsages);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.aiUsages);
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

## DeleteHotel
You can execute the `DeleteHotel` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteHotel(vars: DeleteHotelVariables): MutationPromise<DeleteHotelData, DeleteHotelVariables>;

interface DeleteHotelRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteHotelVariables): MutationRef<DeleteHotelData, DeleteHotelVariables>;
}
export const deleteHotelRef: DeleteHotelRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteHotel(dc: DataConnect, vars: DeleteHotelVariables): MutationPromise<DeleteHotelData, DeleteHotelVariables>;

interface DeleteHotelRef {
  ...
  (dc: DataConnect, vars: DeleteHotelVariables): MutationRef<DeleteHotelData, DeleteHotelVariables>;
}
export const deleteHotelRef: DeleteHotelRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteHotelRef:
```typescript
const name = deleteHotelRef.operationName;
console.log(name);
```

### Variables
The `DeleteHotel` mutation requires an argument of type `DeleteHotelVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteHotelVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteHotel` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteHotelData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteHotelData {
  hotel_delete?: Hotel_Key | null;
}
```
### Using `DeleteHotel`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteHotel, DeleteHotelVariables } from '@dataconnect/generated';

// The `DeleteHotel` mutation requires an argument of type `DeleteHotelVariables`:
const deleteHotelVars: DeleteHotelVariables = {
  id: ..., 
};

// Call the `deleteHotel()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteHotel(deleteHotelVars);
// Variables can be defined inline as well.
const { data } = await deleteHotel({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteHotel(dataConnect, deleteHotelVars);

console.log(data.hotel_delete);

// Or, you can use the `Promise` API.
deleteHotel(deleteHotelVars).then((response) => {
  const data = response.data;
  console.log(data.hotel_delete);
});
```

### Using `DeleteHotel`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteHotelRef, DeleteHotelVariables } from '@dataconnect/generated';

// The `DeleteHotel` mutation requires an argument of type `DeleteHotelVariables`:
const deleteHotelVars: DeleteHotelVariables = {
  id: ..., 
};

// Call the `deleteHotelRef()` function to get a reference to the mutation.
const ref = deleteHotelRef(deleteHotelVars);
// Variables can be defined inline as well.
const ref = deleteHotelRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteHotelRef(dataConnect, deleteHotelVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.hotel_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.hotel_delete);
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

## CreateMaintenanceDC
You can execute the `CreateMaintenanceDC` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createMaintenanceDc(vars: CreateMaintenanceDcVariables): MutationPromise<CreateMaintenanceDcData, CreateMaintenanceDcVariables>;

interface CreateMaintenanceDcRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateMaintenanceDcVariables): MutationRef<CreateMaintenanceDcData, CreateMaintenanceDcVariables>;
}
export const createMaintenanceDcRef: CreateMaintenanceDcRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createMaintenanceDc(dc: DataConnect, vars: CreateMaintenanceDcVariables): MutationPromise<CreateMaintenanceDcData, CreateMaintenanceDcVariables>;

interface CreateMaintenanceDcRef {
  ...
  (dc: DataConnect, vars: CreateMaintenanceDcVariables): MutationRef<CreateMaintenanceDcData, CreateMaintenanceDcVariables>;
}
export const createMaintenanceDcRef: CreateMaintenanceDcRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createMaintenanceDcRef:
```typescript
const name = createMaintenanceDcRef.operationName;
console.log(name);
```

### Variables
The `CreateMaintenanceDC` mutation requires an argument of type `CreateMaintenanceDcVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateMaintenanceDcVariables {
  hotelId: UUIDString;
  roomId: UUIDString;
  description: string;
  priority: string;
  status: string;
  reportedBy: string;
}
```
### Return Type
Recall that executing the `CreateMaintenanceDC` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateMaintenanceDcData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateMaintenanceDcData {
  maintenanceRequest_insert: MaintenanceRequest_Key;
}
```
### Using `CreateMaintenanceDC`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createMaintenanceDc, CreateMaintenanceDcVariables } from '@dataconnect/generated';

// The `CreateMaintenanceDC` mutation requires an argument of type `CreateMaintenanceDcVariables`:
const createMaintenanceDcVars: CreateMaintenanceDcVariables = {
  hotelId: ..., 
  roomId: ..., 
  description: ..., 
  priority: ..., 
  status: ..., 
  reportedBy: ..., 
};

// Call the `createMaintenanceDc()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createMaintenanceDc(createMaintenanceDcVars);
// Variables can be defined inline as well.
const { data } = await createMaintenanceDc({ hotelId: ..., roomId: ..., description: ..., priority: ..., status: ..., reportedBy: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createMaintenanceDc(dataConnect, createMaintenanceDcVars);

console.log(data.maintenanceRequest_insert);

// Or, you can use the `Promise` API.
createMaintenanceDc(createMaintenanceDcVars).then((response) => {
  const data = response.data;
  console.log(data.maintenanceRequest_insert);
});
```

### Using `CreateMaintenanceDC`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createMaintenanceDcRef, CreateMaintenanceDcVariables } from '@dataconnect/generated';

// The `CreateMaintenanceDC` mutation requires an argument of type `CreateMaintenanceDcVariables`:
const createMaintenanceDcVars: CreateMaintenanceDcVariables = {
  hotelId: ..., 
  roomId: ..., 
  description: ..., 
  priority: ..., 
  status: ..., 
  reportedBy: ..., 
};

// Call the `createMaintenanceDcRef()` function to get a reference to the mutation.
const ref = createMaintenanceDcRef(createMaintenanceDcVars);
// Variables can be defined inline as well.
const ref = createMaintenanceDcRef({ hotelId: ..., roomId: ..., description: ..., priority: ..., status: ..., reportedBy: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createMaintenanceDcRef(dataConnect, createMaintenanceDcVars);

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

## CreateShiftDC
You can execute the `CreateShiftDC` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createShiftDc(vars: CreateShiftDcVariables): MutationPromise<CreateShiftDcData, CreateShiftDcVariables>;

interface CreateShiftDcRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateShiftDcVariables): MutationRef<CreateShiftDcData, CreateShiftDcVariables>;
}
export const createShiftDcRef: CreateShiftDcRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createShiftDc(dc: DataConnect, vars: CreateShiftDcVariables): MutationPromise<CreateShiftDcData, CreateShiftDcVariables>;

interface CreateShiftDcRef {
  ...
  (dc: DataConnect, vars: CreateShiftDcVariables): MutationRef<CreateShiftDcData, CreateShiftDcVariables>;
}
export const createShiftDcRef: CreateShiftDcRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createShiftDcRef:
```typescript
const name = createShiftDcRef.operationName;
console.log(name);
```

### Variables
The `CreateShiftDC` mutation requires an argument of type `CreateShiftDcVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateShiftDcVariables {
  hotelId: UUIDString;
  staffId: UUIDString;
  date: DateString;
  startTime: string;
  endTime: string;
  shiftType: string;
  notes?: string | null;
}
```
### Return Type
Recall that executing the `CreateShiftDC` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateShiftDcData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateShiftDcData {
  shift_insert: Shift_Key;
}
```
### Using `CreateShiftDC`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createShiftDc, CreateShiftDcVariables } from '@dataconnect/generated';

// The `CreateShiftDC` mutation requires an argument of type `CreateShiftDcVariables`:
const createShiftDcVars: CreateShiftDcVariables = {
  hotelId: ..., 
  staffId: ..., 
  date: ..., 
  startTime: ..., 
  endTime: ..., 
  shiftType: ..., 
  notes: ..., // optional
};

// Call the `createShiftDc()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createShiftDc(createShiftDcVars);
// Variables can be defined inline as well.
const { data } = await createShiftDc({ hotelId: ..., staffId: ..., date: ..., startTime: ..., endTime: ..., shiftType: ..., notes: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createShiftDc(dataConnect, createShiftDcVars);

console.log(data.shift_insert);

// Or, you can use the `Promise` API.
createShiftDc(createShiftDcVars).then((response) => {
  const data = response.data;
  console.log(data.shift_insert);
});
```

### Using `CreateShiftDC`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createShiftDcRef, CreateShiftDcVariables } from '@dataconnect/generated';

// The `CreateShiftDC` mutation requires an argument of type `CreateShiftDcVariables`:
const createShiftDcVars: CreateShiftDcVariables = {
  hotelId: ..., 
  staffId: ..., 
  date: ..., 
  startTime: ..., 
  endTime: ..., 
  shiftType: ..., 
  notes: ..., // optional
};

// Call the `createShiftDcRef()` function to get a reference to the mutation.
const ref = createShiftDcRef(createShiftDcVars);
// Variables can be defined inline as well.
const ref = createShiftDcRef({ hotelId: ..., staffId: ..., date: ..., startTime: ..., endTime: ..., shiftType: ..., notes: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createShiftDcRef(dataConnect, createShiftDcVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.shift_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.shift_insert);
});
```

## CreateHousekeepingTaskDC
You can execute the `CreateHousekeepingTaskDC` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createHousekeepingTaskDc(vars: CreateHousekeepingTaskDcVariables): MutationPromise<CreateHousekeepingTaskDcData, CreateHousekeepingTaskDcVariables>;

interface CreateHousekeepingTaskDcRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateHousekeepingTaskDcVariables): MutationRef<CreateHousekeepingTaskDcData, CreateHousekeepingTaskDcVariables>;
}
export const createHousekeepingTaskDcRef: CreateHousekeepingTaskDcRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createHousekeepingTaskDc(dc: DataConnect, vars: CreateHousekeepingTaskDcVariables): MutationPromise<CreateHousekeepingTaskDcData, CreateHousekeepingTaskDcVariables>;

interface CreateHousekeepingTaskDcRef {
  ...
  (dc: DataConnect, vars: CreateHousekeepingTaskDcVariables): MutationRef<CreateHousekeepingTaskDcData, CreateHousekeepingTaskDcVariables>;
}
export const createHousekeepingTaskDcRef: CreateHousekeepingTaskDcRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createHousekeepingTaskDcRef:
```typescript
const name = createHousekeepingTaskDcRef.operationName;
console.log(name);
```

### Variables
The `CreateHousekeepingTaskDC` mutation requires an argument of type `CreateHousekeepingTaskDcVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateHousekeepingTaskDcVariables {
  hotelId: UUIDString;
  roomId: UUIDString;
  status: string;
  priority: string;
  scheduledFor: TimestampString;
  assignedToId?: UUIDString | null;
  notes?: string | null;
}
```
### Return Type
Recall that executing the `CreateHousekeepingTaskDC` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateHousekeepingTaskDcData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateHousekeepingTaskDcData {
  housekeepingTask_insert: HousekeepingTask_Key;
}
```
### Using `CreateHousekeepingTaskDC`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createHousekeepingTaskDc, CreateHousekeepingTaskDcVariables } from '@dataconnect/generated';

// The `CreateHousekeepingTaskDC` mutation requires an argument of type `CreateHousekeepingTaskDcVariables`:
const createHousekeepingTaskDcVars: CreateHousekeepingTaskDcVariables = {
  hotelId: ..., 
  roomId: ..., 
  status: ..., 
  priority: ..., 
  scheduledFor: ..., 
  assignedToId: ..., // optional
  notes: ..., // optional
};

// Call the `createHousekeepingTaskDc()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createHousekeepingTaskDc(createHousekeepingTaskDcVars);
// Variables can be defined inline as well.
const { data } = await createHousekeepingTaskDc({ hotelId: ..., roomId: ..., status: ..., priority: ..., scheduledFor: ..., assignedToId: ..., notes: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createHousekeepingTaskDc(dataConnect, createHousekeepingTaskDcVars);

console.log(data.housekeepingTask_insert);

// Or, you can use the `Promise` API.
createHousekeepingTaskDc(createHousekeepingTaskDcVars).then((response) => {
  const data = response.data;
  console.log(data.housekeepingTask_insert);
});
```

### Using `CreateHousekeepingTaskDC`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createHousekeepingTaskDcRef, CreateHousekeepingTaskDcVariables } from '@dataconnect/generated';

// The `CreateHousekeepingTaskDC` mutation requires an argument of type `CreateHousekeepingTaskDcVariables`:
const createHousekeepingTaskDcVars: CreateHousekeepingTaskDcVariables = {
  hotelId: ..., 
  roomId: ..., 
  status: ..., 
  priority: ..., 
  scheduledFor: ..., 
  assignedToId: ..., // optional
  notes: ..., // optional
};

// Call the `createHousekeepingTaskDcRef()` function to get a reference to the mutation.
const ref = createHousekeepingTaskDcRef(createHousekeepingTaskDcVars);
// Variables can be defined inline as well.
const ref = createHousekeepingTaskDcRef({ hotelId: ..., roomId: ..., status: ..., priority: ..., scheduledFor: ..., assignedToId: ..., notes: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createHousekeepingTaskDcRef(dataConnect, createHousekeepingTaskDcVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.housekeepingTask_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.housekeepingTask_insert);
});
```

## UpsertInventoryItemDC
You can execute the `UpsertInventoryItemDC` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
upsertInventoryItemDc(vars: UpsertInventoryItemDcVariables): MutationPromise<UpsertInventoryItemDcData, UpsertInventoryItemDcVariables>;

interface UpsertInventoryItemDcRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertInventoryItemDcVariables): MutationRef<UpsertInventoryItemDcData, UpsertInventoryItemDcVariables>;
}
export const upsertInventoryItemDcRef: UpsertInventoryItemDcRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertInventoryItemDc(dc: DataConnect, vars: UpsertInventoryItemDcVariables): MutationPromise<UpsertInventoryItemDcData, UpsertInventoryItemDcVariables>;

interface UpsertInventoryItemDcRef {
  ...
  (dc: DataConnect, vars: UpsertInventoryItemDcVariables): MutationRef<UpsertInventoryItemDcData, UpsertInventoryItemDcVariables>;
}
export const upsertInventoryItemDcRef: UpsertInventoryItemDcRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertInventoryItemDcRef:
```typescript
const name = upsertInventoryItemDcRef.operationName;
console.log(name);
```

### Variables
The `UpsertInventoryItemDC` mutation requires an argument of type `UpsertInventoryItemDcVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertInventoryItemDcVariables {
  id: UUIDString;
  hotelId: UUIDString;
  name: string;
  category: string;
  quantity: number;
  minQuantity: number;
  unit: string;
}
```
### Return Type
Recall that executing the `UpsertInventoryItemDC` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertInventoryItemDcData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertInventoryItemDcData {
  inventoryItem_upsert: InventoryItem_Key;
}
```
### Using `UpsertInventoryItemDC`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertInventoryItemDc, UpsertInventoryItemDcVariables } from '@dataconnect/generated';

// The `UpsertInventoryItemDC` mutation requires an argument of type `UpsertInventoryItemDcVariables`:
const upsertInventoryItemDcVars: UpsertInventoryItemDcVariables = {
  id: ..., 
  hotelId: ..., 
  name: ..., 
  category: ..., 
  quantity: ..., 
  minQuantity: ..., 
  unit: ..., 
};

// Call the `upsertInventoryItemDc()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertInventoryItemDc(upsertInventoryItemDcVars);
// Variables can be defined inline as well.
const { data } = await upsertInventoryItemDc({ id: ..., hotelId: ..., name: ..., category: ..., quantity: ..., minQuantity: ..., unit: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertInventoryItemDc(dataConnect, upsertInventoryItemDcVars);

console.log(data.inventoryItem_upsert);

// Or, you can use the `Promise` API.
upsertInventoryItemDc(upsertInventoryItemDcVars).then((response) => {
  const data = response.data;
  console.log(data.inventoryItem_upsert);
});
```

### Using `UpsertInventoryItemDC`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertInventoryItemDcRef, UpsertInventoryItemDcVariables } from '@dataconnect/generated';

// The `UpsertInventoryItemDC` mutation requires an argument of type `UpsertInventoryItemDcVariables`:
const upsertInventoryItemDcVars: UpsertInventoryItemDcVariables = {
  id: ..., 
  hotelId: ..., 
  name: ..., 
  category: ..., 
  quantity: ..., 
  minQuantity: ..., 
  unit: ..., 
};

// Call the `upsertInventoryItemDcRef()` function to get a reference to the mutation.
const ref = upsertInventoryItemDcRef(upsertInventoryItemDcVars);
// Variables can be defined inline as well.
const ref = upsertInventoryItemDcRef({ id: ..., hotelId: ..., name: ..., category: ..., quantity: ..., minQuantity: ..., unit: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertInventoryItemDcRef(dataConnect, upsertInventoryItemDcVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.inventoryItem_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.inventoryItem_upsert);
});
```

## CreateAmenityDC
You can execute the `CreateAmenityDC` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createAmenityDc(vars: CreateAmenityDcVariables): MutationPromise<CreateAmenityDcData, CreateAmenityDcVariables>;

interface CreateAmenityDcRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateAmenityDcVariables): MutationRef<CreateAmenityDcData, CreateAmenityDcVariables>;
}
export const createAmenityDcRef: CreateAmenityDcRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createAmenityDc(dc: DataConnect, vars: CreateAmenityDcVariables): MutationPromise<CreateAmenityDcData, CreateAmenityDcVariables>;

interface CreateAmenityDcRef {
  ...
  (dc: DataConnect, vars: CreateAmenityDcVariables): MutationRef<CreateAmenityDcData, CreateAmenityDcVariables>;
}
export const createAmenityDcRef: CreateAmenityDcRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createAmenityDcRef:
```typescript
const name = createAmenityDcRef.operationName;
console.log(name);
```

### Variables
The `CreateAmenityDC` mutation requires an argument of type `CreateAmenityDcVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateAmenityDcVariables {
  hotelId: UUIDString;
  name: string;
  description?: string | null;
  location?: string | null;
  status: string;
}
```
### Return Type
Recall that executing the `CreateAmenityDC` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateAmenityDcData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateAmenityDcData {
  amenity_insert: Amenity_Key;
}
```
### Using `CreateAmenityDC`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createAmenityDc, CreateAmenityDcVariables } from '@dataconnect/generated';

// The `CreateAmenityDC` mutation requires an argument of type `CreateAmenityDcVariables`:
const createAmenityDcVars: CreateAmenityDcVariables = {
  hotelId: ..., 
  name: ..., 
  description: ..., // optional
  location: ..., // optional
  status: ..., 
};

// Call the `createAmenityDc()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createAmenityDc(createAmenityDcVars);
// Variables can be defined inline as well.
const { data } = await createAmenityDc({ hotelId: ..., name: ..., description: ..., location: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createAmenityDc(dataConnect, createAmenityDcVars);

console.log(data.amenity_insert);

// Or, you can use the `Promise` API.
createAmenityDc(createAmenityDcVars).then((response) => {
  const data = response.data;
  console.log(data.amenity_insert);
});
```

### Using `CreateAmenityDC`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createAmenityDcRef, CreateAmenityDcVariables } from '@dataconnect/generated';

// The `CreateAmenityDC` mutation requires an argument of type `CreateAmenityDcVariables`:
const createAmenityDcVars: CreateAmenityDcVariables = {
  hotelId: ..., 
  name: ..., 
  description: ..., // optional
  location: ..., // optional
  status: ..., 
};

// Call the `createAmenityDcRef()` function to get a reference to the mutation.
const ref = createAmenityDcRef(createAmenityDcVars);
// Variables can be defined inline as well.
const ref = createAmenityDcRef({ hotelId: ..., name: ..., description: ..., location: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createAmenityDcRef(dataConnect, createAmenityDcVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.amenity_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.amenity_insert);
});
```

## CreateStoredDocumentDC
You can execute the `CreateStoredDocumentDC` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createStoredDocumentDc(vars: CreateStoredDocumentDcVariables): MutationPromise<CreateStoredDocumentDcData, CreateStoredDocumentDcVariables>;

interface CreateStoredDocumentDcRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateStoredDocumentDcVariables): MutationRef<CreateStoredDocumentDcData, CreateStoredDocumentDcVariables>;
}
export const createStoredDocumentDcRef: CreateStoredDocumentDcRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createStoredDocumentDc(dc: DataConnect, vars: CreateStoredDocumentDcVariables): MutationPromise<CreateStoredDocumentDcData, CreateStoredDocumentDcVariables>;

interface CreateStoredDocumentDcRef {
  ...
  (dc: DataConnect, vars: CreateStoredDocumentDcVariables): MutationRef<CreateStoredDocumentDcData, CreateStoredDocumentDcVariables>;
}
export const createStoredDocumentDcRef: CreateStoredDocumentDcRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createStoredDocumentDcRef:
```typescript
const name = createStoredDocumentDcRef.operationName;
console.log(name);
```

### Variables
The `CreateStoredDocumentDC` mutation requires an argument of type `CreateStoredDocumentDcVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateStoredDocumentDcVariables {
  hotelId: UUIDString;
  title: string;
  category: string;
  uploadedBy: string;
  fileType: string;
  data: string;
  tags?: unknown | null;
  guestId?: UUIDString | null;
  summary?: string | null;
}
```
### Return Type
Recall that executing the `CreateStoredDocumentDC` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateStoredDocumentDcData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateStoredDocumentDcData {
  storedDocument_insert: StoredDocument_Key;
}
```
### Using `CreateStoredDocumentDC`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createStoredDocumentDc, CreateStoredDocumentDcVariables } from '@dataconnect/generated';

// The `CreateStoredDocumentDC` mutation requires an argument of type `CreateStoredDocumentDcVariables`:
const createStoredDocumentDcVars: CreateStoredDocumentDcVariables = {
  hotelId: ..., 
  title: ..., 
  category: ..., 
  uploadedBy: ..., 
  fileType: ..., 
  data: ..., 
  tags: ..., // optional
  guestId: ..., // optional
  summary: ..., // optional
};

// Call the `createStoredDocumentDc()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createStoredDocumentDc(createStoredDocumentDcVars);
// Variables can be defined inline as well.
const { data } = await createStoredDocumentDc({ hotelId: ..., title: ..., category: ..., uploadedBy: ..., fileType: ..., data: ..., tags: ..., guestId: ..., summary: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createStoredDocumentDc(dataConnect, createStoredDocumentDcVars);

console.log(data.storedDocument_insert);

// Or, you can use the `Promise` API.
createStoredDocumentDc(createStoredDocumentDcVars).then((response) => {
  const data = response.data;
  console.log(data.storedDocument_insert);
});
```

### Using `CreateStoredDocumentDC`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createStoredDocumentDcRef, CreateStoredDocumentDcVariables } from '@dataconnect/generated';

// The `CreateStoredDocumentDC` mutation requires an argument of type `CreateStoredDocumentDcVariables`:
const createStoredDocumentDcVars: CreateStoredDocumentDcVariables = {
  hotelId: ..., 
  title: ..., 
  category: ..., 
  uploadedBy: ..., 
  fileType: ..., 
  data: ..., 
  tags: ..., // optional
  guestId: ..., // optional
  summary: ..., // optional
};

// Call the `createStoredDocumentDcRef()` function to get a reference to the mutation.
const ref = createStoredDocumentDcRef(createStoredDocumentDcVars);
// Variables can be defined inline as well.
const ref = createStoredDocumentDcRef({ hotelId: ..., title: ..., category: ..., uploadedBy: ..., fileType: ..., data: ..., tags: ..., guestId: ..., summary: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createStoredDocumentDcRef(dataConnect, createStoredDocumentDcVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.storedDocument_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.storedDocument_insert);
});
```

## LogAiUsage
You can execute the `LogAiUsage` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
logAiUsage(vars: LogAiUsageVariables): MutationPromise<LogAiUsageData, LogAiUsageVariables>;

interface LogAiUsageRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: LogAiUsageVariables): MutationRef<LogAiUsageData, LogAiUsageVariables>;
}
export const logAiUsageRef: LogAiUsageRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
logAiUsage(dc: DataConnect, vars: LogAiUsageVariables): MutationPromise<LogAiUsageData, LogAiUsageVariables>;

interface LogAiUsageRef {
  ...
  (dc: DataConnect, vars: LogAiUsageVariables): MutationRef<LogAiUsageData, LogAiUsageVariables>;
}
export const logAiUsageRef: LogAiUsageRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the logAiUsageRef:
```typescript
const name = logAiUsageRef.operationName;
console.log(name);
```

### Variables
The `LogAiUsage` mutation requires an argument of type `LogAiUsageVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface LogAiUsageVariables {
  hotelId: UUIDString;
  userId: string;
  feature: string;
  model: string;
  promptTokens?: number | null;
  responseTokens?: number | null;
  totalTokens?: number | null;
}
```
### Return Type
Recall that executing the `LogAiUsage` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `LogAiUsageData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface LogAiUsageData {
  aiUsage_insert: AiUsage_Key;
}
```
### Using `LogAiUsage`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, logAiUsage, LogAiUsageVariables } from '@dataconnect/generated';

// The `LogAiUsage` mutation requires an argument of type `LogAiUsageVariables`:
const logAiUsageVars: LogAiUsageVariables = {
  hotelId: ..., 
  userId: ..., 
  feature: ..., 
  model: ..., 
  promptTokens: ..., // optional
  responseTokens: ..., // optional
  totalTokens: ..., // optional
};

// Call the `logAiUsage()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await logAiUsage(logAiUsageVars);
// Variables can be defined inline as well.
const { data } = await logAiUsage({ hotelId: ..., userId: ..., feature: ..., model: ..., promptTokens: ..., responseTokens: ..., totalTokens: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await logAiUsage(dataConnect, logAiUsageVars);

console.log(data.aiUsage_insert);

// Or, you can use the `Promise` API.
logAiUsage(logAiUsageVars).then((response) => {
  const data = response.data;
  console.log(data.aiUsage_insert);
});
```

### Using `LogAiUsage`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, logAiUsageRef, LogAiUsageVariables } from '@dataconnect/generated';

// The `LogAiUsage` mutation requires an argument of type `LogAiUsageVariables`:
const logAiUsageVars: LogAiUsageVariables = {
  hotelId: ..., 
  userId: ..., 
  feature: ..., 
  model: ..., 
  promptTokens: ..., // optional
  responseTokens: ..., // optional
  totalTokens: ..., // optional
};

// Call the `logAiUsageRef()` function to get a reference to the mutation.
const ref = logAiUsageRef(logAiUsageVars);
// Variables can be defined inline as well.
const ref = logAiUsageRef({ hotelId: ..., userId: ..., feature: ..., model: ..., promptTokens: ..., responseTokens: ..., totalTokens: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = logAiUsageRef(dataConnect, logAiUsageVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.aiUsage_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.aiUsage_insert);
});
```

## SeedRooms
You can execute the `SeedRooms` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
seedRooms(vars: SeedRoomsVariables): MutationPromise<SeedRoomsData, SeedRoomsVariables>;

interface SeedRoomsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: SeedRoomsVariables): MutationRef<SeedRoomsData, SeedRoomsVariables>;
}
export const seedRoomsRef: SeedRoomsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
seedRooms(dc: DataConnect, vars: SeedRoomsVariables): MutationPromise<SeedRoomsData, SeedRoomsVariables>;

interface SeedRoomsRef {
  ...
  (dc: DataConnect, vars: SeedRoomsVariables): MutationRef<SeedRoomsData, SeedRoomsVariables>;
}
export const seedRoomsRef: SeedRoomsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the seedRoomsRef:
```typescript
const name = seedRoomsRef.operationName;
console.log(name);
```

### Variables
The `SeedRooms` mutation requires an argument of type `SeedRoomsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SeedRoomsVariables {
  hotelId: UUIDString;
}
```
### Return Type
Recall that executing the `SeedRooms` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SeedRoomsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SeedRoomsData {
  r1: Room_Key;
  r2: Room_Key;
  r3: Room_Key;
}
```
### Using `SeedRooms`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, seedRooms, SeedRoomsVariables } from '@dataconnect/generated';

// The `SeedRooms` mutation requires an argument of type `SeedRoomsVariables`:
const seedRoomsVars: SeedRoomsVariables = {
  hotelId: ..., 
};

// Call the `seedRooms()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await seedRooms(seedRoomsVars);
// Variables can be defined inline as well.
const { data } = await seedRooms({ hotelId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await seedRooms(dataConnect, seedRoomsVars);

console.log(data.r1);
console.log(data.r2);
console.log(data.r3);

// Or, you can use the `Promise` API.
seedRooms(seedRoomsVars).then((response) => {
  const data = response.data;
  console.log(data.r1);
  console.log(data.r2);
  console.log(data.r3);
});
```

### Using `SeedRooms`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, seedRoomsRef, SeedRoomsVariables } from '@dataconnect/generated';

// The `SeedRooms` mutation requires an argument of type `SeedRoomsVariables`:
const seedRoomsVars: SeedRoomsVariables = {
  hotelId: ..., 
};

// Call the `seedRoomsRef()` function to get a reference to the mutation.
const ref = seedRoomsRef(seedRoomsVars);
// Variables can be defined inline as well.
const ref = seedRoomsRef({ hotelId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = seedRoomsRef(dataConnect, seedRoomsVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.r1);
console.log(data.r2);
console.log(data.r3);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.r1);
  console.log(data.r2);
  console.log(data.r3);
});
```

## SeedStaff
You can execute the `SeedStaff` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
seedStaff(vars: SeedStaffVariables): MutationPromise<SeedStaffData, SeedStaffVariables>;

interface SeedStaffRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: SeedStaffVariables): MutationRef<SeedStaffData, SeedStaffVariables>;
}
export const seedStaffRef: SeedStaffRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
seedStaff(dc: DataConnect, vars: SeedStaffVariables): MutationPromise<SeedStaffData, SeedStaffVariables>;

interface SeedStaffRef {
  ...
  (dc: DataConnect, vars: SeedStaffVariables): MutationRef<SeedStaffData, SeedStaffVariables>;
}
export const seedStaffRef: SeedStaffRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the seedStaffRef:
```typescript
const name = seedStaffRef.operationName;
console.log(name);
```

### Variables
The `SeedStaff` mutation requires an argument of type `SeedStaffVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SeedStaffVariables {
  hotelId: UUIDString;
}
```
### Return Type
Recall that executing the `SeedStaff` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SeedStaffData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SeedStaffData {
  s1: Staff_Key;
  s2: Staff_Key;
}
```
### Using `SeedStaff`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, seedStaff, SeedStaffVariables } from '@dataconnect/generated';

// The `SeedStaff` mutation requires an argument of type `SeedStaffVariables`:
const seedStaffVars: SeedStaffVariables = {
  hotelId: ..., 
};

// Call the `seedStaff()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await seedStaff(seedStaffVars);
// Variables can be defined inline as well.
const { data } = await seedStaff({ hotelId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await seedStaff(dataConnect, seedStaffVars);

console.log(data.s1);
console.log(data.s2);

// Or, you can use the `Promise` API.
seedStaff(seedStaffVars).then((response) => {
  const data = response.data;
  console.log(data.s1);
  console.log(data.s2);
});
```

### Using `SeedStaff`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, seedStaffRef, SeedStaffVariables } from '@dataconnect/generated';

// The `SeedStaff` mutation requires an argument of type `SeedStaffVariables`:
const seedStaffVars: SeedStaffVariables = {
  hotelId: ..., 
};

// Call the `seedStaffRef()` function to get a reference to the mutation.
const ref = seedStaffRef(seedStaffVars);
// Variables can be defined inline as well.
const ref = seedStaffRef({ hotelId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = seedStaffRef(dataConnect, seedStaffVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.s1);
console.log(data.s2);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.s1);
  console.log(data.s2);
});
```

## SeedInventory
You can execute the `SeedInventory` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
seedInventory(vars: SeedInventoryVariables): MutationPromise<SeedInventoryData, SeedInventoryVariables>;

interface SeedInventoryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: SeedInventoryVariables): MutationRef<SeedInventoryData, SeedInventoryVariables>;
}
export const seedInventoryRef: SeedInventoryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
seedInventory(dc: DataConnect, vars: SeedInventoryVariables): MutationPromise<SeedInventoryData, SeedInventoryVariables>;

interface SeedInventoryRef {
  ...
  (dc: DataConnect, vars: SeedInventoryVariables): MutationRef<SeedInventoryData, SeedInventoryVariables>;
}
export const seedInventoryRef: SeedInventoryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the seedInventoryRef:
```typescript
const name = seedInventoryRef.operationName;
console.log(name);
```

### Variables
The `SeedInventory` mutation requires an argument of type `SeedInventoryVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SeedInventoryVariables {
  hotelId: UUIDString;
}
```
### Return Type
Recall that executing the `SeedInventory` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SeedInventoryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SeedInventoryData {
  i1: InventoryItem_Key;
  i2: InventoryItem_Key;
}
```
### Using `SeedInventory`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, seedInventory, SeedInventoryVariables } from '@dataconnect/generated';

// The `SeedInventory` mutation requires an argument of type `SeedInventoryVariables`:
const seedInventoryVars: SeedInventoryVariables = {
  hotelId: ..., 
};

// Call the `seedInventory()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await seedInventory(seedInventoryVars);
// Variables can be defined inline as well.
const { data } = await seedInventory({ hotelId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await seedInventory(dataConnect, seedInventoryVars);

console.log(data.i1);
console.log(data.i2);

// Or, you can use the `Promise` API.
seedInventory(seedInventoryVars).then((response) => {
  const data = response.data;
  console.log(data.i1);
  console.log(data.i2);
});
```

### Using `SeedInventory`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, seedInventoryRef, SeedInventoryVariables } from '@dataconnect/generated';

// The `SeedInventory` mutation requires an argument of type `SeedInventoryVariables`:
const seedInventoryVars: SeedInventoryVariables = {
  hotelId: ..., 
};

// Call the `seedInventoryRef()` function to get a reference to the mutation.
const ref = seedInventoryRef(seedInventoryVars);
// Variables can be defined inline as well.
const ref = seedInventoryRef({ hotelId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = seedInventoryRef(dataConnect, seedInventoryVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.i1);
console.log(data.i2);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.i1);
  console.log(data.i2);
});
```

## SeedAmenities
You can execute the `SeedAmenities` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
seedAmenities(vars: SeedAmenitiesVariables): MutationPromise<SeedAmenitiesData, SeedAmenitiesVariables>;

interface SeedAmenitiesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: SeedAmenitiesVariables): MutationRef<SeedAmenitiesData, SeedAmenitiesVariables>;
}
export const seedAmenitiesRef: SeedAmenitiesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
seedAmenities(dc: DataConnect, vars: SeedAmenitiesVariables): MutationPromise<SeedAmenitiesData, SeedAmenitiesVariables>;

interface SeedAmenitiesRef {
  ...
  (dc: DataConnect, vars: SeedAmenitiesVariables): MutationRef<SeedAmenitiesData, SeedAmenitiesVariables>;
}
export const seedAmenitiesRef: SeedAmenitiesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the seedAmenitiesRef:
```typescript
const name = seedAmenitiesRef.operationName;
console.log(name);
```

### Variables
The `SeedAmenities` mutation requires an argument of type `SeedAmenitiesVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SeedAmenitiesVariables {
  hotelId: UUIDString;
}
```
### Return Type
Recall that executing the `SeedAmenities` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SeedAmenitiesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SeedAmenitiesData {
  a1: Amenity_Key;
  a2: Amenity_Key;
  a3: Amenity_Key;
  a4: Amenity_Key;
}
```
### Using `SeedAmenities`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, seedAmenities, SeedAmenitiesVariables } from '@dataconnect/generated';

// The `SeedAmenities` mutation requires an argument of type `SeedAmenitiesVariables`:
const seedAmenitiesVars: SeedAmenitiesVariables = {
  hotelId: ..., 
};

// Call the `seedAmenities()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await seedAmenities(seedAmenitiesVars);
// Variables can be defined inline as well.
const { data } = await seedAmenities({ hotelId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await seedAmenities(dataConnect, seedAmenitiesVars);

console.log(data.a1);
console.log(data.a2);
console.log(data.a3);
console.log(data.a4);

// Or, you can use the `Promise` API.
seedAmenities(seedAmenitiesVars).then((response) => {
  const data = response.data;
  console.log(data.a1);
  console.log(data.a2);
  console.log(data.a3);
  console.log(data.a4);
});
```

### Using `SeedAmenities`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, seedAmenitiesRef, SeedAmenitiesVariables } from '@dataconnect/generated';

// The `SeedAmenities` mutation requires an argument of type `SeedAmenitiesVariables`:
const seedAmenitiesVars: SeedAmenitiesVariables = {
  hotelId: ..., 
};

// Call the `seedAmenitiesRef()` function to get a reference to the mutation.
const ref = seedAmenitiesRef(seedAmenitiesVars);
// Variables can be defined inline as well.
const ref = seedAmenitiesRef({ hotelId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = seedAmenitiesRef(dataConnect, seedAmenitiesVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.a1);
console.log(data.a2);
console.log(data.a3);
console.log(data.a4);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.a1);
  console.log(data.a2);
  console.log(data.a3);
  console.log(data.a4);
});
```

