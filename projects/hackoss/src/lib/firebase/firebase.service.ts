import { Injectable, Inject } from '@angular/core';
import { FirebaseConfig, FIREBASE_CONFIG } from './firebase.config';
import { FirebaseRepository } from './firebase.repository';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService extends FirebaseRepository {

  constructor(@Inject(FIREBASE_CONFIG) config: FirebaseConfig) {
    super(config);
  }
}
