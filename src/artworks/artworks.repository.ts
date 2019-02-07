import { FirebaseRepository } from '../firebase/firebase.repository';
import { Artwork } from './artwork';
import { FirebaseArtwork } from './artwork.firebase';
import { PeopleRepository } from '../people/people.repository';
import { withId, QueryFilter, buildQuery } from '../utils';
import firebase from 'firebase';
import _ from 'lodash';

const ARTWORKS_ORDER_KEY_PATH_MAP: { [key in ArtworksOrderKey]: string; } = {
    'title': 'title'
};

export class ArtworksRepository {

    private firebaseRepository: FirebaseRepository;
    private peopleRepository: PeopleRepository;
    artworks: firebase.firestore.CollectionReference;

    constructor(
        firebaseService: FirebaseRepository,
        peopleRepository: PeopleRepository
        ) {
        this.firebaseRepository = firebaseService;
        this.peopleRepository = peopleRepository;
        this.artworks = this.firebaseRepository.firestore.collection('artworks');
    }

    async getArtworks(
        filters: QueryFilter[] = [],
        limit: number = 10,
        orderBy: ArtworksOrderKey = 'title',
        direction: firebase.firestore.OrderByDirection = 'asc'
    ): Promise<Artwork[]> {
        const orderByPath = ARTWORKS_ORDER_KEY_PATH_MAP[orderBy];
        const results = await buildQuery(this.artworks, limit, orderByPath, direction, filters).get();
        return Promise.all(results.docs.map(doc => this.toArtwork(withId<FirebaseArtwork>(doc.data(), doc.id))));
    }

    async getArtwork(id: string): Promise<Artwork> {
        const ref = this.artworks.doc(id);
        const doc = await ref.get();
        return this.toArtwork(withId<FirebaseArtwork>(doc.data(), id));
    }

    private async toArtwork(data: FirebaseArtwork): Promise<Artwork> {
        const artist = this.peopleRepository.getPerson(data.artist.id);
        return _.assign(data, {
            artist: await artist
        });
    }

}

export type ArtworksOrderKey = 'title';
