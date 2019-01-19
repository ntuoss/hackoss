import { Location } from './location';
import { FirebaseRepository } from '../firebase/firebase.repository';
import { LocationDocument } from './location.document';

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
            .map(doc => doc.data())
            .map(data => this.toLocation(data as LocationDocument));
    }

    async getLocation(id: string): Promise<Location> {
        const ref = this.locations.doc(id);
        const doc = await ref.get();
        return this.toLocation(doc.data() as LocationDocument);
    }

    private toLocation(data: LocationDocument): Location {
        return data;
    }

}
