import { Injectable } from '@angular/core';
import { FirebaseService } from '../firebase/firebase.service';
import { LocationsRepository } from './locations.repository';

@Injectable({
    providedIn: 'root'
})
export class LocationsService extends LocationsRepository {

    constructor(firebaseService: FirebaseService) {
        super(firebaseService);
    }
}
