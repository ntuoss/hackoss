"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var utils_1 = require("../utils");
var validate_js_1 = require("validate.js");
var ORGANISATIONS_ORDER_KEY_PATH_MAP = {
    'name': 'name'
};
var OrganisationsRepository = /** @class */ (function () {
    function OrganisationsRepository(firebaseService) {
        var _this = this;
        this.firebaseRepository = firebaseService;
        this.organisations = this.firebaseRepository.firestore.collection('organisations');
        validate_js_1.validators.organisationExists = function (organisationId) { return new Promise(function (resolve) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var doc;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.organisations.doc(organisationId).get()];
                    case 1:
                        doc = _a.sent();
                        if (doc.exists) {
                            resolve();
                        }
                        else {
                            resolve("Organisation with ID " + organisationId + " does not exist in Firebase");
                        }
                        return [2 /*return*/];
                }
            });
        }); }); };
    }
    OrganisationsRepository.prototype.createOrganisation = function (organisation) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var newOrganisation;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newOrganisation = organisation;
                        return [4 /*yield*/, this.organisations.add(newOrganisation)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    OrganisationsRepository.prototype.getOrganisations = function (filters, limit, orderBy, direction) {
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
                        orderByPath = ORGANISATIONS_ORDER_KEY_PATH_MAP[orderBy];
                        return [4 /*yield*/, utils_1.buildQuery(this.organisations, limit, orderByPath, direction, filters).get()];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, results.docs.map(function (doc) { return _this.toOrganisation(utils_1.withId(doc.data(), doc.id)); })];
                }
            });
        });
    };
    OrganisationsRepository.prototype.getOrganisation = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var ref, doc;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ref = this.organisations.doc(id);
                        return [4 /*yield*/, ref.get()];
                    case 1:
                        doc = _a.sent();
                        return [2 /*return*/, this.toOrganisation(utils_1.withId(doc.data(), id))];
                }
            });
        });
    };
    OrganisationsRepository.prototype.toOrganisation = function (data) {
        return data;
    };
    return OrganisationsRepository;
}());
exports.OrganisationsRepository = OrganisationsRepository;
//# sourceMappingURL=organisations.repository.js.map