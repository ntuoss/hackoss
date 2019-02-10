import { Person } from './person';
import { FirebaseRepository } from '../firebase/firebase.repository';
import { QueryFilter } from '../utils';
import * as firebase from 'firebase/app';
export declare type PeopleOrderKey = 'name';
export interface NewPerson {
    name: string;
    about: string;
    websiteUrl: string;
    avatarUrl: string;
    githubUrl: string;
}
export declare class PeopleRepository {
    private firebaseRepository;
    people: firebase.firestore.CollectionReference;
    constructor(firebaseService: FirebaseRepository);
    createPerson(person: NewPerson): Promise<void>;
    getPeople(filters?: QueryFilter[], limit?: number, orderBy?: PeopleOrderKey, direction?: firebase.firestore.OrderByDirection): Promise<Person[]>;
    getPerson(id: string): Promise<Person>;
    private toPerson;
}
