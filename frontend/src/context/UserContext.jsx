import { createContext, useContext, useState, useEffect, useRef } from 'react'
import { emptyUser, emptyScore, emptyLogs } from '../util/Statics.js'
import { useNavigate } from 'react-router-dom'
import CryptoJS from 'crypto-js'
import bcrypt from 'bcryptjs'
import { callToast, callLoadingToast } from '../components/Toast.jsx'
import axios from 'axios'
import { pingContext } from './PingContext';

const UserContext = createContext();

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
  logs: {
     user: 'user message',
     model: 'model message'
  }
  }
*/

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const { ping, wait, response } = pingContext();

  const [key, setKey] = useState(CryptoJS.lib.WordArray.random(32).toString());
  const [loaded, setLoaded] = useState(false);
  const [useToken, setToken] = useState(false);
  const [useUser, setUser] = useState(false);
  const [useScore, setScore] = useState(false);
  const [useLogs, setLogs] = useState(false);
  const pop = useRef(false);

  const getSecret = async (email) => {
    if (!!email) {
      await pingSchedule();

      try {
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_API}/api/user/secret`, { email: email });

        const data = res.data.data;

        if (data.secret) console.log('Password reset: Secret fetched successfully');

        return data;
      }
      catch (error) {
        console.log('Error accured during fetching secret: ' + error.message);

        callToast('Error:', error.message, '', 'error', useUser.navPosition);
      }
    }
  }

  const serverBootPop = () => {
    if (!pop.current) {
      pop.current = true;

      callLoadingToast({
        title: '', desc: 'Server is booting up, please give it a few seconds'
      }, 30, useUser.navPosition);

      setTimeout(() => { pop.current = false }, 30 * 1000);
    }
  }

  const pingSchedule = async () => {
    await wait(0.35);

    if (!response.current) {
      await ping();

      await wait(0.35);

      if (!response.current) {
        serverBootPop();

        await wait(30);
      }
    }
  }

  const chatSend = async (userMessage) => {
    if (!!userMessage && userMessage.length >= 2) {
      let res;

      await pingSchedule();

      try {
        callLoadingToast({
          title: '', desc: 'Teacher recieved your question, please wait!'
        }, 7, useUser.navPosition);

        if (!useLogs?.user) { // no saved logs found
          res = await axios.post(`${import.meta.env.VITE_BACKEND_API}/api/ai/ask`, { message: userMessage });
        }
        else { // found saved logs
          const message = [
            { role: 'user', parts: [{ text: useLogs.user }] },
            { role: 'model', parts: [{ text: useLogs.model }] },
            { role: 'user', parts: [{ text: userMessage }] }
          ];

          res = await axios.post(`${import.meta.env.VITE_BACKEND_API}/api/ai/ask`, { message: message });
        }

        setLogs({ user: userMessage, model: res.data.data });
        callToast('Success', 'Teacher responded on your question!', '', 'success', useUser.navPosition);
      }
      catch (error) {
        console.log('Error accured during sending user request to ai: ' + error.message);

        callToast('Error:', error.message, '', 'error', useUser.navPosition);
      }
    }
    else callToast('Error:', 'User must be at least two characters long!', '', 'error', useUser.navPosition);
  }

  const signOutfromTop = async () => {
    if (!!useToken) {
      await pingSchedule();

      try {
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_API}/api/top/remove`, { token: useToken });

        if (res.data?.success) callToast('Success:', 'User removed from top list!', '', 'success', useUser.navPosition);
        else {
          console.log('Error in sign out from top: ' + res?.data?.message);
          callToast('Error:', res?.data?.message, '', 'error', useUser.navPosition);
        }
      }
      catch (error) {
        console.log('Error in sign out from top: ' + error.message);
        callToast('Error:', 'Server failed to remove the user from the top list! Try again later!', '', 'error', useUser.navPosition);
      }
    }
  }

  const signUpToTop = async () => {
    if (!!useToken) {
      await pingSchedule();

      try {
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_API}/api/top/sign-up`, { token: useToken });

        if (res.data?.success) callToast('Success:', 'User sign up in to top list!', '', 'success', useUser.navPosition);
        else {
          console.log('Error in sign up to the top: ' + res?.data?.message);
          callToast('Error:', res?.data?.message, '', 'error', useUser.navPosition);
        }
      }
      catch (error) {
        console.log('Error in sign out from top: ' + error.message);
        callToast('Error:', 'Server failed to sign user to the top list! Try again later!', '', 'error', useUser.navPosition);
      }
    }
  }

  const deleteUser = async () => {
    if (!!useToken) {
      await pingSchedule();

      try {
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_API}/api/user/delete`, { token: useToken });

        if (res?.data?.success) {
          signOut();

          callToast('Success:', 'User has been deleted!', '', 'success', useUser.navPosition);
        }
        else {
          console.log('Error in deleting online user: ' + res?.data?.message);
          callToast('Error:', 'Server failed to delete the user! Try again later!', '', 'error', useUser.navPosition);
        }
      }
      catch (error) {
        console.log('Error in deleting online user: ' + error.message);
        callToast('Error:', 'Server failed to delete the user! Try again later!', '', 'error', useUser.navPosition);
      }
    }
    else callToast('Error:', 'No active user to delete!', '', 'error', useUser.navPosition);
  }

  const comparePassword = (thing) => {
    return bcrypt.compare(thing, useUser.password);
  }

  const signUp = async (offline, save, name, email, password, secQues, secAns, score) => {
    if (!offline) { // sign up: online
      password = await encrypt(password);
      secAns = await encrypt(secAns);

      const newUser = {
        _id: null,
        status: true,
        shared: false,
        name: name,
        email: email,
        password: password,
        secret: secQues,
        answer: secAns,
        settings: [],
        mode: useUser.mode,
        language: useUser.language,
        navPosition: useUser.navPosition
      }

      if (!!save && !!score) score._id = null;

      await pingSchedule();

      // request:
      try {
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_API}/api/user/sign-up`, {
          user: newUser,
          score: !!save ? score : useScore
        });

        if (res.data?.success) {
          const data = res.data.data;

          setToken(data.token);
          setUser(data.user);
          setScore(data.score);

          callToast('Success', 'New user created!', '', 'success', useUser.navPosition);

          setCookie(1, "learn_math_user", { token: data.token, package: null, key: null, logs: useLogs });
        }
        else callToast('Error:', res?.data?.message, '', 'error', useUser.navPosition);
      }
      catch (error) {
        console.log('Error during sign up: ' + error.message);
        callToast('Error:', error?.message, '', 'error', useUser.navPosition);
      }
    }
    else {  // sign up: offline
      await upUser('_id', 0);
      await upUser('name', name);

      console.log('sign up: offline');
    }
  }

  const signIn = async (email, password, token, logs, answer) => {
    await pingSchedule();

    try {
      let res;

      if (!!email && !!password && !answer) {
        password = await encrypt(password);

        res = await axios.post(`${import.meta.env.VITE_BACKEND_API}/api/user/sign-in`, {
          token: false,
          email: email,
          password: password,
          answer: false
        });
      }
      else if (!!token)
        res = await axios.post(`${import.meta.env.VITE_BACKEND_API}/api/user/sign-in`, {
          token: token,
          email: false,
          password: false,
          answer: false
        });
      else if (!!email && !!password && !!answer) {
        password = await encrypt(password);
        answer = await encrypt(answer);

        res = await axios.post(`${import.meta.env.VITE_BACKEND_API}/api/user/sign-in`, {
          token: false,
          email: email,
          password: password,
          answer: answer
        });
      }

      if (res.data?.success) {
        const data = res.data.data;

        // should add a pull for cookies to update users ui
        setToken(data.token);
        setUser(data.user);
        setScore(data.score);
        setLogs(logs);

        callToast('Success:', 'Signed in!', '', 'success', useUser.navPosition);

        if (!token) setCookie(1, "learn_math_user", { token: data.token, package: null, key: null, logs: emptyLogs });
        else setCookie(1, "learn_math_user", { token: token, package: null, key: null, logs: logs });
      }
      else callToast('Error:', res?.error?.message, '', 'error', useUser.navPosition);
    }
    catch (error) {
      console.log('Error during sign-in: ' + error.message);
      callToast('Error:', error?.message, '', 'error', useUser.navPosition);
    }
  }

  const signOut = () => {
    // update user in  the cookies
    setCookie(0, "learn_math_user", 'delete');

    // setting all the values to empty / null. (user out)
    setToken(false);
    setUser(emptyUser);
    setScore(emptyScore);
    setLogs(emptyLogs);

    navigate('/');
  }

  const updateUser = async () => {
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
        key: key,
        logs: useLogs
      }

      setCookie(1, "learn_math_user", message);
    }
    else { // update user in the db
      await pingSchedule();

      try {
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_API}/api/user/update`, {
          token: useToken,
          user: useUser,
          score: useScore
        });

        setCookie(1, "learn_math_user", { token: useToken, package: false, key: false, logs: useLogs });
        console.log('update: ' + res?.data?.success + ' message: ' + res?.data?.message);
      }
      catch (error) {
        console.log('Error during update: ' + error?.message);
        callToast('Error:', 'Server failed to save the changes, try again later!', '', 'error', useUser.navPosition);
      }
    }
  }

  const fetchUser = () => {
    const extractedUser = getCookie("learn_math_user"); // cookies pull

    console.log('fetch data print:')
    console.log(extractedUser);

    if (!!extractedUser && (!!extractedUser.token || !!extractedUser.key)) {
      if (!extractedUser.token && !!extractedUser.key) { // cookies check
        let unpackedUser = CryptoJS.AES.decrypt(extractedUser.package, extractedUser.key);

        unpackedUser = JSON.parse(unpackedUser.toString(CryptoJS.enc.Utf8));

        unpackedUser['token'] = extractedUser.token;
        unpackedUser['logs'] = extractedUser.logs;

        return unpackedUser;
      }
      else if (!!extractedUser.token && !extractedUser.key) { // server pull request with token
        signIn(false, false, extractedUser.token, extractedUser.logs, false);
      }
    }
    else return { // empty user return
      token: null,
      user: emptyUser,
      score: emptyScore,
      logs: emptyLogs
    }
  }

  const encrypt = async (thing) => {
    if (!!thing) {
      const salt = await bcrypt.genSalt(10);

      thing = thing.toString();

      thing = await bcrypt.hash(thing, salt);
    }

    return thing;
  }

  const upUser = async (thing, newValue) => {
    setUser(prev => ({ ...prev, [thing]: newValue }));

    if (thing === '_id') setScore(prev => ({ ...prev, [thing]: newValue }));
    else if (thing === 'password' || thing === 'answer') {
      newValue = await encrypt(newValue);

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
    const timer = setTimeout(() => {
      if ((!!useToken || (useUser._id === 0 && !useUser.status)) && loaded) {
        console.log('data update: Updated');
        updateUser();
      }

      console.log("data update: It changed");

      if (!loaded) setLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [useToken, useUser, useScore, useLogs]);

  useEffect(() => {
    const fetchData = async () => {
      await ping();

      const extractedUser = await fetchUser();

      if (!!extractedUser) {
        setToken(extractedUser.token);
        setUser(extractedUser.user);
        setScore(extractedUser.score);
        setLogs(extractedUser.logs);
      }
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
      compare: comparePassword, signIn,
      del: deleteUser, upTop: signUpToTop,
      outTop: signOutfromTop,
      logs: useLogs, send: chatSend,
      pop: serverBootPop, pingSchedule,
      secret: getSecret
    }}>
    {children}
  </UserContext.Provider>)
}

export const userContext = () => useContext(UserContext);

