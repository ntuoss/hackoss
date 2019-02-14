export const ARTWORK_CONSTRAINTS = {
	title: {
		presence: { allowEmpty: false }
	},
	imageUrl: {
		presence: { allowEmpty: false },
		url: true
	},
	artistId: {
		presence: { allowEmpty: false }
	},
	eventbriteId: {
		presence: false
	}
};
