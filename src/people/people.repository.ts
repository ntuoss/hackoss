import { Person } from './person';
import { FirebaseRepository } from '../firebase/firebase.repository';
import { FirebasePerson } from './firebase-person';
import { withId, QueryFilter, buildQuery } from '../utils';

export class PeopleRepository {

    private firebaseRepository: FirebaseRepository;
    people: firebase.firestore.CollectionReference;

    constructor(firebaseService: FirebaseRepository) {
        this.firebaseRepository = firebaseService;
        this.people = this.firebaseRepository.firestore.collection('people');
    }

    async getPeople(
        filters: QueryFilter[] = [],
        limit: number = 10,
        orderBy: PeopleOrderKey = 'name',
        direction: firebase.firestore.OrderByDirection = 'asc'
    ): Promise<Person[]> {
        const orderByPath = PEOPLE_ORDER_KEY_PATH_MAP[orderBy];
        const results = await buildQuery(this.people, limit, orderByPath, direction, filters).get();
        return results.docs.map(doc => this.toPerson(withId<FirebasePerson>(doc.data(), doc.id)));
    }

    async getPerson(id: string): Promise<Person> {
        const ref = this.people.doc(id);
        const doc = await ref.get();
        return this.toPerson(withId<FirebasePerson>(doc.data(), id));
    }

    private toPerson(data: FirebasePerson): Person {
        return data;
    }

}

const PEOPLE_ORDER_KEY_PATH_MAP: { [key in PeopleOrderKey]: string; } = {
    'name': 'name'
};

export type PeopleOrderKey = 'name';
