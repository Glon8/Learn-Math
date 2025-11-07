export const emptyUser = {
    _id: null,
    status: false,
    shared: false,
    name: null,
    email: null,
    password: null,
    secret: null,
    answer: null,
    settings: [true, true, false, false, false, false, false],
    mode: 'light',
    language: 'en',
    navPosition: 'top'
}

export const emptyScore = {
    _id: null,
    sum_substract: null,
    multiply_divide: null,
    mixed: null,
    power_root: null,
    fraction_fractionMixed: null,
    forms_sizes: null,
    exam_basic: null,
    equasions_basic: null,
    equations_two_more: null,
    verbal_problems: null,
    geometry: null,
    quadratic_equation: null,
    circles: null,
    exam_advanced: null
}

export const emptyLogs = {
    user: null,
    model: null
}

export const verString = (string) => {
    if (string != null) {
        if (string.trim() == "") return false;
        else if (string.length < 2) return false;
        else return !!string.match(/^[a-zA-Z0-9 \u0400-\u04FF\u0590-\u05FF]{2,24}$/);
    }
}

export const verEmail = (email) => {
    if (email != null) {
        if (email.trim() == "")
            return false;
        else if (email.length < 9) return false;
        else return !!email.match(/^[a-zA-Z0-9._%+-]{2,}@(gmail|outlook|hotmail|yahoo|icloud|aol|protonmail|zoho|mail|gmx|yandex|walla)\.(com|net|org|ru|co\.uk|co\.il|de|fr|eu|me)$/);
    }
}

export const verPassword = (password) => {
    if (password != null) {
        if (password.trim() == "")
            return false;
        else if (password.length < 4) return false;
        else return !!password.match(/^[a-zA-Z0-9!@#$%^&*]{4,32}$/);
    }
}
