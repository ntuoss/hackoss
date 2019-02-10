import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { FirebaseConfig } from './firebase.config';
export declare class FirebaseRepository {
    firestore: firebase.firestore.Firestore;
    constructor(config: FirebaseConfig);
    private init;
}
