import { Proficiency, EventStatus } from './event';

export class FirebaseEvent {
    tgif: number;
    title: string;
    speakers: {
        person: firebase.firestore.DocumentReference;
        organisation: firebase.firestore.DocumentReference;
        position: string;
    }[];
    tagline: string;
    banner: firebase.firestore.DocumentReference;
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
    public: boolean;
    external: boolean;
    hasFood: boolean;
    hasDrinks: boolean;
    remarks: string;
}
