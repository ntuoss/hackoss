import { FirebaseRepository } from '../firebase/firebase.repository';
import { Organisation } from './organisation';
import { FirebaseOrganisation } from './firebase-organisation';
import { withId } from '../utils';

export class OrganisationsRepository {

    private firebaseRepository: FirebaseRepository;
    private organisations: firebase.firestore.CollectionReference;

    constructor(firebaseService: FirebaseRepository) {
        this.firebaseRepository = firebaseService;
        this.organisations = this.firebaseRepository.firestore.collection('organisations');
    }

    async getOrganisations(): Promise<Organisation[]> {
        const querySnapshot = await this.organisations.get();
        return querySnapshot.docs
            .map(doc => this.toOrganisation(withId<FirebaseOrganisation>(doc.data(), doc.id)));
    }

    async getOrganisation(id: string): Promise<Organisation> {
        const ref = this.organisations.doc(id);
        const doc = await ref.get();
        return this.toOrganisation(withId<FirebaseOrganisation>(doc.data(), id));
    }

    private toOrganisation(data: FirebaseOrganisation): Organisation {
        return data;
    }

}
