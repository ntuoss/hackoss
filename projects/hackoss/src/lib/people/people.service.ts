import { Injectable } from '@angular/core';
import { FirebaseService } from '../firebase/firebase.service';
import { PeopleRepository } from './people.repository';

@Injectable({
    providedIn: 'root'
})
export class PeopleService extends PeopleRepository {

    constructor(firebaseService: FirebaseService) {
        super(firebaseService);
    }

}
