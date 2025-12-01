import "primeicons/primeicons.css";

import TopicBut from "../TopicBut"
import { languageContext } from "../../../context/LanguagesContext";

function SchoolNavigation({ dir, topic, onClick }) {
    const { language, defPack } = languageContext();

    return (<TopicBut key={topic[0]}
        pi_icon={'pi-hashtag'}
        title={topic[1]}
        onClick={() => { onClick() ?? null }}
        showSub={false}
        subTitle={language?.statics?.shortDesc?.[topic[0]] ??
            defPack?.statics?.shortDesc?.[topic[0]]}
        dir={dir ?? ''}
    />)
}

export default SchoolNavigation