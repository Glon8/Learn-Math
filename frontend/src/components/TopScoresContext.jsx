import { createContext, useContext, useState, useEffect } from 'react'

const TopScoresContext = createContext();

export const TopScoresProvider = ({ children }) => {
    const [useUsers, setUsers] = useState(null);
    const [useScores, setScores] = useState(null);

    // to consider to connect getTopUsers and getTopScores in one function, which fetches:
    // const Top = {users: [], scores: []}
    const fetchTop = () => {
        if (false) {
            // server
        }
        else return {
            users: [],
            scores: []
        }
    }

    const upTop = (token) => {
        // case: adding user in to top by his token, through server get request.
        // case 2: update useTop.

        // rule: user must be online.
    }

    const removeTop = (token) => {
        // case: adding user in to top by his token, through server get request.
        // case 2: update useTop.

        // rule: user must be online.
    }

    useEffect(() => {
        const topScores = fetchTop();

        setUsers(topScores.users);
        setScores(topScores.scores);
    }, []);

    return (<TopScoresContext.Provider
        value={{
            users: useUsers, scores: useScores,
            upTop, removeTop
        }}
    >
        {children}
    </TopScoresContext.Provider>)
}

export const topScoresContext = () => useContext(TopScoresContext);
