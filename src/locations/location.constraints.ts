export const LOCATION_CONSTRAINTS = {
	name: {
		presence: { allowEmpty: false }
	},
	seatingCapacity: {
		presence: { allowEmpty: false },
		numericality: {
			onlyInteger: true,
			greaterThan: 0
		}
	},
	addressLine1: {
		presence: { allowEmpty: false }
	},
	addressLine2: {
		presence: false
	},
	imageUrl: {
		presence: false,
		urlAllowEmpty: true
	},
	eventbriteId: {
		presence: false
	}
};
