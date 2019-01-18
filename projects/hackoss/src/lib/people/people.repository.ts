import { Person } from './person';
import { FirebaseRepository } from '../firebase/firebase.repository';
import { PersonDocument } from './person.document';

export class PeopleRepository {

    private firebaseRepository: FirebaseRepository;
    private people: firebase.firestore.CollectionReference;

    constructor(firebaseService: FirebaseRepository) {
        this.firebaseRepository = firebaseService;
        this.people = this.firebaseRepository.firestore.collection('people');
    }

    async getPeople(): Promise<Person[]> {
        const querySnapshot = await this.people.get();
        return querySnapshot.docs
            .map(doc => doc.data())
            .map((data: PersonDocument) => this.toPerson(data));
    }

    async getPerson(id: string): Promise<Person> {
        const ref = this.people.doc(id);
        const doc = await ref.get();
        return this.toPerson(doc.data() as PersonDocument);
    }

    private toPerson(data: PersonDocument): Person {
        return data;
    }

}
