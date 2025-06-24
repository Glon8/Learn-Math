import { useState } from "react"

const [useTop, setTop] = useState(null);

// to consider to connect getTopUsers and getTopScores in one function, which fetches:
// const Top = {topUsers: [], topScores: []}

export const getTop = () => {
    if (useTop != null) return useTop;
    else {
        // fetch the list from the server by get request.
        // update setTop.
        // return
    }
}

export const updateTop = (token) => {
    // case: adding user in to top by his token, through server get request.
    // case 2: update useTop.

    // rule: user must be online.
}

export const removeTop = (token) => {
    // case: adding user in to top by his token, through server get request.
    // case 2: update useTop.

    // rule: user must be online.
}
