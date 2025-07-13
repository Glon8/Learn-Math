"use client"
import { Button, Flex, Separator, Text, Link } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { userContext } from "./UserContext.jsx"

import Slot from './Slot.jsx'
import TitleSlot from './TitleSlot.jsx'
import CheckCard from './CheckCard.jsx'
import PassSlot from './PassSlot.jsx'

function SignForm({ isIn, isUp, close }) {
  const { upUser, up } = userContext();

  const [useOffline, setOffline] = useState(false);
  const [useIn, setIn] = useState(isIn ? isIn : false);
  const [useUp, setUp] = useState(isUp ? isUp : false);
  const [send, setSend] = useState(false);

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confPass, setConfPass] = useState(null);
  const [secQues, setSecQues] = useState(null);
  const [secAns, setSecAns] = useState(null);

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

  useEffect(() => {
    // <= validation!!!!
    if (useIn) {
      // sign in: online only
    }
    if (useUp) {
      // sign up: offline and online
      if (useOffline) {
        // sign up: offline
        upUser('_id', 0);
        upUser('name', name);
      }
      else {
        // sign up: online
        upUser('status', true);
        upUser('name', name);
        upUser('email', email);
        upUser('password', password);
        upUser('secret', secQues);
        upUser('answer', secAns);

        up();
      }
    }

    setOffline(false);
  }, [send]);

  return (<Flex w={'100vw'} h={'100vh'}
    position={'fixed'}
    justifyContent={'center'}
    alignItems={'center'}
    display={useIn || useUp ? 'flex' : 'none'}
    bg={'gray.800/10'}
    zIndex={5}
  >
    {
      // empty space tto track the click outside of the form
    }
    <Flex w={'full'} h={'full'}
      position={'fixed'}
      onClick={() => {
        close();
        setOffline(false);
      }}
      right={0}
      top={0}
      zIndex={10}></Flex>
    {
      // form itself
    }
    <Flex w={'auto'}
      minW={'25rem'}
      maxW={'30rem'}
      h={'fit'}
      minH={'25rem'}
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
      _dark={{}}>

      <Flex width={'full'}
        flexDirection={'column'}
        gapY={3}>

        <Flex justify={'space-between'}>

          <TitleSlot pi_icon={useIn ? 'pi-sign-in' : 'pi-user-edit'} title={`SIGN ${useIn ? 'IN' : 'UP'}`} />
          <Button focusRing={'inside'}
            onClick={() => {
              close();
              setOffline(false);
            }}
            _light={{
              background: "white",
              borderColor: "#B1B7BA/20",
              focusRingColor: '#B1B7BA',
              color: '#1D282E'
            }}
            _dark={{
            }}
          ><i className="pi pi-times" /></Button>

        </Flex>
        <Separator />
        {
          useOffline && useUp ? (<Flex flexDirection={'column'}
            gapY={5}>
            <Slot placeholder={'name'} category={'Name'} edit={true} getValue={(value) => setName(value)} />
            <Text textAlign={'center'}
              fontSize={'sm'}
              color={{ _light: '#1D282E', _dark: 'white' }}
            >To create an offline user email or password are not rquired.
              It will be stored in your cookies for a week, if you clear cookies or switch
              user, your progress will be gone. To save the progress, you can sign up as an online user.
            </Text>
          </Flex>) :
            (<Flex flexDirection={'column'}
              gapY={3}
            >
              <Slot placeholder={'name'} category={'Name'} edit={true} getValue={(value) => setName(value)} />
              <Slot placeholder={'email'} category={'Email'} edit={true} getValue={(value) => setEmail(value)} />
              <PassSlot placeholder={'password'} category={'Password'} edit={true} getValue={(value) => setPassword(value)} />
              <PassSlot placeholder={'confirm password'} category={'Confirm Password'} edit={true} getValue={(value) => setConfPass(value)} />
              <Slot placeholder={'secret question'} category={'Secret Question'} edit={true} getValue={(value) => setSecQues(value)} />
              <Slot placeholder={'answer to the question'} category={'Secret Answer'} edit={true} getValue={(value) => setSecAns(value)} />
            </Flex>)
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
            setSend(!send);
            close();
          }}
          _light={{
            background: "white",
            borderColor: "#B1B7BA/20",
            focusRingColor: '#B1B7BA',
            color: '#1D282E'
          }}
          _dark={{
          }}
        >Send</Button>
        {
          useUp ? (<CheckCard ifChange={() => { setOffline(!useOffline) }}
            pi_icon={'pi-thumbtack'}
            title={'Is OFFLINE user?'}
          />) : null
        }
        {
          useIn ? (<Text fontSize={'sm'}
            color={{ _light: '#1D282E', _dark: 'white' }}
          >
            Have no accout? <Link onClick={() => {
              setIn(false);
              setUp(true);
              setOffline(false);
              console.log('I need an account')
            }}>SIGN UP!</Link>
          </Text>) :
            (<Text fontSize={'sm'}
              color={{ _light: '#1D282E', _dark: 'white' }}
            >
              Have an accout already? <Link onClick={() => {
                setIn(true);
                setUp(false);
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