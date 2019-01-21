import { Person } from '../people/person';
import { Location } from '../locations/location';
import { Organisation } from '../organisations/organisation';
import { Artwork } from '../artworks/artwork';

export class Event {
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
  eventbriteId: string;
  eventbriteUrl: string;
  githubUrl: string;
  facebookUrl: string;
  status: EventStatus;
  public: boolean;
  external: boolean;
  hasFood: boolean;
  hasDrinks: boolean;
  remarks: string;
}

export class Speaker {
  person: Person;
  organisation: Organisation;
  position: string;
}

export class Dependency {
  label: string;
  specification: string;
  referenceUrl: string;
}

export class Prerequisite {
  label: string;
  proficiency: Proficiency;
  referenceUrl: string;
}

export type Proficiency = 'basic' | 'intermediate' | 'advanced';
export type EventStatus = 'pending' | 'live' | 'done';
