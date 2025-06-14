"use client"
import { Button, Flex, Separator, Text, Link } from "@chakra-ui/react"
import { useEffect, useState } from "react"

import Slot from './Slot.jsx'
import TitleSlot from './TitleSlot.jsx'
import CheckCard from './CheckCard.jsx'

function SignForm({ isIn, isUp, close, callToast }) {
  // to call Toast use => callToast('Form status', 'status CLOSED', 'green');
  const [useOffline, setOffline] = useState(false);
  const [useIn, setIn] = useState(isIn ? isIn : false);
  const [useUp, setUp] = useState(isUp ? isUp : false);

  useEffect(() => {
    setIn(isIn);
    setUp(isUp);
  }, [isIn, isUp]);

  return (<Flex w={'100vw'} h={'100vh'}
    position={'absolute'}
    justifyContent={'center'}
    display={useIn || useUp ? 'flex' : 'none'}
    bg={'gray.800/10'}
    right={0}
    top={0}>

    {
      // empty space tto track the click outside of the form
    }
    <Flex w={'100vw'} h={'100vw'}
      position={'absolute'}
      onClick={() => {
        close();
        setOffline(false);
      }}
      right={0}
      top={0}
      zIndex={5}></Flex>

    {
      // form itself
    }
    <Flex w={'50%'} h={'fit'}
      maxW={'30rem'}
      minH={'25rem'}
      justify={'space-between'}
      align={'center'}
      border
      borderWidth={1}
      borderColor={'black'}
      marginY={'10rem'}
      bg={'white'}
      rounded={'xl'}
      flexDirection={'column'}
      paddingY={7}
      paddingX={5}
      zIndex={10}
      gap={3}>

      <Flex width={'full'}
        flexDirection={'column'}
        gapY={3}>
        {
          // flex to hold the inputs
          // MUST SUIT ONLINE AND OFFLINE USERS!!!
        }
        <Flex justify={'space-between'}>

          <TitleSlot pi_icon={useIn ? 'pi-sign-in' : 'pi-user-edit'} title={`SIGN ${useIn ? 'IN' : 'UP'}`} />
          <Button color={"black"}
            onClick={() => {
              close();
              setOffline(false);
            }}><i className="pi pi-times" /></Button>

        </Flex>
        <Separator />
        {
          useOffline && useUp ? (<Flex flexDirection={'column'}
            gapY={5}>
            <Slot value={'name'} category={'Name'} edit={true} />
            <Text textAlign={'center'}
              fontSize={'sm'}>To create offline user it not rquire password
              or email. It ll be stored in your cookies for a week,
              if you clear cookies or switch user, your progress ll be gone.
              To save the progress, you can sign up as online user.
            </Text>
          </Flex>) :
            (<Flex flexDirection={'column'}>
              <Slot value={'name'} category={'Name'} edit={true} />
              <Slot value={'email'} category={'Email'} edit={true} />
              <Slot value={'password'} category={'Password'} edit={true} />
              <Slot value={'confirm password'} category={'Confirm Password'} edit={true} />
              <Slot value={'secret question'} category={'Secret Question'} edit={true} />
              <Slot value={'answer on the question'} category={'Secret Answer'} edit={true} />
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

        <Button color={"black"} onClick={() => close()}>Send</Button>
        {
          useUp ? (<CheckCard ifChange={() => { setOffline(!useOffline) }}
            pi_icon={'pi-thumbtack'}
            title={'Is OFFLINE user?'}
          />) : null
        }
        {
          useIn ? (<Text fontSize={'sm'}>
            Have no accout? <Link onClick={() => {
              setIn(false);
              setUp(true);
              setOffline(false);
              console.log('I need an account')
            }}>SIGN UP!</Link>
          </Text>) :
            (<Text fontSize={'sm'}>
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

  </Flex>)
}

export default SignForm