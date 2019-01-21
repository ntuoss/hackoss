import { Person } from './person';
import { FirebaseRepository } from '../firebase/firebase.repository';
import { FirebasePerson } from './firebase-person';
import { withId } from '../utils';

export class PeopleRepository {

    private firebaseRepository: FirebaseRepository;
    people: firebase.firestore.CollectionReference;

    constructor(firebaseService: FirebaseRepository) {
        this.firebaseRepository = firebaseService;
        this.people = this.firebaseRepository.firestore.collection('people');
    }

    async getPeople(): Promise<Person[]> {
        const querySnapshot = await this.people.get();
        return querySnapshot.docs
            .map(doc => this.toPerson(withId<FirebasePerson>(doc.data(), doc.id)));
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
