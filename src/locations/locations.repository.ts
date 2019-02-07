import { Location } from './location';
import { FirebaseRepository } from '../firebase/firebase.repository';
import { FirebaseLocation } from './firebase-location';
import * as _ from 'lodash';
import { withId, QueryFilter, buildQuery } from '../utils';

const LOCATIONS_ORDER_KEY_PATH_MAP: { [key in LocationsOrderKey]: string; } = {
    'name': 'name'
};

export class LocationsRepository {

    private firebaseRepository: FirebaseRepository;
    locations: firebase.firestore.CollectionReference;

    constructor(firebaseRepository: FirebaseRepository) {
        this.firebaseRepository = firebaseRepository;
        this.locations = this.firebaseRepository.firestore.collection('locations');
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

export type LocationsOrderKey = 'name';
