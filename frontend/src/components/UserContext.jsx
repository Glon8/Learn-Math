import { createContext, useContext, useState, useEffect } from 'react'
import { getEmptyUser, getEmptyScore } from '../util/Statics.js'
import { useNavigate } from 'react-router-dom'

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();

  const [loaded, setLoaded] = useState(false);
  const [useToken, setToken] = useState(false);
  const [useUser, setUser] = useState(false);
  const [useScore, setScore] = useState(false);

  //const encrypt = () => { }

  //const decrypt = () => { }

  const signUp = () => {
    if (useUser._id === null && useUser.status && !!useUser.name && !!useUser.email && !!useUser.password) {
      // < Online sign up

      // making a request with existing user (from usUser or cookies)
      // over writing token and user (useUser and cookies) with new id
    }
    else {
      upUser('_id', null);
      upUser('status', false);
      upUser('name', null);
      upUser('email', null);
      upUser('password', null);
      upUser('secret', null);
      upUser('answer', null);
    }
  }

  const signIn = () => {
    if (useUser._id === null && useUser.status && !!useUser.name && !!useUser.email && !!useUser.password) {
      // will pass the user data to the server side
      // server ll return the token with user data
      // token will manually overwritten in to, token, empty-user, empty-score
      // user data that comes from the server ll be passed directly to useUser, useScore, useToken  
    }
    else {
      upUser('_id', null);
      upUser('status', false);
      upUser('name', null);
      upUser('email', null);
      upUser('password', null);
    }
  }

  const signOut = () => {
    // update user in  the cookies
    setCookie(0, "learn_math_user", 'delete');

    // setting all the values to empty / null. (user out)
    setToken(false);
    setUser(getEmptyUser());
    setScore(getEmptyScore());

    navigate('/');
  }

  /*
  crypto js structure package:
  cookie:
  "learn_math_user" => {
    token: {server token}
    package: {encrypted user}
    key: {encryption key}
    }
  */

  const updateUser = () => {
    // update user in  the cookies
    if (!useToken && useUser._id === 0) // <=== must use cryptojs to make a light encryption
      setCookie(1, "learn_math_user", { token: useToken, user: useUser, score: useScore }); // <==== only if user is offline, or if online for token only!
    else {
      // update user in the db
      //console.log('must save in data base');
    }
    console.log('user update:\r\n');
    console.log(useUser);
  }

  const fetchUser = () => {
    const extractedUser = getCookie("learn_math_user"); // cookies pull

    console.log('fetch data print:')
    console.log(extractedUser)

    /*
    //checks for  encryptio included:

    if(extractedUser.key != null){
       // decrypt cookie and return its contains
    }
    else if(extractedUser.token != null) {
       // fetch user from the server
    }
    else retrn { // empty user return
      token: null,
      user: getEmptyUser(),
      score: getEmptyScore()
    }
    */

    if (extractedUser && (extractedUser.token || extractedUser.user._id !== null)) {
      if (!extractedUser.token && extractedUser.user._id === 0)
        return extractedUser; // cookies check
      else if (extractedUser.token != null && extractedUser.user._id === null) {
        // server pull request with token
        console.log('user online')
      }
    }
    else return { // empty user return
      token: null,
      user: getEmptyUser(),
      score: getEmptyScore()
    }
  }

  const upUser = (thing, newValue) => {
    setUser(prev => ({ ...prev, [thing]: newValue }));

    if (thing === '_id') setScore(prev => ({ ...prev, [thing]: newValue }));

    console.log("up user: " + thing + ": " + newValue)
  }

  const upScore = (thing, newScore) => {
    if (useScore[thing] === null) setScore(prev => ({ ...prev, [thing]: newScore }));
    else {
      // if score isnt empty, then func ll calculate the average and save it.
      const calc = (newScore + useScore[thing]) / 2;

      setScore(prev => ({ ...prev, [thing]: calc }));
    }
  }

  const getCookie = (cookieName) => {
    // getCookie returns varieble false as it returns empty!!!

    const cDecoded = decodeURIComponent(document.cookie);

    const cookieArr = cDecoded.split("; ");

    // returns the value from requested cookie (cookieName required).)
    if (cookieArr != null) {
      let cookie;

      cookieArr.forEach(el => {
        const splitCookies = el.split('=');

        if (splitCookies[0] == cookieName) cookie = JSON.parse(splitCookies[1]);
      }
      );

      return cookie != null ? cookie : false;
    }
  }

  const setCookie = (dateTerm, name, data) => {
    const JSONObj = JSON.stringify(data);

    const date = new Date();

    // === dateTerm === (0 - delete, else - 7 days)
    if (dateTerm == 0) date.setTime(date.getTime() - 1 * 24 * 60 * 60 * 1000);
    else date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);

    const expires = date.toGMTString();

    document.cookie = name + "=" + JSONObj + "; expires=" + expires + "; path=/";
  }

  useEffect(() => {
    // < make a validation only as data changes, to remove useless
    // reloads

    if ((useToken || (useUser._id === 0 && useUser.status === false)) && loaded) {
      console.log('data update: Updated')
      updateUser();
    }

    console.log("data update: It changed")

    setLoaded(true);
  }, [useToken, useUser, useScore]);

  useEffect(() => {
    const fetchData = async () => {
      const extractedUser = await fetchUser();

      setToken(extractedUser.token);
      setUser(extractedUser.user);
      setScore(extractedUser.score);
    }

    fetchData();
  }, []);

  return (<UserContext.Provider
    value={{
      user: useUser, upUser,
      pos: useUser.navPosition,
      stat: useUser.status,
      lang: useUser.language,
      share: useUser.shared,
      score: useScore, upScore,
      mode: useUser.mode, out: signOut,
      set: useUser.settings, up: signUp
    }}>
    {children}
  </UserContext.Provider>)
}

export const userContext = () => useContext(UserContext);

