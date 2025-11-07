import { createContext, useContext, useState, useEffect } from 'react'
import { getUser, updateUser, updatePosition, updateStatus, updateLanguage, updateShared } from '../util/User.js'

const BackContext = createContext(null);

export const Context = ({ children }) => {
    const [user, setUser] = useState(null);
    const [pos, setPos] = useState(null);
    const [stat, setStat] = useState(null);
    const [lang, setLang] = useState(null);
    const [share, setShare] = useState(null);

    const upUser = (new_user) => {
        setUser(new_user);
        setPos(user.navPosition);
        setStat(user.status);
        setLang(user.language);
        setShare(user.shared);
        updateUser(new_user);
    }

    const upShare = (thing) => {
        setShare(thing);
        updateShared(thing);
        setUser(getUser());
    }

    const upLang = (thing) => {
        setLang(thing);
        updateLanguage(thing);
        setUser(getUser());
    }

    const upStat = (thing) => {
        setStat(thing);
        updateStatus(thing);
        setUser(getUser());
    }

    const upPos = (thing) => {
        setPos(thing);
        updatePosition(thing);
        setUser(getUser());
    }

    useEffect(() => {
        setUser(getUser());
        setPos(user.navPosition);
        setStat(user.status);
        setLang(user.language);
        setShare(user.shared);
    }, []);

    return (<BackContext.Provider
        value={{
            user, updateUser: upUser,
            pos, updatePosition: upPos,
            stat, updateStatus: upStat,
            lang, updatelanguage: upLang,
            share, updateShared: upShare
        }}>
        {children}
    </BackContext.Provider>)
}

export const context = useContext(BackContext);