import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { emptyUser, emptyScore, emptyLogs } from '../util/Statics.js';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import bcrypt from 'bcryptjs';
import { callToast, callLoadingToast } from '../components/Toast.jsx';
import axios from 'axios';
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
  const lock = useRef(true);

  const [useErrTran, setErrTran] = useState({});

  const getSecret = async (email) => {
    if (!!email) {
      await pingSchedule();

      try {
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_API}/api/user/secret`, { email: email });

        const data = res.data.data;

        return data;
      }
      catch (error) {
        callToast('Info:', '\u{1F628} Error accured during fetching secret', '', 'info', useUser.navPosition);
      }
    }
  }

  const serverBootPop = () => {
    if (!pop.current) {
      pop.current = true;

      callLoadingToast({
        title: '', desc: '\u{1F916} Server is booting up, please give it a few seconds...'
      }, 90, useUser.navPosition);

      setTimeout(() => { pop.current = false }, 30 * 1000);
    }
  }

  const pingSchedule = async () => {
    if (lock.current) {
      lock.current = false;

      await wait(0.35);

      if (!response.current) {
        callToast('Info:', 'Server not responded, please wait! \u{1F605} Pinging again...', '', 'info', useUser.navPosition);

        await ping();

        await wait(0.35);

        if (!response.current) {
          callToast('Info:', <>Hi! The free Render plan I’m using may take up to <b>90 seconds</b> to wake up &#x1F616;, please be patient.</>, '', 'info', useUser.navPosition);

          serverBootPop();

          await wait(90);

          await ping();

          await wait(0.35);

          if (!response.current) callToast('Error:', 'Connection failed! \u{1F613} Try again later!', '', 'info', useUser.navPosition);
          else callToast('', 'Connection restored!', '', 'success', useUser.navPosition);
        }
        else callToast('', 'Connection restored!', '', 'success', useUser.navPosition);
      }

      lock.current = true;
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
        callToast('Info:', '\u{1F605} Error accured during sending user request to ai', '', 'info', useUser.navPosition);
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
          callToast('Info:', '\u{1F62C} Error in sign out from top', '', 'info', useUser.navPosition);
        }
      }
      catch (error) {
        callToast('Info:', '\u{1F62C} Error in sign out from top', '', 'info', useUser.navPosition);
      }
    }
  }

  const signUpToTop = async () => {
    if (!!useToken) {
      await pingSchedule();

      try {
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_API}/api/top/sign-up`, { token: useToken });

        if (res.data?.success) callToast('Success:', 'User sign up to top list!', '', 'success', useUser.navPosition);
        else callToast('Info:', '\u{1F626} Error in sign up to the top', '', 'info', useUser.navPosition);
      }
      catch (error) {
        callToast('Info:', '\u{1F626} Error in sign up to the top', '', 'info', useUser.navPosition);
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
          callToast('Info:', '\u{1F61F} Error in deleting online user', '', 'info', useUser.navPosition);
        }
      }
      catch (error) {
        callToast('Info:', '\u{1F61F} Error in deleting online user', '', 'info', useUser.navPosition);
      }
    }
    else callToast('Error:', 'No active user to delete!', '', 'error', useUser.navPosition);
  }

  const comparePassword = (thing) => {
    return bcrypt.compare(thing, useUser.password);
  }

  const signUp = async (offline, name, email, password, secQues, secAns) => {
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

      const eScore = emptyScore;

      eScore.userId = null;

      await pingSchedule();

      // request:
      try {
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_API}/api/user/sign-up`, {
          user: newUser,
          score: eScore,
        });

        if (res.data?.success) {
          const data = res.data.data;

          setToken(data.token);
          setUser(data.user);
          setScore(data.score);

          callToast('Success', 'New user created!', '', 'success', useUser.navPosition);

          setCookie(1, "learn_math_user", { token: data.token, package: null, key: null, logs: useLogs });
        }
        else callToast('Info:', '\u{1F633} Error during sign up', '', 'info', useUser.navPosition);
      }
      catch (error) {
        callToast('Info:', '\u{1F633} Error during sign up', '', 'info', useUser.navPosition);
      }
    }
    else {  // sign up: offline
      await upUser('_id', 0);
      await upUser('name', name);
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
      else callToast('Info:', '\u{1F615} Error during sign-in', '', 'info', useUser.navPosition);
    }
    catch (error) {
      callToast('Info:', '\u{1F615} Error during sign-in', '', 'info', useUser.navPosition);
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
        });

        setCookie(1, "learn_math_user", { token: useToken, package: false, key: false, logs: useLogs });
      }
      catch (error) {
        callToast('Info:', '\u{1F625} Error during user update', '', 'info', useUser.navPosition);
      }
    }
  }

  const fetchUser = () => {
    // cookies pull
    const extractedUser = getCookie("learn_math_user");

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
  }

  const upScore = (thing, newScore) => {
    if (!useScore?.[thing]) setScore(prev => ({ ...prev, [thing]: newScore }));
    else {
      // if score isnt empty, then func ll calculate the average and save it.
      const calc = (newScore + useScore[thing]) / 2;

      setScore(prev => ({ ...prev, [thing]: calc }));
    }
  }

  const repAns = async (ans, token, theme) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_API}/api/user/ans-rep`, {
        token: token,
        answers: ans,
        theme: theme,
      });
    }
    catch (error) {
      callToast('Info:', '\u{1F613} Error during answer report', '', 'info', useUser.navPosition);
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
      if ((!!useToken || (useUser._id === 0 && !useUser.status)) && loaded) updateUser();

      if (!loaded) setLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [useToken, useUser, useScore, useLogs]);

  useEffect(() => {
    const fetchData = async () => {
      await ping();

      await pingSchedule();

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
      secret: getSecret, token: useToken,
      repAns, setErrTran
    }}>
    {children}
  </UserContext.Provider>)
}

export const userContext = () => useContext(UserContext);

