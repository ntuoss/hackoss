import { Injectable, Inject, InjectionToken } from '@angular/core';
import { FirebaseConfig } from './firebase.config';
import { FirebaseRepository } from './firebase.repository';

export const FIREBASE_CONFIG = new InjectionToken<FirebaseConfig>('FIREBASE_CONFIG');

@Injectable({
  providedIn: 'root'
})
export class FirebaseService extends FirebaseRepository {

  constructor(@Inject(FIREBASE_CONFIG) config: FirebaseConfig) {
    super(config);
  }
}
