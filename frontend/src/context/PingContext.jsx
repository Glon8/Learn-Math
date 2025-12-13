import { createContext, useContext, useState, useRef } from 'react';
import axios from 'axios';

const PingContext = createContext();

export const PingProvider = ({ children }) => {
    const [useRes, setRes] = useState(false);

    const response = useRef(false);
    const isDelayed = useRef(false);
    const isPinging = useRef(false);

    const wait = (s) => new Promise(res => setTimeout(res, s * 1000));

    const ping = async () => {
        // check if there active ping or timer
        if (!!isPinging.current || !!isDelayed.current) return;

        // sealing the enterance - by ping
        isPinging.current = true;

        //ping to server
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/api/util/ping`);

            response.current = true;
        }
        catch (error) {
            response.current = false;
        }

        setRes(response.current != useRes);

        // set timer only if ping is succeed
        if (!!response.current) {
            // setting timer for 15 minutes
            setTimeout(() => {
                isDelayed.current = false;
                response.current = false;
            }, (15 * 60 * 1000));

            // sealing the enterance - by timer
            isDelayed.current = true;
        }

        // release the pinging lock
        isPinging.current = false;
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