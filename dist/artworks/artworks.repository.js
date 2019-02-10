"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var utils_1 = require("../utils");
var validate_js_1 = require("validate.js");
var lodash_1 = require("lodash");
var ARTWORKS_ORDER_KEY_PATH_MAP = {
    'title': 'title'
};
var ArtworksRepository = /** @class */ (function () {
    function ArtworksRepository(firebaseService, peopleRepository) {
        var _this = this;
        this.firebaseRepository = firebaseService;
        this.peopleRepository = peopleRepository;
        this.artworks = this.firebaseRepository.firestore.collection('artworks');
        validate_js_1.validators.artworkExists = function (artworkId) { return new Promise(function (resolve) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var doc;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.artworks.doc(artworkId).get()];
                    case 1:
                        doc = _a.sent();
                        if (doc.exists) {
                            resolve();
                        }
                        else {
                            resolve("Artwork with ID " + artworkId + " does not exist in Firebase");
                        }
                        return [2 /*return*/];
                }
            });
        }); }); };
    }
    ArtworksRepository.prototype.createArtwork = function (artwork) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var newArtwork;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newArtwork = {
                            title: artwork.title,
                            imageUrl: artwork.imageUrl,
                            eventbriteId: artwork.eventbriteId,
                            artist: this.peopleRepository.people.doc(artwork.artistId)
                        };
                        return [4 /*yield*/, this.artworks.add(newArtwork)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ArtworksRepository.prototype.getArtworks = function (filters, limit, orderBy, direction) {
        if (filters === void 0) { filters = []; }
        if (limit === void 0) { limit = 10; }
        if (orderBy === void 0) { orderBy = 'title'; }
        if (direction === void 0) { direction = 'asc'; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var orderByPath, results;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        orderByPath = ARTWORKS_ORDER_KEY_PATH_MAP[orderBy];
                        return [4 /*yield*/, utils_1.buildQuery(this.artworks, limit, orderByPath, direction, filters).get()];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, Promise.all(results.docs.map(function (doc) { return _this.toArtwork(utils_1.withId(doc.data(), doc.id)); }))];
                }
            });
        });
    };
    ArtworksRepository.prototype.getArtwork = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var ref, doc;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ref = this.artworks.doc(id);
                        return [4 /*yield*/, ref.get()];
                    case 1:
                        doc = _a.sent();
                        return [2 /*return*/, this.toArtwork(utils_1.withId(doc.data(), id))];
                }
            });
        });
    };
    ArtworksRepository.prototype.toArtwork = function (data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var artist, _a, _b, _c, _d;
            return tslib_1.__generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        artist = this.peopleRepository.getPerson(data.artist.id);
                        _b = (_a = lodash_1.default).assign;
                        _c = [data];
                        _d = {};
                        return [4 /*yield*/, artist];
                    case 1: return [2 /*return*/, _b.apply(_a, _c.concat([(_d.artist = _e.sent(),
                                _d)]))];
                }
            });
        });
    };
    return ArtworksRepository;
}());
exports.ArtworksRepository = ArtworksRepository;
//# sourceMappingURL=artworks.repository.js.map