import { Injectable } from '@angular/core';
import { FirebaseService } from '../firebase/firebase.service';
import { Location } from '../../models/location';

@Injectable({
    providedIn: 'root'
})
export class LocationsService {

    private locations: firebase.firestore.CollectionReference;

    constructor(private firebaseService: FirebaseService) {
        this.locations = this.firebaseService.firestore.collection('locations');
    }

    async getLocations(): Promise<Location[]> {
        const querySnapshot = await this.locations.get();
        return querySnapshot.docs.map(doc => this.toLocation(doc.data()));
    }

    async getLocation(id: string): Promise<Location> {
        const ref = this.locations.doc(id);
        return ref.get().then(doc => this.toLocation(doc.data()));
    }

    private toLocation(data: firebase.firestore.DocumentData): Location {
        return {
            name: data['name'],
            imageUrl: data['imageUrl'],
            address: data['address'],
            seatingCapacity: data['seatingCapacity']
        };
    }

}
