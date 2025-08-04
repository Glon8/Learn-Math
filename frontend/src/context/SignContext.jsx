import { createContext, useContext, useState } from 'react'

import SignForm from '../components/SignForm';

const SignContext = createContext();

export const SignProvider = ({ children }) => {
    const [useSignUp, setSignUp] = useState(false);
    const [useSignIn, setSignIn] = useState(false);

    return (<SignContext.Provider
        value={{
            isIn: (thing) => setSignIn(thing),
            isUp: (thing) => setSignUp(thing)
        }}>

        {children}
        <SignForm isIn={useSignIn}
            isUp={useSignUp}
            close={() => {
                setSignIn(false);
                setSignUp(false);
            }}
            callToast={(title, desc, color) => {
                callToast(title, desc, color)
            }} />

    </SignContext.Provider>)
}

export const signContext = () => useContext(SignContext);