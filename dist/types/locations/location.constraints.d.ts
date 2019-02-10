export declare const LOCATION_CONSTRAINTS: {
    name: {
        presence: boolean;
    };
    seatingCapacity: {
        presence: boolean;
        numericality: {
            onlyInteger: boolean;
            greaterThan: number;
        };
    };
    addressLine1: {
        presence: boolean;
    };
    addressLine2: {
        presence: boolean;
    };
    imageUrl: {
        presence: boolean;
        url: boolean;
    };
    eventbriteId: {
        presence: boolean;
    };
};
