export const PERSON_CONSTRAINTS = {
    name: {
        presence: { allowEmpty: false }
    },
    about: {
        presence: { allowEmpty: false }
    },
    websiteUrl: {
        presence: false,
        urlAllowEmpty: true
    },
    avatarUrl: {
        presence: false,
        urlAllowEmpty: true
    },
    githubUrl: {
        presence: false,
        urlAllowEmpty: true
    }
};
