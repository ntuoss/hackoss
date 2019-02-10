export declare function withId<T>(document: firebase.firestore.DocumentData | undefined, id: string): T;
export declare function buildQuery(collection: firebase.firestore.CollectionReference, limit: number, orderByPath: string, direction: firebase.firestore.OrderByDirection, filters: QueryFilter[]): import("firebase").firestore.Query;
export declare class QueryFilter {
    fieldPath: string;
    opStr: firebase.firestore.WhereFilterOp;
    value: any;
}
