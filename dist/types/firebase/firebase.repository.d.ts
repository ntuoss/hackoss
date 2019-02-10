import * as firebase from 'firebase';
import { FirebaseConfig } from './firebase.config';
export declare class FirebaseRepository {
    firestore: firebase.firestore.Firestore;
    constructor(config: FirebaseConfig);
    private init;
}
