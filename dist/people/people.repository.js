"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var utils_1 = require("../utils");
var validate_js_1 = require("validate.js");
require("firebase/firestore");
var PEOPLE_ORDER_KEY_PATH_MAP = {
    'name': 'name'
};
var PeopleRepository = /** @class */ (function () {
    function PeopleRepository(firebaseService) {
        var _this = this;
        this.firebaseRepository = firebaseService;
        this.people = this.firebaseRepository.firestore.collection('people');
        validate_js_1.validators.personExists = function (personId) { return new Promise(function (resolve) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var doc;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.people.doc(personId).get()];
                    case 1:
                        doc = _a.sent();
                        if (doc.exists) {
                            resolve();
                        }
                        else {
                            resolve("Person with ID " + personId + " does not exist in Firebase");
                        }
                        return [2 /*return*/];
                }
            });
        }); }); };
    }
    PeopleRepository.prototype.createPerson = function (person) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var newPerson;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newPerson = person;
                        return [4 /*yield*/, this.people.add(newPerson)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PeopleRepository.prototype.getPeople = function (filters, limit, orderBy, direction) {
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
                        orderByPath = PEOPLE_ORDER_KEY_PATH_MAP[orderBy];
                        return [4 /*yield*/, utils_1.buildQuery(this.people, limit, orderByPath, direction, filters).get()];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, results.docs.map(function (doc) { return _this.toPerson(utils_1.withId(doc.data(), doc.id)); })];
                }
            });
        });
    };
    PeopleRepository.prototype.getPerson = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var ref, doc;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ref = this.people.doc(id);
                        return [4 /*yield*/, ref.get()];
                    case 1:
                        doc = _a.sent();
                        return [2 /*return*/, this.toPerson(utils_1.withId(doc.data(), id))];
                }
            });
        });
    };
    PeopleRepository.prototype.toPerson = function (data) {
        return data;
    };
    return PeopleRepository;
}());
exports.PeopleRepository = PeopleRepository;
//# sourceMappingURL=people.repository.js.map