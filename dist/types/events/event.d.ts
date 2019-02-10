import { Person } from '../people/person';
import { Location } from '../locations/location';
import { Organisation } from '../organisations/organisation';
import { Artwork } from '../artworks/artwork';
export declare class Event {
    id: string;
    tgif: number;
    title: string;
    speakers: Speaker[];
    tagline: string;
    banner: Artwork;
    description: string;
    prerequisites: Prerequisite[];
    dependencies: Dependency[];
    promotion: string;
    venue: Location;
    startTime: Date;
    endTime: Date;
    githubUrl: string;
    status: EventStatus;
    isPublic: boolean;
    isExternal: boolean;
    hasFood: boolean;
    hasDrinks: boolean;
    remarks: string;
    eventbrite: Publication;
    facebook: Publication;
}
export declare class Speaker {
    person: Person;
    organisation: Organisation;
    position: string;
}
export declare class Dependency {
    label: string;
    specification: string;
    referenceUrl: string;
}
export declare class Prerequisite {
    label: string;
    proficiency: Proficiency;
    referenceUrl: string;
}
export declare class Publication {
    id: string;
    status: EventStatus;
    url: string;
}
export declare type Proficiency = 'basic' | 'intermediate' | 'advanced';
export declare const PROFICIENCIES: Proficiency[];
export declare type EventStatus = 'draft' | 'live' | 'completed';
export declare const EVENT_STATUSES: EventStatus[];
