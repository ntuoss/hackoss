"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOCATION_CONSTRAINTS = {
    name: {
        presence: true
    },
    seatingCapacity: {
        presence: true,
        numericality: {
            onlyInteger: true,
            greaterThan: 0
        }
    },
    addressLine1: {
        presence: true
    },
    addressLine2: {
        presence: true
    },
    imageUrl: {
        presence: true,
        url: true
    },
    eventbriteId: {
        presence: true
    },
};
//# sourceMappingURL=location.constraints.js.map