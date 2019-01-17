import { Person } from './person';
import { Location } from './location';

export class Event {
  tgif: number;
  title: string;
  speakers: Person[];
  tagline: string;
  banner: Artwork;
  description: string;
  prerequisites: Prerequisite[];
  dependencies: Dependency[];
  promotion: string;
  venue: Location;
  startTime: Date;
  endTime: Date;
  eventbriteUrl: string;
  githubUrl: string;
  facebookUrl: string;
  status: EventStatus;
}

export class Artwork {
  title: string;
  imageUrl: string;
  artist: Person;
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
