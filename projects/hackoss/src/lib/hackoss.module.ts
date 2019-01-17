import { NgModule } from '@angular/core';
import { EventsService } from './services/events/events.service';
import { LocationsService } from './services/locations/locations.service';
import { PeopleService } from './services/people/people.service';

@NgModule({
  imports: [],
  providers: [
    EventsService,
    LocationsService,
    PeopleService
  ]
})
export class HackossModule { }
