import { FirebaseRepository } from '../firebase/firebase.repository';
import { Artwork } from './artwork';
import { PeopleRepository } from '../people/people.repository';
import { QueryFilter } from '../utils';
import firebase from 'firebase';
export declare type ArtworksOrderKey = 'title';
export interface NewArtwork {
    title: string;
    imageUrl: string;
    artistId: string;
    eventbriteId: string;
}
export declare class ArtworksRepository {
    private firebaseRepository;
    private peopleRepository;
    artworks: firebase.firestore.CollectionReference;
    constructor(firebaseService: FirebaseRepository, peopleRepository: PeopleRepository);
    createArtwork(artwork: NewArtwork): Promise<void>;
    getArtworks(filters?: QueryFilter[], limit?: number, orderBy?: ArtworksOrderKey, direction?: firebase.firestore.OrderByDirection): Promise<Artwork[]>;
    getArtwork(id: string): Promise<Artwork>;
    private toArtwork;
}
