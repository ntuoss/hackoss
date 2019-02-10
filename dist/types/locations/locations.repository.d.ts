import { Location } from './location';
import { FirebaseRepository } from '../firebase/firebase.repository';
import { QueryFilter } from '../utils';
import firebase from 'firebase';
export declare type LocationsOrderKey = 'name';
export interface NewLocation {
    name: string;
    seatingCapacity: number;
    addressLine1: string;
    addressLine2: string;
    imageUrl: string;
    eventbriteId: string;
}
export declare class LocationsRepository {
    private firebaseRepository;
    locations: firebase.firestore.CollectionReference;
    constructor(firebaseRepository: FirebaseRepository);
    createLocation(location: NewLocation): Promise<void>;
    getLocations(filters?: QueryFilter[], limit?: number, orderBy?: LocationsOrderKey, direction?: firebase.firestore.OrderByDirection): Promise<Location[]>;
    getLocation(id: string): Promise<Location>;
    private toLocation;
}
