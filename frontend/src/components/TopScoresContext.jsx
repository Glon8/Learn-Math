import { createContext, useContext, useState, useEffect } from 'react'

const TopScoresContext = createContext();

export const TopScoresProvider = ({ children }) => {
    const [useUsers, setUsers] = useState(false);
    const [useScores, setScores] = useState(false);

    // to consider to connect getTopUsers and getTopScores in one function, which fetches:
    // const Top = {users: [], scores: []}

    const fetchTop = () => {
        if (false) {
            // server
        }
        else return ({
            users: [
                {
                    _id: 1111,
                    name: 'Jack'
                }
            ],
            scores: [
                {
                    _id: 1111,
                    sum_substract: 67,
                    multiply_divide: null,
                    mixed: null,
                    power_root: null,
                    fraction_fractionMixed: null,
                    forms_sizes: null,
                    exam_basic: null,
                    equasions_basic: null,
                    equations_two_more: null,
                    verbal_problems: null,
                    geometry: null,
                    quadratic_equation: null,
                    circles: null,
                    exam_advanced: null
                }
            ]
        })
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
        const fetch = async () => {
            const topScores = await fetchTop();

            setUsers(topScores.users);
            setScores(topScores.scores);
        }

        fetch();
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
