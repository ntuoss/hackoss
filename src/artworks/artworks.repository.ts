import { FirebaseRepository } from '../firebase/firebase.repository';
import { Artwork } from './artwork';
import { FirebaseArtwork } from './firebase-artwork';
import { PeopleRepository } from '../people/people.repository';
import * as _ from 'lodash';

export class ArtworksRepository {

    private firebaseRepository: FirebaseRepository;
    private peopleRepository: PeopleRepository;
    private artworks: firebase.firestore.CollectionReference;

    constructor(
        firebaseService: FirebaseRepository,
        peopleRepository: PeopleRepository
        ) {
        this.firebaseRepository = firebaseService;
        this.peopleRepository = peopleRepository;
        this.artworks = this.firebaseRepository.firestore.collection('artworks');
    }

    async getArtworks(): Promise<Artwork[]> {
        const querySnapshot = await this.artworks.get();
        return Promise.all(querySnapshot.docs
            .map(doc => doc.data())
            .map(data => this.toArtwork(data as FirebaseArtwork)));
    }

    async getArtwork(id: string): Promise<Artwork> {
        const ref = this.artworks.doc(id);
        const doc = await ref.get();
        return this.toArtwork(doc.data() as FirebaseArtwork);
    }

    private async toArtwork(data: FirebaseArtwork): Promise<Artwork> {
        const artist = this.peopleRepository.getPerson(data.artist.id);
        return _.assign(data, {
            artist: await artist
        });
    }

}