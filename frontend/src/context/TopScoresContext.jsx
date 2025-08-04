import axios from 'axios';
import { createContext, useContext, useState, useEffect } from 'react'
import { callToast } from '../components/Toast';
import { userContext } from './UserContext';
import { pingContext } from './PingContext';

const TopScoresContext = createContext();

export const TopScoresProvider = ({ children }) => {
    const { pos, pop } = userContext();
    const { ping, wait, response } = pingContext();

    const [useUsers, setUsers] = useState(false);
    const [useScores, setScores] = useState(false);

    const fetchTop = async () => {
        if (!response.current) {
            await ping();

            await wait(0.1);

            pop();

            await wait(30);
        }

        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/api/top/get`);

            if (res?.data?.success) {
                const data = res.data.data;

                setUsers(data.users.reverse());
                setScores(data.scores);
            }
            else {
                console.log('Error in loading top: ' + res?.data?.message);
                callToast('Error:', res?.data?.message, '', 'error', pos);
            }
        }
        catch (error) {
            console.log('Error in loading top: ' + error.message);
            callToast('Error:', 'Server Failed to load the top list!\r\nPlease try again later!', '', 'error', pos);
        }
    }

    useEffect(() => {
        const fetch = async () => {
            await wait(0.2);

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
