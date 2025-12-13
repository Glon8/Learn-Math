import { Button, Flex, Separator, Text, Link } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { userContext } from "../../context/UserContext.jsx"
import { languageContext } from '../../context/LanguagesContext.jsx'
import { callToast } from '../Toast.jsx'

import { verString, verEmail, verPassword } from '../../util/Statics.js'

import Slot from '../slots/Slot.jsx'
import TitleSlot from '../slots/TitleSlot.jsx'
import CheckCard from '../CheckCard.jsx'
import SignFormLink from "./sub/SignFormLink.jsx"

function SignForm({ isIn, isUp, close }) {
  const { upUser, signUp, pos, signIn, lang, secret } = userContext();
  const { language, defPack } = languageContext();

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

  const comInputsList = [
    {
      req: !useIn,
      category: 'name',
      value: name,
      getValue: (value) => setName(value),
      maxLength: '',
    },
    {
      req: useOffline && useUp,
      value: language?.sign?.offlineExp ?? defPack.sign.offlineExp,
    },
    {
      req: !useOffline && (useUp || (useIn && !useReset) || (!!useReset && useIn && useReset === 1)),
      category: 'email',
      value: email,
      getValue: (value) => setEmail(value),
      maxLength: 32,
    },
    {
      req: !useOffline && (useUp || (useIn && !useReset)),
      category: 'password',
      value: password,
      getValue: (value) => setPassword(value),
      type: "password",
    },
    {
      req: !useOffline && useUp,
      category: 'confPassword',
      getValue: (value) => setConfPass(value),
      type: "password",
    },
  ];

  const advResetInputsList = [
    {
      category: 'secret',
      value: !!secQues ? secQues : (!!useReset ? (language?.sign?.secretPlaceholder ?? defPack.sign.secretPlaceholder) : secQues),
      getValue: (value) => setSecQues(value),
      edit: (!useReset ? true : false),
    },
    {
      category: 'answer',
      value: secAns,
      getValue: (value) => setSecAns(value),
    },
    {
      req: !!useReset && useReset == 2 && useIn,
      category: 'password',
      value: password,
      getValue: (value) => setPassword(value),
      type: "password",
      maxLength: 24,
    },
  ];

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
      else if (!useReset) {
        if (!password) {
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
      if (!useReset) {
        await upUser('email', email);
        await upUser('password', password);

        await signIn(email, password);
      }
      else if (!!useReset && useReset == 2)
        await signIn(email, password, false, false, secAns);
    }
    else if (useUp) {
      if (!useOffline) // sign up: online
        signUp(useOffline, name, email, password, secQues, secAns);
      else if (useOffline)  // sign up: offline and online
        await signUp(useOffline, name);
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

          <TitleSlot pi_icon={useIn ? 'pi-sign-in' : 'pi-user-edit'}
            title={
              useIn ? (!!useReset ? (language?.sign?.resetTitle ?? defPack.sign.resetTitle)
                : (language?.sign?.inTitle ?? defPack.sign.inTitle))
                : (language?.sign?.upTitle ?? defPack.sign.upTitle)
            } />
          <Button focusRing={'inside'}
            onClick={closeUP}
            _light={{
              background: "#8b8da0/20",
              borderColor: "#B1B7BA/10",
              focusRingColor: '#B1B7BA',
              color: '#1D282E/90'
            }}
            _dark={{
              background: "#1D282E",
              borderColor: "#1D282E",
              focusRingColor: '#B1B7BA',
              color: '#EEF6F9'
            }}
          ><i className="pi pi-times" /></Button>

        </Flex>
        <Separator marginTop={2} />
        {
          comInputsList.map((item, ind) => {
            if (!item.req) return null;
            if (ind !== 1) return (<Slot key={'cil' + ind} placeholder="-----"
              category={item.category ? language?.statics?.user?.[item.category] ?? defPack.statics.user?.[item.category] : ''}
              value={item.value ?? ''} getValue={item.getValue} edit type={item.type ?? ''} maxLength={item.maxLength ?? 24} />)
            else return (<Text key={'cil' + ind} textAlign={'center'} fontSize={'sm'} paddingX={3} paddingY={1}
              boxShadow={'sm'} rounded={'sm'} background={{ _dark: '#464547' }} color={{ _light: '#1D282E', _dark: '#EEF6F9' }}
            > {item.value} </Text>)
          })
        }
        {
          !useOffline && (useUp || useIn && !!useReset && useReset === 2) &&
          (<Flex flexDirection={'column'} gapY={3}>
            {advResetInputsList.map((item, ind) => {
              if (item.req === true || item.req === undefined)
                return (<Slot key={'aril' + ind} placeholder="-----"
                  category={item.category ? language?.statics?.user?.[item.category] ?? defPack.statics.user?.[item.category] : ''} value={item.value ?? ''}
                  getValue={item.getValue} edit={item.edit ?? true} type={item.type ?? ''} maxLength={item.maxLength ?? 32} />)
            })}
          </Flex>)
        }
      </Flex>
      <Flex w={'full'}
        flexDirection={'column'}
        gapY={3}>

        <Button focusRing={'inside'}
          onClick={() => {
            let flag = verify();

            if (!useReset) {
              if (flag && useOffline && useUp) callToast('Success', 'Local user created!', '', 'success', pos);
              if (flag) signHandle();
            }
            else {
              if (flag && !!useIn) {
                if (useReset === 1) {
                  const getQuestion = async () => {
                    const res = await secret(email);

                    if (!res) callToast('Error', 'No matching user! Check the email you wrote!', '', 'error', pos);
                    else { setSecQues(res?.secret); setReset(2); }
                  }

                  getQuestion();
                }
                if (useReset === 2) signHandle();
              }
            }
          }
          }
          _light={{
            background: "#8b8da0/20",
            borderColor: "#B1B7BA/10",
            focusRingColor: '#B1B7BA',
            color: '#1D282E/90'
          }}
          _dark={{
            background: "#1D282E",
            borderColor: "#1D282E",
            focusRingColor: '#B1B7BA',
            color: '#EEF6F9'
          }}
        >
          {language?.sign?.send ?? defPack.sign.send}
        </Button>
        <Separator />
        {
          useUp && (<CheckCard ifChange={() => { setOffline(!useOffline) }} pi_icon={'pi-thumbtack'} title={language?.sign?.offline ?? defPack.sign.offline} />)
        }
        {
          useIn && !useReset ? (<Flex flexDir={'column'}>

            <SignFormLink label={'signUpLabel'} value={'signUp'} onClick={() => { setIn(false); setUp(true); setReset(false); setOffline(false); }} />
            <SignFormLink label={'forgotPassLabel'} value={'forgotPass'} onClick={() => { setIn(true); setUp(false); setReset(1); setOffline(false); }} />

          </Flex>) : (<SignFormLink label={'signInLabel'} value={'signIn'} onClick={() => { setIn(true); setUp(false); setReset(false); setOffline(false); }} />)
        }
      </Flex>

    </Flex>

  </Flex >)
}

export default SignForm