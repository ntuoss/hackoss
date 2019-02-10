import { FirebaseRepository } from '../firebase/firebase.repository';
import { Organisation } from './organisation';
import { QueryFilter } from '../utils';
import * as firebase from 'firebase/app';
export declare type OrganisationsOrderKey = 'name';
export interface NewOrganisation {
    name: string;
    about: string;
    avatarUrl: string;
    githubUrl: string;
    websiteUrl: string;
}
export declare class OrganisationsRepository {
    private firebaseRepository;
    organisations: firebase.firestore.CollectionReference;
    constructor(firebaseService: FirebaseRepository);
    createOrganisation(organisation: NewOrganisation): Promise<void>;
    getOrganisations(filters?: QueryFilter[], limit?: number, orderBy?: OrganisationsOrderKey, direction?: firebase.firestore.OrderByDirection): Promise<Organisation[]>;
    getOrganisation(id: string): Promise<Organisation>;
    private toOrganisation;
}
