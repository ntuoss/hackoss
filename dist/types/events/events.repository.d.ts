import { FirebaseRepository } from '../firebase/firebase.repository';
import { PeopleRepository } from '../people/people.repository';
import { LocationsRepository } from '../locations/locations.repository';
import { Event, Prerequisite, Dependency, EventStatus, Publication } from './event';
import { OrganisationsRepository } from '../organisations/organisations.repository';
import { ArtworksRepository } from '../artworks/artworks.repository';
import { QueryFilter } from '../utils';
import * as firebase from 'firebase/app';
export declare type EventsOrderKey = 'date' | 'title';
export interface NewEvent {
    tgif: number;
    title: string;
    endTime: Date;
    tagline: string;
    bannerId: string;
    prerequisites: Prerequisite[];
    description: string;
    startTime: Date;
    dependencies: Dependency[];
    promotion: string;
    venueId: string;
    githubUrl: string;
    status: EventStatus;
    isPublic: boolean;
    isExternal: boolean;
    hasFood: boolean;
    hasDrinks: boolean;
    remarks: string;
    eventbrite: Publication;
    facebook: Publication;
    speakers: {
        personId: string;
        organisationId: string;
        position: string;
    }[];
}
export declare class EventsRepository {
    private firebaseRepository;
    private peopleRepository;
    private locationRepository;
    private organisationsRepository;
    private artworksRepository;
    events: firebase.firestore.CollectionReference;
    constructor(firebaseRepository: FirebaseRepository, peopleRepository: PeopleRepository, locationRepository: LocationsRepository, organisationsRepository: OrganisationsRepository, artworksRepository: ArtworksRepository);
    createEvent(event: NewEvent): Promise<void>;
    getEvents(filters?: QueryFilter[], limit?: number, orderBy?: EventsOrderKey, direction?: firebase.firestore.OrderByDirection): Promise<Event[]>;
    getEvent(id: string): Promise<Event>;
    private toEvent;
}
