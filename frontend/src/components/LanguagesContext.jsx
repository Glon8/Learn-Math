import { createContext, useContext, useState, useEffect } from 'react';
import { topicNames } from '../util/Statics.js';
import { userContext } from './UserContext.jsx';

const LanguageContext = createContext();

export const LanguagesProvider = ({ children }) => {
    const { lang } = userContext();

    const [useLanguage, setLanguage] = useState(null);

    const fetchLang = (thing) => {
        return null;
        // download package from the server and apply
        // ll be fetched as user is loaded
        // ll use users language, or use default "empty" user language - english. 
    }

    useState(() => {
        setLanguage(fetchLang(lang));
    }, [lang]);

    return (<LanguageContext.Provider
        value={{ lang: useLanguage }}
    > {children}
    </LanguageContext.Provider>)
}

export const languageContext = () => useContext(LanguageContext);
