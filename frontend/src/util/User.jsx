import { useState } from "react";

const [useToken, setToken] = useState(null);
const [useUser, setUser] = useState(null);
const [useScore, setScore] = useState(null);

export const update = () => {}

export const encrypt = () => {}

export const decrypt = () => {}

export const signUp = () => {}

export const signOut = () => {
    // case 1: set all properties of useToken, useUser and useScore to null.
    // case 2: force refresh the page.
    // case 3: navigate to main page.

    setToken(null);
    setUser(null);
    setScore(null);

    window.local.reload();

    // navigate to main page.
}

export const signIn = () => {}

export const getToken = () => {
    // case 1: check useToken, if exists return, else case 2.
    // case 2: check the cookies, if exists, update useToken and return, else return null.

    // rule: there no 100% connection between useToken and useUser.

    if(useToken != null) return useToken;
    else {
        // check the cookies here...
    }
}

export const getUser = () => {
    // case 1: check useUser, if exists return, else case 2.
    // case 2: check the cookies, if exists, update useUser(useUser & useScore) and return, else case 3. (offline user case)
    // case 3: check useToken, if exists fetch, update and return useUser, else case 4.
    // case 4: check cookies, if token exists, update useToken, fetch, update, and return useUser, else return null.

    // rule: useUser is a current user.
    // rule 2: if there no useUser, useToken is a current user.
    // rule 3: useScore is connected 100% to a useUser. (current user)

    if(useUser != null) return useUser;
}

export const getScore = () => {
    // case 1: check useScore, if exists return, else case 2.
    // case 2: check check cookies, if exists, update useScore(useScore & useUser) and return, else case 3. (offline user case)
    // case 3: check useToken, if exists fetch, update and return useScore, else case 4.
    // case 4: check cookies, if token exists, update useToken, fetch, update, and return useScore, else return null.

    // rule: useScore is connected 100% to a useUser. (current user)

    if(useScore != null) return useScore;
}

export const updateToken = (token) => {
    // case 1: set all properties of useToken, useUser and useScore to null.
    // case 2: update useToken.
    // case 3: update the cookies.

    // rule: if useToken isnt empty, then setting it up, ll cause to overwrite existing useToken, useUser and useScore.
    
    setToken(null);
    setUser(null);
    setScore(null);

    setToken(token);

    // update cookies here...
}

// to consider to connect updateUser and updateScore in one function, which fetches:
// const User = {user: {}, score: {}}

export const updateUser = (user) => {
    // case 1: update useUser.
    // case 2 - encryption: encrypt through server, get updated user and save it in cookies. (offline user)
    // case 3: use useToken, to call an update request and send the data to the server.

    // rule: updating useUser, doesnt connected to useScore.

    setUser(user);
}

export const updateScore = (score) => {
    // case 1: update useScore.
    // case 2 - encryption: encrypt through server, get updated user and save it in cookies. (offline user)
    // case 3: use useToken, to call an update request and send the data to the server.

    // rule: updating useScore, doesnt connected to useUser.

    setScore(score);
}
