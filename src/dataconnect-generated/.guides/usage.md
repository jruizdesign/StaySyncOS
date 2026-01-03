# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.


### Angular

The generated SDK creates injectable wrapper functions.

Here's an example:
```
import { injectListAvailableRooms, injectCreateRoom, injectCreateHotel, injectUpdateRoomStatus, injectCreateGuest, injectCreateBooking, injectGetFirstHotel, injectGetHotelById, injectListHotelsByUser, injectListAllHotels } from '@dataconnect/generated/angular';

@Component({
  selector: 'my-component',
  ...
})
class MyComponent {
  // The types of these injectors are available in angular/index.d.ts
  private readonly ListAvailableRoomsOperation = injectListAvailableRooms(listAvailableRoomsVars);
  private readonly CreateRoomOperation = injectCreateRoom(createRoomVars);
  private readonly CreateHotelOperation = injectCreateHotel(createHotelVars);
  private readonly UpdateRoomStatusOperation = injectUpdateRoomStatus(updateRoomStatusVars);
  private readonly CreateGuestOperation = injectCreateGuest(createGuestVars);
  private readonly CreateBookingOperation = injectCreateBooking(createBookingVars);
  private readonly GetFirstHotelOperation = injectGetFirstHotel();
  private readonly GetHotelByIdOperation = injectGetHotelById(getHotelByIdVars);
  private readonly ListHotelsByUserOperation = injectListHotelsByUser(listHotelsByUserVars);
  private readonly ListAllHotelsOperation = injectListAllHotels();
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
import { listAvailableRooms, createRoom, createHotel, updateRoomStatus, createGuest, createBooking, getFirstHotel, getHotelById, listHotelsByUser, listAllHotels } from '@dataconnect/generated';


// Operation ListAvailableRooms:  For variables, look at type ListAvailableRoomsVars in ../index.d.ts
const { data } = await ListAvailableRooms(dataConnect, listAvailableRoomsVars);

// Operation CreateRoom:  For variables, look at type CreateRoomVars in ../index.d.ts
const { data } = await CreateRoom(dataConnect, createRoomVars);

// Operation CreateHotel:  For variables, look at type CreateHotelVars in ../index.d.ts
const { data } = await CreateHotel(dataConnect, createHotelVars);

// Operation UpdateRoomStatus:  For variables, look at type UpdateRoomStatusVars in ../index.d.ts
const { data } = await UpdateRoomStatus(dataConnect, updateRoomStatusVars);

// Operation CreateGuest:  For variables, look at type CreateGuestVars in ../index.d.ts
const { data } = await CreateGuest(dataConnect, createGuestVars);

// Operation CreateBooking:  For variables, look at type CreateBookingVars in ../index.d.ts
const { data } = await CreateBooking(dataConnect, createBookingVars);

// Operation GetFirstHotel: 
const { data } = await GetFirstHotel(dataConnect);

// Operation GetHotelById:  For variables, look at type GetHotelByIdVars in ../index.d.ts
const { data } = await GetHotelById(dataConnect, getHotelByIdVars);

// Operation ListHotelsByUser:  For variables, look at type ListHotelsByUserVars in ../index.d.ts
const { data } = await ListHotelsByUser(dataConnect, listHotelsByUserVars);

// Operation ListAllHotels: 
const { data } = await ListAllHotels(dataConnect);


```