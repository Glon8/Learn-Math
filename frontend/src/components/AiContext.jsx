import { createContext, useContext, useState, useEffect } from 'react'

const AIContext = createContext();

export const AIProvider = ({ children }) => {
    const [useLogs, setLogs] = useState(null);

    const chatSend = async (userMessage) => { }

    useEffect(() => {
        const fetch = async () => {
            await getLogs();
        }

        fetch();
    }, []);

    return (<AIContext.Provider value={{ send: chatSend, logs: useLogs }}>
        {children}
    </AIContext.Provider>);
}

export const aiContext = () => useContext(AIContext);