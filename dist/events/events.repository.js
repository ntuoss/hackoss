"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var utils_1 = require("../utils");
var validate_js_1 = require("validate.js");
var firebase_1 = require("firebase");
var lodash_1 = require("lodash");
var EVENTS_ORDER_KEY_PATH_MAP = {
    'date': 'startTime',
    'title': 'title'
};
var EventsRepository = /** @class */ (function () {
    function EventsRepository(firebaseRepository, peopleRepository, locationRepository, organisationsRepository, artworksRepository) {
        var _this = this;
        this.firebaseRepository = firebaseRepository;
        this.peopleRepository = peopleRepository;
        this.locationRepository = locationRepository;
        this.organisationsRepository = organisationsRepository;
        this.artworksRepository = artworksRepository;
        this.events = this.firebaseRepository.firestore.collection('events');
        validate_js_1.validators.tgifUnique = function (tgif) { return new Promise(function (resolve) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var doc;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.events.where('tgif', '==', tgif).get()];
                    case 1:
                        doc = _a.sent();
                        if (doc.docs.length === 0) {
                            resolve();
                        }
                        else {
                            resolve("Event with TGIFHacks # " + tgif + " already exists in Firebase");
                        }
                        return [2 /*return*/];
                }
            });
        }); }); };
    }
    EventsRepository.prototype.createEvent = function (event) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var newEvent;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                newEvent = {
                    tgif: event.tgif,
                    title: event.title,
                    description: event.description,
                    tagline: event.tagline,
                    prerequisites: event.prerequisites,
                    dependencies: event.dependencies,
                    promotion: event.promotion,
                    githubUrl: event.githubUrl,
                    status: event.status,
                    isPublic: event.isPublic,
                    isExternal: event.isExternal,
                    hasFood: event.hasFood,
                    hasDrinks: event.hasDrinks,
                    remarks: event.remarks,
                    eventbrite: event.eventbrite,
                    facebook: event.facebook,
                    startTime: firebase_1.default.firestore.Timestamp.fromDate(event.startTime),
                    endTime: firebase_1.default.firestore.Timestamp.fromDate(event.endTime),
                    banner: this.artworksRepository.artworks.doc(event.bannerId),
                    venue: this.locationRepository.locations.doc(event.venueId),
                    speakers: event.speakers.map(function (speaker) { return ({
                        person: _this.peopleRepository.people.doc(speaker.personId),
                        organisation: _this.organisationsRepository.organisations.doc(speaker.organisationId),
                        position: speaker.position
                    }); })
                };
                this.events.add(newEvent);
                return [2 /*return*/];
            });
        });
    };
    EventsRepository.prototype.getEvents = function (filters, limit, orderBy, direction) {
        if (filters === void 0) { filters = []; }
        if (limit === void 0) { limit = 10; }
        if (orderBy === void 0) { orderBy = 'date'; }
        if (direction === void 0) { direction = 'desc'; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var orderByPath, results;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        orderByPath = EVENTS_ORDER_KEY_PATH_MAP[orderBy];
                        return [4 /*yield*/, utils_1.buildQuery(this.events, limit, orderByPath, direction, filters).get()];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, Promise.all(results.docs.map(function (doc) { return _this.toEvent(utils_1.withId(doc.data(), doc.id)); }))];
                }
            });
        });
    };
    EventsRepository.prototype.getEvent = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var ref, doc;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ref = this.events.doc(id);
                        return [4 /*yield*/, ref.get()];
                    case 1:
                        doc = _a.sent();
                        return [2 /*return*/, this.toEvent(utils_1.withId(doc.data(), id))];
                }
            });
        });
    };
    EventsRepository.prototype.toEvent = function (data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var speakers, banner, venue, _a, _b, _c, _d;
            var _this = this;
            return tslib_1.__generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        speakers = data.speakers.map(function (speaker) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var person, organisation, _a;
                            return tslib_1.__generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        person = this.peopleRepository.getPerson(speaker.person.id);
                                        organisation = this.organisationsRepository.getOrganisation(speaker.organisation.id);
                                        _a = {};
                                        return [4 /*yield*/, person];
                                    case 1:
                                        _a.person = _b.sent();
                                        return [4 /*yield*/, organisation];
                                    case 2: return [2 /*return*/, (_a.organisation = _b.sent(),
                                            _a.position = speaker.position,
                                            _a)];
                                }
                            });
                        }); });
                        banner = this.artworksRepository.getArtwork(data.banner.id);
                        venue = this.locationRepository.getLocation(data.venue.id);
                        _b = (_a = lodash_1.default).assign;
                        _c = [data];
                        _d = {};
                        return [4 /*yield*/, Promise.all(speakers)];
                    case 1:
                        _d.speakers = _e.sent();
                        return [4 /*yield*/, banner];
                    case 2:
                        _d.banner = _e.sent();
                        return [4 /*yield*/, venue];
                    case 3: return [2 /*return*/, _b.apply(_a, _c.concat([(_d.venue = _e.sent(),
                                _d.startTime = data.startTime.toDate(),
                                _d.endTime = data.endTime.toDate(),
                                _d)]))];
                }
            });
        });
    };
    return EventsRepository;
}());
exports.EventsRepository = EventsRepository;
//# sourceMappingURL=events.repository.js.map