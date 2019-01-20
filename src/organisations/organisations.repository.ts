import { FirebaseRepository } from '../firebase/firebase.repository';
import { Organisation } from './organisation';
import { FirebaseOrganisation } from './firebase-organisation';

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
            .map(doc => doc.data())
            .map(data => this.toOrganisation(data as FirebaseOrganisation));
    }

    async getOrganisation(id: string): Promise<Organisation> {
        const ref = this.organisations.doc(id);
        const doc = await ref.get();
        return this.toOrganisation(doc.data() as FirebaseOrganisation);
    }

    private toOrganisation(data: FirebaseOrganisation): Organisation {
        return data;
    }

}
