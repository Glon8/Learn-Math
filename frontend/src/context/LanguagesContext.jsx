import { createContext, useContext, useState, useEffect } from 'react';
import { userContext } from './UserContext.jsx';

import axios from 'axios';

const LanguageContext = createContext();

export const LanguagesProvider = ({ children }) => {
    const { lang, pingSchedule } = userContext();

    const [useLanguage, setLanguage] = useState(null);

    const fetchLang = async (thing) => {
        await pingSchedule();

        // download package from the server and apply
        // ll be fetched as user is loaded
        // ll use users language, or use default "empty" user language - english. 

        if (!!thing) {
            try {
                const res = await axios.post(`${import.meta.env.VITE_BACKEND_API}/api/lang/get`, { language: thing });

                const data = res.data.data;

                setLanguage(data);

                console.log('Success: succed to fetch language');

                return;
            }
            catch (error) {
                console.log('Error: failed to fetch language: ' + error.mesage);

                setLanguage(null);

                return;
            }
        }

        setLanguage(null);

        console.log('Slipped off language: ' + thing);
    }


    useEffect(() => {
        const fetch = async () => {
            await fetchLang(lang);
        }

        fetch();
    }, [lang]);

    return (<LanguageContext.Provider
        value={{ language: useLanguage }}
    > {children}
    </LanguageContext.Provider>)
}

export const languageContext = () => useContext(LanguageContext);
