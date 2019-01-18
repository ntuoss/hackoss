import { Injectable } from '@angular/core';
import { FirebaseService } from '../firebase/firebase.service';
import { Event, Artwork } from '../../models/event';
import { PeopleService } from '../people/people.service';
import { LocationsService } from '../locations/locations.service';
import { Location } from '../../models/location';

@Injectable({
    providedIn: 'root'
})
export class EventsService {

    private events: firebase.firestore.CollectionReference;

    constructor(
        private firebaseService: FirebaseService,
        private peopleService: PeopleService,
        private locationsService: LocationsService) {
        this.events = this.firebaseService.firestore.collection('events');
    }

    async getEvents(): Promise<Event[]> {
        const querySnapshot = await this.events.get();
        return Promise.all(querySnapshot.docs.map(doc => this.toEvent(doc.data())));
    }

    private async toEvent(data: firebase.firestore.DocumentData): Promise<Event> {

        const speakerRefs: firebase.firestore.DocumentReference[] = data['speakers'];
        const speakers = speakerRefs.map(ref => this.peopleService.getPerson(ref.id));

        const bannerData = data['banner'];
        const bannerArtistRef: firebase.firestore.DocumentReference = bannerData['artist'];
        const banner: Promise<Artwork> = this.peopleService.getPerson(bannerArtistRef.id).then(artist => ({
            title: bannerData['title'],
            imageUrl: bannerData['imageUrl'],
            artist
        }));

        const locationRef: firebase.firestore.DocumentReference = data['venue'];
        const venue: Promise<Location> = this.locationsService.getLocation(locationRef.id);

        const startTimestamp: firebase.firestore.Timestamp = data['startTime'];
        const endTimestamp: firebase.firestore.Timestamp = data['endTime'];

        return {
            tgif: data['tgif'],
            title: data['title'],
            speakers: await Promise.all(speakers),
            tagline: data['tagline'],
            banner: await banner,
            description: data['description'],
            prerequisites: data['prerequisites'],
            dependencies: data['dependencies'],
            promotion: data['promotion'],
            venue: await venue,
            startTime: startTimestamp.toDate(),
            endTime: endTimestamp.toDate(),
            eventbriteUrl: data['eventbriteUrl'],
            githubUrl: data['githubUrl'],
            facebookUrl: data['facebookUrl'],
            status: data['status'],
        };
    }

}
