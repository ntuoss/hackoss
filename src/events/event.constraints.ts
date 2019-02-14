import { EVENT_STATUSES, PROFICIENCIES } from './event';

export const PREREQUISITE_CONSTRAINTS = {
	label: {
		presence: { allowEmpty: false }
	},
	proficiency: {
		presence: { allowEmpty: false },
		inclusion: PROFICIENCIES
	},
	referenceUrl: {
		presence: { allowEmpty: false },
		url: true
	}
};

export const DEPENDENCY_CONSTRAINTS = {
	label: {
		presence: { allowEmpty: false }
	},
	specification: {
		presence: { allowEmpty: false }
	},
	referenceUrl: {
		presence: { allowEmpty: false },
		url: true
	}
};

export const SPEAKER_CONSTRAINTS = {
	personId: {
		presence: { allowEmpty: false }
	},
	organisationId: {
		presence: { allowEmpty: false }
	},
	position: {
		presence: { allowEmpty: false }
	}
};

export const PUBLICATION_CONSTRAINTS = {
	status: {
		presence: { allowEmpty: false },
		inclusion: EVENT_STATUSES
	},
	url: {
		urlAllowEmpty: true
	}
};

export const EVENT_CONSTRAINTS = {
	tgif: {
		presence: { allowEmpty: false },
		numericality: {
			onlyInteger: true
		},
	},
	title: {
		presence: { allowEmpty: false },
		length: { maximum: 64 } // Facebook: 64, Eventbrite: 75
	},
	speakers: {
		presence: { allowEmpty: false },
		length: {
			minimum: 1,
			tooShort: 'needs to have at least 1 speaker'
		},
		array: {
			constraints: SPEAKER_CONSTRAINTS
		}
	},
	tagline: {
		presence: false
	},
	bannerId: {
		presence: { allowEmpty: false }
	},
	venueId: {
		presence: { allowEmpty: false }
	},
	description: {
		presence: { allowEmpty: false }
	},
	prerequisites: {
		array: {
			constraints: PREREQUISITE_CONSTRAINTS
		}
	},
	dependencies: {
		array: {
			constraints: DEPENDENCY_CONSTRAINTS
		}
	},
	promotion: {
		presence: { allowEmpty: false }
	},
	startTime: {
		presence: { allowEmpty: false },
		beforeTime: {
			timeAttribute: 'endTime'
		}
	},
	endTime: {
		presence: { allowEmpty: false },
		afterTime: {
			timeAttribute: 'startTime'
		}
	},
	githubUrl: {
		presence: false,
		urlAllowEmpty: true
	},
	status: {
		presence: { allowEmpty: false },
		inclusion: EVENT_STATUSES
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
		presence: false
	},
	eventbrite: {
		presence: false,
		object: {
			constraints: PUBLICATION_CONSTRAINTS
		}
	},
	facebook: {
		presence: false,
		object: {
			constraints: PUBLICATION_CONSTRAINTS
		}
	}
};
