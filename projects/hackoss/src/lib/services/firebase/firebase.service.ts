import * as firebase from 'firebase';
import { Injectable, Inject } from '@angular/core';
import { FirebaseConfig, FIREBASE_CONFIG } from './firebase.config';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  firestore: firebase.firestore.Firestore;
  storage: firebase.storage.Storage;

  constructor(@Inject(FIREBASE_CONFIG) config: FirebaseConfig) {
    this.init(config);
  }

  init(config: FirebaseConfig) {
    firebase.initializeApp(config);
    this.firestore = firebase.firestore();
    this.storage = firebase.storage();
  }
}
