import { Flex, Text, Separator, useBreakpointValue, Button } from "@chakra-ui/react"
import "primeicons/primeicons.css";
import { useState, useEffect } from "react";
import { callToast } from '../components/Toast.jsx'

import { verString, verEmail, verPassword } from '../util/Statics.js'
import { userContext } from '../context/UserContext.jsx'
import { languageContext } from '../context/LanguagesContext.jsx'

import TitleSlot from "../components/TitleSlot";
import Slot from "../components/Slot";
import CheckCard from '../components/CheckCard.jsx'
import FlexMenu from "../components/FlexMenu.jsx";
import GradesMenu from "../components/GradesMenu.jsx";
import PassSlot from "../components/PassSlot.jsx";

function ProfilePage() {
  const { user, stat, share,
    score, upUser, pos, compare,
    del, upTop, outTop, signUp } = userContext();
  const { language, defPack } = languageContext();

  const [use_profile_edit, set_profile_edit] = useState(false);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(null);
  const [newPass, setNewPass] = useState(null);
  const [confPass, setConfPass] = useState(null);
  const [secQues, setSecQues] = useState(user.secret);
  const [secAns, setSecAns] = useState(null);

  const [convert, setConvert] = useState(false);

  const [topic, setTopic] = useState(language?.statics?.topics ?? defPack.statics.topics);

  const update = () => {
    if (user.name != name) {
      if (!name) {
        callToast('Error', 'New user name cannot be empty!', '', 'error', pos);
        return;
      }
      else if (name.length < 2) {
        callToast('Error', 'New user name minimum length is 2!', '', 'error', pos);
        return;
      }
      else if (!verString(name)) {
        callToast('Error', 'User name invalid, allowed small, capital letters, and digits\r\nExample: Dana999', '', 'error', pos);
        return;
      }
      else {
        if (!convert) {
          upUser('name', name);

          callToast('Success', 'Name changed', '', 'success', pos);
        }
      }
    }

    if ((!!user._id && stat) || !!convert) {
      if (user.email != email) {
        if (!email) {
          callToast('Error', 'New email cannot be empty!', '', 'error', pos);
          return;
        }
        else if (email.length < 9) {
          callToast('Error', 'New email minimum length is 9!', '', 'error', pos);
          return;
        }
        else if (!verEmail(email)) {
          callToast('Error', 'Email invalid, allowed small, capital letters, and digits\r\nExample: amazing@gmail.com', '', 'error', pos);
          return;
        }
        else {
          if (!convert) {
            upUser('email', email);

            callToast('Success', 'Email changed', '', 'success', pos);
          }
        }
      }

      if (!!password) {
        if (!compare(password)) {
          callToast('Error', 'Current password must match!', '', 'error', pos);
          return;
        }
        else if (password.length < 4) {
          callToast('Error', 'Current password minimum length is 4!', '', 'error', pos);
          return;
        }
        else if (!verPassword(password)) {
          callToast('Error', 'Password invalid, allowed: small, capital letters, digits and symbols\r\nExample: Dr552!@', '', 'error', pos);
          return;
        }
      }

      if (!!password || !!convert) {
        if (!newPass) {
          callToast('Error', 'New password cannot be empty!', '', 'error', pos);
          return;
        }
        else if (newPass.length < 4) {
          callToast('Error', 'New password minimum length is 4!', '', 'error', pos);
          return;
        }
        else if (password == newPass) {
          callToast('Error', 'New password cannot match with old password!', '', 'error', pos);
          return;
        }
        else if (!verPassword(newPass)) {
          callToast('Error', 'New password invalid, allowed: small, capital letters, digits and symbols\r\nExample: Dr552!@', '', 'error', pos);
          return;
        }
        else {
          if (!confPass) {
            callToast('Error', 'Confirmation password cannot be empty!', '', 'error', pos);
            return;
          }
          else if (confPass.length < 4) {
            callToast('Error', 'New password minimum length is 4!', '', 'error', pos);
            return;
          }
          else if (confPass != newPass) {
            callToast('Error', 'Confirmation password must match new password!', '', 'error', pos);
            return;
          }
          else if (!verPassword(confPass)) {
            callToast('Error', 'Confirmation password invalid, allowed small, capital letters, digits and symbols\r\nExample: Dr552!@', '', 'error', pos);
            return;
          }
          else {
            if (!convert) {
              upUser(newPass);

              callToast('Success', 'Password changed', '', 'success', pos);
            }
          }
        }
      }

      if (user.secret != secQues || !!convert) {
        if (!secQues) {
          callToast('Error', 'New secret question cannot be empty!', '', 'error', pos);
          return;
        }
        else if (secQues.length < 2) {
          callToast('Error', 'New secret question minimum length is 2!', '', 'error', pos);
          return;
        }
        else if (!verString(secQues)) {
          callToast('Error', 'Secret question invalid, allowed small, capital letters, and digits\r\nExample: My age', '', 'error', pos);
          return;
        }
        else {
          if (!convert) {
            upUser('secret', secQues);

            callToast('Success', 'Secret question changed.', '', 'success', pos);
          }
        }
      }

      if ((!!secAns && user.answer != secAns) || (!!convert && !!secQues)) {
        if (!secAns) {
          callToast('Error', 'New secret answer cannot be empty!', '', 'error', pos);
          return;
        }
        else if (secAns.length < 2) {
          callToast('Error', 'New secret answer minimum length is 2!', '', 'error', pos);
          return;
        }
        else if (!verString(secAns)) {
          callToast('Error', 'Secret answer invalid, allowed small, capital letters, and digits\r\nExample: 6', '', 'error', pos);
          return;
        }
        else {
          if (!convert) {
            upUser('answer', secAns);

            callToast('Success', 'Secret answer changed.', '', 'success', pos);
          }
        }
      }

      if (!!convert) signUp(false, name, email, newPass, secQues, secAns);
    }
  }

  const warningMes = () => callToast('Info:', 'Unable to share your grades! Please make online account to do so! You can check your status in profile or top left corner menu!', '', '', pos);

  useEffect(() => {
    setTopic(language?.statics?.topics ?? defPack.statics.topics);
  }, [language]);

  useEffect(() => {
    if (user.name != name) setName(user.name);
    if (user.email != email) setEmail(user.email);
    if (user.secret != secQues) setSecQues(user.secret);
  }, [user.name, user.email, user.secret]);

  useEffect(() => {
    if (!use_profile_edit) {
      setPassword(null);
      setNewPass(null);
      setConfPass(null);
      setSecAns(null);
    }
  }, [use_profile_edit]);

  return (<Flex gap={5} w={'100%'}
    h={useBreakpointValue({ lg: 'auto', xl: '100vh' })}
    justifyContent={'center'}
    alignItems={useBreakpointValue({ base: 'center', sm: 'center', md: 'center', lg: 'top' })}
    flexDirection={{ base: 'column', sm: 'column', md: 'column', lg: 'row' }}
    paddingLeft={pos === 'left' ? { base: '3rem', sm: '3rem', md: '3rem', lg: '5rem' } : ''}
    paddingRight={pos === 'right' ? { base: '3rem', sm: '3rem', md: '3rem', lg: '5rem' } : ''}
    paddingTop={!pos || pos === 'top' ? { base: '2.5rem', sm: '2.5rem', md: '2.5rem', lg: '10%' } : { md: '5%' }}
    paddingBottom={pos === 'bottom' ? { base: '2.5rem', sm: '2.5rem', md: '2.5rem', lg: '5rem' } : ''}>

    <Flex width={{ base: 'full', sm: '25rem' }}
      gapY={5}
      paddingX={5}
      paddingY={7}
      alignSelf={'top'}
      h={'fit'}
      flexDirection={"column"}
      rounded={"xl"}
      borderWidth={1}
      textAlign={'center'}
      _light={{
        boxShadow: 'lg',
        backgroundColor: 'white',
        borderColor: '#B1B7BA'
      }}
      _dark={{
        boxShadow: '0 0 2rem 0.5rem rgb(238, 246, 249)',
        background: '#8b8da0',
        borderColor: '#1D282E'
      }}>

      <TitleSlot pi_icon={'pi-id-card'} title={language?.profile?.profileTitle ?? defPack.profile.profileTitle} />
      <Separator />
      <Slot value={user.name ?? (language?.statics?.error?.noUser ?? defPack.statics.error.noUser)}
        category={language?.statics?.user?.name ?? defPack.statics.user.name}
        edit={use_profile_edit}
        getValue={(thing) => setName(thing)}
      />
      {
        (stat && !!user._id) || !!convert ?
          <Slot value={user.email ?? null}
            placeholder={'-----'}
            category={language?.statics?.user?.email ?? defPack.statics.user.email}
            edit={(use_profile_edit && stat) || !!convert ? true : false}
            getValue={(thing) => setEmail(thing)}
          /> : ''
      }
      {
        use_profile_edit && stat && !!user._id ?
          <PassSlot placeholder={'-----'}
            category={'Current Password'}
            edit={true}
            getValue={(thing) => setPassword(thing)}
          /> : ''
      }
      {
        (use_profile_edit && stat && !!user._id) || !!convert ?
          <PassSlot placeholder={'-----'}
            category={'New Password'}
            edit={true}
            getValue={(thing) => setNewPass(thing)}
          /> : ''
      }
      {
        (use_profile_edit && stat && !!user._id) || !!convert ?
          <PassSlot placeholder={'-----'}
            category={'Confirm Password'}
            edit={true}
            getValue={(thing) => setConfPass(thing)}
          /> : ''
      }
      {
        (use_profile_edit && stat && !!user._id) || !!convert ?
          <Slot value={user.secret ?? ''}
            placeholder={'-----'}
            category={language?.statics?.user?.secret ?? defPack.statics.user.secret}
            edit={true}
            getValue={(thing) => setSecQues(thing)}
          /> : ''
      }
      {
        (use_profile_edit && stat && !!user._id) || !!convert ?
          <Slot placeholder={'-----'}
            category={language?.statics?.user?.answer ?? defPack.statics.user.answer}
            getValue={(thing) => setSecAns(thing)}
            edit={true}
          /> : ''
      }
      <Slot value={!stat ? (language?.statics?.user?.statusFalse ?? defPack.statics.user.statusFalse) :
        (language?.statics?.user?.statusTrue ?? defPack.statics.user.statusTrue)}
        category={language?.statics?.user?.status ?? defPack.statics.user.status} />
      <Slot value={share === 'true' || share === true ?
        (language?.statics?.user?.sharedTrue ?? defPack.statics.user.sharedTrue) :
        (language?.statics?.user?.sharedFalse ?? defPack.statics.user.sharedFalse)}
        category={language?.statics?.user?.shared ?? defPack.statics.user.shared} />
      <Separator />
      <Flex gapY={3} flexDirection={"column"} textAlign={'center'}>
        {
          //< MENU throws out a toast!!!! as status is local
        }
        <CheckCard pi_icon={'pi-thumbtack'}
          title={language?.profile?.edit ?? defPack.profile.edit}
          disabled={user._id != null ? false : true}
          ifChange={() => {
            set_profile_edit(!use_profile_edit);

            if (use_profile_edit) update();
          }} />
        {
          !!user._id ? (
            share === 'false' || share === false ? (<FlexMenu pi_icon={'pi-book'}
              title={language?.profile?.share ?? defPack.profile.share}
              inner_title={language?.statics?.confirmation?.question ?? language.statics.confirmation.question}
              options={[
                { value: language?.statics?.confirmation?.false ?? defPack.statics.confirmation.false },
                { value: language?.statics?.confirmation?.true ?? defPack.statics.confirmation.true, click: () => { upTop(); upUser('shared', true); } }]} />) :
              (<FlexMenu pi_icon={'pi-book'}
                title={language?.profile?.remove ?? defPack.profile.remove}
                inner_title={language?.statics?.confirmation?.question ?? defPack.statics.confirmation.question}
                options={[
                  { value: language?.statics?.confirmation?.false ?? defPack.statics.confirmation.false },
                  { value: language?.statics?.confirmation?.true ?? defPack.statics.confirmation.true, click: () => { outTop(); upUser('shared', false); } }]} />)
          ) :
            (<Button onClick={warningMes}
              disabled={user._id === 0 ? false : true}
              width={'full'}
              flexDirection={'row'}
              gap={3}
              color={'black'}
              focusRing={'inside'}
              _light={{
                backgroundColor: '#8b8da0/20',
                borderColor: '#B1B7BA/10',
                focusRingColor: '#B1B7BA/20',
                color: '#1D282E/90'
              }}
              _dark={{
                background: "#1D282E",
                borderColor: "#1D282E",
                focusRingColor: '#B1B7BA',
                color: '#EEF6F9'
              }}>
              <i className="pi pi-book" /><Text>{language?.profile?.share ?? defPack.profile.share}</Text>
            </Button>)
        }
        {
          user._id === 0 ? (<FlexMenu pi_icon={'pi-cloud-upload'}
            onClick={() => setConvert(true)}
            title={language?.profile?.convert ?? defPack.profile.convert}
            inner_title={language?.statics?.confirmation?.question ?? defPack.statics.confirmation.question}
            options={[
              { value: language?.statics?.confirmation?.false ?? defPack.statics.confirmation.false, click: () => setConvert(false) },
              { value: language?.statics?.confirmation?.true ?? defPack.statics.confirmation.true, click: () => { update(); setConvert(false); } }]} />) : (
            !!user._id ? (<FlexMenu pi_icon={'pi-cloud-download'}
              title={language?.profile?.delete ?? defPack.profile.delete}
              inner_title={language?.statics?.confirmation?.question ?? defPack.statics.confirmation.question}
              options={[
                { value: language?.statics?.confirmation?.false ?? defPack.statics.confirmation.false },
                { value: language?.statics?.confirmation?.true ?? defPack.statics.confirmation.true, click: () => del() }]} />) : null
          )
        }

      </Flex>

    </Flex>
    <GradesMenu display={'flex'}
      title_type={useBreakpointValue({ base: 0, sm: 0, md: 0, lg: 0, xl: 1 })}
      pi_icon={'pi-trophy'}
      title={language?.profile?.progressTitle ?? defPack.profile.progressTitle}
      title_info={{
        info_a: {
          pi_icon: 'pi-trophy',
          title: language?.profile?.progressTitle ?? defPack.profile.progressTitle
        },
        info_b: {
          pi_icon: 'pi-hashtag',
          title: language?.profile?.elementarySchool ?? defPack.profile.elementarySchool
        }
      }}
      topic_names={topic}
      my_scores={score}
      size={useBreakpointValue({ base: 1, sm: 1, md: 1, lg: 1, xl: 0 })}
      part={0}
    />

    <GradesMenu display={{ base: 'none', sm: 'none', md: 'none', lg: 'none', xl: 'flex' }}
      title_type={1}
      title_info={{
        info_a: {
          pi_icon: 'pi-trophy',
          title: language?.profile?.progressTitle ?? defPack.profile.progressTitle
        },
        info_b: {
          pi_icon: 'pi-hashtag',
          title: language?.profile?.highSchool ?? defPack.profile.highSchool
        }
      }}
      topic_names={topic}
      my_scores={score}
      size={0}
      part={1}
    />

  </Flex>)
}

export default ProfilePage