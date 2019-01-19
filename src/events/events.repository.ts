import { FirebaseRepository } from '../firebase/firebase.repository';
import { PeopleRepository } from '../people/people.repository';
import { LocationsRepository } from '../locations/locations.repository';
import { Event } from './event';
import { EventDocument } from './event.document';
import * as _ from 'lodash';

export class EventsRepository {

    private firebaseRepository: FirebaseRepository;
    private peopleRepository: PeopleRepository;
    private locationRepository: LocationsRepository;
    protected events: firebase.firestore.CollectionReference;

    constructor(
        firebaseRepository: FirebaseRepository,
        peopleRepository: PeopleRepository,
        locationRepository: LocationsRepository) {

        this.firebaseRepository = firebaseRepository;
        this.peopleRepository = peopleRepository;
        this.locationRepository = locationRepository;

        this.events = this.firebaseRepository.firestore.collection('events');
    }

    async getEvents(): Promise<Event[]> {
        const querySnapshot = await this.events.get();
        return Promise.all(querySnapshot.docs
            .map(doc => doc.data())
            .map(data => this.toEvent(data as EventDocument)));
    }

    async getEvent(id: string): Promise<Event> {
        const ref = this.events.doc(id);
        const doc = await ref.get();
        return this.toEvent(doc.data() as EventDocument);
    }

    private async toEvent(data: EventDocument): Promise<Event> {

        const speakers = data.speakers.map(ref => this.peopleRepository.getPerson(ref.id));
        const bannerArtist = this.peopleRepository.getPerson(data.banner.artist.id);
        const venue = this.locationRepository.getLocation(data.venue.id);

        return _.assign(data, {
            speakers: await Promise.all(speakers),
            banner: _.assign(data.banner, { artist: await bannerArtist}),
            venue: await venue,
            startTime: data.startTime.toDate(),
            endTime: data.endTime.toDate()
        });
    }
}
