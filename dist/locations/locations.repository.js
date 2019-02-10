"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var utils_1 = require("../utils");
var validate_js_1 = require("validate.js");
var LOCATIONS_ORDER_KEY_PATH_MAP = {
    'name': 'name'
};
var LocationsRepository = /** @class */ (function () {
    function LocationsRepository(firebaseRepository) {
        var _this = this;
        this.firebaseRepository = firebaseRepository;
        this.locations = this.firebaseRepository.firestore.collection('locations');
        validate_js_1.validators.locationExists = function (locationId) { return new Promise(function (resolve) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var doc;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.locations.doc(locationId).get()];
                    case 1:
                        doc = _a.sent();
                        if (doc.exists) {
                            resolve();
                        }
                        else {
                            resolve("Location with ID " + locationId + " does not exist in Firebase");
                        }
                        return [2 /*return*/];
                }
            });
        }); }); };
    }
    LocationsRepository.prototype.createLocation = function (location) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var newLocation;
            return tslib_1.__generator(this, function (_a) {
                newLocation = location;
                return [2 /*return*/, this.locations.add(newLocation)];
            });
        });
    };
    LocationsRepository.prototype.getLocations = function (filters, limit, orderBy, direction) {
        if (filters === void 0) { filters = []; }
        if (limit === void 0) { limit = 10; }
        if (orderBy === void 0) { orderBy = 'name'; }
        if (direction === void 0) { direction = 'asc'; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var orderByPath, results;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        orderByPath = LOCATIONS_ORDER_KEY_PATH_MAP[orderBy];
                        return [4 /*yield*/, utils_1.buildQuery(this.locations, limit, orderByPath, direction, filters).get()];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, results.docs.map(function (doc) { return _this.toLocation(utils_1.withId(doc.data(), doc.id)); })];
                }
            });
        });
    };
    LocationsRepository.prototype.getLocation = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var ref, doc;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ref = this.locations.doc(id);
                        return [4 /*yield*/, ref.get()];
                    case 1:
                        doc = _a.sent();
                        return [2 /*return*/, this.toLocation(utils_1.withId(doc.data(), id))];
                }
            });
        });
    };
    LocationsRepository.prototype.toLocation = function (data) {
        return data;
    };
    return LocationsRepository;
}());
exports.LocationsRepository = LocationsRepository;
//# sourceMappingURL=locations.repository.js.map