import { FirebaseRepository } from '../firebase/firebase.repository';
import { PeopleRepository } from '../people/people.repository';
import { LocationsRepository } from '../locations/locations.repository';
import { Event, Speaker } from './event';
import { FirebaseEvent, FirebaseEventSpeaker } from './event.firebase';
import { OrganisationsRepository } from '../organisations/organisations.repository';
import { ArtworksRepository } from '../artworks/artworks.repository';
import { withId, QueryFilter, buildQuery } from '../utils';

const EVENTS_ORDER_KEY_PATH_MAP: { [key in EventsOrderKey]: string; } = {
    'date': 'startTime',
    'title': 'title'
};
export class EventsRepository {

    private firebaseRepository: FirebaseRepository;
    private peopleRepository: PeopleRepository;
    private locationRepository: LocationsRepository;
    private organisationsRepository: OrganisationsRepository;
    private artworksRepository: ArtworksRepository;
    events: firebase.firestore.CollectionReference;

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

    async getEvents(
        filters: QueryFilter[] = [],
        limit: number = 10,
        orderBy: EventsOrderKey = 'date',
        direction: firebase.firestore.OrderByDirection = 'desc'
    ): Promise<Event[]> {
        const orderByPath = EVENTS_ORDER_KEY_PATH_MAP[orderBy];
        const results = await buildQuery(this.events, limit, orderByPath, direction, filters).get();
        return Promise.all(results.docs.map(doc => this.toEvent(withId<FirebaseEvent>(doc.data(), doc.id))));
    }

    async getEvent(id: string): Promise<Event> {
        const ref = this.events.doc(id);
        const doc = await ref.get();
        return this.toEvent(withId<FirebaseEvent>(doc.data(), id));
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

export type EventsOrderKey = 'date' | 'title';
