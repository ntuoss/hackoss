export const PERSON_CONSTRAINTS = {
    name: {
        presence: true
    },
    about: {
        presence: true
    },
    websiteUrl: {
        presence: false,
        url: true
    },
    avatarUrl: {
        presence: false,
        url: true
    },
    githubUrl: {
        presence: false,
        url: true
    }
};
