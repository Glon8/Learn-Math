import { createContext, useContext, useState, useRef } from 'react';
import axios from 'axios';

const PingContext = createContext();

export const PingProvider = ({ children }) => {
    const [useDelay, setDelay] = useState(false);
    const [useRes, setRes] = useState(false);

    const response = useRef(false);
    const attemptRef = useRef(null);

    const wait = (s) => new Promise(res => setTimeout(res, s * 1000));

    const ping = async () => {
        if (!useDelay) {
            setDelay(true); // sealing the enterance

            // setting timer for 15 minutes
            setTimeout(() => {
                setDelay(false);
                response.current = false;
            }, (15 * 60 * 1000));

            // if there a few requests at once, it ll run only one ping and one timer, for the last one.
            if (attemptRef.current)
                clearTimeout(attemptRef.current);

            await new Promise((resolve) => {
                attemptRef.current = setTimeout(async () => {
                    try {
                        const res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/api/util/ping`);

                        response.current = true;
                    }
                    catch (error) {
                        response.current = false;
                    }

                    setRes(response.current != useRes);

                    resolve();
                });
            }, (1 * 1000));
        }
    }

    return (<PingContext.Provider
        value={{
            ping, response,
            wait, useRes
        }}>
        {children}
    </PingContext.Provider>);
}

export const pingContext = () => useContext(PingContext);