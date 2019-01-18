import { InjectionToken } from '@angular/core';

export const FIREBASE_CONFIG = new InjectionToken<FirebaseConfig>('FIREBASE_CONFIG');

export class FirebaseConfig {
    apiKey: string;
    authDomain: string;
    databaseURL: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
}
