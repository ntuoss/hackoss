import { Location } from './location';
import { FirebaseRepository } from '../firebase/firebase.repository';
import { FirebaseLocation } from './location.firebase';
import { withId, QueryFilter, buildQuery } from '../utils';
import { validators } from 'validate.js';
import firebase from 'firebase';
import _ from 'lodash';

export type LocationsOrderKey = 'name';

const LOCATIONS_ORDER_KEY_PATH_MAP: { [key in LocationsOrderKey]: string; } = {
    'name': 'name'
};

export class LocationsRepository {

    private firebaseRepository: FirebaseRepository;
    locations: firebase.firestore.CollectionReference;

    constructor(firebaseRepository: FirebaseRepository) {
        this.firebaseRepository = firebaseRepository;
        this.locations = this.firebaseRepository.firestore.collection('locations');

        validators.locationExists = (locationId: string) => new Promise(async (resolve) => {
            const doc = await this.locations.doc(locationId).get();
            if (doc.exists) {
                resolve();
            } else {
                resolve(`Location with ID ${locationId} does not exist in Firebase`);
            }
        });
    }

    async getLocations(
        filters: QueryFilter[] = [],
        limit: number = 10,
        orderBy: LocationsOrderKey = 'name',
        direction: firebase.firestore.OrderByDirection = 'asc'
    ): Promise<Location[]> {
        const orderByPath = LOCATIONS_ORDER_KEY_PATH_MAP[orderBy];
        const results = await buildQuery(this.locations, limit, orderByPath, direction, filters).get();
        return results.docs.map(doc => this.toLocation(withId<FirebaseLocation>(doc.data(), doc.id)));
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
