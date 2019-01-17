import { Injectable } from '@angular/core';
import { FirebaseService } from '../firebase/firebase.service';
import { Person } from '../../models/person';

@Injectable({
    providedIn: 'root'
})
export class PeopleService {

    private people: firebase.firestore.CollectionReference;

    constructor(private firebaseService: FirebaseService) {
        this.people = this.firebaseService.firestore.collection('people');
    }

    async getPeople(): Promise<Person[]> {
        const querySnapshot = await this.people.get();
        return querySnapshot.docs.map(doc => this.toPerson(doc.data()));
    }

    async getPerson(id: string): Promise<Person> {
        const ref = this.people.doc(id);
        return ref.get().then(doc => this.toPerson(doc.data()));
    }

    private toPerson(data: firebase.firestore.DocumentData): Person {
        return {
            name: data['name'],
            about: data['about'],
            githubUrl: data['githubUrl'],
            websiteUrl: data['websiteUrl'],
            avatarUrl: data['avatarUrl']
        };
    }

}
