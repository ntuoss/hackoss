"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var event_1 = require("./event");
exports.PREREQUISITE_CONSTRAINTS = {
    label: {
        presence: true,
    },
    proficiency: {
        presence: true,
        inclusion: event_1.PROFICIENCIES
    },
    referenceUrl: {
        presence: true,
        url: true
    }
};
exports.DEPENDENCY_CONSTRAINTS = {
    label: {
        presence: true,
    },
    specification: {
        presence: true,
    },
    referenceUrl: {
        presence: true,
        url: true
    }
};
exports.SPEAKER_CONSTRAINTS = {
    personId: {
        presence: true,
        personExists: true
    },
    organisationId: {
        presence: true,
        organisationExists: true
    },
    position: {
        presence: true
    }
};
exports.PUBLICATION_CONSTRAINTS = {
    status: {
        presence: true,
        inclusion: event_1.EVENT_STATUSES
    },
    url: {
        url: true
    }
};
exports.EVENT_CONSTRAINTS = {
    tgif: {
        presence: true,
        numericality: {
            onlyInteger: true,
        },
        tgifUnique: true
    },
    title: {
        presence: true,
        length: { maximum: 64 } // Facebook: 64, Eventbrite: 75
    },
    speakers: {
        presence: true,
        length: {
            minimum: 1,
            tooShort: 'needs to have at least 1 speaker',
        },
        array: {
            constraints: exports.SPEAKER_CONSTRAINTS
        }
    },
    tagline: {
        presence: true
    },
    bannerId: {
        presence: true,
        artworkExists: true
    },
    description: {
        presence: true
    },
    prerequisites: {
        presence: true,
        array: {
            constraints: exports.PREREQUISITE_CONSTRAINTS
        }
    },
    dependencies: {
        presence: true,
        array: {
            constraints: exports.DEPENDENCY_CONSTRAINTS
        }
    },
    promotion: {
        presence: true
    },
    venueId: {
        presence: true,
        locationExists: true
    },
    startTime: {
        presence: true,
        beforeTime: {
            timeAttribute: 'endTime'
        }
    },
    endTime: {
        presence: true,
        afterTime: {
            timeAttribute: 'startTime'
        }
    },
    githubUrl: {
        presence: true,
        url: true
    },
    status: {
        presence: true,
        inclusion: event_1.EVENT_STATUSES
    },
    isPublic: {
        presence: true
    },
    isExternal: {
        presence: true
    },
    hasFood: {
        presence: true
    },
    hasDrinks: {
        presence: true
    },
    remarks: {
        presence: true
    },
    eventbrite: {
        object: {
            constraints: exports.PUBLICATION_CONSTRAINTS
        }
    },
    facebook: {
        object: {
            constraints: exports.PUBLICATION_CONSTRAINTS
        }
    }
};
//# sourceMappingURL=event.constraints.js.map