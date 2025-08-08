import { createContext, useContext, useState, useEffect } from 'react';
import { userContext } from './UserContext.jsx';
import { pingContext } from './PingContext';

import axios from 'axios';

const LanguageContext = createContext();

export const LanguagesProvider = ({ children }) => {
    const { lang, pop } = userContext();
    const { ping, wait, response } = pingContext();

    const [useLanguage, setLanguage] = useState(null);

    const fetchLang = async (thing) => {
        if (!response.current) {
            await ping();

            await wait(0.1);

            pop();

            await wait(30);
        }

        // download package from the server and apply
        // ll be fetched as user is loaded
        // ll use users language, or use default "empty" user language - english. 

        if (!!thing) {
            try {
                const res = await axios.post(`${import.meta.env.VITE_BACKEND_API}/api/lang/get`, { language: thing });

                const data = res.data.data;

                setLanguage(data);

                await wait(0.5);

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
            await wait(0.2);

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
