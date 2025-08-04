"use client"
import { Button, Flex, Separator, Text, Link } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { userContext } from "../context/UserContext.jsx"
import { callToast } from './Toast.jsx'

import { verString, verEmail, verPassword } from '../util/Statics.js'

import Slot from './Slot.jsx'
import TitleSlot from './TitleSlot.jsx'
import CheckCard from './CheckCard.jsx'
import PassSlot from './PassSlot.jsx'

function SignForm({ isIn, isUp, close }) {
  const { upUser, signUp, pos, signIn } = userContext();

  const [useOffline, setOffline] = useState(false);
  const [useIn, setIn] = useState(isIn ? isIn : false);
  const [useUp, setUp] = useState(isUp ? isUp : false);
  const [useReset, setReset] = useState(false);

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confPass, setConfPass] = useState(null);
  const [secQues, setSecQues] = useState(null);
  const [secAns, setSecAns] = useState(null);

  const closeUP = () => {
    close();
    setOffline(false);
    setReset(false);

    setName(null);
    setEmail(null);
    setPassword(null);
    setConfPass(null);
    setSecQues(null);
    setSecAns(null);

    // <= visual glitch, problem within Slot, PassSlot, doesnt recieve live updates.
  }

  const verify = () => {
    let flag = true;

    if ((useOffline || useUp) && !useIn) {
      if (!name) {
        callToast('Error', 'User name cannot be empty!', '', 'error', pos);

        flag = false;
      }
      else if (name.length < 2) {
        callToast('Error', 'User name minimum length is 2!', '', 'error', pos);

        flag = false;
      }
      else if (!verString(name)) {
        callToast('Error', 'User name invalid, allowed small, capital letters, and digits\r\nExample: Dana999', '', 'error', pos);

        flag = false;
      }
    }
    if (flag && !useOffline && (useUp || useIn)) {
      if (!email) {
        callToast('Error', 'Email cannot be empty!', '', 'error', pos);

        flag = false;
      }
      else if (email.length < 9) {
        callToast('Error', 'Email minimum length is 9!', '', 'error', pos);

        flag = false;
      }
      else if (!verEmail(email)) {
        callToast('Error', 'Email invalid, allowed small, capital letters, and digits\r\nExample: amazing@gmail.com', '', 'error', pos);

        flag = false;
      }
      else if (!password) {
        callToast('Error', 'Password cannot be empty!', '', 'error', pos);

        flag = false;
      }
      else if (password.length < 4) {
        callToast('Error', 'Password minimum length is 4!', '', 'error', pos);

        flag = false;
      }
      else if (!verPassword(password)) {
        callToast('Error', 'Password invalid, allowed: small, capital letters, digits and symbols\r\nExample: Dr552!@', '', 'error', pos);

        flag = false;
      }
    }
    if (flag && !useOffline && useUp) {
      if (!confPass) {
        callToast('Error', 'Confirmation password cannot be empty!', '', 'error', pos);

        flag = false;
      }
      else if (confPass.length < 4) {
        callToast('Error', 'Confirmation password minimum length is 4!', '', 'error', pos);

        flag = false;
      }
      else if (password != confPass) {
        callToast('Error', 'Confirmation password must match the password!', '', 'error', pos);

        flag = false;
      }
      else if (!verPassword(confPass)) {
        callToast('Error', 'Confirmation password invalid, allowed small, capital letters, digits and symbols\r\nExample: Dr552!@', '', 'error', pos);

        flag = false;
      }
      if (!secQues) {
        callToast('Error', 'Secret question cannot be empty!', '', 'error', pos);

        flag = false;
      }
      else if (secQues.length < 2) {
        callToast('Error', 'Secret question minimum length is 2!', '', 'error', pos);

        flag = false;
      }
      else if (!verString(secQues)) {
        callToast('Error', 'Secret question invalid, allowed small, capital letters, and digits\r\nExample: My age', '', 'error', pos);

        flag = false;
      }
      else if (!secAns) {
        callToast('Error', 'Secret answer cannot be empty!', '', 'error', pos);

        flag = false;
      }
      else if (secAns.length < 2) {
        callToast('Error', 'Secret answer minimum length is 2!', '', 'error', pos);

        flag = false;
      }
      else if (!verString(secAns)) {
        callToast('Error', 'Secret answer invalid, allowed small, capital letters, and digits\r\nExample: 6', '', 'error', pos);

        flag = false;
      }
    }

    return flag;
  }

  const signHandle = async () => {
    if (useIn) { // sign in: online only
      await upUser('email', email);
      await upUser('password', password);

      await signIn(email, password);

      console.log('sign in');
    }
    else if (useUp) {
      if (!useOffline) { // sign up: online
        signUp(useOffline, name, email, password, secQues, secAns);

        console.log('sign up: online');
      }
      else if (useOffline) {  // sign up: offline and online
        await signUp(useOffline, name);

        console.log('sign up: offline');
      }
    }

    closeUP();
    setOffline(false);
  };

  useEffect(() => {
    setIn(isIn);
    setUp(isUp);

    setName(null);
    setEmail(null);
    setPassword(null);
    setConfPass(null);
    setSecQues(null);
    setSecAns(null);
  }, [isIn, isUp]);

  return (<Flex w={'100vw'} h={'100vh'}
    position={'fixed'}
    justifyContent={'center'}
    alignItems={'center'}
    display={useIn || useUp ? 'flex' : 'none'}
    bg='#1D282E/65'
    zIndex={5}
  >
    {
      // empty space tto track the click outside of the form
    }
    <Flex w={'full'} h={'full'}
      position={'fixed'}
      onClick={closeUP}
      right={0}
      top={0}
      zIndex={10} />
    {
      // form itself
    }
    <Flex w={'full'}
      maxW={'25rem'}
      h={'fit'}
      justify={'space-between'}
      align={'center'}
      border
      borderWidth={1}
      marginY={'10rem'}
      rounded={'xl'}
      flexDirection={'column'}
      paddingY={7}
      paddingX={5}
      zIndex={15}
      gap={3}
      _light={{
        borderColor: "#1D282E",
        backgroundColor: 'white'
      }}
      _dark={{
        background: '#8b8da0',
        borderColor: '#1D282E',
      }}>

      <Flex width={'full'}
        flexDirection={'column'}
        gapY={3}>

        <Flex justify={'space-between'}>

          <TitleSlot pi_icon={useIn ? 'pi-sign-in' : 'pi-user-edit'} title={`SIGN ${useIn ? 'IN' : 'UP'}`} />
          <Button focusRing={'inside'}
            onClick={closeUP}
            _light={{
              background: "white",
              borderColor: "#B1B7BA/20",
              focusRingColor: '#B1B7BA',
              color: '#1D282E'
            }}
            _dark={{
              background: "#1D282E",
              borderColor: "#1D282E",
              focusRingColor: '#B1B7BA',
              color: '#EEF6F9'
            }}
          ><i className="pi pi-times" /></Button>

        </Flex>
        <Separator />
        {
          useIn ? null : (<Slot placeholder={'name'}
            category={'Name'}
            edit={true}
            getValue={(value) => setName(value)}
          />)
        }
        {
          useOffline && useUp ? (
            <Text textAlign={'center'}
              fontSize={'sm'}
              color={{ _light: '#1D282E', _dark: '#EEF6F9' }}
            >To create an offline user email or password are not rquired.
              It will be stored in your cookies for a week, if you clear cookies or switch
              user, your progress will be gone. To save the progress, you can sign up as an online user.
            </Text>) : null}
        {
          !useOffline && (useUp || useIn && !useReset) ? (<Flex flexDirection={'column'}
            gapY={3}
          >

            <Slot placeholder={'email'}
              category={'Email'}
              edit={true}
              getValue={(value) => setEmail(value)}
              maxLength={32}
            />
            <PassSlot placeholder={'password'}
              category={'Password'}
              edit={true}
              getValue={(value) => setPassword(value)}
              maxLength={24}
            />

          </Flex>) : null
        }
        {
          !useOffline && useUp ? (
            <PassSlot placeholder={'confirm password'}
              category={'Confirm Password'}
              edit={true}
              getValue={(value) => setConfPass(value)}
              maxLength={24}
            />) : null
        }
        {
          !useOffline && (useUp || useIn && useReset) ? (<Flex flexDirection={'column'}
            gapY={3}
          >
            <Slot placeholder={'secret question'}
              category={'Secret Question'}
              edit={useReset ? false : true}
              value={useReset ? 'Some secret question' : ''}
              getValue={(value) => setSecQues(value)}
              maxLength={32}
            />
            <Slot placeholder={'answer to the question'}
              category={'Secret Answer'}
              edit={true}
              getValue={(value) => setSecAns(value)}
              maxLength={32}
            />

          </Flex>) : null
        }

      </Flex>
      <Flex w={'full'}
        flexDirection={'column'}
        gapY={3}>
        {
          // flex to hold the send button
        }
        <Separator />

        <Button focusRing={'inside'}
          onClick={() => {
            let flag = verify();

            if (flag && useOffline && useUp) callToast('Success', 'Local user created!', '', 'success', pos);

            if (flag) signHandle();
            //flag ? setSend(!send) : null;
          }}
          _light={{
            background: "white",
            borderColor: "#B1B7BA/20",
            focusRingColor: '#B1B7BA',
            color: '#1D282E'
          }}
          _dark={{
            background: "#1D282E",
            borderColor: "#1D282E",
            focusRingColor: '#B1B7BA',
            color: '#EEF6F9'
          }}
        >Send</Button>
        {
          useUp ? (<CheckCard ifChange={() => { setOffline(!useOffline) }}
            pi_icon={'pi-thumbtack'}
            title={'Is OFFLINE user?'}
          />) : null
        }
        {
          useIn ? (!useReset ? (<Flex flexDir={'column'}>

            <Text fontSize={'sm'}
              color={{ _light: '#1D282E', _dark: '#EEF6F9' }}
            >
              Have no accout? <Link onClick={() => {
                setIn(false);
                setUp(true);
                setReset(false);
                setOffline(false);
                console.log('I need an account')
              }}>SIGN UP!</Link>
            </Text>
            <Text fontSize={'sm'}
              color={{ _light: '#1D282E', _dark: '#EEF6F9' }}
            >Forgot password? <Link onClick={() => {
              setIn(true);
              setUp(false);
              setReset(true);
              setOffline(false);
              console.log('I need reset password')
            }}>RESET!</Link>
            </Text>

          </Flex>) : (<Text fontSize={'sm'}
            color={{ _light: '#1D282E', _dark: '#EEF6F9' }}
          >I wish to return to log-in! <Link onClick={() => {
            setIn(true);
            setUp(false);
            setReset(false);
            setOffline(false);
            console.log('I need get back to login')
          }}>LOG IN</Link>
          </Text>)) :
            (<Text fontSize={'sm'}
              color={{ _light: '#1D282E', _dark: '#EEF6F9' }}
            >
              Have an accout already? <Link onClick={() => {
                setIn(true);
                setUp(false);
                setReset(false);
                setOffline(false);
                console.log('I have an account')
              }}>SIGN IN!</Link>
            </Text>)
        }
      </Flex>

    </Flex>

  </Flex >)
}

export default SignForm