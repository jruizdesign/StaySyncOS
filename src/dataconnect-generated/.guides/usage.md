# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.


### Angular

The generated SDK creates injectable wrapper functions.

Here's an example:
```
import { injectCreateHotel, injectGetFirstHotel, injectCreateRoom, injectCreateGuest, injectCreateBooking, injectUpdateRoomStatus, injectListAvailableRooms, injectCreateMaintenanceRequest, injectGetHotelStaff } from '@dataconnect/generated/angular';

@Component({
  selector: 'my-component',
  ...
})
class MyComponent {
  // The types of these injectors are available in angular/index.d.ts
  private readonly CreateHotelOperation = injectCreateHotel(createHotelVars);
  private readonly GetFirstHotelOperation = injectGetFirstHotel();
  private readonly CreateRoomOperation = injectCreateRoom(createRoomVars);
  private readonly CreateGuestOperation = injectCreateGuest(createGuestVars);
  private readonly CreateBookingOperation = injectCreateBooking(createBookingVars);
  private readonly UpdateRoomStatusOperation = injectUpdateRoomStatus(updateRoomStatusVars);
  private readonly ListAvailableRoomsOperation = injectListAvailableRooms();
  private readonly CreateMaintenanceRequestOperation = injectCreateMaintenanceRequest(createMaintenanceRequestVars);
  private readonly GetHotelStaffOperation = injectGetHotelStaff(getHotelStaffVars);
  }
```

Each operation is a wrapper function around Tanstack Query Angular.

Here's an example:
```ts
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'simple-example',
  template: `
    @if (movies.isPending()) {
      Loading...
    }
    @if (movies.error()) {
      An error has occurred: {{ movies.error().message }}
    }
    @if (movies.data(); as data) {
      @for (movie of data.movies ; track
        movie.id) {
      <h1>{{ movie.title }}</h1>
      <p>{{ movie.synopsis }}</p>
      }
    }
  `
})
export class SimpleExampleComponent {
  http = inject(HttpClient)

  movies = injectListMovies();
}
```




## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createHotel, getFirstHotel, createRoom, createGuest, createBooking, updateRoomStatus, listAvailableRooms, createMaintenanceRequest, getHotelStaff } from '@dataconnect/generated';


// Operation CreateHotel:  For variables, look at type CreateHotelVars in ../index.d.ts
const { data } = await CreateHotel(dataConnect, createHotelVars);

// Operation GetFirstHotel: 
const { data } = await GetFirstHotel(dataConnect);

// Operation CreateRoom:  For variables, look at type CreateRoomVars in ../index.d.ts
const { data } = await CreateRoom(dataConnect, createRoomVars);

// Operation CreateGuest:  For variables, look at type CreateGuestVars in ../index.d.ts
const { data } = await CreateGuest(dataConnect, createGuestVars);

// Operation CreateBooking:  For variables, look at type CreateBookingVars in ../index.d.ts
const { data } = await CreateBooking(dataConnect, createBookingVars);

// Operation UpdateRoomStatus:  For variables, look at type UpdateRoomStatusVars in ../index.d.ts
const { data } = await UpdateRoomStatus(dataConnect, updateRoomStatusVars);

// Operation ListAvailableRooms: 
const { data } = await ListAvailableRooms(dataConnect);

// Operation CreateMaintenanceRequest:  For variables, look at type CreateMaintenanceRequestVars in ../index.d.ts
const { data } = await CreateMaintenanceRequest(dataConnect, createMaintenanceRequestVars);

// Operation GetHotelStaff:  For variables, look at type GetHotelStaffVars in ../index.d.ts
const { data } = await GetHotelStaff(dataConnect, getHotelStaffVars);


```