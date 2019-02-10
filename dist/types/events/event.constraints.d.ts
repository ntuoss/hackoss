export declare const PREREQUISITE_CONSTRAINTS: {
    label: {
        presence: boolean;
    };
    proficiency: {
        presence: boolean;
        inclusion: import("./event").Proficiency[];
    };
    referenceUrl: {
        presence: boolean;
        url: boolean;
    };
};
export declare const DEPENDENCY_CONSTRAINTS: {
    label: {
        presence: boolean;
    };
    specification: {
        presence: boolean;
    };
    referenceUrl: {
        presence: boolean;
        url: boolean;
    };
};
export declare const SPEAKER_CONSTRAINTS: {
    personId: {
        presence: boolean;
        personExists: boolean;
    };
    organisationId: {
        presence: boolean;
        organisationExists: boolean;
    };
    position: {
        presence: boolean;
    };
};
export declare const PUBLICATION_CONSTRAINTS: {
    status: {
        presence: boolean;
        inclusion: import("./event").EventStatus[];
    };
    url: {
        url: boolean;
    };
};
export declare const EVENT_CONSTRAINTS: {
    tgif: {
        presence: boolean;
        numericality: {
            onlyInteger: boolean;
        };
        tgifUnique: boolean;
    };
    title: {
        presence: boolean;
        length: {
            maximum: number;
        };
    };
    speakers: {
        presence: boolean;
        length: {
            minimum: number;
            tooShort: string;
        };
        array: {
            constraints: {
                personId: {
                    presence: boolean;
                    personExists: boolean;
                };
                organisationId: {
                    presence: boolean;
                    organisationExists: boolean;
                };
                position: {
                    presence: boolean;
                };
            };
        };
    };
    tagline: {
        presence: boolean;
    };
    bannerId: {
        presence: boolean;
        artworkExists: boolean;
    };
    description: {
        presence: boolean;
    };
    prerequisites: {
        presence: boolean;
        array: {
            constraints: {
                label: {
                    presence: boolean;
                };
                proficiency: {
                    presence: boolean;
                    inclusion: import("./event").Proficiency[];
                };
                referenceUrl: {
                    presence: boolean;
                    url: boolean;
                };
            };
        };
    };
    dependencies: {
        presence: boolean;
        array: {
            constraints: {
                label: {
                    presence: boolean;
                };
                specification: {
                    presence: boolean;
                };
                referenceUrl: {
                    presence: boolean;
                    url: boolean;
                };
            };
        };
    };
    promotion: {
        presence: boolean;
    };
    venueId: {
        presence: boolean;
        locationExists: boolean;
    };
    startTime: {
        presence: boolean;
        beforeTime: {
            timeAttribute: string;
        };
    };
    endTime: {
        presence: boolean;
        afterTime: {
            timeAttribute: string;
        };
    };
    githubUrl: {
        presence: boolean;
        url: boolean;
    };
    status: {
        presence: boolean;
        inclusion: import("./event").EventStatus[];
    };
    isPublic: {
        presence: boolean;
    };
    isExternal: {
        presence: boolean;
    };
    hasFood: {
        presence: boolean;
    };
    hasDrinks: {
        presence: boolean;
    };
    remarks: {
        presence: boolean;
    };
    eventbrite: {
        object: {
            constraints: {
                status: {
                    presence: boolean;
                    inclusion: import("./event").EventStatus[];
                };
                url: {
                    url: boolean;
                };
            };
        };
    };
    facebook: {
        object: {
            constraints: {
                status: {
                    presence: boolean;
                    inclusion: import("./event").EventStatus[];
                };
                url: {
                    url: boolean;
                };
            };
        };
    };
};
