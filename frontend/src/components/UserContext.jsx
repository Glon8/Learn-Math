import { createContext, useContext, useState, useEffect } from 'react'
import { getEmptyUser, getEmptyScore } from '../util/Statics.js'
import { useNavigate } from 'react-router-dom'
import CryptoJS from 'crypto-js'
import bcrypt from 'bcryptjs'

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();

  const [key, setKey] = useState(CryptoJS.lib.WordArray.random(32).toString());
  const [loaded, setLoaded] = useState(false);
  const [useToken, setToken] = useState(false);
  const [useUser, setUser] = useState(false);
  const [useScore, setScore] = useState(false);

  const comparePassword = (thing) => {
    return bcrypt.compare(thing, useUser.password);
  }

  const signUp = async (offline, name, email, password, secQues, secAns) => {
    if (!offline) { // sign up: online
      await upUser('status', true);
      await upUser('name', name);
      await upUser('email', email);
      await upUser('password', password);
      await upUser('secret', secQues);
      await upUser('answer', secAns);

      console.log('sign up: online');

      console.log(useUser);
    }
    else {  // sign up: offline and online
      await upUser('_id', 0);
      await upUser('name', name);

      console.log('sign up: offline');
    }
  }

  const signIn = (email, password) => {
    console.log('sign in');
    console.log('sign in email: ' + email);
    console.log('sign in password: ' + password);

    //  no need to save the email and password locally,
    //  because server ll make an update as it recieve the credentials.
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
  "learn_math_user" = (URI)(JSON.stringify){
    token: {server token}
    package: {
      (encrypted: cryptojs)
      user: useUser
      score: useScore
    }
    key: {
      (cryptojs random key)
      encryption key
    }
    }
  */

  const updateUser = () => {
    // update user in  the cookies
    if (!useToken && useUser._id === 0) {
      const box = {
        user: useUser,
        score: useScore
      }

      // making object box as string, and encrypting using cryptojs.
      const message = {
        token: useToken,
        package: CryptoJS.AES.encrypt(JSON.stringify(box), key).toString(),
        key: key
      }

      setCookie(1, "learn_math_user", message); // <==== only if user is offline, or if online for token only!
    }
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
    console.log(extractedUser);

    if (extractedUser && (!!extractedUser.token || !!extractedUser.key)) {
      if (!extractedUser.token && !!extractedUser.key) { // cookies check
        let unpackedUser = CryptoJS.AES.decrypt(extractedUser.package, extractedUser.key);

        unpackedUser = JSON.parse(unpackedUser.toString(CryptoJS.enc.Utf8));

        unpackedUser['token'] = extractedUser.token;

        return unpackedUser;
      }
      else if (!!extractedUser.token && !extractedUser.key) {
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

  const upUser = async (thing, newValue) => {
    setUser(prev => ({ ...prev, [thing]: newValue }));

    if (thing === '_id') setScore(prev => ({ ...prev, [thing]: newValue }));
    else if (thing === 'password') {
      if (!!newValue) {
        const salt = await bcrypt.genSalt(3);

        newValue = newValue.toString();

        newValue = await bcrypt.hash(newValue, salt);
      }
      setUser(prev => ({ ...prev, [thing]: newValue }));
    }

    console.log("up user: " + thing + ": " + useUser[thing])
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
    const cookieArr = document.cookie.split("; ");

    // returns the value from requested cookie (cookieName required).)
    if (cookieArr != null) {
      let cookie;

      cookieArr.forEach(el => {
        const splitCookies = el.split('=');

        if (splitCookies[0] == cookieName)
          cookie = JSON.parse(decodeURIComponent(splitCookies[1]));
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

    document.cookie = name + "=" + encodeURIComponent(JSONObj) + "; expires=" + expires + "; path=/";
  }

  useEffect(() => {
    if ((useToken || (useUser._id === 0 && useUser.status === false)) && loaded) {
      console.log('data update: Updated')
      updateUser();
    }

    console.log("data update: It changed");

    if (!loaded) setLoaded(true);
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
      set: useUser.settings, signUp,
      compare: comparePassword, signIn
    }}>
    {children}
  </UserContext.Provider>)
}

export const userContext = () => useContext(UserContext);

