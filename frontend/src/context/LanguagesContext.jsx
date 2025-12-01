import { createContext, useContext, useState, useEffect } from 'react';
import { userContext } from './UserContext.jsx';
import defaultPackage from '../default-lang/defaultPackage.js'
import { callToast } from '../components/Toast.jsx'

import axios from 'axios';

const LanguageContext = createContext();

export const LanguagesProvider = ({ children }) => {
    const { lang, pingSchedule, pos, setErrTran } = userContext();

    const [useLanguage, setLanguage] = useState(null);

    //const [lock, setLock] = useState(false);

    const fetchLang = async (thing) => {
        await pingSchedule();

        if (!!thing) {
            // deffault language
            if (thing == 'en') setLanguage(defaultPackage);
            else { // rest languages (downloaded from the server side)
                try {
                    const res = await axios.post(`${import.meta.env.VITE_BACKEND_API}/api/lang/get`, { language: thing });

                    const data = res.data.data;

                    setLanguage(data);

                    //setErrTran(data.);

                    return;
                }
                catch (error) {
                    callToast('Info:', useLanguage?.statics?.error?.langFetchErr ?? defaultPackage.statics.error.langFetchErr, '', 'info', pos);

                    return;
                }
            }
        }
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
