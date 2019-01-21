import * as _ from 'lodash';

export function withId<T>(document: firebase.firestore.DocumentData | undefined, id: string): T {
    return _.merge<T, { id: string }>(document as T, { id });
}
