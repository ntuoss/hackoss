import { Location } from './location';
import { FirebaseRepository } from '../firebase/firebase.repository';
import { FirebaseLocation } from './location.firebase';
import { QueryFilter, buildQuery } from '../utils';
import { validators } from 'validate.js';
import firebase from 'firebase/app';

export type LocationsOrderKey = 'name';

const LOCATIONS_ORDER_KEY_PATH_MAP: { [key in LocationsOrderKey]: string; } = {
    'name': 'name'
};

export interface NewLocation {
    name: string;
    seatingCapacity: number;
    addressLine1: string;
    addressLine2?: string;
    imageUrl?: string;
    eventbriteId?: string;
}

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

    async createLocation(location: NewLocation): Promise<string> {
        const result = await this.locations.add(location);
        return result.id;
    }

    async getLocations(
        filters: QueryFilter[] = [],
        limit: number = 10,
        orderBy: LocationsOrderKey = 'name',
        direction: firebase.firestore.OrderByDirection = 'asc'
    ): Promise<Location[]> {
        const orderByPath = LOCATIONS_ORDER_KEY_PATH_MAP[orderBy];
        const results = await buildQuery(this.locations, limit, orderByPath, direction, filters).get();
        return results.docs.map(doc => this.toLocation({ ...doc.data() as FirebaseLocation, id: doc.id }));
    }

    async getLocation(id: string): Promise<Location> {
        const ref = this.locations.doc(id);
        const doc = await ref.get();
        return this.toLocation({ ...doc.data() as FirebaseLocation, id });
    }

    private toLocation(data: FirebaseLocation): Location {
        return data;
    }

}
