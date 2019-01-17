import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  firestore: firebase.firestore.Firestore;
  storage: firebase.storage.Storage;

  constructor() {
    this.init();
  }

  init() {
    firebase.initializeApp(environment.firebase);
    this.firestore = firebase.firestore();
    this.storage = firebase.storage();
  }
}
