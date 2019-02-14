export const LOCATION_CONSTRAINTS = {
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
        presence: false
    },
    imageUrl: {
        presence: false,
        url: true
    },
    eventbriteId: {
        presence: false
    },
};
