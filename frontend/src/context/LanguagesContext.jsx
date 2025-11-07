import { createContext, useContext, useState, useEffect } from 'react';
import { userContext } from './UserContext.jsx';
import defaultPackage from '../default-lang/defaultPackage.js'
import { callToast } from '../components/Toast.jsx'

import axios from 'axios';

const LanguageContext = createContext();

export const LanguagesProvider = ({ children }) => {
    const { lang, pingSchedule, pos, } = userContext();

    const [useLanguage, setLanguage] = useState(null);

    //const [lock, setLock] = useState(false);

    const fetchLang = async (thing) => {
        await pingSchedule();

        // download package from the server and apply
        // ll be fetched as user is loaded
        // ll use users language, or use default "empty" user language - english.

        if (!!thing) {
            // deffault language
            if (thing == 'en') setLanguage(defaultPackage);
            else { // rest languages (downloaded from the server side)
                try {
                    const res = await axios.post(`${import.meta.env.VITE_BACKEND_API}/api/lang/get`, { language: thing });

                    const data = res.data.data;

                    setLanguage(data);

                    return;
                }
                catch (error) {
                    callToast('Info:', '\u{1F631} Failed to load language', '', 'info', pos);

                    return;
                }
            }
        }
        /*else { // <================== This part no needed, all hard coded translations must be linked to local default package through: localContext > default
            setLanguage(defaultPackage);

            callToast('Info:', '\u{1F601} Loaded default language', '', 'info', pos);
        }*/
    }


    useEffect(() => {
        const fetch = async () => {
            const timer = setTimeout(() => fetchLang(lang), 100);

            return () => clearTimeout(timer);
        }

        fetch();
    }, [lang]);

    return (<LanguageContext.Provider
        value={{ language: useLanguage, defPack: defaultPackage }}
    > {children}
    </LanguageContext.Provider>)
}

export const languageContext = () => useContext(LanguageContext);
