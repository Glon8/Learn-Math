import "primeicons/primeicons.css";

import { languageContext } from '../../../context/LanguagesContext.jsx';

import TopicBut from "../TopicBut.jsx";

function SchoolsClasses({ type, onClick }) {
    const { language, defPack } = languageContext();

    const classesList = {
        'elementary': {
            'title': language?.schools?.elementarySchool ?? defPack.schools.elementarySchool,
            'passThrough': true,
            'dir': '',
        },
        'high': {
            'title': language?.schools?.highSchool ?? defPack.schools.highSchool,
            'passThrough': false,
            'dir': 'row-reverse',
        },
    };

    return (<TopicBut
        pi_icon={'pi-list-check'}
        title={classesList[type].title}
        onClick={() => { onClick(classesList[type].passThrough) ?? null }}
        showSub={true}
        dir={classesList[type].dir}
    />)
}

export default SchoolsClasses