import { Location } from './location';
import { FirebaseRepository } from '../firebase/firebase.repository';
import { FirebaseLocation } from './firebase-location';
import * as _ from 'lodash';
import { withId } from '../utils';

export class LocationsRepository {

    private firebaseRepository: FirebaseRepository;
    private locations: firebase.firestore.CollectionReference;

    constructor(firebaseRepository: FirebaseRepository) {
        this.firebaseRepository = firebaseRepository;
        this.locations = this.firebaseRepository.firestore.collection('locations');
    }

    async getLocations(): Promise<Location[]> {
        const querySnapshot = await this.locations.get();
        return querySnapshot.docs
            .map(doc => this.toLocation(withId<FirebaseLocation>(doc.data(), doc.id)));
    }

    async getLocation(id: string): Promise<Location> {
        const ref = this.locations.doc(id);
        const doc = await ref.get();
        return this.toLocation(withId<FirebaseLocation>(doc.data(), id));
    }

    private toLocation(data: FirebaseLocation): Location {
        return data;
    }

}
