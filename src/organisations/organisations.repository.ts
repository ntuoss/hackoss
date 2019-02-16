import { FirebaseRepository } from '../firebase/firebase.repository';
import { Organisation } from './organisation';
import { FirebaseOrganisation } from './organisation.firebase';
import { QueryFilter, buildQuery } from '../utils';
import { validators } from 'validate.js';
import firebase from 'firebase/app';

export type OrganisationsOrderKey = 'name';

const ORGANISATIONS_ORDER_KEY_PATH_MAP: { [key in OrganisationsOrderKey]: string; } = {
    'name': 'name'
};

export interface NewOrganisation {
    name: string;
    about: string;
    avatarUrl?: string;
    githubUrl?: string;
    websiteUrl?: string;
}

export class OrganisationsRepository {

    private firebaseRepository: FirebaseRepository;
    organisations: firebase.firestore.CollectionReference;

    constructor(firebaseService: FirebaseRepository) {
        this.firebaseRepository = firebaseService;
        this.organisations = this.firebaseRepository.firestore.collection('organisations');

        validators.organisationExists = (organisationId: string) => new Promise(async (resolve) => {
            const doc = await this.organisations.doc(organisationId).get();
            if (doc.exists) {
                resolve();
            } else {
                resolve(`Organisation with ID ${organisationId} does not exist in Firebase`);
            }
        });
    }

    async createOrganisation(organisation: NewOrganisation): Promise<string> {
        const result = await this.organisations.add(organisation);
        return result.id;
    }

    async getOrganisations(
        filters: QueryFilter[] = [],
        limit: number = 10,
        orderBy: OrganisationsOrderKey = 'name',
        direction: firebase.firestore.OrderByDirection = 'asc'
    ): Promise<Organisation[]> {
        const orderByPath = ORGANISATIONS_ORDER_KEY_PATH_MAP[orderBy];
        const results = await buildQuery(this.organisations, limit, orderByPath, direction, filters).get();
        return results.docs.map(doc => this.toOrganisation({ ...doc.data() as FirebaseOrganisation, id: doc.id }));
    }

    async getOrganisation(id: string): Promise<Organisation> {
        const ref = this.organisations.doc(id);
        const doc = await ref.get();
        return this.toOrganisation({ ...doc.data() as FirebaseOrganisation, id });
    }

    private toOrganisation(data: FirebaseOrganisation): Organisation {
        return data;
    }

}
