import { createContext, useContext, useState, useEffect } from 'react';
import { topicNames } from '../util/Statics.js';
import { userContext } from './UserContext.jsx';
import { pingContext } from './PingContext';

const LanguageContext = createContext();

export const LanguagesProvider = ({ children }) => {
    const { lang } = userContext();
    const { ping, wait, response } = pingContext();

    const [useLanguage, setLanguage] = useState(null);

    const fetchLang = async (thing) => {
        await wait(0.2);

        if (!response.current) {
            await ping();

            await wait(0.1);

            pop();

            await wait(30);
        }


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
