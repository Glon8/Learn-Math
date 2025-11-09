import axios from 'axios';
import { createContext, useContext, useState, useEffect } from 'react'
import { callToast } from '../components/Toast';
import { userContext } from './UserContext';
import { languageContext } from './LanguagesContext';

const TopScoresContext = createContext();

export const TopScoresProvider = ({ children }) => {
    const { pos, pingSchedule } = userContext();
    const { language, defPack } = languageContext();

    const [useUsers, setUsers] = useState(false);
    const [useScores, setScores] = useState(false);

    const fetchTop = async () => {
        await pingSchedule();

        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/api/top/get`);

            if (res?.data?.success) {
                const data = res.data.data;

                setUsers(data.users.reverse());
                setScores(data.scores);
            }
            else callToast('Info:', language?.topScores?.fetchingErr ?? defPack.topScores.fetchingErr, '', 'info', pos);
        }
        catch (error) {
            callToast('Info:', language?.topScores?.fetchingErr ?? defPack.topScores.fetchingErr, '', 'info', pos);
        }
    }

    useEffect(() => {
        const fetch = async () => {
            await fetchTop();
        }

        fetch();
    }, []);

    return (<TopScoresContext.Provider
        value={{ users: useUsers, scores: useScores }}
    >
        {children}
    </TopScoresContext.Provider>)
}

export const topScoresContext = () => useContext(TopScoresContext);
