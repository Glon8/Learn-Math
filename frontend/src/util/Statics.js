const empty_user = {
    _id: null,
    status: false,
    shared: false,
    name: null,
    email: null,
    password: null,
    secret: null,
    answer: null,
    settings: [],
    mode: 'light',
    language: 'english',
    navPosition: 'top'
}

const empty_score = {
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

const topic_names = {
    sum_substract: 'sum & substract',
    multiply_divide: 'multiply & divide',
    mixed: 'mixed',
    power_root: 'power & root',
    fraction_fractionMixed: 'fractions',
    forms_sizes: 'forms & sizes',
    exam_basic: 'exam: basic',
    equasions_basic: 'equasions: basic',
    equations_two_more: 'equasions: two & more',
    verbal_problems: 'verbal problems',
    geometry: 'geometry',
    quadratic_equation: 'quadratic equation',
    circles: 'circles',
    exam_advanced: 'exam: advanced'
  };

export const getEmptyUser = () => {
    return empty_user;
}

export const getEmptyScore = () => {
    return empty_score;
}

export const getTopicNames = () => {
    return topic_names;
}