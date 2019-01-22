import { Proficiency, EventStatus, Publication } from './event';

export class FirebaseEvent {
    id: string;
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
    githubUrl: string;
    status: EventStatus;
    public: boolean;
    external: boolean;
    hasFood: boolean;
    hasDrinks: boolean;
    remarks: string;
    eventbrite: Publication;
    facebook: Publication;
}
