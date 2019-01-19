import { Proficiency, EventStatus } from './event';

export class EventDocument {
    tgif: number;
    title: string;
    speakers: firebase.firestore.DocumentReference[];
    tagline: string;
    banner: {
        title: string;
        imageUrl: string;
        artist: firebase.firestore.DocumentReference;
    };
    description: string;
    prerequisites: {
        label: string;
        proficiency: Proficiency;
        referenceUrl: string;
    }[];
    dependencies: {
        label: string;
        specification: string;
        referenceUrl: string;
    }[];
    promotion: string;
    venue: firebase.firestore.DocumentReference;
    startTime: firebase.firestore.Timestamp;
    endTime: firebase.firestore.Timestamp;
    eventbriteUrl: string;
    githubUrl: string;
    facebookUrl: string;
    status: EventStatus;
}
