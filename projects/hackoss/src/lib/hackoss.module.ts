import { NgModule } from '@angular/core';
import { EventsService } from './services/events/events.service';
import { LocationsService } from './services/locations/locations.service';
import { PeopleService } from './services/people/people.service';
import { FirebaseConfig, FIREBASE_CONFIG } from './services/firebase/firebase.config';

@NgModule({
  imports: [],
  providers: [
    EventsService,
    LocationsService,
    PeopleService
  ]
})
export class HackossModule {

  static forRoot(config: FirebaseConfig) {
    return {
      ngModule: HackossModule,
      providers: [{
        provide: FIREBASE_CONFIG,
        useValue: config
      }]
    };
  }

}
