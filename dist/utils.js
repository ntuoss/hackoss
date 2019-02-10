"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
function withId(document, id) {
    return _.merge(document, { id: id });
}
exports.withId = withId;
function buildQuery(collection, limit, orderByPath, direction, filters) {
    var query = collection.limit(limit).orderBy(orderByPath, direction);
    filters.forEach(function (filter) { return query = query.where(filter.fieldPath, filter.opStr, filter.value); });
    return query;
}
exports.buildQuery = buildQuery;
var QueryFilter = /** @class */ (function () {
    function QueryFilter() {
    }
    return QueryFilter;
}());
exports.QueryFilter = QueryFilter;
//# sourceMappingURL=utils.js.map