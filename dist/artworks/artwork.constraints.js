"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ARTWORK_CONSTRAINTS = {
    title: {
        presence: true
    },
    imageUrl: {
        presence: true,
        url: true
    },
    artistId: {
        presence: true,
        personExists: true
    },
    eventbriteId: {
        presence: true
    }
};
//# sourceMappingURL=artwork.constraints.js.map