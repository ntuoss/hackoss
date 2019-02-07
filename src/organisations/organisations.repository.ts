import { FirebaseRepository } from '../firebase/firebase.repository';
import { Organisation } from './organisation';
import { FirebaseOrganisation } from './organisation.firebase';
import { withId, QueryFilter, buildQuery } from '../utils';
import firebase from 'firebase';
import _ from 'lodash';

const ORGANISATIONS_ORDER_KEY_PATH_MAP: { [key in OrganisationsOrderKey]: string; } = {
    'name': 'name'
};

export class OrganisationsRepository {

    private firebaseRepository: FirebaseRepository;
    organisations: firebase.firestore.CollectionReference;

    constructor(firebaseService: FirebaseRepository) {
        this.firebaseRepository = firebaseService;
        this.organisations = this.firebaseRepository.firestore.collection('organisations');
    }

    async getOrganisations(
        filters: QueryFilter[] = [],
        limit: number = 10,
        orderBy: OrganisationsOrderKey = 'name',
        direction: firebase.firestore.OrderByDirection = 'asc'
    ): Promise<Organisation[]> {
        const orderByPath = ORGANISATIONS_ORDER_KEY_PATH_MAP[orderBy];
        const results = await buildQuery(this.organisations, limit, orderByPath, direction, filters).get();
        return results.docs.map(doc => this.toOrganisation(withId<FirebaseOrganisation>(doc.data(), doc.id)));
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

export type OrganisationsOrderKey = 'name';
