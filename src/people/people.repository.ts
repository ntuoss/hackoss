import { Person } from './person';
import { FirebaseRepository } from '../firebase/firebase.repository';
import { FirebasePerson } from './person.firebase';
import { QueryFilter, buildQuery } from '../utils';
import { validators } from 'validate.js';
import firebase from 'firebase/app';

export type PeopleOrderKey = 'name';

const PEOPLE_ORDER_KEY_PATH_MAP: { [key in PeopleOrderKey]: string; } = {
    'name': 'name'
};

export interface NewPerson {
    name: string;
    about: string;
    websiteUrl?: string;
    avatarUrl?: string;
    githubUrl?: string;
}

export class PeopleRepository {

    private firebaseRepository: FirebaseRepository;
    people: firebase.firestore.CollectionReference;

    constructor(firebaseService: FirebaseRepository) {
        this.firebaseRepository = firebaseService;
        this.people = this.firebaseRepository.firestore.collection('people');

        validators.personExists = (personId: string) => new Promise(async (resolve) => {
            const doc = await this.people.doc(personId).get();
            if (doc.exists) {
                resolve();
            } else {
                resolve(`Person with ID ${personId} does not exist in Firebase`);
            }
        });
    }

    async createPerson(person: NewPerson): Promise<string> {
        const result = await this.people.add(person);
        return result.id;
    }

    async getPeople(
        filters: QueryFilter[] = [],
        limit: number = 10,
        orderBy: PeopleOrderKey = 'name',
        direction: firebase.firestore.OrderByDirection = 'asc'
    ): Promise<Person[]> {
        const orderByPath = PEOPLE_ORDER_KEY_PATH_MAP[orderBy];
        const results = await buildQuery(this.people, limit, orderByPath, direction, filters).get();
        return results.docs.map(doc => this.toPerson({ ...doc.data() as FirebasePerson, id: doc.id }));
    }

    async getPerson(id: string): Promise<Person> {
        const ref = this.people.doc(id);
        const doc = await ref.get();
        return this.toPerson({ ...doc.data() as FirebasePerson, id });
    }

    private toPerson(data: FirebasePerson): Person {
        return data;
    }

}
