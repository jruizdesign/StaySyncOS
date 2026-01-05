# Generated Angular README
This README will guide you through the process of using the generated Angular SDK package for the connector `default`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `JavaScript README`, you can find it at [`dataconnect-generated/README.md`](../README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

You can use this generated SDK by importing from the package `@dataconnect/generated/angular` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#angular).

# Table of Contents
- [**Overview**](#generated-angular-readme)
- [**TanStack Query Firebase & TanStack Angular Query**](#tanstack-query-firebase-tanstack-angular-query)
  - [*Package Installation*](#installing-tanstack-query-firebase-and-tanstack-angular-query-packages)
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
  - [*ListMaintenance*](#listmaintenance)
  - [*ListShifts*](#listshifts)
  - [*ListHousekeeping*](#listhousekeeping)
  - [*ListInventory*](#listinventory)
  - [*ListAmenities*](#listamenities)
  - [*ListStoredDocuments*](#liststoreddocuments)
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
  - [*CreateMaintenanceDC*](#createmaintenancedc)
  - [*CreateShiftDC*](#createshiftdc)
  - [*CreateHousekeepingTaskDC*](#createhousekeepingtaskdc)
  - [*UpsertInventoryItemDC*](#upsertinventoryitemdc)
  - [*CreateAmenityDC*](#createamenitydc)
  - [*CreateStoredDocumentDC*](#createstoreddocumentdc)
  - [*SeedRooms*](#seedrooms)
  - [*SeedStaff*](#seedstaff)
  - [*SeedInventory*](#seedinventory)
  - [*SeedAmenities*](#seedamenities)

# TanStack Query Firebase & TanStack Angular Query
This SDK provides [Angular](https://angular.dev/) injectors generated specific to your application, for the operations found in the connector `default`. These injectors are generated using [TanStack Query Firebase](https://react-query-firebase.invertase.dev/) by our partners at Invertase, a library built on top of [TanStack Angular Query v5](https://tanstack.com/query/v5/docs/framework/angular/overview) and [AngularFire](https://github.com/angular/angularfire/tree/main).

***You do not need to be familiar with Tanstack Query or Tanstack Query Firebase to use this SDK.*** However, you may find it useful to learn more about them, as they will empower you as a user of this Generated Angular SDK.

## Installing TanStack Query Firebase and TanStack Angular Query Packages
In order to use the Angular generated SDK, you must install `AngularFire` and select `Data Connect` during the setup.

You can install `AngularFire` using the [Angular CLI](https://angular.dev/installation#install-angular-cli). You can also follow the installation instructions from the [TanStack Query Firebase documentation](https://react-query-firebase.invertase.dev/angular#automatic-setup).

```bash
npm install -g @angular/cli
```
```bash
ng add @angular/fire
# select Data Connect during setup!
```

This should handle configuring your project to use TanStack Query. However, if you need to set up manually, please follow the [TanStack Query Firebase documentation](https://invertase.docs.page/tanstack-query-firebase/angular#usage).

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `default`.

You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, edit your `main.ts` file and your `app/app.config.ts` file and update your `provideDataConnect` provider:
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#emulator-react-angular).

```javascript
... // other imports
// update your imports to include the function that connects to the emulator
import { getDataConnect, provideDataConnect, connectDataConnectEmulator } from '@angular/fire/data-connect';

// update the `provideDataConnect` provider to provide an instance of `DataConnect` which uses the emulator:
export const appConfig: ApplicationConfig = {
  providers: [
    ... // other providers
    // Firebase Data Connect providers
    ...
    provideDataConnect(() => {
      const dataConnect = getDataConnect(connectorConfig);
      connectDataConnectEmulator(dataConnect, 'localhost', 9399);
      return dataConnect;
    }),
  ],
};
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) using the injectors provided from your generated Angular SDK.

# Queries

The Angular generated SDK provides Query injectors that call [`injectDataConnectQuery`](https://react-query-firebase.invertase.dev/angular/data-connect/querying) from TanStack Query Firebase.

Calling these injectors will return a `CreateDataConnectQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and the most recent data returned by the Query, among other things. To learn more about these injectors and how to use them, see the [TanStack Query Firebase documentation](https://react-query-firebase.invertase.dev/angular/data-connect/querying).

TanStack Angular Query caches the results of your Queries, so using the same Query injector in multiple places in your application allows the entire application to automatically see updates to that Query's data.

Query injectors execute their Queries automatically when called, and periodically refresh, unless you change the `queryOptions` for the Query. To learn how to stop a Query from automatically executing, including how to make a query "lazy", see the [TanStack Angular Query documentation](https://tanstack.com/query/latest/docs/framework/angular/guides/disabling-queries).

To learn more about TanStack Angular Query's Queries, see the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/guides/queries).

## Using Query Injectors
Here's a general overview of how to use the generated Query injectors in your code:

- If the Query has no variables, the Query injector does not require arguments.
- If the Query has any required variables, the Query injector will require at least one argument: an object that contains all the required variables for the Query.
- If the Query has some required and some optional variables, only required variables are necessary in the variables argument object, and optional variables may be provided as well.
- If all of the Query's variables are optional, the Query injector does not require any arguments.
- The Angular generated SDK's Query injectors do not accept `DataConnect` instances as arguments.
- Query injector functions can be called with or without passing in an `options` argument, whose type is a function which returns an object. The type is generated alongside the operation's injector function in [dataconnect-generated/angular/index.d.ts](./index.d.ts). To learn more about the `options` argument, see the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/guides/query-options).
  - ***Special case:***  If the Query has all optional variables and you would like to provide an `options` argument to the Query injector without providing any variables, you must pass `undefined` where you would normally pass the Query's variables, and then may provide the `options` argument.

Below are examples of how to use the `default` connector's generated Query injectors to execute each Query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#operations-react-angular).

## ListAvailableRooms
You can execute the `ListAvailableRooms` Query using the following Query injector, which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts):

```javascript
injectListAvailableRooms(args: ListAvailableRoomsArgs, options?: ListAvailableRoomsOptions, injector?: Injector): CreateDataConnectQueryResult<ListAvailableRoomsData, ListAvailableRoomsVariables>;
```

### Variables
The `ListAvailableRooms` Query requires an argument of type `ListAvailableRoomsVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListAvailableRoomsVariables {
  hotelId: UUIDString;
}
```
### Return Type
Recall that calling the `ListAvailableRooms` Query injector returns a `CreateDataConnectQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `CreateDataConnectQueryResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectQueryResult.isPending()`, `CreateDataConnectQueryResult.isSuccess()`, and `CreateDataConnectQueryResult.isError()` functions.

To access the data returned by a Query, use the `CreateDataConnectQueryResult.data()` function. The data for the `ListAvailableRooms` Query is of type `ListAvailableRoomsData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `CreateDataConnectQueryResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectQuery) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectquery).

### Using `ListAvailableRooms`'s Query injector

```javascript
... // other imports
import { connectorConfig, ListAvailableRoomsVariables } from '@dataconnect/generated';
import { injectListAvailableRooms, ListAvailableRoomsOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Query. -->
    @if (query.isPending()) {
      Loading...
    }
    @if (query.error()) {
      An error has occurred: {{ query.error() }}
    }
    <!-- If the Query is successful, you can access the data returned using
      the CreateDataConnectQueryResult.data() function. -->
    @if (query.data(); as data) {
      <!-- use your data to display something -->
            <div>Query successful!</div>
    }
  `,
})
export class MyComponent {
  // The `ListAvailableRooms` Query requires an argument of type `ListAvailableRoomsVariables`:
  listAvailableRoomsVars: ListAvailableRoomsVariables = {
    hotelId: ..., 
  };

  // Since the execution of the query is eager, you don't have to call `execute` to "execute" the Query.
  // Call the Query injector function to get a `CreateDataConnectQueryResult` object which holds the state of your Query.
  query = injectListAvailableRooms(this.listAvailableRoomsVars);
  // Variables can be defined inline as well.
  query = injectListAvailableRooms({ hotelId: ..., });

  // You can also pass in an options function (not object) of type `ListAvailableRoomsOptions` to the Query injector function.
  options: ListAvailableRoomsOptions = () => {
    return {
      staleTime: 5 * 1000
    };
  };
  query = injectListAvailableRooms(this.listAvailableRoomsVars, this.options);
}
```

## GetFirstHotel
You can execute the `GetFirstHotel` Query using the following Query injector, which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts):

```javascript
injectGetFirstHotel(options?: GetFirstHotelOptions, injector?: Injector): CreateDataConnectQueryResult<GetFirstHotelData, undefined>;
```

### Variables
The `GetFirstHotel` Query has no variables.
### Return Type
Recall that calling the `GetFirstHotel` Query injector returns a `CreateDataConnectQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `CreateDataConnectQueryResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectQueryResult.isPending()`, `CreateDataConnectQueryResult.isSuccess()`, and `CreateDataConnectQueryResult.isError()` functions.

To access the data returned by a Query, use the `CreateDataConnectQueryResult.data()` function. The data for the `GetFirstHotel` Query is of type `GetFirstHotelData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetFirstHotelData {
  hotels: ({
    id: UUIDString;
    name: string;
  } & Hotel_Key)[];
}
```

To learn more about the `CreateDataConnectQueryResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectQuery) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectquery).

### Using `GetFirstHotel`'s Query injector

```javascript
... // other imports
import { connectorConfig } from '@dataconnect/generated';
import { injectGetFirstHotel, GetFirstHotelOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Query. -->
    @if (query.isPending()) {
      Loading...
    }
    @if (query.error()) {
      An error has occurred: {{ query.error() }}
    }
    <!-- If the Query is successful, you can access the data returned using
      the CreateDataConnectQueryResult.data() function. -->
    @if (query.data(); as data) {
      <!-- use your data to display something -->
            <div>Query successful!</div>
    }
  `,
})
export class MyComponent {
  // Since the execution of the query is eager, you don't have to call `execute` to "execute" the Query.
  // Call the Query injector function to get a `CreateDataConnectQueryResult` object which holds the state of your Query.
  query = injectGetFirstHotel();

  // You can also pass in an options function (not object) of type `GetFirstHotelOptions` to the Query injector function.
  options: GetFirstHotelOptions = () => {
    return {
      staleTime: 5 * 1000
    };
  };
  query = injectGetFirstHotel(this.options);
}
```

## GetHotelById
You can execute the `GetHotelById` Query using the following Query injector, which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts):

```javascript
injectGetHotelById(args: GetHotelByIdArgs, options?: GetHotelByIdOptions, injector?: Injector): CreateDataConnectQueryResult<GetHotelByIdData, GetHotelByIdVariables>;
```

### Variables
The `GetHotelById` Query requires an argument of type `GetHotelByIdVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetHotelByIdVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `GetHotelById` Query injector returns a `CreateDataConnectQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `CreateDataConnectQueryResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectQueryResult.isPending()`, `CreateDataConnectQueryResult.isSuccess()`, and `CreateDataConnectQueryResult.isError()` functions.

To access the data returned by a Query, use the `CreateDataConnectQueryResult.data()` function. The data for the `GetHotelById` Query is of type `GetHotelByIdData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `CreateDataConnectQueryResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectQuery) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectquery).

### Using `GetHotelById`'s Query injector

```javascript
... // other imports
import { connectorConfig, GetHotelByIdVariables } from '@dataconnect/generated';
import { injectGetHotelById, GetHotelByIdOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Query. -->
    @if (query.isPending()) {
      Loading...
    }
    @if (query.error()) {
      An error has occurred: {{ query.error() }}
    }
    <!-- If the Query is successful, you can access the data returned using
      the CreateDataConnectQueryResult.data() function. -->
    @if (query.data(); as data) {
      <!-- use your data to display something -->
            <div>Query successful!</div>
    }
  `,
})
export class MyComponent {
  // The `GetHotelById` Query requires an argument of type `GetHotelByIdVariables`:
  getHotelByIdVars: GetHotelByIdVariables = {
    id: ..., 
  };

  // Since the execution of the query is eager, you don't have to call `execute` to "execute" the Query.
  // Call the Query injector function to get a `CreateDataConnectQueryResult` object which holds the state of your Query.
  query = injectGetHotelById(this.getHotelByIdVars);
  // Variables can be defined inline as well.
  query = injectGetHotelById({ id: ..., });

  // You can also pass in an options function (not object) of type `GetHotelByIdOptions` to the Query injector function.
  options: GetHotelByIdOptions = () => {
    return {
      staleTime: 5 * 1000
    };
  };
  query = injectGetHotelById(this.getHotelByIdVars, this.options);
}
```

## ListAllHotels
You can execute the `ListAllHotels` Query using the following Query injector, which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts):

```javascript
injectListAllHotels(options?: ListAllHotelsOptions, injector?: Injector): CreateDataConnectQueryResult<ListAllHotelsData, undefined>;
```

### Variables
The `ListAllHotels` Query has no variables.
### Return Type
Recall that calling the `ListAllHotels` Query injector returns a `CreateDataConnectQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `CreateDataConnectQueryResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectQueryResult.isPending()`, `CreateDataConnectQueryResult.isSuccess()`, and `CreateDataConnectQueryResult.isError()` functions.

To access the data returned by a Query, use the `CreateDataConnectQueryResult.data()` function. The data for the `ListAllHotels` Query is of type `ListAllHotelsData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ListAllHotelsData {
  hotels: ({
    id: UUIDString;
    name: string;
    address: string;
    propertyId: string;
  } & Hotel_Key)[];
}
```

To learn more about the `CreateDataConnectQueryResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectQuery) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectquery).

### Using `ListAllHotels`'s Query injector

```javascript
... // other imports
import { connectorConfig } from '@dataconnect/generated';
import { injectListAllHotels, ListAllHotelsOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Query. -->
    @if (query.isPending()) {
      Loading...
    }
    @if (query.error()) {
      An error has occurred: {{ query.error() }}
    }
    <!-- If the Query is successful, you can access the data returned using
      the CreateDataConnectQueryResult.data() function. -->
    @if (query.data(); as data) {
      <!-- use your data to display something -->
            <div>Query successful!</div>
    }
  `,
})
export class MyComponent {
  // Since the execution of the query is eager, you don't have to call `execute` to "execute" the Query.
  // Call the Query injector function to get a `CreateDataConnectQueryResult` object which holds the state of your Query.
  query = injectListAllHotels();

  // You can also pass in an options function (not object) of type `ListAllHotelsOptions` to the Query injector function.
  options: ListAllHotelsOptions = () => {
    return {
      staleTime: 5 * 1000
    };
  };
  query = injectListAllHotels(this.options);
}
```

## ListGuests
You can execute the `ListGuests` Query using the following Query injector, which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts):

```javascript
injectListGuests(args: ListGuestsArgs, options?: ListGuestsOptions, injector?: Injector): CreateDataConnectQueryResult<ListGuestsData, ListGuestsVariables>;
```

### Variables
The `ListGuests` Query requires an argument of type `ListGuestsVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListGuestsVariables {
  hotelId: UUIDString;
}
```
### Return Type
Recall that calling the `ListGuests` Query injector returns a `CreateDataConnectQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `CreateDataConnectQueryResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectQueryResult.isPending()`, `CreateDataConnectQueryResult.isSuccess()`, and `CreateDataConnectQueryResult.isError()` functions.

To access the data returned by a Query, use the `CreateDataConnectQueryResult.data()` function. The data for the `ListGuests` Query is of type `ListGuestsData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `CreateDataConnectQueryResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectQuery) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectquery).

### Using `ListGuests`'s Query injector

```javascript
... // other imports
import { connectorConfig, ListGuestsVariables } from '@dataconnect/generated';
import { injectListGuests, ListGuestsOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Query. -->
    @if (query.isPending()) {
      Loading...
    }
    @if (query.error()) {
      An error has occurred: {{ query.error() }}
    }
    <!-- If the Query is successful, you can access the data returned using
      the CreateDataConnectQueryResult.data() function. -->
    @if (query.data(); as data) {
      <!-- use your data to display something -->
            <div>Query successful!</div>
    }
  `,
})
export class MyComponent {
  // The `ListGuests` Query requires an argument of type `ListGuestsVariables`:
  listGuestsVars: ListGuestsVariables = {
    hotelId: ..., 
  };

  // Since the execution of the query is eager, you don't have to call `execute` to "execute" the Query.
  // Call the Query injector function to get a `CreateDataConnectQueryResult` object which holds the state of your Query.
  query = injectListGuests(this.listGuestsVars);
  // Variables can be defined inline as well.
  query = injectListGuests({ hotelId: ..., });

  // You can also pass in an options function (not object) of type `ListGuestsOptions` to the Query injector function.
  options: ListGuestsOptions = () => {
    return {
      staleTime: 5 * 1000
    };
  };
  query = injectListGuests(this.listGuestsVars, this.options);
}
```

## ListBookings
You can execute the `ListBookings` Query using the following Query injector, which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts):

```javascript
injectListBookings(args: ListBookingsArgs, options?: ListBookingsOptions, injector?: Injector): CreateDataConnectQueryResult<ListBookingsData, ListBookingsVariables>;
```

### Variables
The `ListBookings` Query requires an argument of type `ListBookingsVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListBookingsVariables {
  hotelId: UUIDString;
}
```
### Return Type
Recall that calling the `ListBookings` Query injector returns a `CreateDataConnectQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `CreateDataConnectQueryResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectQueryResult.isPending()`, `CreateDataConnectQueryResult.isSuccess()`, and `CreateDataConnectQueryResult.isError()` functions.

To access the data returned by a Query, use the `CreateDataConnectQueryResult.data()` function. The data for the `ListBookings` Query is of type `ListBookingsData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `CreateDataConnectQueryResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectQuery) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectquery).

### Using `ListBookings`'s Query injector

```javascript
... // other imports
import { connectorConfig, ListBookingsVariables } from '@dataconnect/generated';
import { injectListBookings, ListBookingsOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Query. -->
    @if (query.isPending()) {
      Loading...
    }
    @if (query.error()) {
      An error has occurred: {{ query.error() }}
    }
    <!-- If the Query is successful, you can access the data returned using
      the CreateDataConnectQueryResult.data() function. -->
    @if (query.data(); as data) {
      <!-- use your data to display something -->
            <div>Query successful!</div>
    }
  `,
})
export class MyComponent {
  // The `ListBookings` Query requires an argument of type `ListBookingsVariables`:
  listBookingsVars: ListBookingsVariables = {
    hotelId: ..., 
  };

  // Since the execution of the query is eager, you don't have to call `execute` to "execute" the Query.
  // Call the Query injector function to get a `CreateDataConnectQueryResult` object which holds the state of your Query.
  query = injectListBookings(this.listBookingsVars);
  // Variables can be defined inline as well.
  query = injectListBookings({ hotelId: ..., });

  // You can also pass in an options function (not object) of type `ListBookingsOptions` to the Query injector function.
  options: ListBookingsOptions = () => {
    return {
      staleTime: 5 * 1000
    };
  };
  query = injectListBookings(this.listBookingsVars, this.options);
}
```

## ListLogs
You can execute the `ListLogs` Query using the following Query injector, which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts):

```javascript
injectListLogs(args: ListLogsArgs, options?: ListLogsOptions, injector?: Injector): CreateDataConnectQueryResult<ListLogsData, ListLogsVariables>;
```

### Variables
The `ListLogs` Query requires an argument of type `ListLogsVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListLogsVariables {
  hotelId: UUIDString;
}
```
### Return Type
Recall that calling the `ListLogs` Query injector returns a `CreateDataConnectQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `CreateDataConnectQueryResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectQueryResult.isPending()`, `CreateDataConnectQueryResult.isSuccess()`, and `CreateDataConnectQueryResult.isError()` functions.

To access the data returned by a Query, use the `CreateDataConnectQueryResult.data()` function. The data for the `ListLogs` Query is of type `ListLogsData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `CreateDataConnectQueryResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectQuery) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectquery).

### Using `ListLogs`'s Query injector

```javascript
... // other imports
import { connectorConfig, ListLogsVariables } from '@dataconnect/generated';
import { injectListLogs, ListLogsOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Query. -->
    @if (query.isPending()) {
      Loading...
    }
    @if (query.error()) {
      An error has occurred: {{ query.error() }}
    }
    <!-- If the Query is successful, you can access the data returned using
      the CreateDataConnectQueryResult.data() function. -->
    @if (query.data(); as data) {
      <!-- use your data to display something -->
            <div>Query successful!</div>
    }
  `,
})
export class MyComponent {
  // The `ListLogs` Query requires an argument of type `ListLogsVariables`:
  listLogsVars: ListLogsVariables = {
    hotelId: ..., 
  };

  // Since the execution of the query is eager, you don't have to call `execute` to "execute" the Query.
  // Call the Query injector function to get a `CreateDataConnectQueryResult` object which holds the state of your Query.
  query = injectListLogs(this.listLogsVars);
  // Variables can be defined inline as well.
  query = injectListLogs({ hotelId: ..., });

  // You can also pass in an options function (not object) of type `ListLogsOptions` to the Query injector function.
  options: ListLogsOptions = () => {
    return {
      staleTime: 5 * 1000
    };
  };
  query = injectListLogs(this.listLogsVars, this.options);
}
```

## ListStaff
You can execute the `ListStaff` Query using the following Query injector, which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts):

```javascript
injectListStaff(args: ListStaffArgs, options?: ListStaffOptions, injector?: Injector): CreateDataConnectQueryResult<ListStaffData, ListStaffVariables>;
```

### Variables
The `ListStaff` Query requires an argument of type `ListStaffVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListStaffVariables {
  hotelId: UUIDString;
}
```
### Return Type
Recall that calling the `ListStaff` Query injector returns a `CreateDataConnectQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `CreateDataConnectQueryResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectQueryResult.isPending()`, `CreateDataConnectQueryResult.isSuccess()`, and `CreateDataConnectQueryResult.isError()` functions.

To access the data returned by a Query, use the `CreateDataConnectQueryResult.data()` function. The data for the `ListStaff` Query is of type `ListStaffData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `CreateDataConnectQueryResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectQuery) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectquery).

### Using `ListStaff`'s Query injector

```javascript
... // other imports
import { connectorConfig, ListStaffVariables } from '@dataconnect/generated';
import { injectListStaff, ListStaffOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Query. -->
    @if (query.isPending()) {
      Loading...
    }
    @if (query.error()) {
      An error has occurred: {{ query.error() }}
    }
    <!-- If the Query is successful, you can access the data returned using
      the CreateDataConnectQueryResult.data() function. -->
    @if (query.data(); as data) {
      <!-- use your data to display something -->
            <div>Query successful!</div>
    }
  `,
})
export class MyComponent {
  // The `ListStaff` Query requires an argument of type `ListStaffVariables`:
  listStaffVars: ListStaffVariables = {
    hotelId: ..., 
  };

  // Since the execution of the query is eager, you don't have to call `execute` to "execute" the Query.
  // Call the Query injector function to get a `CreateDataConnectQueryResult` object which holds the state of your Query.
  query = injectListStaff(this.listStaffVars);
  // Variables can be defined inline as well.
  query = injectListStaff({ hotelId: ..., });

  // You can also pass in an options function (not object) of type `ListStaffOptions` to the Query injector function.
  options: ListStaffOptions = () => {
    return {
      staleTime: 5 * 1000
    };
  };
  query = injectListStaff(this.listStaffVars, this.options);
}
```

## ListTimeLogs
You can execute the `ListTimeLogs` Query using the following Query injector, which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts):

```javascript
injectListTimeLogs(args: ListTimeLogsArgs, options?: ListTimeLogsOptions, injector?: Injector): CreateDataConnectQueryResult<ListTimeLogsData, ListTimeLogsVariables>;
```

### Variables
The `ListTimeLogs` Query requires an argument of type `ListTimeLogsVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListTimeLogsVariables {
  hotelId: UUIDString;
}
```
### Return Type
Recall that calling the `ListTimeLogs` Query injector returns a `CreateDataConnectQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `CreateDataConnectQueryResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectQueryResult.isPending()`, `CreateDataConnectQueryResult.isSuccess()`, and `CreateDataConnectQueryResult.isError()` functions.

To access the data returned by a Query, use the `CreateDataConnectQueryResult.data()` function. The data for the `ListTimeLogs` Query is of type `ListTimeLogsData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `CreateDataConnectQueryResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectQuery) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectquery).

### Using `ListTimeLogs`'s Query injector

```javascript
... // other imports
import { connectorConfig, ListTimeLogsVariables } from '@dataconnect/generated';
import { injectListTimeLogs, ListTimeLogsOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Query. -->
    @if (query.isPending()) {
      Loading...
    }
    @if (query.error()) {
      An error has occurred: {{ query.error() }}
    }
    <!-- If the Query is successful, you can access the data returned using
      the CreateDataConnectQueryResult.data() function. -->
    @if (query.data(); as data) {
      <!-- use your data to display something -->
            <div>Query successful!</div>
    }
  `,
})
export class MyComponent {
  // The `ListTimeLogs` Query requires an argument of type `ListTimeLogsVariables`:
  listTimeLogsVars: ListTimeLogsVariables = {
    hotelId: ..., 
  };

  // Since the execution of the query is eager, you don't have to call `execute` to "execute" the Query.
  // Call the Query injector function to get a `CreateDataConnectQueryResult` object which holds the state of your Query.
  query = injectListTimeLogs(this.listTimeLogsVars);
  // Variables can be defined inline as well.
  query = injectListTimeLogs({ hotelId: ..., });

  // You can also pass in an options function (not object) of type `ListTimeLogsOptions` to the Query injector function.
  options: ListTimeLogsOptions = () => {
    return {
      staleTime: 5 * 1000
    };
  };
  query = injectListTimeLogs(this.listTimeLogsVars, this.options);
}
```

## ListFinancialDocuments
You can execute the `ListFinancialDocuments` Query using the following Query injector, which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts):

```javascript
injectListFinancialDocuments(args: ListFinancialDocumentsArgs, options?: ListFinancialDocumentsOptions, injector?: Injector): CreateDataConnectQueryResult<ListFinancialDocumentsData, ListFinancialDocumentsVariables>;
```

### Variables
The `ListFinancialDocuments` Query requires an argument of type `ListFinancialDocumentsVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListFinancialDocumentsVariables {
  hotelId: UUIDString;
}
```
### Return Type
Recall that calling the `ListFinancialDocuments` Query injector returns a `CreateDataConnectQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `CreateDataConnectQueryResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectQueryResult.isPending()`, `CreateDataConnectQueryResult.isSuccess()`, and `CreateDataConnectQueryResult.isError()` functions.

To access the data returned by a Query, use the `CreateDataConnectQueryResult.data()` function. The data for the `ListFinancialDocuments` Query is of type `ListFinancialDocumentsData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `CreateDataConnectQueryResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectQuery) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectquery).

### Using `ListFinancialDocuments`'s Query injector

```javascript
... // other imports
import { connectorConfig, ListFinancialDocumentsVariables } from '@dataconnect/generated';
import { injectListFinancialDocuments, ListFinancialDocumentsOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Query. -->
    @if (query.isPending()) {
      Loading...
    }
    @if (query.error()) {
      An error has occurred: {{ query.error() }}
    }
    <!-- If the Query is successful, you can access the data returned using
      the CreateDataConnectQueryResult.data() function. -->
    @if (query.data(); as data) {
      <!-- use your data to display something -->
            <div>Query successful!</div>
    }
  `,
})
export class MyComponent {
  // The `ListFinancialDocuments` Query requires an argument of type `ListFinancialDocumentsVariables`:
  listFinancialDocumentsVars: ListFinancialDocumentsVariables = {
    hotelId: ..., 
  };

  // Since the execution of the query is eager, you don't have to call `execute` to "execute" the Query.
  // Call the Query injector function to get a `CreateDataConnectQueryResult` object which holds the state of your Query.
  query = injectListFinancialDocuments(this.listFinancialDocumentsVars);
  // Variables can be defined inline as well.
  query = injectListFinancialDocuments({ hotelId: ..., });

  // You can also pass in an options function (not object) of type `ListFinancialDocumentsOptions` to the Query injector function.
  options: ListFinancialDocumentsOptions = () => {
    return {
      staleTime: 5 * 1000
    };
  };
  query = injectListFinancialDocuments(this.listFinancialDocumentsVars, this.options);
}
```

## ListHotelsByUser
You can execute the `ListHotelsByUser` Query using the following Query injector, which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts):

```javascript
injectListHotelsByUser(args: ListHotelsByUserArgs, options?: ListHotelsByUserOptions, injector?: Injector): CreateDataConnectQueryResult<ListHotelsByUserData, ListHotelsByUserVariables>;
```

### Variables
The `ListHotelsByUser` Query requires an argument of type `ListHotelsByUserVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListHotelsByUserVariables {
  userId: string;
}
```
### Return Type
Recall that calling the `ListHotelsByUser` Query injector returns a `CreateDataConnectQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `CreateDataConnectQueryResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectQueryResult.isPending()`, `CreateDataConnectQueryResult.isSuccess()`, and `CreateDataConnectQueryResult.isError()` functions.

To access the data returned by a Query, use the `CreateDataConnectQueryResult.data()` function. The data for the `ListHotelsByUser` Query is of type `ListHotelsByUserData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `CreateDataConnectQueryResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectQuery) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectquery).

### Using `ListHotelsByUser`'s Query injector

```javascript
... // other imports
import { connectorConfig, ListHotelsByUserVariables } from '@dataconnect/generated';
import { injectListHotelsByUser, ListHotelsByUserOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Query. -->
    @if (query.isPending()) {
      Loading...
    }
    @if (query.error()) {
      An error has occurred: {{ query.error() }}
    }
    <!-- If the Query is successful, you can access the data returned using
      the CreateDataConnectQueryResult.data() function. -->
    @if (query.data(); as data) {
      <!-- use your data to display something -->
            <div>Query successful!</div>
    }
  `,
})
export class MyComponent {
  // The `ListHotelsByUser` Query requires an argument of type `ListHotelsByUserVariables`:
  listHotelsByUserVars: ListHotelsByUserVariables = {
    userId: ..., 
  };

  // Since the execution of the query is eager, you don't have to call `execute` to "execute" the Query.
  // Call the Query injector function to get a `CreateDataConnectQueryResult` object which holds the state of your Query.
  query = injectListHotelsByUser(this.listHotelsByUserVars);
  // Variables can be defined inline as well.
  query = injectListHotelsByUser({ userId: ..., });

  // You can also pass in an options function (not object) of type `ListHotelsByUserOptions` to the Query injector function.
  options: ListHotelsByUserOptions = () => {
    return {
      staleTime: 5 * 1000
    };
  };
  query = injectListHotelsByUser(this.listHotelsByUserVars, this.options);
}
```

## ListUsersDC
You can execute the `ListUsersDC` Query using the following Query injector, which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts):

```javascript
injectListUsersDc(options?: ListUsersDcOptions, injector?: Injector): CreateDataConnectQueryResult<ListUsersDcData, undefined>;
```

### Variables
The `ListUsersDC` Query has no variables.
### Return Type
Recall that calling the `ListUsersDC` Query injector returns a `CreateDataConnectQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `CreateDataConnectQueryResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectQueryResult.isPending()`, `CreateDataConnectQueryResult.isSuccess()`, and `CreateDataConnectQueryResult.isError()` functions.

To access the data returned by a Query, use the `CreateDataConnectQueryResult.data()` function. The data for the `ListUsersDC` Query is of type `ListUsersDcData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ListUsersDcData {
  users: ({
    id: string;
    email: string;
    role: string;
  } & User_Key)[];
}
```

To learn more about the `CreateDataConnectQueryResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectQuery) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectquery).

### Using `ListUsersDC`'s Query injector

```javascript
... // other imports
import { connectorConfig } from '@dataconnect/generated';
import { injectListUsersDc, ListUsersDcOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Query. -->
    @if (query.isPending()) {
      Loading...
    }
    @if (query.error()) {
      An error has occurred: {{ query.error() }}
    }
    <!-- If the Query is successful, you can access the data returned using
      the CreateDataConnectQueryResult.data() function. -->
    @if (query.data(); as data) {
      <!-- use your data to display something -->
            <div>Query successful!</div>
    }
  `,
})
export class MyComponent {
  // Since the execution of the query is eager, you don't have to call `execute` to "execute" the Query.
  // Call the Query injector function to get a `CreateDataConnectQueryResult` object which holds the state of your Query.
  query = injectListUsersDc();

  // You can also pass in an options function (not object) of type `ListUsersDcOptions` to the Query injector function.
  options: ListUsersDcOptions = () => {
    return {
      staleTime: 5 * 1000
    };
  };
  query = injectListUsersDc(this.options);
}
```

## ListMaintenance
You can execute the `ListMaintenance` Query using the following Query injector, which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts):

```javascript
injectListMaintenance(args: ListMaintenanceArgs, options?: ListMaintenanceOptions, injector?: Injector): CreateDataConnectQueryResult<ListMaintenanceData, ListMaintenanceVariables>;
```

### Variables
The `ListMaintenance` Query requires an argument of type `ListMaintenanceVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListMaintenanceVariables {
  hotelId: UUIDString;
}
```
### Return Type
Recall that calling the `ListMaintenance` Query injector returns a `CreateDataConnectQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `CreateDataConnectQueryResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectQueryResult.isPending()`, `CreateDataConnectQueryResult.isSuccess()`, and `CreateDataConnectQueryResult.isError()` functions.

To access the data returned by a Query, use the `CreateDataConnectQueryResult.data()` function. The data for the `ListMaintenance` Query is of type `ListMaintenanceData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `CreateDataConnectQueryResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectQuery) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectquery).

### Using `ListMaintenance`'s Query injector

```javascript
... // other imports
import { connectorConfig, ListMaintenanceVariables } from '@dataconnect/generated';
import { injectListMaintenance, ListMaintenanceOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Query. -->
    @if (query.isPending()) {
      Loading...
    }
    @if (query.error()) {
      An error has occurred: {{ query.error() }}
    }
    <!-- If the Query is successful, you can access the data returned using
      the CreateDataConnectQueryResult.data() function. -->
    @if (query.data(); as data) {
      <!-- use your data to display something -->
            <div>Query successful!</div>
    }
  `,
})
export class MyComponent {
  // The `ListMaintenance` Query requires an argument of type `ListMaintenanceVariables`:
  listMaintenanceVars: ListMaintenanceVariables = {
    hotelId: ..., 
  };

  // Since the execution of the query is eager, you don't have to call `execute` to "execute" the Query.
  // Call the Query injector function to get a `CreateDataConnectQueryResult` object which holds the state of your Query.
  query = injectListMaintenance(this.listMaintenanceVars);
  // Variables can be defined inline as well.
  query = injectListMaintenance({ hotelId: ..., });

  // You can also pass in an options function (not object) of type `ListMaintenanceOptions` to the Query injector function.
  options: ListMaintenanceOptions = () => {
    return {
      staleTime: 5 * 1000
    };
  };
  query = injectListMaintenance(this.listMaintenanceVars, this.options);
}
```

## ListShifts
You can execute the `ListShifts` Query using the following Query injector, which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts):

```javascript
injectListShifts(args: ListShiftsArgs, options?: ListShiftsOptions, injector?: Injector): CreateDataConnectQueryResult<ListShiftsData, ListShiftsVariables>;
```

### Variables
The `ListShifts` Query requires an argument of type `ListShiftsVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListShiftsVariables {
  hotelId: UUIDString;
}
```
### Return Type
Recall that calling the `ListShifts` Query injector returns a `CreateDataConnectQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `CreateDataConnectQueryResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectQueryResult.isPending()`, `CreateDataConnectQueryResult.isSuccess()`, and `CreateDataConnectQueryResult.isError()` functions.

To access the data returned by a Query, use the `CreateDataConnectQueryResult.data()` function. The data for the `ListShifts` Query is of type `ListShiftsData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `CreateDataConnectQueryResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectQuery) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectquery).

### Using `ListShifts`'s Query injector

```javascript
... // other imports
import { connectorConfig, ListShiftsVariables } from '@dataconnect/generated';
import { injectListShifts, ListShiftsOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Query. -->
    @if (query.isPending()) {
      Loading...
    }
    @if (query.error()) {
      An error has occurred: {{ query.error() }}
    }
    <!-- If the Query is successful, you can access the data returned using
      the CreateDataConnectQueryResult.data() function. -->
    @if (query.data(); as data) {
      <!-- use your data to display something -->
            <div>Query successful!</div>
    }
  `,
})
export class MyComponent {
  // The `ListShifts` Query requires an argument of type `ListShiftsVariables`:
  listShiftsVars: ListShiftsVariables = {
    hotelId: ..., 
  };

  // Since the execution of the query is eager, you don't have to call `execute` to "execute" the Query.
  // Call the Query injector function to get a `CreateDataConnectQueryResult` object which holds the state of your Query.
  query = injectListShifts(this.listShiftsVars);
  // Variables can be defined inline as well.
  query = injectListShifts({ hotelId: ..., });

  // You can also pass in an options function (not object) of type `ListShiftsOptions` to the Query injector function.
  options: ListShiftsOptions = () => {
    return {
      staleTime: 5 * 1000
    };
  };
  query = injectListShifts(this.listShiftsVars, this.options);
}
```

## ListHousekeeping
You can execute the `ListHousekeeping` Query using the following Query injector, which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts):

```javascript
injectListHousekeeping(args: ListHousekeepingArgs, options?: ListHousekeepingOptions, injector?: Injector): CreateDataConnectQueryResult<ListHousekeepingData, ListHousekeepingVariables>;
```

### Variables
The `ListHousekeeping` Query requires an argument of type `ListHousekeepingVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListHousekeepingVariables {
  hotelId: UUIDString;
}
```
### Return Type
Recall that calling the `ListHousekeeping` Query injector returns a `CreateDataConnectQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `CreateDataConnectQueryResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectQueryResult.isPending()`, `CreateDataConnectQueryResult.isSuccess()`, and `CreateDataConnectQueryResult.isError()` functions.

To access the data returned by a Query, use the `CreateDataConnectQueryResult.data()` function. The data for the `ListHousekeeping` Query is of type `ListHousekeepingData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `CreateDataConnectQueryResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectQuery) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectquery).

### Using `ListHousekeeping`'s Query injector

```javascript
... // other imports
import { connectorConfig, ListHousekeepingVariables } from '@dataconnect/generated';
import { injectListHousekeeping, ListHousekeepingOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Query. -->
    @if (query.isPending()) {
      Loading...
    }
    @if (query.error()) {
      An error has occurred: {{ query.error() }}
    }
    <!-- If the Query is successful, you can access the data returned using
      the CreateDataConnectQueryResult.data() function. -->
    @if (query.data(); as data) {
      <!-- use your data to display something -->
            <div>Query successful!</div>
    }
  `,
})
export class MyComponent {
  // The `ListHousekeeping` Query requires an argument of type `ListHousekeepingVariables`:
  listHousekeepingVars: ListHousekeepingVariables = {
    hotelId: ..., 
  };

  // Since the execution of the query is eager, you don't have to call `execute` to "execute" the Query.
  // Call the Query injector function to get a `CreateDataConnectQueryResult` object which holds the state of your Query.
  query = injectListHousekeeping(this.listHousekeepingVars);
  // Variables can be defined inline as well.
  query = injectListHousekeeping({ hotelId: ..., });

  // You can also pass in an options function (not object) of type `ListHousekeepingOptions` to the Query injector function.
  options: ListHousekeepingOptions = () => {
    return {
      staleTime: 5 * 1000
    };
  };
  query = injectListHousekeeping(this.listHousekeepingVars, this.options);
}
```

## ListInventory
You can execute the `ListInventory` Query using the following Query injector, which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts):

```javascript
injectListInventory(args: ListInventoryArgs, options?: ListInventoryOptions, injector?: Injector): CreateDataConnectQueryResult<ListInventoryData, ListInventoryVariables>;
```

### Variables
The `ListInventory` Query requires an argument of type `ListInventoryVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListInventoryVariables {
  hotelId: UUIDString;
}
```
### Return Type
Recall that calling the `ListInventory` Query injector returns a `CreateDataConnectQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `CreateDataConnectQueryResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectQueryResult.isPending()`, `CreateDataConnectQueryResult.isSuccess()`, and `CreateDataConnectQueryResult.isError()` functions.

To access the data returned by a Query, use the `CreateDataConnectQueryResult.data()` function. The data for the `ListInventory` Query is of type `ListInventoryData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `CreateDataConnectQueryResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectQuery) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectquery).

### Using `ListInventory`'s Query injector

```javascript
... // other imports
import { connectorConfig, ListInventoryVariables } from '@dataconnect/generated';
import { injectListInventory, ListInventoryOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Query. -->
    @if (query.isPending()) {
      Loading...
    }
    @if (query.error()) {
      An error has occurred: {{ query.error() }}
    }
    <!-- If the Query is successful, you can access the data returned using
      the CreateDataConnectQueryResult.data() function. -->
    @if (query.data(); as data) {
      <!-- use your data to display something -->
            <div>Query successful!</div>
    }
  `,
})
export class MyComponent {
  // The `ListInventory` Query requires an argument of type `ListInventoryVariables`:
  listInventoryVars: ListInventoryVariables = {
    hotelId: ..., 
  };

  // Since the execution of the query is eager, you don't have to call `execute` to "execute" the Query.
  // Call the Query injector function to get a `CreateDataConnectQueryResult` object which holds the state of your Query.
  query = injectListInventory(this.listInventoryVars);
  // Variables can be defined inline as well.
  query = injectListInventory({ hotelId: ..., });

  // You can also pass in an options function (not object) of type `ListInventoryOptions` to the Query injector function.
  options: ListInventoryOptions = () => {
    return {
      staleTime: 5 * 1000
    };
  };
  query = injectListInventory(this.listInventoryVars, this.options);
}
```

## ListAmenities
You can execute the `ListAmenities` Query using the following Query injector, which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts):

```javascript
injectListAmenities(args: ListAmenitiesArgs, options?: ListAmenitiesOptions, injector?: Injector): CreateDataConnectQueryResult<ListAmenitiesData, ListAmenitiesVariables>;
```

### Variables
The `ListAmenities` Query requires an argument of type `ListAmenitiesVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListAmenitiesVariables {
  hotelId: UUIDString;
}
```
### Return Type
Recall that calling the `ListAmenities` Query injector returns a `CreateDataConnectQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `CreateDataConnectQueryResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectQueryResult.isPending()`, `CreateDataConnectQueryResult.isSuccess()`, and `CreateDataConnectQueryResult.isError()` functions.

To access the data returned by a Query, use the `CreateDataConnectQueryResult.data()` function. The data for the `ListAmenities` Query is of type `ListAmenitiesData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `CreateDataConnectQueryResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectQuery) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectquery).

### Using `ListAmenities`'s Query injector

```javascript
... // other imports
import { connectorConfig, ListAmenitiesVariables } from '@dataconnect/generated';
import { injectListAmenities, ListAmenitiesOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Query. -->
    @if (query.isPending()) {
      Loading...
    }
    @if (query.error()) {
      An error has occurred: {{ query.error() }}
    }
    <!-- If the Query is successful, you can access the data returned using
      the CreateDataConnectQueryResult.data() function. -->
    @if (query.data(); as data) {
      <!-- use your data to display something -->
            <div>Query successful!</div>
    }
  `,
})
export class MyComponent {
  // The `ListAmenities` Query requires an argument of type `ListAmenitiesVariables`:
  listAmenitiesVars: ListAmenitiesVariables = {
    hotelId: ..., 
  };

  // Since the execution of the query is eager, you don't have to call `execute` to "execute" the Query.
  // Call the Query injector function to get a `CreateDataConnectQueryResult` object which holds the state of your Query.
  query = injectListAmenities(this.listAmenitiesVars);
  // Variables can be defined inline as well.
  query = injectListAmenities({ hotelId: ..., });

  // You can also pass in an options function (not object) of type `ListAmenitiesOptions` to the Query injector function.
  options: ListAmenitiesOptions = () => {
    return {
      staleTime: 5 * 1000
    };
  };
  query = injectListAmenities(this.listAmenitiesVars, this.options);
}
```

## ListStoredDocuments
You can execute the `ListStoredDocuments` Query using the following Query injector, which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts):

```javascript
injectListStoredDocuments(args: ListStoredDocumentsArgs, options?: ListStoredDocumentsOptions, injector?: Injector): CreateDataConnectQueryResult<ListStoredDocumentsData, ListStoredDocumentsVariables>;
```

### Variables
The `ListStoredDocuments` Query requires an argument of type `ListStoredDocumentsVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListStoredDocumentsVariables {
  hotelId: UUIDString;
}
```
### Return Type
Recall that calling the `ListStoredDocuments` Query injector returns a `CreateDataConnectQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `CreateDataConnectQueryResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectQueryResult.isPending()`, `CreateDataConnectQueryResult.isSuccess()`, and `CreateDataConnectQueryResult.isError()` functions.

To access the data returned by a Query, use the `CreateDataConnectQueryResult.data()` function. The data for the `ListStoredDocuments` Query is of type `ListStoredDocumentsData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `CreateDataConnectQueryResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectQuery) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectquery).

### Using `ListStoredDocuments`'s Query injector

```javascript
... // other imports
import { connectorConfig, ListStoredDocumentsVariables } from '@dataconnect/generated';
import { injectListStoredDocuments, ListStoredDocumentsOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Query. -->
    @if (query.isPending()) {
      Loading...
    }
    @if (query.error()) {
      An error has occurred: {{ query.error() }}
    }
    <!-- If the Query is successful, you can access the data returned using
      the CreateDataConnectQueryResult.data() function. -->
    @if (query.data(); as data) {
      <!-- use your data to display something -->
            <div>Query successful!</div>
    }
  `,
})
export class MyComponent {
  // The `ListStoredDocuments` Query requires an argument of type `ListStoredDocumentsVariables`:
  listStoredDocumentsVars: ListStoredDocumentsVariables = {
    hotelId: ..., 
  };

  // Since the execution of the query is eager, you don't have to call `execute` to "execute" the Query.
  // Call the Query injector function to get a `CreateDataConnectQueryResult` object which holds the state of your Query.
  query = injectListStoredDocuments(this.listStoredDocumentsVars);
  // Variables can be defined inline as well.
  query = injectListStoredDocuments({ hotelId: ..., });

  // You can also pass in an options function (not object) of type `ListStoredDocumentsOptions` to the Query injector function.
  options: ListStoredDocumentsOptions = () => {
    return {
      staleTime: 5 * 1000
    };
  };
  query = injectListStoredDocuments(this.listStoredDocumentsVars, this.options);
}
```

# Mutations

The Angular generated SDK provides Mutations injectors that call [`injectDataConnectMutation`](https://react-query-firebase.invertase.dev/angular/data-connect/mutations) from TanStack Query Firebase.

Calling these injectors will return a `CreateDataConnectMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, and the most recent data returned by the Mutation, among other things. To learn more about these injectors and how to use them, see the [TanStack Query Firebase documentation](https://react-query-firebase.invertase.dev/angular/data-connect/mutations).

Mutation injectors do not execute their Mutations automatically when called. Rather, after calling the Mutation injector and getting a `CreateDataConnectMutationResult` object, you must call the `CreateDataConnectMutationResult.mutate()` function to execute the Mutation.

To learn more about TanStack Angular Query's Mutations, see the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/guides/mutations).

## Using Mutation Injectors
Here's a general overview of how to use the generated Mutation injectors in your code:

- Mutation injectors are not called with the arguments to the Mutation. Instead, arguments are passed to `CreateDataConnectMutationResult.mutate()`.
- If the Mutation has no variables, the `mutate()` function does not require arguments.
- If the Mutation has any required variables, the `mutate()` function will require at least one argument: an object that contains all the required variables for the Mutation.
- If the Mutation has some required and some optional variables, only required variables are necessary in the variables argument object, and optional variables may be provided as well.
- If all of the Mutation's variables are optional, the Mutation injector does not require any arguments.
- The Angular generated SDK's Mutation injectors do not accept `DataConnect` instances as arguments.
- Mutation injector functions can be called with or without passing in an `options` argument, whose type is a function which returns an object. The type is generated alongside the operation's injector function in [dataconnect-generated/angular/index.d.ts](./index.d.ts). The type is generated alongside the operation's injector function. To learn more about the `options` argument, see the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/guides/mutations#mutation-side-effects).
  - `CreateDataConnectMutationResult.mutate()` also accepts an `options` argument. It's type is not a function which returns an object, but the object itself.
  - ***Special case:*** If the Mutation has no arguments (or all optional arguments and you wish to provide none), and you want to pass `options` to `CreateDataConnectMutationResult.mutate()`, you must pass `undefined` where you would normally pass the Mutation's arguments, and then may provide the options argument.

Below are examples of how to use the `default` connector's generated Mutation injectors to execute each Mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#operations-react-angular).

## CreateRoom
You can execute the `CreateRoom` Mutation using the `CreateDataConnectMutationResult` object returned by the following Mutation injector (which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts)):
```javascript
injectCreateRoom(options?: CreateRoomOptions, injector?: Injector): CreateDataConnectMutationResult<CreateRoomData, CreateRoomVariables, CreateRoomVariables>;
```

### Variables
The `CreateRoom` Mutation requires an argument of type `CreateRoomVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `CreateRoom` Mutation injector returns a `CreateDataConnectMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `CreateDataConnectMutationResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectMutationResult.isPending()`, `CreateDataConnectMutationResult.isSuccess()`, and `CreateDataConnectMutationResult.isError()` functions.

To execute the Mutation, call `CreateDataConnectMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation. 

To access the data returned by a Mutation, use the `CreateDataConnectMutationResult.data()` function. The data for the `CreateRoom` Mutation is of type `CreateRoomData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateRoomData {
  room_insert: Room_Key;
}
```

You can also call `CreateDataConnectMutationResult.mutateAsync()`, which executes the Mutation and returns a promise with the data returned from the Mutation. To learn more, see the [TanStack Angular Query documentation](https://tanstack.com/query/latest/docs/framework/angular/guides/mutations#promises).

To learn more about the `CreateDataConnectMutationResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectMutation) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectmutation).

### Using `CreateRoom`'s Mutation injector

```javascript
... // other imports
import { connectorConfig, CreateRoomVariables } from '@dataconnect/generated';
import { injectCreateRoom, CreateRoomOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Mutation. -->
    @if (mutation.isPending()) {
      Loading...
    }
    @if (mutation.error()) {
      An error has occurred: {{ mutation.error() }}
    }
    <!-- If the Mutation is successful, you can access the data returned using
      the CreateDataConnectMutationResult.data() function. -->
    @if (mutation.data(); as data) {
      <!-- Use your data to display something -->
      <div>Mutation successful!</div>
    }
    <!-- Let's create a button that executes our mutation when clicked. -->
    <button
      (disabled)="mutation.isPending()"
      (click)="executeMutation()"
    >
      {{ mutation.isPending() ? 'Pending...' : 'Mutate!' }}
    </button>
  `,
})
export class MyComponent {
  // Call the Mutation injector function to get a `CreateDataConnectMutationResult` object which holds the state of your Mutation.
  mutation = injectCreateRoom();

  // You can also pass in a `CreateRoomOptions` function (not object) to the Mutation injector function.
  options: CreateRoomOptions = () => {
    return {
      onSuccess: () => { console.log('Mutation succeeded!'); }
    };
  };
  mutation = injectCreateRoom(this.options);

  // After calling the Mutation injector function, you must call `CreateDataConnectMutationResult.mutate()` to execute the Mutation.
  executeMutation() {
    // The `CreateRoom` Mutation requires an argument of type `CreateRoomVariables`:
    const createRoomVars: CreateRoomVariables = {
      hotelId: ..., 
      roomNumber: ..., 
      roomType: ..., 
      status: ..., 
      dailyRate: ..., 
      capacity: ..., // optional
    };
    this.mutation.mutate(createRoomVars);
    // Variables can be defined inline as well.
    this.mutation.mutate({ hotelId: ..., roomNumber: ..., roomType: ..., status: ..., dailyRate: ..., capacity: ..., });

    // You can call `CreateDataConnectMutationResult.mutateAsync()` to execute the Mutation and return a promise with the data returned from the Mutation.
    this.mutation.mutateAsync(createRoomVars);

    // You can also pass in a `CreateRoomOptions` object (not function) to `CreateDataConnectMutationResult.mutate()`.
    this.mutation.mutate(createRoomVars, this.options());
  }
}
```

## UpdateRoomStatus
You can execute the `UpdateRoomStatus` Mutation using the `CreateDataConnectMutationResult` object returned by the following Mutation injector (which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts)):
```javascript
injectUpdateRoomStatus(options?: UpdateRoomStatusOptions, injector?: Injector): CreateDataConnectMutationResult<UpdateRoomStatusData, UpdateRoomStatusVariables, UpdateRoomStatusVariables>;
```

### Variables
The `UpdateRoomStatus` Mutation requires an argument of type `UpdateRoomStatusVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateRoomStatusVariables {
  id: UUIDString;
  status: string;
}
```
### Return Type
Recall that calling the `UpdateRoomStatus` Mutation injector returns a `CreateDataConnectMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `CreateDataConnectMutationResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectMutationResult.isPending()`, `CreateDataConnectMutationResult.isSuccess()`, and `CreateDataConnectMutationResult.isError()` functions.

To execute the Mutation, call `CreateDataConnectMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation. 

To access the data returned by a Mutation, use the `CreateDataConnectMutationResult.data()` function. The data for the `UpdateRoomStatus` Mutation is of type `UpdateRoomStatusData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateRoomStatusData {
  room_update?: Room_Key | null;
}
```

You can also call `CreateDataConnectMutationResult.mutateAsync()`, which executes the Mutation and returns a promise with the data returned from the Mutation. To learn more, see the [TanStack Angular Query documentation](https://tanstack.com/query/latest/docs/framework/angular/guides/mutations#promises).

To learn more about the `CreateDataConnectMutationResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectMutation) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectmutation).

### Using `UpdateRoomStatus`'s Mutation injector

```javascript
... // other imports
import { connectorConfig, UpdateRoomStatusVariables } from '@dataconnect/generated';
import { injectUpdateRoomStatus, UpdateRoomStatusOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Mutation. -->
    @if (mutation.isPending()) {
      Loading...
    }
    @if (mutation.error()) {
      An error has occurred: {{ mutation.error() }}
    }
    <!-- If the Mutation is successful, you can access the data returned using
      the CreateDataConnectMutationResult.data() function. -->
    @if (mutation.data(); as data) {
      <!-- Use your data to display something -->
      <div>Mutation successful!</div>
    }
    <!-- Let's create a button that executes our mutation when clicked. -->
    <button
      (disabled)="mutation.isPending()"
      (click)="executeMutation()"
    >
      {{ mutation.isPending() ? 'Pending...' : 'Mutate!' }}
    </button>
  `,
})
export class MyComponent {
  // Call the Mutation injector function to get a `CreateDataConnectMutationResult` object which holds the state of your Mutation.
  mutation = injectUpdateRoomStatus();

  // You can also pass in a `UpdateRoomStatusOptions` function (not object) to the Mutation injector function.
  options: UpdateRoomStatusOptions = () => {
    return {
      onSuccess: () => { console.log('Mutation succeeded!'); }
    };
  };
  mutation = injectUpdateRoomStatus(this.options);

  // After calling the Mutation injector function, you must call `CreateDataConnectMutationResult.mutate()` to execute the Mutation.
  executeMutation() {
    // The `UpdateRoomStatus` Mutation requires an argument of type `UpdateRoomStatusVariables`:
    const updateRoomStatusVars: UpdateRoomStatusVariables = {
      id: ..., 
      status: ..., 
    };
    this.mutation.mutate(updateRoomStatusVars);
    // Variables can be defined inline as well.
    this.mutation.mutate({ id: ..., status: ..., });

    // You can call `CreateDataConnectMutationResult.mutateAsync()` to execute the Mutation and return a promise with the data returned from the Mutation.
    this.mutation.mutateAsync(updateRoomStatusVars);

    // You can also pass in a `UpdateRoomStatusOptions` object (not function) to `CreateDataConnectMutationResult.mutate()`.
    this.mutation.mutate(updateRoomStatusVars, this.options());
  }
}
```

## CreateHotel
You can execute the `CreateHotel` Mutation using the `CreateDataConnectMutationResult` object returned by the following Mutation injector (which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts)):
```javascript
injectCreateHotel(options?: CreateHotelOptions, injector?: Injector): CreateDataConnectMutationResult<CreateHotelData, CreateHotelVariables, CreateHotelVariables>;
```

### Variables
The `CreateHotel` Mutation requires an argument of type `CreateHotelVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateHotelVariables {
  name: string;
  address: string;
  propertyId: string;
}
```
### Return Type
Recall that calling the `CreateHotel` Mutation injector returns a `CreateDataConnectMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `CreateDataConnectMutationResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectMutationResult.isPending()`, `CreateDataConnectMutationResult.isSuccess()`, and `CreateDataConnectMutationResult.isError()` functions.

To execute the Mutation, call `CreateDataConnectMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation. 

To access the data returned by a Mutation, use the `CreateDataConnectMutationResult.data()` function. The data for the `CreateHotel` Mutation is of type `CreateHotelData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateHotelData {
  hotel_insert: Hotel_Key;
}
```

You can also call `CreateDataConnectMutationResult.mutateAsync()`, which executes the Mutation and returns a promise with the data returned from the Mutation. To learn more, see the [TanStack Angular Query documentation](https://tanstack.com/query/latest/docs/framework/angular/guides/mutations#promises).

To learn more about the `CreateDataConnectMutationResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectMutation) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectmutation).

### Using `CreateHotel`'s Mutation injector

```javascript
... // other imports
import { connectorConfig, CreateHotelVariables } from '@dataconnect/generated';
import { injectCreateHotel, CreateHotelOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Mutation. -->
    @if (mutation.isPending()) {
      Loading...
    }
    @if (mutation.error()) {
      An error has occurred: {{ mutation.error() }}
    }
    <!-- If the Mutation is successful, you can access the data returned using
      the CreateDataConnectMutationResult.data() function. -->
    @if (mutation.data(); as data) {
      <!-- Use your data to display something -->
      <div>Mutation successful!</div>
    }
    <!-- Let's create a button that executes our mutation when clicked. -->
    <button
      (disabled)="mutation.isPending()"
      (click)="executeMutation()"
    >
      {{ mutation.isPending() ? 'Pending...' : 'Mutate!' }}
    </button>
  `,
})
export class MyComponent {
  // Call the Mutation injector function to get a `CreateDataConnectMutationResult` object which holds the state of your Mutation.
  mutation = injectCreateHotel();

  // You can also pass in a `CreateHotelOptions` function (not object) to the Mutation injector function.
  options: CreateHotelOptions = () => {
    return {
      onSuccess: () => { console.log('Mutation succeeded!'); }
    };
  };
  mutation = injectCreateHotel(this.options);

  // After calling the Mutation injector function, you must call `CreateDataConnectMutationResult.mutate()` to execute the Mutation.
  executeMutation() {
    // The `CreateHotel` Mutation requires an argument of type `CreateHotelVariables`:
    const createHotelVars: CreateHotelVariables = {
      name: ..., 
      address: ..., 
      propertyId: ..., 
    };
    this.mutation.mutate(createHotelVars);
    // Variables can be defined inline as well.
    this.mutation.mutate({ name: ..., address: ..., propertyId: ..., });

    // You can call `CreateDataConnectMutationResult.mutateAsync()` to execute the Mutation and return a promise with the data returned from the Mutation.
    this.mutation.mutateAsync(createHotelVars);

    // You can also pass in a `CreateHotelOptions` object (not function) to `CreateDataConnectMutationResult.mutate()`.
    this.mutation.mutate(createHotelVars, this.options());
  }
}
```

## UpdateHotelConfig
You can execute the `UpdateHotelConfig` Mutation using the `CreateDataConnectMutationResult` object returned by the following Mutation injector (which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts)):
```javascript
injectUpdateHotelConfig(options?: UpdateHotelConfigOptions, injector?: Injector): CreateDataConnectMutationResult<UpdateHotelConfigData, UpdateHotelConfigVariables, UpdateHotelConfigVariables>;
```

### Variables
The `UpdateHotelConfig` Mutation requires an argument of type `UpdateHotelConfigVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `UpdateHotelConfig` Mutation injector returns a `CreateDataConnectMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `CreateDataConnectMutationResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectMutationResult.isPending()`, `CreateDataConnectMutationResult.isSuccess()`, and `CreateDataConnectMutationResult.isError()` functions.

To execute the Mutation, call `CreateDataConnectMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation. 

To access the data returned by a Mutation, use the `CreateDataConnectMutationResult.data()` function. The data for the `UpdateHotelConfig` Mutation is of type `UpdateHotelConfigData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateHotelConfigData {
  hotel_update?: Hotel_Key | null;
}
```

You can also call `CreateDataConnectMutationResult.mutateAsync()`, which executes the Mutation and returns a promise with the data returned from the Mutation. To learn more, see the [TanStack Angular Query documentation](https://tanstack.com/query/latest/docs/framework/angular/guides/mutations#promises).

To learn more about the `CreateDataConnectMutationResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectMutation) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectmutation).

### Using `UpdateHotelConfig`'s Mutation injector

```javascript
... // other imports
import { connectorConfig, UpdateHotelConfigVariables } from '@dataconnect/generated';
import { injectUpdateHotelConfig, UpdateHotelConfigOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Mutation. -->
    @if (mutation.isPending()) {
      Loading...
    }
    @if (mutation.error()) {
      An error has occurred: {{ mutation.error() }}
    }
    <!-- If the Mutation is successful, you can access the data returned using
      the CreateDataConnectMutationResult.data() function. -->
    @if (mutation.data(); as data) {
      <!-- Use your data to display something -->
      <div>Mutation successful!</div>
    }
    <!-- Let's create a button that executes our mutation when clicked. -->
    <button
      (disabled)="mutation.isPending()"
      (click)="executeMutation()"
    >
      {{ mutation.isPending() ? 'Pending...' : 'Mutate!' }}
    </button>
  `,
})
export class MyComponent {
  // Call the Mutation injector function to get a `CreateDataConnectMutationResult` object which holds the state of your Mutation.
  mutation = injectUpdateHotelConfig();

  // You can also pass in a `UpdateHotelConfigOptions` function (not object) to the Mutation injector function.
  options: UpdateHotelConfigOptions = () => {
    return {
      onSuccess: () => { console.log('Mutation succeeded!'); }
    };
  };
  mutation = injectUpdateHotelConfig(this.options);

  // After calling the Mutation injector function, you must call `CreateDataConnectMutationResult.mutate()` to execute the Mutation.
  executeMutation() {
    // The `UpdateHotelConfig` Mutation requires an argument of type `UpdateHotelConfigVariables`:
    const updateHotelConfigVars: UpdateHotelConfigVariables = {
      id: ..., 
      name: ..., // optional
      address: ..., // optional
      email: ..., // optional
      phoneNumber: ..., // optional
      demoMode: ..., // optional
      maintenanceEmail: ..., // optional
    };
    this.mutation.mutate(updateHotelConfigVars);
    // Variables can be defined inline as well.
    this.mutation.mutate({ id: ..., name: ..., address: ..., email: ..., phoneNumber: ..., demoMode: ..., maintenanceEmail: ..., });

    // You can call `CreateDataConnectMutationResult.mutateAsync()` to execute the Mutation and return a promise with the data returned from the Mutation.
    this.mutation.mutateAsync(updateHotelConfigVars);

    // You can also pass in a `UpdateHotelConfigOptions` object (not function) to `CreateDataConnectMutationResult.mutate()`.
    this.mutation.mutate(updateHotelConfigVars, this.options());
  }
}
```

## CreateGuestDC
You can execute the `CreateGuestDC` Mutation using the `CreateDataConnectMutationResult` object returned by the following Mutation injector (which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts)):
```javascript
injectCreateGuestDc(options?: CreateGuestDcOptions, injector?: Injector): CreateDataConnectMutationResult<CreateGuestDcData, CreateGuestDcVariables, CreateGuestDcVariables>;
```

### Variables
The `CreateGuestDC` Mutation requires an argument of type `CreateGuestDcVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `CreateGuestDC` Mutation injector returns a `CreateDataConnectMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `CreateDataConnectMutationResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectMutationResult.isPending()`, `CreateDataConnectMutationResult.isSuccess()`, and `CreateDataConnectMutationResult.isError()` functions.

To execute the Mutation, call `CreateDataConnectMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation. 

To access the data returned by a Mutation, use the `CreateDataConnectMutationResult.data()` function. The data for the `CreateGuestDC` Mutation is of type `CreateGuestDcData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateGuestDcData {
  guest_insert: Guest_Key;
}
```

You can also call `CreateDataConnectMutationResult.mutateAsync()`, which executes the Mutation and returns a promise with the data returned from the Mutation. To learn more, see the [TanStack Angular Query documentation](https://tanstack.com/query/latest/docs/framework/angular/guides/mutations#promises).

To learn more about the `CreateDataConnectMutationResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectMutation) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectmutation).

### Using `CreateGuestDC`'s Mutation injector

```javascript
... // other imports
import { connectorConfig, CreateGuestDcVariables } from '@dataconnect/generated';
import { injectCreateGuestDc, CreateGuestDcOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Mutation. -->
    @if (mutation.isPending()) {
      Loading...
    }
    @if (mutation.error()) {
      An error has occurred: {{ mutation.error() }}
    }
    <!-- If the Mutation is successful, you can access the data returned using
      the CreateDataConnectMutationResult.data() function. -->
    @if (mutation.data(); as data) {
      <!-- Use your data to display something -->
      <div>Mutation successful!</div>
    }
    <!-- Let's create a button that executes our mutation when clicked. -->
    <button
      (disabled)="mutation.isPending()"
      (click)="executeMutation()"
    >
      {{ mutation.isPending() ? 'Pending...' : 'Mutate!' }}
    </button>
  `,
})
export class MyComponent {
  // Call the Mutation injector function to get a `CreateDataConnectMutationResult` object which holds the state of your Mutation.
  mutation = injectCreateGuestDc();

  // You can also pass in a `CreateGuestDcOptions` function (not object) to the Mutation injector function.
  options: CreateGuestDcOptions = () => {
    return {
      onSuccess: () => { console.log('Mutation succeeded!'); }
    };
  };
  mutation = injectCreateGuestDc(this.options);

  // After calling the Mutation injector function, you must call `CreateDataConnectMutationResult.mutate()` to execute the Mutation.
  executeMutation() {
    // The `CreateGuestDc` Mutation requires an argument of type `CreateGuestDcVariables`:
    const createGuestDcVars: CreateGuestDcVariables = {
      hotelId: ..., 
      name: ..., 
      email: ..., 
      phoneNumber: ..., // optional
      address: ..., // optional
      notes: ..., // optional
    };
    this.mutation.mutate(createGuestDcVars);
    // Variables can be defined inline as well.
    this.mutation.mutate({ hotelId: ..., name: ..., email: ..., phoneNumber: ..., address: ..., notes: ..., });

    // You can call `CreateDataConnectMutationResult.mutateAsync()` to execute the Mutation and return a promise with the data returned from the Mutation.
    this.mutation.mutateAsync(createGuestDcVars);

    // You can also pass in a `CreateGuestDcOptions` object (not function) to `CreateDataConnectMutationResult.mutate()`.
    this.mutation.mutate(createGuestDcVars, this.options());
  }
}
```

## UpdateGuestDC
You can execute the `UpdateGuestDC` Mutation using the `CreateDataConnectMutationResult` object returned by the following Mutation injector (which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts)):
```javascript
injectUpdateGuestDc(options?: UpdateGuestDcOptions, injector?: Injector): CreateDataConnectMutationResult<UpdateGuestDcData, UpdateGuestDcVariables, UpdateGuestDcVariables>;
```

### Variables
The `UpdateGuestDC` Mutation requires an argument of type `UpdateGuestDcVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `UpdateGuestDC` Mutation injector returns a `CreateDataConnectMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `CreateDataConnectMutationResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectMutationResult.isPending()`, `CreateDataConnectMutationResult.isSuccess()`, and `CreateDataConnectMutationResult.isError()` functions.

To execute the Mutation, call `CreateDataConnectMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation. 

To access the data returned by a Mutation, use the `CreateDataConnectMutationResult.data()` function. The data for the `UpdateGuestDC` Mutation is of type `UpdateGuestDcData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateGuestDcData {
  guest_update?: Guest_Key | null;
}
```

You can also call `CreateDataConnectMutationResult.mutateAsync()`, which executes the Mutation and returns a promise with the data returned from the Mutation. To learn more, see the [TanStack Angular Query documentation](https://tanstack.com/query/latest/docs/framework/angular/guides/mutations#promises).

To learn more about the `CreateDataConnectMutationResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectMutation) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectmutation).

### Using `UpdateGuestDC`'s Mutation injector

```javascript
... // other imports
import { connectorConfig, UpdateGuestDcVariables } from '@dataconnect/generated';
import { injectUpdateGuestDc, UpdateGuestDcOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Mutation. -->
    @if (mutation.isPending()) {
      Loading...
    }
    @if (mutation.error()) {
      An error has occurred: {{ mutation.error() }}
    }
    <!-- If the Mutation is successful, you can access the data returned using
      the CreateDataConnectMutationResult.data() function. -->
    @if (mutation.data(); as data) {
      <!-- Use your data to display something -->
      <div>Mutation successful!</div>
    }
    <!-- Let's create a button that executes our mutation when clicked. -->
    <button
      (disabled)="mutation.isPending()"
      (click)="executeMutation()"
    >
      {{ mutation.isPending() ? 'Pending...' : 'Mutate!' }}
    </button>
  `,
})
export class MyComponent {
  // Call the Mutation injector function to get a `CreateDataConnectMutationResult` object which holds the state of your Mutation.
  mutation = injectUpdateGuestDc();

  // You can also pass in a `UpdateGuestDcOptions` function (not object) to the Mutation injector function.
  options: UpdateGuestDcOptions = () => {
    return {
      onSuccess: () => { console.log('Mutation succeeded!'); }
    };
  };
  mutation = injectUpdateGuestDc(this.options);

  // After calling the Mutation injector function, you must call `CreateDataConnectMutationResult.mutate()` to execute the Mutation.
  executeMutation() {
    // The `UpdateGuestDc` Mutation requires an argument of type `UpdateGuestDcVariables`:
    const updateGuestDcVars: UpdateGuestDcVariables = {
      id: ..., 
      name: ..., // optional
      email: ..., // optional
      phoneNumber: ..., // optional
      address: ..., // optional
      notes: ..., // optional
      history: ..., // optional
    };
    this.mutation.mutate(updateGuestDcVars);
    // Variables can be defined inline as well.
    this.mutation.mutate({ id: ..., name: ..., email: ..., phoneNumber: ..., address: ..., notes: ..., history: ..., });

    // You can call `CreateDataConnectMutationResult.mutateAsync()` to execute the Mutation and return a promise with the data returned from the Mutation.
    this.mutation.mutateAsync(updateGuestDcVars);

    // You can also pass in a `UpdateGuestDcOptions` object (not function) to `CreateDataConnectMutationResult.mutate()`.
    this.mutation.mutate(updateGuestDcVars, this.options());
  }
}
```

## DeleteGuestDC
You can execute the `DeleteGuestDC` Mutation using the `CreateDataConnectMutationResult` object returned by the following Mutation injector (which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts)):
```javascript
injectDeleteGuestDc(options?: DeleteGuestDcOptions, injector?: Injector): CreateDataConnectMutationResult<DeleteGuestDcData, DeleteGuestDcVariables, DeleteGuestDcVariables>;
```

### Variables
The `DeleteGuestDC` Mutation requires an argument of type `DeleteGuestDcVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeleteGuestDcVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `DeleteGuestDC` Mutation injector returns a `CreateDataConnectMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `CreateDataConnectMutationResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectMutationResult.isPending()`, `CreateDataConnectMutationResult.isSuccess()`, and `CreateDataConnectMutationResult.isError()` functions.

To execute the Mutation, call `CreateDataConnectMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation. 

To access the data returned by a Mutation, use the `CreateDataConnectMutationResult.data()` function. The data for the `DeleteGuestDC` Mutation is of type `DeleteGuestDcData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeleteGuestDcData {
  guest_delete?: Guest_Key | null;
}
```

You can also call `CreateDataConnectMutationResult.mutateAsync()`, which executes the Mutation and returns a promise with the data returned from the Mutation. To learn more, see the [TanStack Angular Query documentation](https://tanstack.com/query/latest/docs/framework/angular/guides/mutations#promises).

To learn more about the `CreateDataConnectMutationResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectMutation) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectmutation).

### Using `DeleteGuestDC`'s Mutation injector

```javascript
... // other imports
import { connectorConfig, DeleteGuestDcVariables } from '@dataconnect/generated';
import { injectDeleteGuestDc, DeleteGuestDcOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Mutation. -->
    @if (mutation.isPending()) {
      Loading...
    }
    @if (mutation.error()) {
      An error has occurred: {{ mutation.error() }}
    }
    <!-- If the Mutation is successful, you can access the data returned using
      the CreateDataConnectMutationResult.data() function. -->
    @if (mutation.data(); as data) {
      <!-- Use your data to display something -->
      <div>Mutation successful!</div>
    }
    <!-- Let's create a button that executes our mutation when clicked. -->
    <button
      (disabled)="mutation.isPending()"
      (click)="executeMutation()"
    >
      {{ mutation.isPending() ? 'Pending...' : 'Mutate!' }}
    </button>
  `,
})
export class MyComponent {
  // Call the Mutation injector function to get a `CreateDataConnectMutationResult` object which holds the state of your Mutation.
  mutation = injectDeleteGuestDc();

  // You can also pass in a `DeleteGuestDcOptions` function (not object) to the Mutation injector function.
  options: DeleteGuestDcOptions = () => {
    return {
      onSuccess: () => { console.log('Mutation succeeded!'); }
    };
  };
  mutation = injectDeleteGuestDc(this.options);

  // After calling the Mutation injector function, you must call `CreateDataConnectMutationResult.mutate()` to execute the Mutation.
  executeMutation() {
    // The `DeleteGuestDc` Mutation requires an argument of type `DeleteGuestDcVariables`:
    const deleteGuestDcVars: DeleteGuestDcVariables = {
      id: ..., 
    };
    this.mutation.mutate(deleteGuestDcVars);
    // Variables can be defined inline as well.
    this.mutation.mutate({ id: ..., });

    // You can call `CreateDataConnectMutationResult.mutateAsync()` to execute the Mutation and return a promise with the data returned from the Mutation.
    this.mutation.mutateAsync(deleteGuestDcVars);

    // You can also pass in a `DeleteGuestDcOptions` object (not function) to `CreateDataConnectMutationResult.mutate()`.
    this.mutation.mutate(deleteGuestDcVars, this.options());
  }
}
```

## CreateBookingDC
You can execute the `CreateBookingDC` Mutation using the `CreateDataConnectMutationResult` object returned by the following Mutation injector (which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts)):
```javascript
injectCreateBookingDc(options?: CreateBookingDcOptions, injector?: Injector): CreateDataConnectMutationResult<CreateBookingDcData, CreateBookingDcVariables, CreateBookingDcVariables>;
```

### Variables
The `CreateBookingDC` Mutation requires an argument of type `CreateBookingDcVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `CreateBookingDC` Mutation injector returns a `CreateDataConnectMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `CreateDataConnectMutationResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectMutationResult.isPending()`, `CreateDataConnectMutationResult.isSuccess()`, and `CreateDataConnectMutationResult.isError()` functions.

To execute the Mutation, call `CreateDataConnectMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation. 

To access the data returned by a Mutation, use the `CreateDataConnectMutationResult.data()` function. The data for the `CreateBookingDC` Mutation is of type `CreateBookingDcData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateBookingDcData {
  booking_insert: Booking_Key;
}
```

You can also call `CreateDataConnectMutationResult.mutateAsync()`, which executes the Mutation and returns a promise with the data returned from the Mutation. To learn more, see the [TanStack Angular Query documentation](https://tanstack.com/query/latest/docs/framework/angular/guides/mutations#promises).

To learn more about the `CreateDataConnectMutationResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectMutation) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectmutation).

### Using `CreateBookingDC`'s Mutation injector

```javascript
... // other imports
import { connectorConfig, CreateBookingDcVariables } from '@dataconnect/generated';
import { injectCreateBookingDc, CreateBookingDcOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Mutation. -->
    @if (mutation.isPending()) {
      Loading...
    }
    @if (mutation.error()) {
      An error has occurred: {{ mutation.error() }}
    }
    <!-- If the Mutation is successful, you can access the data returned using
      the CreateDataConnectMutationResult.data() function. -->
    @if (mutation.data(); as data) {
      <!-- Use your data to display something -->
      <div>Mutation successful!</div>
    }
    <!-- Let's create a button that executes our mutation when clicked. -->
    <button
      (disabled)="mutation.isPending()"
      (click)="executeMutation()"
    >
      {{ mutation.isPending() ? 'Pending...' : 'Mutate!' }}
    </button>
  `,
})
export class MyComponent {
  // Call the Mutation injector function to get a `CreateDataConnectMutationResult` object which holds the state of your Mutation.
  mutation = injectCreateBookingDc();

  // You can also pass in a `CreateBookingDcOptions` function (not object) to the Mutation injector function.
  options: CreateBookingDcOptions = () => {
    return {
      onSuccess: () => { console.log('Mutation succeeded!'); }
    };
  };
  mutation = injectCreateBookingDc(this.options);

  // After calling the Mutation injector function, you must call `CreateDataConnectMutationResult.mutate()` to execute the Mutation.
  executeMutation() {
    // The `CreateBookingDc` Mutation requires an argument of type `CreateBookingDcVariables`:
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
    this.mutation.mutate(createBookingDcVars);
    // Variables can be defined inline as well.
    this.mutation.mutate({ hotelId: ..., guestId: ..., roomId: ..., checkInDate: ..., checkOutDate: ..., bookingStatus: ..., ratePerNight: ..., totalPaid: ..., isIndefinite: ..., });

    // You can call `CreateDataConnectMutationResult.mutateAsync()` to execute the Mutation and return a promise with the data returned from the Mutation.
    this.mutation.mutateAsync(createBookingDcVars);

    // You can also pass in a `CreateBookingDcOptions` object (not function) to `CreateDataConnectMutationResult.mutate()`.
    this.mutation.mutate(createBookingDcVars, this.options());
  }
}
```

## UpdateBookingDC
You can execute the `UpdateBookingDC` Mutation using the `CreateDataConnectMutationResult` object returned by the following Mutation injector (which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts)):
```javascript
injectUpdateBookingDc(options?: UpdateBookingDcOptions, injector?: Injector): CreateDataConnectMutationResult<UpdateBookingDcData, UpdateBookingDcVariables, UpdateBookingDcVariables>;
```

### Variables
The `UpdateBookingDC` Mutation requires an argument of type `UpdateBookingDcVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateBookingDcVariables {
  id: UUIDString;
  bookingStatus?: string | null;
  checkOutActual?: TimestampString | null;
  totalPaid?: number | null;
}
```
### Return Type
Recall that calling the `UpdateBookingDC` Mutation injector returns a `CreateDataConnectMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `CreateDataConnectMutationResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectMutationResult.isPending()`, `CreateDataConnectMutationResult.isSuccess()`, and `CreateDataConnectMutationResult.isError()` functions.

To execute the Mutation, call `CreateDataConnectMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation. 

To access the data returned by a Mutation, use the `CreateDataConnectMutationResult.data()` function. The data for the `UpdateBookingDC` Mutation is of type `UpdateBookingDcData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateBookingDcData {
  booking_update?: Booking_Key | null;
}
```

You can also call `CreateDataConnectMutationResult.mutateAsync()`, which executes the Mutation and returns a promise with the data returned from the Mutation. To learn more, see the [TanStack Angular Query documentation](https://tanstack.com/query/latest/docs/framework/angular/guides/mutations#promises).

To learn more about the `CreateDataConnectMutationResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectMutation) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectmutation).

### Using `UpdateBookingDC`'s Mutation injector

```javascript
... // other imports
import { connectorConfig, UpdateBookingDcVariables } from '@dataconnect/generated';
import { injectUpdateBookingDc, UpdateBookingDcOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Mutation. -->
    @if (mutation.isPending()) {
      Loading...
    }
    @if (mutation.error()) {
      An error has occurred: {{ mutation.error() }}
    }
    <!-- If the Mutation is successful, you can access the data returned using
      the CreateDataConnectMutationResult.data() function. -->
    @if (mutation.data(); as data) {
      <!-- Use your data to display something -->
      <div>Mutation successful!</div>
    }
    <!-- Let's create a button that executes our mutation when clicked. -->
    <button
      (disabled)="mutation.isPending()"
      (click)="executeMutation()"
    >
      {{ mutation.isPending() ? 'Pending...' : 'Mutate!' }}
    </button>
  `,
})
export class MyComponent {
  // Call the Mutation injector function to get a `CreateDataConnectMutationResult` object which holds the state of your Mutation.
  mutation = injectUpdateBookingDc();

  // You can also pass in a `UpdateBookingDcOptions` function (not object) to the Mutation injector function.
  options: UpdateBookingDcOptions = () => {
    return {
      onSuccess: () => { console.log('Mutation succeeded!'); }
    };
  };
  mutation = injectUpdateBookingDc(this.options);

  // After calling the Mutation injector function, you must call `CreateDataConnectMutationResult.mutate()` to execute the Mutation.
  executeMutation() {
    // The `UpdateBookingDc` Mutation requires an argument of type `UpdateBookingDcVariables`:
    const updateBookingDcVars: UpdateBookingDcVariables = {
      id: ..., 
      bookingStatus: ..., // optional
      checkOutActual: ..., // optional
      totalPaid: ..., // optional
    };
    this.mutation.mutate(updateBookingDcVars);
    // Variables can be defined inline as well.
    this.mutation.mutate({ id: ..., bookingStatus: ..., checkOutActual: ..., totalPaid: ..., });

    // You can call `CreateDataConnectMutationResult.mutateAsync()` to execute the Mutation and return a promise with the data returned from the Mutation.
    this.mutation.mutateAsync(updateBookingDcVars);

    // You can also pass in a `UpdateBookingDcOptions` object (not function) to `CreateDataConnectMutationResult.mutate()`.
    this.mutation.mutate(updateBookingDcVars, this.options());
  }
}
```

## CreateLogDC
You can execute the `CreateLogDC` Mutation using the `CreateDataConnectMutationResult` object returned by the following Mutation injector (which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts)):
```javascript
injectCreateLogDc(options?: CreateLogDcOptions, injector?: Injector): CreateDataConnectMutationResult<CreateLogDcData, CreateLogDcVariables, CreateLogDcVariables>;
```

### Variables
The `CreateLogDC` Mutation requires an argument of type `CreateLogDcVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateLogDcVariables {
  hotelId: UUIDString;
  action: string;
  user: string;
  category: string;
  details: string;
}
```
### Return Type
Recall that calling the `CreateLogDC` Mutation injector returns a `CreateDataConnectMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `CreateDataConnectMutationResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectMutationResult.isPending()`, `CreateDataConnectMutationResult.isSuccess()`, and `CreateDataConnectMutationResult.isError()` functions.

To execute the Mutation, call `CreateDataConnectMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation. 

To access the data returned by a Mutation, use the `CreateDataConnectMutationResult.data()` function. The data for the `CreateLogDC` Mutation is of type `CreateLogDcData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateLogDcData {
  log_insert: Log_Key;
}
```

You can also call `CreateDataConnectMutationResult.mutateAsync()`, which executes the Mutation and returns a promise with the data returned from the Mutation. To learn more, see the [TanStack Angular Query documentation](https://tanstack.com/query/latest/docs/framework/angular/guides/mutations#promises).

To learn more about the `CreateDataConnectMutationResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectMutation) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectmutation).

### Using `CreateLogDC`'s Mutation injector

```javascript
... // other imports
import { connectorConfig, CreateLogDcVariables } from '@dataconnect/generated';
import { injectCreateLogDc, CreateLogDcOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Mutation. -->
    @if (mutation.isPending()) {
      Loading...
    }
    @if (mutation.error()) {
      An error has occurred: {{ mutation.error() }}
    }
    <!-- If the Mutation is successful, you can access the data returned using
      the CreateDataConnectMutationResult.data() function. -->
    @if (mutation.data(); as data) {
      <!-- Use your data to display something -->
      <div>Mutation successful!</div>
    }
    <!-- Let's create a button that executes our mutation when clicked. -->
    <button
      (disabled)="mutation.isPending()"
      (click)="executeMutation()"
    >
      {{ mutation.isPending() ? 'Pending...' : 'Mutate!' }}
    </button>
  `,
})
export class MyComponent {
  // Call the Mutation injector function to get a `CreateDataConnectMutationResult` object which holds the state of your Mutation.
  mutation = injectCreateLogDc();

  // You can also pass in a `CreateLogDcOptions` function (not object) to the Mutation injector function.
  options: CreateLogDcOptions = () => {
    return {
      onSuccess: () => { console.log('Mutation succeeded!'); }
    };
  };
  mutation = injectCreateLogDc(this.options);

  // After calling the Mutation injector function, you must call `CreateDataConnectMutationResult.mutate()` to execute the Mutation.
  executeMutation() {
    // The `CreateLogDc` Mutation requires an argument of type `CreateLogDcVariables`:
    const createLogDcVars: CreateLogDcVariables = {
      hotelId: ..., 
      action: ..., 
      user: ..., 
      category: ..., 
      details: ..., 
    };
    this.mutation.mutate(createLogDcVars);
    // Variables can be defined inline as well.
    this.mutation.mutate({ hotelId: ..., action: ..., user: ..., category: ..., details: ..., });

    // You can call `CreateDataConnectMutationResult.mutateAsync()` to execute the Mutation and return a promise with the data returned from the Mutation.
    this.mutation.mutateAsync(createLogDcVars);

    // You can also pass in a `CreateLogDcOptions` object (not function) to `CreateDataConnectMutationResult.mutate()`.
    this.mutation.mutate(createLogDcVars, this.options());
  }
}
```

## CreateStaffDC
You can execute the `CreateStaffDC` Mutation using the `CreateDataConnectMutationResult` object returned by the following Mutation injector (which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts)):
```javascript
injectCreateStaffDc(options?: CreateStaffDcOptions, injector?: Injector): CreateDataConnectMutationResult<CreateStaffDcData, CreateStaffDcVariables, CreateStaffDcVariables>;
```

### Variables
The `CreateStaffDC` Mutation requires an argument of type `CreateStaffDcVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `CreateStaffDC` Mutation injector returns a `CreateDataConnectMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `CreateDataConnectMutationResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectMutationResult.isPending()`, `CreateDataConnectMutationResult.isSuccess()`, and `CreateDataConnectMutationResult.isError()` functions.

To execute the Mutation, call `CreateDataConnectMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation. 

To access the data returned by a Mutation, use the `CreateDataConnectMutationResult.data()` function. The data for the `CreateStaffDC` Mutation is of type `CreateStaffDcData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateStaffDcData {
  staff_insert: Staff_Key;
}
```

You can also call `CreateDataConnectMutationResult.mutateAsync()`, which executes the Mutation and returns a promise with the data returned from the Mutation. To learn more, see the [TanStack Angular Query documentation](https://tanstack.com/query/latest/docs/framework/angular/guides/mutations#promises).

To learn more about the `CreateDataConnectMutationResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectMutation) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectmutation).

### Using `CreateStaffDC`'s Mutation injector

```javascript
... // other imports
import { connectorConfig, CreateStaffDcVariables } from '@dataconnect/generated';
import { injectCreateStaffDc, CreateStaffDcOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Mutation. -->
    @if (mutation.isPending()) {
      Loading...
    }
    @if (mutation.error()) {
      An error has occurred: {{ mutation.error() }}
    }
    <!-- If the Mutation is successful, you can access the data returned using
      the CreateDataConnectMutationResult.data() function. -->
    @if (mutation.data(); as data) {
      <!-- Use your data to display something -->
      <div>Mutation successful!</div>
    }
    <!-- Let's create a button that executes our mutation when clicked. -->
    <button
      (disabled)="mutation.isPending()"
      (click)="executeMutation()"
    >
      {{ mutation.isPending() ? 'Pending...' : 'Mutate!' }}
    </button>
  `,
})
export class MyComponent {
  // Call the Mutation injector function to get a `CreateDataConnectMutationResult` object which holds the state of your Mutation.
  mutation = injectCreateStaffDc();

  // You can also pass in a `CreateStaffDcOptions` function (not object) to the Mutation injector function.
  options: CreateStaffDcOptions = () => {
    return {
      onSuccess: () => { console.log('Mutation succeeded!'); }
    };
  };
  mutation = injectCreateStaffDc(this.options);

  // After calling the Mutation injector function, you must call `CreateDataConnectMutationResult.mutate()` to execute the Mutation.
  executeMutation() {
    // The `CreateStaffDc` Mutation requires an argument of type `CreateStaffDcVariables`:
    const createStaffDcVars: CreateStaffDcVariables = {
      hotelId: ..., 
      firstName: ..., 
      lastName: ..., 
      role: ..., 
      status: ..., 
      currentStatus: ..., 
      pin: ..., // optional
    };
    this.mutation.mutate(createStaffDcVars);
    // Variables can be defined inline as well.
    this.mutation.mutate({ hotelId: ..., firstName: ..., lastName: ..., role: ..., status: ..., currentStatus: ..., pin: ..., });

    // You can call `CreateDataConnectMutationResult.mutateAsync()` to execute the Mutation and return a promise with the data returned from the Mutation.
    this.mutation.mutateAsync(createStaffDcVars);

    // You can also pass in a `CreateStaffDcOptions` object (not function) to `CreateDataConnectMutationResult.mutate()`.
    this.mutation.mutate(createStaffDcVars, this.options());
  }
}
```

## UpdateStaffDC
You can execute the `UpdateStaffDC` Mutation using the `CreateDataConnectMutationResult` object returned by the following Mutation injector (which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts)):
```javascript
injectUpdateStaffDc(options?: UpdateStaffDcOptions, injector?: Injector): CreateDataConnectMutationResult<UpdateStaffDcData, UpdateStaffDcVariables, UpdateStaffDcVariables>;
```

### Variables
The `UpdateStaffDC` Mutation requires an argument of type `UpdateStaffDcVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateStaffDcVariables {
  id: UUIDString;
  currentStatus?: string | null;
  status?: string | null;
}
```
### Return Type
Recall that calling the `UpdateStaffDC` Mutation injector returns a `CreateDataConnectMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `CreateDataConnectMutationResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectMutationResult.isPending()`, `CreateDataConnectMutationResult.isSuccess()`, and `CreateDataConnectMutationResult.isError()` functions.

To execute the Mutation, call `CreateDataConnectMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation. 

To access the data returned by a Mutation, use the `CreateDataConnectMutationResult.data()` function. The data for the `UpdateStaffDC` Mutation is of type `UpdateStaffDcData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateStaffDcData {
  staff_update?: Staff_Key | null;
}
```

You can also call `CreateDataConnectMutationResult.mutateAsync()`, which executes the Mutation and returns a promise with the data returned from the Mutation. To learn more, see the [TanStack Angular Query documentation](https://tanstack.com/query/latest/docs/framework/angular/guides/mutations#promises).

To learn more about the `CreateDataConnectMutationResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectMutation) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectmutation).

### Using `UpdateStaffDC`'s Mutation injector

```javascript
... // other imports
import { connectorConfig, UpdateStaffDcVariables } from '@dataconnect/generated';
import { injectUpdateStaffDc, UpdateStaffDcOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Mutation. -->
    @if (mutation.isPending()) {
      Loading...
    }
    @if (mutation.error()) {
      An error has occurred: {{ mutation.error() }}
    }
    <!-- If the Mutation is successful, you can access the data returned using
      the CreateDataConnectMutationResult.data() function. -->
    @if (mutation.data(); as data) {
      <!-- Use your data to display something -->
      <div>Mutation successful!</div>
    }
    <!-- Let's create a button that executes our mutation when clicked. -->
    <button
      (disabled)="mutation.isPending()"
      (click)="executeMutation()"
    >
      {{ mutation.isPending() ? 'Pending...' : 'Mutate!' }}
    </button>
  `,
})
export class MyComponent {
  // Call the Mutation injector function to get a `CreateDataConnectMutationResult` object which holds the state of your Mutation.
  mutation = injectUpdateStaffDc();

  // You can also pass in a `UpdateStaffDcOptions` function (not object) to the Mutation injector function.
  options: UpdateStaffDcOptions = () => {
    return {
      onSuccess: () => { console.log('Mutation succeeded!'); }
    };
  };
  mutation = injectUpdateStaffDc(this.options);

  // After calling the Mutation injector function, you must call `CreateDataConnectMutationResult.mutate()` to execute the Mutation.
  executeMutation() {
    // The `UpdateStaffDc` Mutation requires an argument of type `UpdateStaffDcVariables`:
    const updateStaffDcVars: UpdateStaffDcVariables = {
      id: ..., 
      currentStatus: ..., // optional
      status: ..., // optional
    };
    this.mutation.mutate(updateStaffDcVars);
    // Variables can be defined inline as well.
    this.mutation.mutate({ id: ..., currentStatus: ..., status: ..., });

    // You can call `CreateDataConnectMutationResult.mutateAsync()` to execute the Mutation and return a promise with the data returned from the Mutation.
    this.mutation.mutateAsync(updateStaffDcVars);

    // You can also pass in a `UpdateStaffDcOptions` object (not function) to `CreateDataConnectMutationResult.mutate()`.
    this.mutation.mutate(updateStaffDcVars, this.options());
  }
}
```

## CreateTimeLogDC
You can execute the `CreateTimeLogDC` Mutation using the `CreateDataConnectMutationResult` object returned by the following Mutation injector (which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts)):
```javascript
injectCreateTimeLogDc(options?: CreateTimeLogDcOptions, injector?: Injector): CreateDataConnectMutationResult<CreateTimeLogDcData, CreateTimeLogDcVariables, CreateTimeLogDcVariables>;
```

### Variables
The `CreateTimeLogDC` Mutation requires an argument of type `CreateTimeLogDcVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateTimeLogDcVariables {
  hotelId: UUIDString;
  staffId: UUIDString;
  date: DateString;
  startTime: TimestampString;
  status: string;
}
```
### Return Type
Recall that calling the `CreateTimeLogDC` Mutation injector returns a `CreateDataConnectMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `CreateDataConnectMutationResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectMutationResult.isPending()`, `CreateDataConnectMutationResult.isSuccess()`, and `CreateDataConnectMutationResult.isError()` functions.

To execute the Mutation, call `CreateDataConnectMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation. 

To access the data returned by a Mutation, use the `CreateDataConnectMutationResult.data()` function. The data for the `CreateTimeLogDC` Mutation is of type `CreateTimeLogDcData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateTimeLogDcData {
  timeLog_insert: TimeLog_Key;
}
```

You can also call `CreateDataConnectMutationResult.mutateAsync()`, which executes the Mutation and returns a promise with the data returned from the Mutation. To learn more, see the [TanStack Angular Query documentation](https://tanstack.com/query/latest/docs/framework/angular/guides/mutations#promises).

To learn more about the `CreateDataConnectMutationResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectMutation) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectmutation).

### Using `CreateTimeLogDC`'s Mutation injector

```javascript
... // other imports
import { connectorConfig, CreateTimeLogDcVariables } from '@dataconnect/generated';
import { injectCreateTimeLogDc, CreateTimeLogDcOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Mutation. -->
    @if (mutation.isPending()) {
      Loading...
    }
    @if (mutation.error()) {
      An error has occurred: {{ mutation.error() }}
    }
    <!-- If the Mutation is successful, you can access the data returned using
      the CreateDataConnectMutationResult.data() function. -->
    @if (mutation.data(); as data) {
      <!-- Use your data to display something -->
      <div>Mutation successful!</div>
    }
    <!-- Let's create a button that executes our mutation when clicked. -->
    <button
      (disabled)="mutation.isPending()"
      (click)="executeMutation()"
    >
      {{ mutation.isPending() ? 'Pending...' : 'Mutate!' }}
    </button>
  `,
})
export class MyComponent {
  // Call the Mutation injector function to get a `CreateDataConnectMutationResult` object which holds the state of your Mutation.
  mutation = injectCreateTimeLogDc();

  // You can also pass in a `CreateTimeLogDcOptions` function (not object) to the Mutation injector function.
  options: CreateTimeLogDcOptions = () => {
    return {
      onSuccess: () => { console.log('Mutation succeeded!'); }
    };
  };
  mutation = injectCreateTimeLogDc(this.options);

  // After calling the Mutation injector function, you must call `CreateDataConnectMutationResult.mutate()` to execute the Mutation.
  executeMutation() {
    // The `CreateTimeLogDc` Mutation requires an argument of type `CreateTimeLogDcVariables`:
    const createTimeLogDcVars: CreateTimeLogDcVariables = {
      hotelId: ..., 
      staffId: ..., 
      date: ..., 
      startTime: ..., 
      status: ..., 
    };
    this.mutation.mutate(createTimeLogDcVars);
    // Variables can be defined inline as well.
    this.mutation.mutate({ hotelId: ..., staffId: ..., date: ..., startTime: ..., status: ..., });

    // You can call `CreateDataConnectMutationResult.mutateAsync()` to execute the Mutation and return a promise with the data returned from the Mutation.
    this.mutation.mutateAsync(createTimeLogDcVars);

    // You can also pass in a `CreateTimeLogDcOptions` object (not function) to `CreateDataConnectMutationResult.mutate()`.
    this.mutation.mutate(createTimeLogDcVars, this.options());
  }
}
```

## UpdateTimeLogDC
You can execute the `UpdateTimeLogDC` Mutation using the `CreateDataConnectMutationResult` object returned by the following Mutation injector (which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts)):
```javascript
injectUpdateTimeLogDc(options?: UpdateTimeLogDcOptions, injector?: Injector): CreateDataConnectMutationResult<UpdateTimeLogDcData, UpdateTimeLogDcVariables, UpdateTimeLogDcVariables>;
```

### Variables
The `UpdateTimeLogDC` Mutation requires an argument of type `UpdateTimeLogDcVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateTimeLogDcVariables {
  id: UUIDString;
  endTime?: TimestampString | null;
  breaks?: unknown | null;
  totalHours?: number | null;
  status?: string | null;
}
```
### Return Type
Recall that calling the `UpdateTimeLogDC` Mutation injector returns a `CreateDataConnectMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `CreateDataConnectMutationResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectMutationResult.isPending()`, `CreateDataConnectMutationResult.isSuccess()`, and `CreateDataConnectMutationResult.isError()` functions.

To execute the Mutation, call `CreateDataConnectMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation. 

To access the data returned by a Mutation, use the `CreateDataConnectMutationResult.data()` function. The data for the `UpdateTimeLogDC` Mutation is of type `UpdateTimeLogDcData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateTimeLogDcData {
  timeLog_update?: TimeLog_Key | null;
}
```

You can also call `CreateDataConnectMutationResult.mutateAsync()`, which executes the Mutation and returns a promise with the data returned from the Mutation. To learn more, see the [TanStack Angular Query documentation](https://tanstack.com/query/latest/docs/framework/angular/guides/mutations#promises).

To learn more about the `CreateDataConnectMutationResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectMutation) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectmutation).

### Using `UpdateTimeLogDC`'s Mutation injector

```javascript
... // other imports
import { connectorConfig, UpdateTimeLogDcVariables } from '@dataconnect/generated';
import { injectUpdateTimeLogDc, UpdateTimeLogDcOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Mutation. -->
    @if (mutation.isPending()) {
      Loading...
    }
    @if (mutation.error()) {
      An error has occurred: {{ mutation.error() }}
    }
    <!-- If the Mutation is successful, you can access the data returned using
      the CreateDataConnectMutationResult.data() function. -->
    @if (mutation.data(); as data) {
      <!-- Use your data to display something -->
      <div>Mutation successful!</div>
    }
    <!-- Let's create a button that executes our mutation when clicked. -->
    <button
      (disabled)="mutation.isPending()"
      (click)="executeMutation()"
    >
      {{ mutation.isPending() ? 'Pending...' : 'Mutate!' }}
    </button>
  `,
})
export class MyComponent {
  // Call the Mutation injector function to get a `CreateDataConnectMutationResult` object which holds the state of your Mutation.
  mutation = injectUpdateTimeLogDc();

  // You can also pass in a `UpdateTimeLogDcOptions` function (not object) to the Mutation injector function.
  options: UpdateTimeLogDcOptions = () => {
    return {
      onSuccess: () => { console.log('Mutation succeeded!'); }
    };
  };
  mutation = injectUpdateTimeLogDc(this.options);

  // After calling the Mutation injector function, you must call `CreateDataConnectMutationResult.mutate()` to execute the Mutation.
  executeMutation() {
    // The `UpdateTimeLogDc` Mutation requires an argument of type `UpdateTimeLogDcVariables`:
    const updateTimeLogDcVars: UpdateTimeLogDcVariables = {
      id: ..., 
      endTime: ..., // optional
      breaks: ..., // optional
      totalHours: ..., // optional
      status: ..., // optional
    };
    this.mutation.mutate(updateTimeLogDcVars);
    // Variables can be defined inline as well.
    this.mutation.mutate({ id: ..., endTime: ..., breaks: ..., totalHours: ..., status: ..., });

    // You can call `CreateDataConnectMutationResult.mutateAsync()` to execute the Mutation and return a promise with the data returned from the Mutation.
    this.mutation.mutateAsync(updateTimeLogDcVars);

    // You can also pass in a `UpdateTimeLogDcOptions` object (not function) to `CreateDataConnectMutationResult.mutate()`.
    this.mutation.mutate(updateTimeLogDcVars, this.options());
  }
}
```

## CreateFinancialDocumentDC
You can execute the `CreateFinancialDocumentDC` Mutation using the `CreateDataConnectMutationResult` object returned by the following Mutation injector (which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts)):
```javascript
injectCreateFinancialDocumentDc(options?: CreateFinancialDocumentDcOptions, injector?: Injector): CreateDataConnectMutationResult<CreateFinancialDocumentDcData, CreateFinancialDocumentDcVariables, CreateFinancialDocumentDcVariables>;
```

### Variables
The `CreateFinancialDocumentDC` Mutation requires an argument of type `CreateFinancialDocumentDcVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `CreateFinancialDocumentDC` Mutation injector returns a `CreateDataConnectMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `CreateDataConnectMutationResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectMutationResult.isPending()`, `CreateDataConnectMutationResult.isSuccess()`, and `CreateDataConnectMutationResult.isError()` functions.

To execute the Mutation, call `CreateDataConnectMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation. 

To access the data returned by a Mutation, use the `CreateDataConnectMutationResult.data()` function. The data for the `CreateFinancialDocumentDC` Mutation is of type `CreateFinancialDocumentDcData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateFinancialDocumentDcData {
  financialDocument_insert: FinancialDocument_Key;
}
```

You can also call `CreateDataConnectMutationResult.mutateAsync()`, which executes the Mutation and returns a promise with the data returned from the Mutation. To learn more, see the [TanStack Angular Query documentation](https://tanstack.com/query/latest/docs/framework/angular/guides/mutations#promises).

To learn more about the `CreateDataConnectMutationResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectMutation) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectmutation).

### Using `CreateFinancialDocumentDC`'s Mutation injector

```javascript
... // other imports
import { connectorConfig, CreateFinancialDocumentDcVariables } from '@dataconnect/generated';
import { injectCreateFinancialDocumentDc, CreateFinancialDocumentDcOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Mutation. -->
    @if (mutation.isPending()) {
      Loading...
    }
    @if (mutation.error()) {
      An error has occurred: {{ mutation.error() }}
    }
    <!-- If the Mutation is successful, you can access the data returned using
      the CreateDataConnectMutationResult.data() function. -->
    @if (mutation.data(); as data) {
      <!-- Use your data to display something -->
      <div>Mutation successful!</div>
    }
    <!-- Let's create a button that executes our mutation when clicked. -->
    <button
      (disabled)="mutation.isPending()"
      (click)="executeMutation()"
    >
      {{ mutation.isPending() ? 'Pending...' : 'Mutate!' }}
    </button>
  `,
})
export class MyComponent {
  // Call the Mutation injector function to get a `CreateDataConnectMutationResult` object which holds the state of your Mutation.
  mutation = injectCreateFinancialDocumentDc();

  // You can also pass in a `CreateFinancialDocumentDcOptions` function (not object) to the Mutation injector function.
  options: CreateFinancialDocumentDcOptions = () => {
    return {
      onSuccess: () => { console.log('Mutation succeeded!'); }
    };
  };
  mutation = injectCreateFinancialDocumentDc(this.options);

  // After calling the Mutation injector function, you must call `CreateDataConnectMutationResult.mutate()` to execute the Mutation.
  executeMutation() {
    // The `CreateFinancialDocumentDc` Mutation requires an argument of type `CreateFinancialDocumentDcVariables`:
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
    this.mutation.mutate(createFinancialDocumentDcVars);
    // Variables can be defined inline as well.
    this.mutation.mutate({ hotelId: ..., docType: ..., number: ..., date: ..., guestId: ..., guestName: ..., totalAmount: ..., notes: ..., items: ..., bookingId: ..., });

    // You can call `CreateDataConnectMutationResult.mutateAsync()` to execute the Mutation and return a promise with the data returned from the Mutation.
    this.mutation.mutateAsync(createFinancialDocumentDcVars);

    // You can also pass in a `CreateFinancialDocumentDcOptions` object (not function) to `CreateDataConnectMutationResult.mutate()`.
    this.mutation.mutate(createFinancialDocumentDcVars, this.options());
  }
}
```

## UpsertUser
You can execute the `UpsertUser` Mutation using the `CreateDataConnectMutationResult` object returned by the following Mutation injector (which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts)):
```javascript
injectUpsertUser(options?: UpsertUserOptions, injector?: Injector): CreateDataConnectMutationResult<UpsertUserData, UpsertUserVariables, UpsertUserVariables>;
```

### Variables
The `UpsertUser` Mutation requires an argument of type `UpsertUserVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpsertUserVariables {
  id: string;
  email: string;
  role: string;
}
```
### Return Type
Recall that calling the `UpsertUser` Mutation injector returns a `CreateDataConnectMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `CreateDataConnectMutationResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectMutationResult.isPending()`, `CreateDataConnectMutationResult.isSuccess()`, and `CreateDataConnectMutationResult.isError()` functions.

To execute the Mutation, call `CreateDataConnectMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation. 

To access the data returned by a Mutation, use the `CreateDataConnectMutationResult.data()` function. The data for the `UpsertUser` Mutation is of type `UpsertUserData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpsertUserData {
  user_upsert: User_Key;
}
```

You can also call `CreateDataConnectMutationResult.mutateAsync()`, which executes the Mutation and returns a promise with the data returned from the Mutation. To learn more, see the [TanStack Angular Query documentation](https://tanstack.com/query/latest/docs/framework/angular/guides/mutations#promises).

To learn more about the `CreateDataConnectMutationResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectMutation) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectmutation).

### Using `UpsertUser`'s Mutation injector

```javascript
... // other imports
import { connectorConfig, UpsertUserVariables } from '@dataconnect/generated';
import { injectUpsertUser, UpsertUserOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Mutation. -->
    @if (mutation.isPending()) {
      Loading...
    }
    @if (mutation.error()) {
      An error has occurred: {{ mutation.error() }}
    }
    <!-- If the Mutation is successful, you can access the data returned using
      the CreateDataConnectMutationResult.data() function. -->
    @if (mutation.data(); as data) {
      <!-- Use your data to display something -->
      <div>Mutation successful!</div>
    }
    <!-- Let's create a button that executes our mutation when clicked. -->
    <button
      (disabled)="mutation.isPending()"
      (click)="executeMutation()"
    >
      {{ mutation.isPending() ? 'Pending...' : 'Mutate!' }}
    </button>
  `,
})
export class MyComponent {
  // Call the Mutation injector function to get a `CreateDataConnectMutationResult` object which holds the state of your Mutation.
  mutation = injectUpsertUser();

  // You can also pass in a `UpsertUserOptions` function (not object) to the Mutation injector function.
  options: UpsertUserOptions = () => {
    return {
      onSuccess: () => { console.log('Mutation succeeded!'); }
    };
  };
  mutation = injectUpsertUser(this.options);

  // After calling the Mutation injector function, you must call `CreateDataConnectMutationResult.mutate()` to execute the Mutation.
  executeMutation() {
    // The `UpsertUser` Mutation requires an argument of type `UpsertUserVariables`:
    const upsertUserVars: UpsertUserVariables = {
      id: ..., 
      email: ..., 
      role: ..., 
    };
    this.mutation.mutate(upsertUserVars);
    // Variables can be defined inline as well.
    this.mutation.mutate({ id: ..., email: ..., role: ..., });

    // You can call `CreateDataConnectMutationResult.mutateAsync()` to execute the Mutation and return a promise with the data returned from the Mutation.
    this.mutation.mutateAsync(upsertUserVars);

    // You can also pass in a `UpsertUserOptions` object (not function) to `CreateDataConnectMutationResult.mutate()`.
    this.mutation.mutate(upsertUserVars, this.options());
  }
}
```

## LinkUserToHotel
You can execute the `LinkUserToHotel` Mutation using the `CreateDataConnectMutationResult` object returned by the following Mutation injector (which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts)):
```javascript
injectLinkUserToHotel(options?: LinkUserToHotelOptions, injector?: Injector): CreateDataConnectMutationResult<LinkUserToHotelData, LinkUserToHotelVariables, LinkUserToHotelVariables>;
```

### Variables
The `LinkUserToHotel` Mutation requires an argument of type `LinkUserToHotelVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface LinkUserToHotelVariables {
  userId: string;
  hotelId: UUIDString;
}
```
### Return Type
Recall that calling the `LinkUserToHotel` Mutation injector returns a `CreateDataConnectMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `CreateDataConnectMutationResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectMutationResult.isPending()`, `CreateDataConnectMutationResult.isSuccess()`, and `CreateDataConnectMutationResult.isError()` functions.

To execute the Mutation, call `CreateDataConnectMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation. 

To access the data returned by a Mutation, use the `CreateDataConnectMutationResult.data()` function. The data for the `LinkUserToHotel` Mutation is of type `LinkUserToHotelData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface LinkUserToHotelData {
  userHotel_insert: UserHotel_Key;
}
```

You can also call `CreateDataConnectMutationResult.mutateAsync()`, which executes the Mutation and returns a promise with the data returned from the Mutation. To learn more, see the [TanStack Angular Query documentation](https://tanstack.com/query/latest/docs/framework/angular/guides/mutations#promises).

To learn more about the `CreateDataConnectMutationResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectMutation) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectmutation).

### Using `LinkUserToHotel`'s Mutation injector

```javascript
... // other imports
import { connectorConfig, LinkUserToHotelVariables } from '@dataconnect/generated';
import { injectLinkUserToHotel, LinkUserToHotelOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Mutation. -->
    @if (mutation.isPending()) {
      Loading...
    }
    @if (mutation.error()) {
      An error has occurred: {{ mutation.error() }}
    }
    <!-- If the Mutation is successful, you can access the data returned using
      the CreateDataConnectMutationResult.data() function. -->
    @if (mutation.data(); as data) {
      <!-- Use your data to display something -->
      <div>Mutation successful!</div>
    }
    <!-- Let's create a button that executes our mutation when clicked. -->
    <button
      (disabled)="mutation.isPending()"
      (click)="executeMutation()"
    >
      {{ mutation.isPending() ? 'Pending...' : 'Mutate!' }}
    </button>
  `,
})
export class MyComponent {
  // Call the Mutation injector function to get a `CreateDataConnectMutationResult` object which holds the state of your Mutation.
  mutation = injectLinkUserToHotel();

  // You can also pass in a `LinkUserToHotelOptions` function (not object) to the Mutation injector function.
  options: LinkUserToHotelOptions = () => {
    return {
      onSuccess: () => { console.log('Mutation succeeded!'); }
    };
  };
  mutation = injectLinkUserToHotel(this.options);

  // After calling the Mutation injector function, you must call `CreateDataConnectMutationResult.mutate()` to execute the Mutation.
  executeMutation() {
    // The `LinkUserToHotel` Mutation requires an argument of type `LinkUserToHotelVariables`:
    const linkUserToHotelVars: LinkUserToHotelVariables = {
      userId: ..., 
      hotelId: ..., 
    };
    this.mutation.mutate(linkUserToHotelVars);
    // Variables can be defined inline as well.
    this.mutation.mutate({ userId: ..., hotelId: ..., });

    // You can call `CreateDataConnectMutationResult.mutateAsync()` to execute the Mutation and return a promise with the data returned from the Mutation.
    this.mutation.mutateAsync(linkUserToHotelVars);

    // You can also pass in a `LinkUserToHotelOptions` object (not function) to `CreateDataConnectMutationResult.mutate()`.
    this.mutation.mutate(linkUserToHotelVars, this.options());
  }
}
```

## CreateMaintenanceDC
You can execute the `CreateMaintenanceDC` Mutation using the `CreateDataConnectMutationResult` object returned by the following Mutation injector (which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts)):
```javascript
injectCreateMaintenanceDc(options?: CreateMaintenanceDcOptions, injector?: Injector): CreateDataConnectMutationResult<CreateMaintenanceDcData, CreateMaintenanceDcVariables, CreateMaintenanceDcVariables>;
```

### Variables
The `CreateMaintenanceDC` Mutation requires an argument of type `CreateMaintenanceDcVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `CreateMaintenanceDC` Mutation injector returns a `CreateDataConnectMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `CreateDataConnectMutationResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectMutationResult.isPending()`, `CreateDataConnectMutationResult.isSuccess()`, and `CreateDataConnectMutationResult.isError()` functions.

To execute the Mutation, call `CreateDataConnectMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation. 

To access the data returned by a Mutation, use the `CreateDataConnectMutationResult.data()` function. The data for the `CreateMaintenanceDC` Mutation is of type `CreateMaintenanceDcData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateMaintenanceDcData {
  maintenanceRequest_insert: MaintenanceRequest_Key;
}
```

You can also call `CreateDataConnectMutationResult.mutateAsync()`, which executes the Mutation and returns a promise with the data returned from the Mutation. To learn more, see the [TanStack Angular Query documentation](https://tanstack.com/query/latest/docs/framework/angular/guides/mutations#promises).

To learn more about the `CreateDataConnectMutationResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectMutation) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectmutation).

### Using `CreateMaintenanceDC`'s Mutation injector

```javascript
... // other imports
import { connectorConfig, CreateMaintenanceDcVariables } from '@dataconnect/generated';
import { injectCreateMaintenanceDc, CreateMaintenanceDcOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Mutation. -->
    @if (mutation.isPending()) {
      Loading...
    }
    @if (mutation.error()) {
      An error has occurred: {{ mutation.error() }}
    }
    <!-- If the Mutation is successful, you can access the data returned using
      the CreateDataConnectMutationResult.data() function. -->
    @if (mutation.data(); as data) {
      <!-- Use your data to display something -->
      <div>Mutation successful!</div>
    }
    <!-- Let's create a button that executes our mutation when clicked. -->
    <button
      (disabled)="mutation.isPending()"
      (click)="executeMutation()"
    >
      {{ mutation.isPending() ? 'Pending...' : 'Mutate!' }}
    </button>
  `,
})
export class MyComponent {
  // Call the Mutation injector function to get a `CreateDataConnectMutationResult` object which holds the state of your Mutation.
  mutation = injectCreateMaintenanceDc();

  // You can also pass in a `CreateMaintenanceDcOptions` function (not object) to the Mutation injector function.
  options: CreateMaintenanceDcOptions = () => {
    return {
      onSuccess: () => { console.log('Mutation succeeded!'); }
    };
  };
  mutation = injectCreateMaintenanceDc(this.options);

  // After calling the Mutation injector function, you must call `CreateDataConnectMutationResult.mutate()` to execute the Mutation.
  executeMutation() {
    // The `CreateMaintenanceDc` Mutation requires an argument of type `CreateMaintenanceDcVariables`:
    const createMaintenanceDcVars: CreateMaintenanceDcVariables = {
      hotelId: ..., 
      roomId: ..., 
      description: ..., 
      priority: ..., 
      status: ..., 
      reportedBy: ..., 
    };
    this.mutation.mutate(createMaintenanceDcVars);
    // Variables can be defined inline as well.
    this.mutation.mutate({ hotelId: ..., roomId: ..., description: ..., priority: ..., status: ..., reportedBy: ..., });

    // You can call `CreateDataConnectMutationResult.mutateAsync()` to execute the Mutation and return a promise with the data returned from the Mutation.
    this.mutation.mutateAsync(createMaintenanceDcVars);

    // You can also pass in a `CreateMaintenanceDcOptions` object (not function) to `CreateDataConnectMutationResult.mutate()`.
    this.mutation.mutate(createMaintenanceDcVars, this.options());
  }
}
```

## CreateShiftDC
You can execute the `CreateShiftDC` Mutation using the `CreateDataConnectMutationResult` object returned by the following Mutation injector (which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts)):
```javascript
injectCreateShiftDc(options?: CreateShiftDcOptions, injector?: Injector): CreateDataConnectMutationResult<CreateShiftDcData, CreateShiftDcVariables, CreateShiftDcVariables>;
```

### Variables
The `CreateShiftDC` Mutation requires an argument of type `CreateShiftDcVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `CreateShiftDC` Mutation injector returns a `CreateDataConnectMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `CreateDataConnectMutationResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectMutationResult.isPending()`, `CreateDataConnectMutationResult.isSuccess()`, and `CreateDataConnectMutationResult.isError()` functions.

To execute the Mutation, call `CreateDataConnectMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation. 

To access the data returned by a Mutation, use the `CreateDataConnectMutationResult.data()` function. The data for the `CreateShiftDC` Mutation is of type `CreateShiftDcData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateShiftDcData {
  shift_insert: Shift_Key;
}
```

You can also call `CreateDataConnectMutationResult.mutateAsync()`, which executes the Mutation and returns a promise with the data returned from the Mutation. To learn more, see the [TanStack Angular Query documentation](https://tanstack.com/query/latest/docs/framework/angular/guides/mutations#promises).

To learn more about the `CreateDataConnectMutationResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectMutation) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectmutation).

### Using `CreateShiftDC`'s Mutation injector

```javascript
... // other imports
import { connectorConfig, CreateShiftDcVariables } from '@dataconnect/generated';
import { injectCreateShiftDc, CreateShiftDcOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Mutation. -->
    @if (mutation.isPending()) {
      Loading...
    }
    @if (mutation.error()) {
      An error has occurred: {{ mutation.error() }}
    }
    <!-- If the Mutation is successful, you can access the data returned using
      the CreateDataConnectMutationResult.data() function. -->
    @if (mutation.data(); as data) {
      <!-- Use your data to display something -->
      <div>Mutation successful!</div>
    }
    <!-- Let's create a button that executes our mutation when clicked. -->
    <button
      (disabled)="mutation.isPending()"
      (click)="executeMutation()"
    >
      {{ mutation.isPending() ? 'Pending...' : 'Mutate!' }}
    </button>
  `,
})
export class MyComponent {
  // Call the Mutation injector function to get a `CreateDataConnectMutationResult` object which holds the state of your Mutation.
  mutation = injectCreateShiftDc();

  // You can also pass in a `CreateShiftDcOptions` function (not object) to the Mutation injector function.
  options: CreateShiftDcOptions = () => {
    return {
      onSuccess: () => { console.log('Mutation succeeded!'); }
    };
  };
  mutation = injectCreateShiftDc(this.options);

  // After calling the Mutation injector function, you must call `CreateDataConnectMutationResult.mutate()` to execute the Mutation.
  executeMutation() {
    // The `CreateShiftDc` Mutation requires an argument of type `CreateShiftDcVariables`:
    const createShiftDcVars: CreateShiftDcVariables = {
      hotelId: ..., 
      staffId: ..., 
      date: ..., 
      startTime: ..., 
      endTime: ..., 
      shiftType: ..., 
      notes: ..., // optional
    };
    this.mutation.mutate(createShiftDcVars);
    // Variables can be defined inline as well.
    this.mutation.mutate({ hotelId: ..., staffId: ..., date: ..., startTime: ..., endTime: ..., shiftType: ..., notes: ..., });

    // You can call `CreateDataConnectMutationResult.mutateAsync()` to execute the Mutation and return a promise with the data returned from the Mutation.
    this.mutation.mutateAsync(createShiftDcVars);

    // You can also pass in a `CreateShiftDcOptions` object (not function) to `CreateDataConnectMutationResult.mutate()`.
    this.mutation.mutate(createShiftDcVars, this.options());
  }
}
```

## CreateHousekeepingTaskDC
You can execute the `CreateHousekeepingTaskDC` Mutation using the `CreateDataConnectMutationResult` object returned by the following Mutation injector (which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts)):
```javascript
injectCreateHousekeepingTaskDc(options?: CreateHousekeepingTaskDcOptions, injector?: Injector): CreateDataConnectMutationResult<CreateHousekeepingTaskDcData, CreateHousekeepingTaskDcVariables, CreateHousekeepingTaskDcVariables>;
```

### Variables
The `CreateHousekeepingTaskDC` Mutation requires an argument of type `CreateHousekeepingTaskDcVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `CreateHousekeepingTaskDC` Mutation injector returns a `CreateDataConnectMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `CreateDataConnectMutationResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectMutationResult.isPending()`, `CreateDataConnectMutationResult.isSuccess()`, and `CreateDataConnectMutationResult.isError()` functions.

To execute the Mutation, call `CreateDataConnectMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation. 

To access the data returned by a Mutation, use the `CreateDataConnectMutationResult.data()` function. The data for the `CreateHousekeepingTaskDC` Mutation is of type `CreateHousekeepingTaskDcData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateHousekeepingTaskDcData {
  housekeepingTask_insert: HousekeepingTask_Key;
}
```

You can also call `CreateDataConnectMutationResult.mutateAsync()`, which executes the Mutation and returns a promise with the data returned from the Mutation. To learn more, see the [TanStack Angular Query documentation](https://tanstack.com/query/latest/docs/framework/angular/guides/mutations#promises).

To learn more about the `CreateDataConnectMutationResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectMutation) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectmutation).

### Using `CreateHousekeepingTaskDC`'s Mutation injector

```javascript
... // other imports
import { connectorConfig, CreateHousekeepingTaskDcVariables } from '@dataconnect/generated';
import { injectCreateHousekeepingTaskDc, CreateHousekeepingTaskDcOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Mutation. -->
    @if (mutation.isPending()) {
      Loading...
    }
    @if (mutation.error()) {
      An error has occurred: {{ mutation.error() }}
    }
    <!-- If the Mutation is successful, you can access the data returned using
      the CreateDataConnectMutationResult.data() function. -->
    @if (mutation.data(); as data) {
      <!-- Use your data to display something -->
      <div>Mutation successful!</div>
    }
    <!-- Let's create a button that executes our mutation when clicked. -->
    <button
      (disabled)="mutation.isPending()"
      (click)="executeMutation()"
    >
      {{ mutation.isPending() ? 'Pending...' : 'Mutate!' }}
    </button>
  `,
})
export class MyComponent {
  // Call the Mutation injector function to get a `CreateDataConnectMutationResult` object which holds the state of your Mutation.
  mutation = injectCreateHousekeepingTaskDc();

  // You can also pass in a `CreateHousekeepingTaskDcOptions` function (not object) to the Mutation injector function.
  options: CreateHousekeepingTaskDcOptions = () => {
    return {
      onSuccess: () => { console.log('Mutation succeeded!'); }
    };
  };
  mutation = injectCreateHousekeepingTaskDc(this.options);

  // After calling the Mutation injector function, you must call `CreateDataConnectMutationResult.mutate()` to execute the Mutation.
  executeMutation() {
    // The `CreateHousekeepingTaskDc` Mutation requires an argument of type `CreateHousekeepingTaskDcVariables`:
    const createHousekeepingTaskDcVars: CreateHousekeepingTaskDcVariables = {
      hotelId: ..., 
      roomId: ..., 
      status: ..., 
      priority: ..., 
      scheduledFor: ..., 
      assignedToId: ..., // optional
      notes: ..., // optional
    };
    this.mutation.mutate(createHousekeepingTaskDcVars);
    // Variables can be defined inline as well.
    this.mutation.mutate({ hotelId: ..., roomId: ..., status: ..., priority: ..., scheduledFor: ..., assignedToId: ..., notes: ..., });

    // You can call `CreateDataConnectMutationResult.mutateAsync()` to execute the Mutation and return a promise with the data returned from the Mutation.
    this.mutation.mutateAsync(createHousekeepingTaskDcVars);

    // You can also pass in a `CreateHousekeepingTaskDcOptions` object (not function) to `CreateDataConnectMutationResult.mutate()`.
    this.mutation.mutate(createHousekeepingTaskDcVars, this.options());
  }
}
```

## UpsertInventoryItemDC
You can execute the `UpsertInventoryItemDC` Mutation using the `CreateDataConnectMutationResult` object returned by the following Mutation injector (which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts)):
```javascript
injectUpsertInventoryItemDc(options?: UpsertInventoryItemDcOptions, injector?: Injector): CreateDataConnectMutationResult<UpsertInventoryItemDcData, UpsertInventoryItemDcVariables, UpsertInventoryItemDcVariables>;
```

### Variables
The `UpsertInventoryItemDC` Mutation requires an argument of type `UpsertInventoryItemDcVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `UpsertInventoryItemDC` Mutation injector returns a `CreateDataConnectMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `CreateDataConnectMutationResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectMutationResult.isPending()`, `CreateDataConnectMutationResult.isSuccess()`, and `CreateDataConnectMutationResult.isError()` functions.

To execute the Mutation, call `CreateDataConnectMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation. 

To access the data returned by a Mutation, use the `CreateDataConnectMutationResult.data()` function. The data for the `UpsertInventoryItemDC` Mutation is of type `UpsertInventoryItemDcData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpsertInventoryItemDcData {
  inventoryItem_upsert: InventoryItem_Key;
}
```

You can also call `CreateDataConnectMutationResult.mutateAsync()`, which executes the Mutation and returns a promise with the data returned from the Mutation. To learn more, see the [TanStack Angular Query documentation](https://tanstack.com/query/latest/docs/framework/angular/guides/mutations#promises).

To learn more about the `CreateDataConnectMutationResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectMutation) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectmutation).

### Using `UpsertInventoryItemDC`'s Mutation injector

```javascript
... // other imports
import { connectorConfig, UpsertInventoryItemDcVariables } from '@dataconnect/generated';
import { injectUpsertInventoryItemDc, UpsertInventoryItemDcOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Mutation. -->
    @if (mutation.isPending()) {
      Loading...
    }
    @if (mutation.error()) {
      An error has occurred: {{ mutation.error() }}
    }
    <!-- If the Mutation is successful, you can access the data returned using
      the CreateDataConnectMutationResult.data() function. -->
    @if (mutation.data(); as data) {
      <!-- Use your data to display something -->
      <div>Mutation successful!</div>
    }
    <!-- Let's create a button that executes our mutation when clicked. -->
    <button
      (disabled)="mutation.isPending()"
      (click)="executeMutation()"
    >
      {{ mutation.isPending() ? 'Pending...' : 'Mutate!' }}
    </button>
  `,
})
export class MyComponent {
  // Call the Mutation injector function to get a `CreateDataConnectMutationResult` object which holds the state of your Mutation.
  mutation = injectUpsertInventoryItemDc();

  // You can also pass in a `UpsertInventoryItemDcOptions` function (not object) to the Mutation injector function.
  options: UpsertInventoryItemDcOptions = () => {
    return {
      onSuccess: () => { console.log('Mutation succeeded!'); }
    };
  };
  mutation = injectUpsertInventoryItemDc(this.options);

  // After calling the Mutation injector function, you must call `CreateDataConnectMutationResult.mutate()` to execute the Mutation.
  executeMutation() {
    // The `UpsertInventoryItemDc` Mutation requires an argument of type `UpsertInventoryItemDcVariables`:
    const upsertInventoryItemDcVars: UpsertInventoryItemDcVariables = {
      id: ..., 
      hotelId: ..., 
      name: ..., 
      category: ..., 
      quantity: ..., 
      minQuantity: ..., 
      unit: ..., 
    };
    this.mutation.mutate(upsertInventoryItemDcVars);
    // Variables can be defined inline as well.
    this.mutation.mutate({ id: ..., hotelId: ..., name: ..., category: ..., quantity: ..., minQuantity: ..., unit: ..., });

    // You can call `CreateDataConnectMutationResult.mutateAsync()` to execute the Mutation and return a promise with the data returned from the Mutation.
    this.mutation.mutateAsync(upsertInventoryItemDcVars);

    // You can also pass in a `UpsertInventoryItemDcOptions` object (not function) to `CreateDataConnectMutationResult.mutate()`.
    this.mutation.mutate(upsertInventoryItemDcVars, this.options());
  }
}
```

## CreateAmenityDC
You can execute the `CreateAmenityDC` Mutation using the `CreateDataConnectMutationResult` object returned by the following Mutation injector (which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts)):
```javascript
injectCreateAmenityDc(options?: CreateAmenityDcOptions, injector?: Injector): CreateDataConnectMutationResult<CreateAmenityDcData, CreateAmenityDcVariables, CreateAmenityDcVariables>;
```

### Variables
The `CreateAmenityDC` Mutation requires an argument of type `CreateAmenityDcVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateAmenityDcVariables {
  hotelId: UUIDString;
  name: string;
  description?: string | null;
  location?: string | null;
  status: string;
}
```
### Return Type
Recall that calling the `CreateAmenityDC` Mutation injector returns a `CreateDataConnectMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `CreateDataConnectMutationResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectMutationResult.isPending()`, `CreateDataConnectMutationResult.isSuccess()`, and `CreateDataConnectMutationResult.isError()` functions.

To execute the Mutation, call `CreateDataConnectMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation. 

To access the data returned by a Mutation, use the `CreateDataConnectMutationResult.data()` function. The data for the `CreateAmenityDC` Mutation is of type `CreateAmenityDcData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateAmenityDcData {
  amenity_insert: Amenity_Key;
}
```

You can also call `CreateDataConnectMutationResult.mutateAsync()`, which executes the Mutation and returns a promise with the data returned from the Mutation. To learn more, see the [TanStack Angular Query documentation](https://tanstack.com/query/latest/docs/framework/angular/guides/mutations#promises).

To learn more about the `CreateDataConnectMutationResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectMutation) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectmutation).

### Using `CreateAmenityDC`'s Mutation injector

```javascript
... // other imports
import { connectorConfig, CreateAmenityDcVariables } from '@dataconnect/generated';
import { injectCreateAmenityDc, CreateAmenityDcOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Mutation. -->
    @if (mutation.isPending()) {
      Loading...
    }
    @if (mutation.error()) {
      An error has occurred: {{ mutation.error() }}
    }
    <!-- If the Mutation is successful, you can access the data returned using
      the CreateDataConnectMutationResult.data() function. -->
    @if (mutation.data(); as data) {
      <!-- Use your data to display something -->
      <div>Mutation successful!</div>
    }
    <!-- Let's create a button that executes our mutation when clicked. -->
    <button
      (disabled)="mutation.isPending()"
      (click)="executeMutation()"
    >
      {{ mutation.isPending() ? 'Pending...' : 'Mutate!' }}
    </button>
  `,
})
export class MyComponent {
  // Call the Mutation injector function to get a `CreateDataConnectMutationResult` object which holds the state of your Mutation.
  mutation = injectCreateAmenityDc();

  // You can also pass in a `CreateAmenityDcOptions` function (not object) to the Mutation injector function.
  options: CreateAmenityDcOptions = () => {
    return {
      onSuccess: () => { console.log('Mutation succeeded!'); }
    };
  };
  mutation = injectCreateAmenityDc(this.options);

  // After calling the Mutation injector function, you must call `CreateDataConnectMutationResult.mutate()` to execute the Mutation.
  executeMutation() {
    // The `CreateAmenityDc` Mutation requires an argument of type `CreateAmenityDcVariables`:
    const createAmenityDcVars: CreateAmenityDcVariables = {
      hotelId: ..., 
      name: ..., 
      description: ..., // optional
      location: ..., // optional
      status: ..., 
    };
    this.mutation.mutate(createAmenityDcVars);
    // Variables can be defined inline as well.
    this.mutation.mutate({ hotelId: ..., name: ..., description: ..., location: ..., status: ..., });

    // You can call `CreateDataConnectMutationResult.mutateAsync()` to execute the Mutation and return a promise with the data returned from the Mutation.
    this.mutation.mutateAsync(createAmenityDcVars);

    // You can also pass in a `CreateAmenityDcOptions` object (not function) to `CreateDataConnectMutationResult.mutate()`.
    this.mutation.mutate(createAmenityDcVars, this.options());
  }
}
```

## CreateStoredDocumentDC
You can execute the `CreateStoredDocumentDC` Mutation using the `CreateDataConnectMutationResult` object returned by the following Mutation injector (which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts)):
```javascript
injectCreateStoredDocumentDc(options?: CreateStoredDocumentDcOptions, injector?: Injector): CreateDataConnectMutationResult<CreateStoredDocumentDcData, CreateStoredDocumentDcVariables, CreateStoredDocumentDcVariables>;
```

### Variables
The `CreateStoredDocumentDC` Mutation requires an argument of type `CreateStoredDocumentDcVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `CreateStoredDocumentDC` Mutation injector returns a `CreateDataConnectMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `CreateDataConnectMutationResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectMutationResult.isPending()`, `CreateDataConnectMutationResult.isSuccess()`, and `CreateDataConnectMutationResult.isError()` functions.

To execute the Mutation, call `CreateDataConnectMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation. 

To access the data returned by a Mutation, use the `CreateDataConnectMutationResult.data()` function. The data for the `CreateStoredDocumentDC` Mutation is of type `CreateStoredDocumentDcData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateStoredDocumentDcData {
  storedDocument_insert: StoredDocument_Key;
}
```

You can also call `CreateDataConnectMutationResult.mutateAsync()`, which executes the Mutation and returns a promise with the data returned from the Mutation. To learn more, see the [TanStack Angular Query documentation](https://tanstack.com/query/latest/docs/framework/angular/guides/mutations#promises).

To learn more about the `CreateDataConnectMutationResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectMutation) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectmutation).

### Using `CreateStoredDocumentDC`'s Mutation injector

```javascript
... // other imports
import { connectorConfig, CreateStoredDocumentDcVariables } from '@dataconnect/generated';
import { injectCreateStoredDocumentDc, CreateStoredDocumentDcOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Mutation. -->
    @if (mutation.isPending()) {
      Loading...
    }
    @if (mutation.error()) {
      An error has occurred: {{ mutation.error() }}
    }
    <!-- If the Mutation is successful, you can access the data returned using
      the CreateDataConnectMutationResult.data() function. -->
    @if (mutation.data(); as data) {
      <!-- Use your data to display something -->
      <div>Mutation successful!</div>
    }
    <!-- Let's create a button that executes our mutation when clicked. -->
    <button
      (disabled)="mutation.isPending()"
      (click)="executeMutation()"
    >
      {{ mutation.isPending() ? 'Pending...' : 'Mutate!' }}
    </button>
  `,
})
export class MyComponent {
  // Call the Mutation injector function to get a `CreateDataConnectMutationResult` object which holds the state of your Mutation.
  mutation = injectCreateStoredDocumentDc();

  // You can also pass in a `CreateStoredDocumentDcOptions` function (not object) to the Mutation injector function.
  options: CreateStoredDocumentDcOptions = () => {
    return {
      onSuccess: () => { console.log('Mutation succeeded!'); }
    };
  };
  mutation = injectCreateStoredDocumentDc(this.options);

  // After calling the Mutation injector function, you must call `CreateDataConnectMutationResult.mutate()` to execute the Mutation.
  executeMutation() {
    // The `CreateStoredDocumentDc` Mutation requires an argument of type `CreateStoredDocumentDcVariables`:
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
    this.mutation.mutate(createStoredDocumentDcVars);
    // Variables can be defined inline as well.
    this.mutation.mutate({ hotelId: ..., title: ..., category: ..., uploadedBy: ..., fileType: ..., data: ..., tags: ..., guestId: ..., summary: ..., });

    // You can call `CreateDataConnectMutationResult.mutateAsync()` to execute the Mutation and return a promise with the data returned from the Mutation.
    this.mutation.mutateAsync(createStoredDocumentDcVars);

    // You can also pass in a `CreateStoredDocumentDcOptions` object (not function) to `CreateDataConnectMutationResult.mutate()`.
    this.mutation.mutate(createStoredDocumentDcVars, this.options());
  }
}
```

## SeedRooms
You can execute the `SeedRooms` Mutation using the `CreateDataConnectMutationResult` object returned by the following Mutation injector (which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts)):
```javascript
injectSeedRooms(options?: SeedRoomsOptions, injector?: Injector): CreateDataConnectMutationResult<SeedRoomsData, SeedRoomsVariables, SeedRoomsVariables>;
```

### Variables
The `SeedRooms` Mutation requires an argument of type `SeedRoomsVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface SeedRoomsVariables {
  hotelId: UUIDString;
}
```
### Return Type
Recall that calling the `SeedRooms` Mutation injector returns a `CreateDataConnectMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `CreateDataConnectMutationResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectMutationResult.isPending()`, `CreateDataConnectMutationResult.isSuccess()`, and `CreateDataConnectMutationResult.isError()` functions.

To execute the Mutation, call `CreateDataConnectMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation. 

To access the data returned by a Mutation, use the `CreateDataConnectMutationResult.data()` function. The data for the `SeedRooms` Mutation is of type `SeedRoomsData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface SeedRoomsData {
  r1: Room_Key;
  r2: Room_Key;
  r3: Room_Key;
}
```

You can also call `CreateDataConnectMutationResult.mutateAsync()`, which executes the Mutation and returns a promise with the data returned from the Mutation. To learn more, see the [TanStack Angular Query documentation](https://tanstack.com/query/latest/docs/framework/angular/guides/mutations#promises).

To learn more about the `CreateDataConnectMutationResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectMutation) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectmutation).

### Using `SeedRooms`'s Mutation injector

```javascript
... // other imports
import { connectorConfig, SeedRoomsVariables } from '@dataconnect/generated';
import { injectSeedRooms, SeedRoomsOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Mutation. -->
    @if (mutation.isPending()) {
      Loading...
    }
    @if (mutation.error()) {
      An error has occurred: {{ mutation.error() }}
    }
    <!-- If the Mutation is successful, you can access the data returned using
      the CreateDataConnectMutationResult.data() function. -->
    @if (mutation.data(); as data) {
      <!-- Use your data to display something -->
      <div>Mutation successful!</div>
    }
    <!-- Let's create a button that executes our mutation when clicked. -->
    <button
      (disabled)="mutation.isPending()"
      (click)="executeMutation()"
    >
      {{ mutation.isPending() ? 'Pending...' : 'Mutate!' }}
    </button>
  `,
})
export class MyComponent {
  // Call the Mutation injector function to get a `CreateDataConnectMutationResult` object which holds the state of your Mutation.
  mutation = injectSeedRooms();

  // You can also pass in a `SeedRoomsOptions` function (not object) to the Mutation injector function.
  options: SeedRoomsOptions = () => {
    return {
      onSuccess: () => { console.log('Mutation succeeded!'); }
    };
  };
  mutation = injectSeedRooms(this.options);

  // After calling the Mutation injector function, you must call `CreateDataConnectMutationResult.mutate()` to execute the Mutation.
  executeMutation() {
    // The `SeedRooms` Mutation requires an argument of type `SeedRoomsVariables`:
    const seedRoomsVars: SeedRoomsVariables = {
      hotelId: ..., 
    };
    this.mutation.mutate(seedRoomsVars);
    // Variables can be defined inline as well.
    this.mutation.mutate({ hotelId: ..., });

    // You can call `CreateDataConnectMutationResult.mutateAsync()` to execute the Mutation and return a promise with the data returned from the Mutation.
    this.mutation.mutateAsync(seedRoomsVars);

    // You can also pass in a `SeedRoomsOptions` object (not function) to `CreateDataConnectMutationResult.mutate()`.
    this.mutation.mutate(seedRoomsVars, this.options());
  }
}
```

## SeedStaff
You can execute the `SeedStaff` Mutation using the `CreateDataConnectMutationResult` object returned by the following Mutation injector (which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts)):
```javascript
injectSeedStaff(options?: SeedStaffOptions, injector?: Injector): CreateDataConnectMutationResult<SeedStaffData, SeedStaffVariables, SeedStaffVariables>;
```

### Variables
The `SeedStaff` Mutation requires an argument of type `SeedStaffVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface SeedStaffVariables {
  hotelId: UUIDString;
}
```
### Return Type
Recall that calling the `SeedStaff` Mutation injector returns a `CreateDataConnectMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `CreateDataConnectMutationResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectMutationResult.isPending()`, `CreateDataConnectMutationResult.isSuccess()`, and `CreateDataConnectMutationResult.isError()` functions.

To execute the Mutation, call `CreateDataConnectMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation. 

To access the data returned by a Mutation, use the `CreateDataConnectMutationResult.data()` function. The data for the `SeedStaff` Mutation is of type `SeedStaffData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface SeedStaffData {
  s1: Staff_Key;
  s2: Staff_Key;
}
```

You can also call `CreateDataConnectMutationResult.mutateAsync()`, which executes the Mutation and returns a promise with the data returned from the Mutation. To learn more, see the [TanStack Angular Query documentation](https://tanstack.com/query/latest/docs/framework/angular/guides/mutations#promises).

To learn more about the `CreateDataConnectMutationResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectMutation) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectmutation).

### Using `SeedStaff`'s Mutation injector

```javascript
... // other imports
import { connectorConfig, SeedStaffVariables } from '@dataconnect/generated';
import { injectSeedStaff, SeedStaffOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Mutation. -->
    @if (mutation.isPending()) {
      Loading...
    }
    @if (mutation.error()) {
      An error has occurred: {{ mutation.error() }}
    }
    <!-- If the Mutation is successful, you can access the data returned using
      the CreateDataConnectMutationResult.data() function. -->
    @if (mutation.data(); as data) {
      <!-- Use your data to display something -->
      <div>Mutation successful!</div>
    }
    <!-- Let's create a button that executes our mutation when clicked. -->
    <button
      (disabled)="mutation.isPending()"
      (click)="executeMutation()"
    >
      {{ mutation.isPending() ? 'Pending...' : 'Mutate!' }}
    </button>
  `,
})
export class MyComponent {
  // Call the Mutation injector function to get a `CreateDataConnectMutationResult` object which holds the state of your Mutation.
  mutation = injectSeedStaff();

  // You can also pass in a `SeedStaffOptions` function (not object) to the Mutation injector function.
  options: SeedStaffOptions = () => {
    return {
      onSuccess: () => { console.log('Mutation succeeded!'); }
    };
  };
  mutation = injectSeedStaff(this.options);

  // After calling the Mutation injector function, you must call `CreateDataConnectMutationResult.mutate()` to execute the Mutation.
  executeMutation() {
    // The `SeedStaff` Mutation requires an argument of type `SeedStaffVariables`:
    const seedStaffVars: SeedStaffVariables = {
      hotelId: ..., 
    };
    this.mutation.mutate(seedStaffVars);
    // Variables can be defined inline as well.
    this.mutation.mutate({ hotelId: ..., });

    // You can call `CreateDataConnectMutationResult.mutateAsync()` to execute the Mutation and return a promise with the data returned from the Mutation.
    this.mutation.mutateAsync(seedStaffVars);

    // You can also pass in a `SeedStaffOptions` object (not function) to `CreateDataConnectMutationResult.mutate()`.
    this.mutation.mutate(seedStaffVars, this.options());
  }
}
```

## SeedInventory
You can execute the `SeedInventory` Mutation using the `CreateDataConnectMutationResult` object returned by the following Mutation injector (which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts)):
```javascript
injectSeedInventory(options?: SeedInventoryOptions, injector?: Injector): CreateDataConnectMutationResult<SeedInventoryData, SeedInventoryVariables, SeedInventoryVariables>;
```

### Variables
The `SeedInventory` Mutation requires an argument of type `SeedInventoryVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface SeedInventoryVariables {
  hotelId: UUIDString;
}
```
### Return Type
Recall that calling the `SeedInventory` Mutation injector returns a `CreateDataConnectMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `CreateDataConnectMutationResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectMutationResult.isPending()`, `CreateDataConnectMutationResult.isSuccess()`, and `CreateDataConnectMutationResult.isError()` functions.

To execute the Mutation, call `CreateDataConnectMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation. 

To access the data returned by a Mutation, use the `CreateDataConnectMutationResult.data()` function. The data for the `SeedInventory` Mutation is of type `SeedInventoryData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface SeedInventoryData {
  i1: InventoryItem_Key;
  i2: InventoryItem_Key;
}
```

You can also call `CreateDataConnectMutationResult.mutateAsync()`, which executes the Mutation and returns a promise with the data returned from the Mutation. To learn more, see the [TanStack Angular Query documentation](https://tanstack.com/query/latest/docs/framework/angular/guides/mutations#promises).

To learn more about the `CreateDataConnectMutationResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectMutation) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectmutation).

### Using `SeedInventory`'s Mutation injector

```javascript
... // other imports
import { connectorConfig, SeedInventoryVariables } from '@dataconnect/generated';
import { injectSeedInventory, SeedInventoryOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Mutation. -->
    @if (mutation.isPending()) {
      Loading...
    }
    @if (mutation.error()) {
      An error has occurred: {{ mutation.error() }}
    }
    <!-- If the Mutation is successful, you can access the data returned using
      the CreateDataConnectMutationResult.data() function. -->
    @if (mutation.data(); as data) {
      <!-- Use your data to display something -->
      <div>Mutation successful!</div>
    }
    <!-- Let's create a button that executes our mutation when clicked. -->
    <button
      (disabled)="mutation.isPending()"
      (click)="executeMutation()"
    >
      {{ mutation.isPending() ? 'Pending...' : 'Mutate!' }}
    </button>
  `,
})
export class MyComponent {
  // Call the Mutation injector function to get a `CreateDataConnectMutationResult` object which holds the state of your Mutation.
  mutation = injectSeedInventory();

  // You can also pass in a `SeedInventoryOptions` function (not object) to the Mutation injector function.
  options: SeedInventoryOptions = () => {
    return {
      onSuccess: () => { console.log('Mutation succeeded!'); }
    };
  };
  mutation = injectSeedInventory(this.options);

  // After calling the Mutation injector function, you must call `CreateDataConnectMutationResult.mutate()` to execute the Mutation.
  executeMutation() {
    // The `SeedInventory` Mutation requires an argument of type `SeedInventoryVariables`:
    const seedInventoryVars: SeedInventoryVariables = {
      hotelId: ..., 
    };
    this.mutation.mutate(seedInventoryVars);
    // Variables can be defined inline as well.
    this.mutation.mutate({ hotelId: ..., });

    // You can call `CreateDataConnectMutationResult.mutateAsync()` to execute the Mutation and return a promise with the data returned from the Mutation.
    this.mutation.mutateAsync(seedInventoryVars);

    // You can also pass in a `SeedInventoryOptions` object (not function) to `CreateDataConnectMutationResult.mutate()`.
    this.mutation.mutate(seedInventoryVars, this.options());
  }
}
```

## SeedAmenities
You can execute the `SeedAmenities` Mutation using the `CreateDataConnectMutationResult` object returned by the following Mutation injector (which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts)):
```javascript
injectSeedAmenities(options?: SeedAmenitiesOptions, injector?: Injector): CreateDataConnectMutationResult<SeedAmenitiesData, SeedAmenitiesVariables, SeedAmenitiesVariables>;
```

### Variables
The `SeedAmenities` Mutation requires an argument of type `SeedAmenitiesVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface SeedAmenitiesVariables {
  hotelId: UUIDString;
}
```
### Return Type
Recall that calling the `SeedAmenities` Mutation injector returns a `CreateDataConnectMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `CreateDataConnectMutationResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectMutationResult.isPending()`, `CreateDataConnectMutationResult.isSuccess()`, and `CreateDataConnectMutationResult.isError()` functions.

To execute the Mutation, call `CreateDataConnectMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation. 

To access the data returned by a Mutation, use the `CreateDataConnectMutationResult.data()` function. The data for the `SeedAmenities` Mutation is of type `SeedAmenitiesData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface SeedAmenitiesData {
  a1: Amenity_Key;
  a2: Amenity_Key;
  a3: Amenity_Key;
  a4: Amenity_Key;
}
```

You can also call `CreateDataConnectMutationResult.mutateAsync()`, which executes the Mutation and returns a promise with the data returned from the Mutation. To learn more, see the [TanStack Angular Query documentation](https://tanstack.com/query/latest/docs/framework/angular/guides/mutations#promises).

To learn more about the `CreateDataConnectMutationResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectMutation) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectmutation).

### Using `SeedAmenities`'s Mutation injector

```javascript
... // other imports
import { connectorConfig, SeedAmenitiesVariables } from '@dataconnect/generated';
import { injectSeedAmenities, SeedAmenitiesOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Mutation. -->
    @if (mutation.isPending()) {
      Loading...
    }
    @if (mutation.error()) {
      An error has occurred: {{ mutation.error() }}
    }
    <!-- If the Mutation is successful, you can access the data returned using
      the CreateDataConnectMutationResult.data() function. -->
    @if (mutation.data(); as data) {
      <!-- Use your data to display something -->
      <div>Mutation successful!</div>
    }
    <!-- Let's create a button that executes our mutation when clicked. -->
    <button
      (disabled)="mutation.isPending()"
      (click)="executeMutation()"
    >
      {{ mutation.isPending() ? 'Pending...' : 'Mutate!' }}
    </button>
  `,
})
export class MyComponent {
  // Call the Mutation injector function to get a `CreateDataConnectMutationResult` object which holds the state of your Mutation.
  mutation = injectSeedAmenities();

  // You can also pass in a `SeedAmenitiesOptions` function (not object) to the Mutation injector function.
  options: SeedAmenitiesOptions = () => {
    return {
      onSuccess: () => { console.log('Mutation succeeded!'); }
    };
  };
  mutation = injectSeedAmenities(this.options);

  // After calling the Mutation injector function, you must call `CreateDataConnectMutationResult.mutate()` to execute the Mutation.
  executeMutation() {
    // The `SeedAmenities` Mutation requires an argument of type `SeedAmenitiesVariables`:
    const seedAmenitiesVars: SeedAmenitiesVariables = {
      hotelId: ..., 
    };
    this.mutation.mutate(seedAmenitiesVars);
    // Variables can be defined inline as well.
    this.mutation.mutate({ hotelId: ..., });

    // You can call `CreateDataConnectMutationResult.mutateAsync()` to execute the Mutation and return a promise with the data returned from the Mutation.
    this.mutation.mutateAsync(seedAmenitiesVars);

    // You can also pass in a `SeedAmenitiesOptions` object (not function) to `CreateDataConnectMutationResult.mutate()`.
    this.mutation.mutate(seedAmenitiesVars, this.options());
  }
}
```

