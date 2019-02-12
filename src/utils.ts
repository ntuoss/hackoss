export function buildQuery(
    collection: firebase.firestore.CollectionReference,
    limit: number,
    orderByPath: string,
    direction: firebase.firestore.OrderByDirection,
    filters: QueryFilter[]
) {
    let query = collection.limit(limit).orderBy(orderByPath, direction);
    filters.forEach(filter => query = query.where(filter.fieldPath, filter.opStr, filter.value));
    return query;
}

export class QueryFilter {
    fieldPath: string;
    opStr: firebase.firestore.WhereFilterOp;
    value: any;
}
