import { FirebaseRepository } from '../firebase/firebase.repository';
import { PeopleRepository } from '../people/people.repository';
import { LocationsRepository } from '../locations/locations.repository';
import { Event, Speaker } from './event';
import { FirebaseEvent } from './firebase-event';
import * as _ from 'lodash';
import { OrganisationsRepository } from '../organisations/organisations.repository';
import { ArtworksRepository } from '../artworks/artworks.repository';

export class EventsRepository {

    private firebaseRepository: FirebaseRepository;
    private peopleRepository: PeopleRepository;
    private locationRepository: LocationsRepository;
    private organisationsRepository: OrganisationsRepository;
    private artworksRepository: ArtworksRepository;
    protected events: firebase.firestore.CollectionReference;

    constructor(
        firebaseRepository: FirebaseRepository,
        peopleRepository: PeopleRepository,
        locationRepository: LocationsRepository,
        organisationsRepository: OrganisationsRepository,
        artworksRepository: ArtworksRepository) {

        this.firebaseRepository = firebaseRepository;
        this.peopleRepository = peopleRepository;
        this.locationRepository = locationRepository;
        this.organisationsRepository = organisationsRepository;
        this.artworksRepository = artworksRepository;

        this.events = this.firebaseRepository.firestore.collection('events');
    }

    async getEvents(): Promise<Event[]> {
        const querySnapshot = await this.events.get();
        return Promise.all(querySnapshot.docs
            .map(doc => doc.data())
            .map(data => this.toEvent(data as FirebaseEvent)));
    }

    async getEvent(id: string): Promise<Event> {
        const ref = this.events.doc(id);
        const doc = await ref.get();
        return this.toEvent(doc.data() as FirebaseEvent);
    }

    private async toEvent(data: FirebaseEvent): Promise<Event> {

        const speakers = data.speakers.map(async (speaker): Promise<Speaker> => {
            const person = this.peopleRepository.getPerson(speaker.person.id);
            const organisation = this.organisationsRepository.getOrganisation(speaker.organisation.id);
            return {
                person: await person,
                organisation: await organisation,
                position: speaker.position
            };
        });

        const banner = this.artworksRepository.getArtwork(data.banner.id);
        const venue = this.locationRepository.getLocation(data.venue.id);

        return _.assign(data, {
            speakers: await Promise.all(speakers),
            banner: await banner,
            venue: await venue,
            startTime: data.startTime.toDate(),
            endTime: data.endTime.toDate()
        });
    }
}
