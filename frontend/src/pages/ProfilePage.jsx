import { Flex, Text, Separator, useBreakpointValue, Button } from "@chakra-ui/react"
import "primeicons/primeicons.css";
import { useState, useEffect } from "react";
import { callToast } from '../components/Toast.jsx'

import { verString, verEmail, verPassword } from '../util/Statics.js'
import { topicNames } from "../util/Statics.js";
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
    del, upTop, outTop } = userContext();
  const { language } = languageContext();

  const [use_profile_edit, set_profile_edit] = useState(false);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(null);
  const [newPass, setNewPass] = useState(null);
  const [confPass, setConfPass] = useState(null);
  const [secQues, setSecQues] = useState(user.secret);
  const [secAns, setSecAns] = useState(user.answer);

  const [topic, setTopic] = useState(language?.statics?.topics ? language?.statics?.topics : topicNames);

  const update = () => {
    if (user.name != name) {
      if (!name)
        callToast('Error', 'New user name cannot be empty!', '', 'error', pos);
      else if (name.length < 2)
        callToast('Error', 'New user name minimum length is 2!', '', 'error', pos);
      else if (!verString(name))
        callToast('Error', 'User name invalid, allowed small, capital letters, and digits\r\nExample: Dana999', '', 'error', pos);
      else {
        upUser('name', name);

        callToast('Success', 'Name changed', '', 'success', pos);
      }
    }

    if (!!user._id && stat) {
      if (user.email != email) {
        if (!email)
          callToast('Error', 'New email cannot be empty!', '', 'error', pos);
        else if (email.length < 9)
          callToast('Error', 'New email minimum length is 9!', '', 'error', pos);
        else if (!verEmail(email))
          callToast('Error', 'Email invalid, allowed small, capital letters, and digits\r\nExample: amazing@gmail.com', '', 'error', pos);
        else {
          upUser('email', email);

          callToast('Success', 'Email changed', '', 'success', pos);
        }
      }

      if (!!password)
        if (!compare(password))
          callToast('Error', 'Current password must match!', '', 'error', pos);
        else if (password.length < 4)
          callToast('Error', 'Current password minimum length is 4!', '', 'error', pos);
        else if (!verPassword(password))
          callToast('Error', 'Password invalid, allowed: small, capital letters, digits and symbols\r\nExample: Dr552!@', '', 'error', pos);
        else {
          if (!newPass)
            callToast('Error', 'New password cannot be empty!', '', 'error', pos);
          else if (newPass.length < 4)
            callToast('Error', 'New password minimum length is 4!', '', 'error', pos);
          else if (password == newPass)
            callToast('Error', 'New password cannot match with old password!', '', 'error', pos);
          else if (!verPassword(newPass))
            callToast('Error', 'New password invalid, allowed: small, capital letters, digits and symbols\r\nExample: Dr552!@', '', 'error', pos);
          else {
            if (!confPass)
              callToast('Error', 'Confirmation password cannot be empty!', '', 'error', pos);
            else if (confPass.length < 4)
              callToast('Error', 'New password minimum length is 4!', '', 'error', pos);
            else if (confPass != newPass)
              callToast('Error', 'Confirmation password must match new password!', '', 'error', pos);
            else if (!verPassword(confPass))
              callToast('Error', 'Confirmation password invalid, allowed small, capital letters, digits and symbols\r\nExample: Dr552!@', '', 'error', pos);
            else {
              upUser(newPass);

              callToast('Success', 'Password changed changed', '', 'success', pos);
            }
          }
        }

      if (user.secret != secQues) {
        if (!secQues)
          callToast('Error', 'New secret question cannot be empty!', '', 'error', pos);
        else if (secQues.length < 2)
          callToast('Error', 'New secret question minimum length is 2!', '', 'error', pos);
        else if (!verString(secQues))
          callToast('Error', 'Secret question invalid, allowed small, capital letters, and digits\r\nExample: My age', '', 'error', pos);
        else {
          upUser('secret', secQues);

          callToast('Success', 'Secret question changed.', '', 'success', pos);
        }
      }

      if (user.answer != secAns) {
        if (!secAns)
          callToast('Error', 'New secret answer cannot be empty!', '', 'error', pos);
        else if (secAns.length < 2)
          callToast('Error', 'New secret answer minimum length is 2!', '', 'error', pos);
        else if (!verString(secAns))
          callToast('Error', 'Secret answer invalid, allowed small, capital letters, and digits\r\nExample: 6', '', 'error', pos);
        else {
          upUser('answer', secAns);

          callToast('Success', 'Secret answer changed.', '', 'success', pos);
        }
      }
    }
  }

  const warningMes = () => callToast('Info:', 'Unable to share your grades! Please make online account to do so! You can check your status in profile or top left corner menu!', '', '', pos);

  useEffect(() => {
    setTopic(language?.statics?.topics ? language?.statics?.topics : topicNames);
  }, [language]);

  return (<Flex gap={5} w={'100%'}
    h={useBreakpointValue({ lg: 'auto', xl: '100vh' })}
    justifyContent={'center'}
    alignItems={useBreakpointValue({ base: 'center', sm: 'center', md: 'center', lg: 'top' })}
    flexDirection={{ base: 'column', sm: 'column', md: 'column', lg: 'row' }}
    paddingLeft={pos === 'left' ? { base: '3rem', sm: '3rem', md: '3rem', lg: '5rem' } : ''}
    paddingRight={pos === 'right' ? { base: '3rem', sm: '3rem', md: '3rem', lg: '5rem' } : ''}
    paddingTop={pos === 'top' ? { base: '2.5rem', sm: '2.5rem', md: '2.5rem', lg: '10%' } : { md: '5%' }}
    paddingBottom={pos === 'bottom' ? { base: '2.5rem', sm: '2.5rem', md: '2.5rem', lg: '5rem' } : ''}>

    <Flex width={{ base: 'full', sm: '25rem' }} gapY={3} paddingX={5} paddingY={7}
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

      <TitleSlot pi_icon={'pi-id-card'} title={language?.profile?.profileTitle ? language?.profile?.profileTitle : 'PROFILE'} />
      <Separator />
      <Slot value={user.name ? user.name :
        (language?.statics?.error?.noUser ? language?.statics?.error?.noUser : 'User')}
        category={language?.statics?.user?.name ? language?.statics?.user?.name : 'Name'}
        edit={use_profile_edit}
        getValue={(thing) => setName(thing)}
      />
      {
        stat && user._id != null && user._id != 0 ?
          <Slot value={user.email ? user.email : null}
            placeholder={'-----'}
            category={language?.statics?.user?.email ? language?.statics?.user?.email : 'Email'}
            edit={use_profile_edit && stat ? true : false}
            getValue={(thing) => setEmail(thing)}
          /> : ''
      }
      {
        use_profile_edit && stat && user._id != null && user._id != 0 ?
          <PassSlot placeholder={'-----'}
            category={'Current Password'}
            edit={true}
            getValue={(thing) => setPassword(thing)}
          /> : ''
      }
      {
        use_profile_edit && stat && user._id != null && user._id != 0 ?
          <PassSlot placeholder={'-----'}
            category={'New Password'}
            edit={true}
            getValue={(thing) => setNewPass(thing)}
          /> : ''
      }
      {
        use_profile_edit && stat && user._id != null && user._id != 0 ?
          <PassSlot placeholder={'-----'}
            category={'Confirm Password'}
            edit={true}
            getValue={(thing) => setConfPass(thing)}
          /> : ''
      }
      {
        use_profile_edit && stat && user._id != null && user._id != 0 ?
          <Slot value={user.secret ? user.secret : ''}
            placeholder={'-----'}
            category={language?.statics?.user?.secret ? language?.statics?.user?.secret : 'Secret Question'}
            edit={true}
            getValue={(thing) => setSecQues(thing)}
          /> : ''
      }
      {
        use_profile_edit && stat && user._id != null && user._id != 0 ?
          <Slot value={user.answer ? user.answer : ''}
            placeholder={'-----'}
            category={language?.statics?.user?.answer ? language?.statics?.user?.answer : 'Secret Answer'}
            getValue={(thing) => setSecAns(thing)}
            edit={true}
          /> : ''
      }
      <Slot value={!stat ? (language?.statics?.user?.statusFalse ? language?.statics?.user?.statusFalse : 'Local') :
        (language?.statics?.user?.statusTrue ? language?.statics?.user?.statusTrue : 'Online')}
        category={language?.statics?.user?.status ? language?.statics?.user?.status : 'Status'} />
      <Slot value={share === 'true' || share === true ?
        (language?.statics?.user?.sharedTrue ? language?.statics?.user?.sharedTrue : 'Shared') :
        (language?.statics?.user?.sharedFalse ? language?.statics?.user?.sharedFalse : 'Not Shared')}
        category={language?.statics?.user?.shared ? language?.statics?.user?.shared : 'Scores'} />
      <Separator />
      <Flex gapY={3} flexDirection={"column"} textAlign={'center'}>
        {
          //< MENU throws out a toast!!!! as status is local
        }
        <CheckCard pi_icon={'pi-thumbtack'}
          title={language?.profile?.edit ? language?.profile?.edit : 'Edit Profile'}
          disabled={user._id != null ? false : true}
          ifChange={() => {
            set_profile_edit(!use_profile_edit);

            if (use_profile_edit) update();
          }} />
        {
          !!user._id ? (
            share === 'false' || share === false ? (<FlexMenu pi_icon={'pi-book'}
              title={language?.profile?.share ? language?.profile?.share : 'Share my grades to the top'}
              inner_title={language?.statics?.confirmation?.question ? language?.statics?.confirmation?.question : 'Are you sure?'}
              options={[
                { value: language?.statics?.confirmation?.false ? language?.statics?.confirmation?.false : 'NO' },
                { value: language?.statics?.confirmation?.true ? language?.statics?.confirmation?.true : 'YES', click: () => { upTop(); upUser('shared', true); } }]} />) :
              (<FlexMenu pi_icon={'pi-book'}
                title={language?.profile?.remove ? language?.profile?.remove : 'Withdraw my scores from the top'}
                inner_title={language?.statics?.confirmation?.question ? language?.statics?.confirmation?.question : 'Are you sure?'}
                options={[
                  { value: language?.statics?.confirmation?.false ? language?.statics?.confirmation?.false : 'NO' },
                  { value: language?.statics?.confirmation?.true ? language?.statics?.confirmation?.true : 'YES', click: () => { outTop(); upUser('shared', false); } }]} />)
          ) :
            (<Button onClick={warningMes}
              disabled={user._id === 0 ? false : true}
              width={'full'}
              flexDirection={'row'}
              gap={3}
              color={'black'}
              focusRing={'inside'}
              _light={{
                backgroundColor: 'white',
                borderColor: '#B1B7BA/20',
                focusRingColor: '#B1B7BA/20',
                color: '#1D282E'
              }}
              _dark={{
                background: "#1D282E",
                borderColor: "#1D282E",
                focusRingColor: '#B1B7BA',
                color: '#EEF6F9'
              }}>
              <i className="pi pi-book" /><Text>{language?.profile?.share ? language?.profile?.share : 'Share my grades to the top'}</Text>
            </Button>)
        }
        {
          user._id === 0 ? (<FlexMenu pi_icon={'pi-cloud-upload'}
            title={language?.profile?.convert ? language?.profile?.convert : 'Convert user to online'}
            inner_title={language?.statics?.confirmation?.question ? language?.statics?.confirmation?.question : 'Are you sure?'}
            options={[
              { value: language?.statics?.confirmation?.false ? language?.statics?.confirmation?.false : 'NO' },
              { value: language?.statics?.confirmation?.true ? language?.statics?.confirmation?.true : 'YES', click: () => { console.log('convert') } }]} />) : (
            !!user._id ? (<FlexMenu pi_icon={'pi-cloud-download'}
              title={language?.profile?.delete ? language?.profile?.delete : 'Delete user'}
              inner_title={language?.statics?.confirmation?.question ? language?.statics?.confirmation?.question : 'Are you sure?'}
              options={[
                { value: language?.statics?.confirmation?.false ? language?.statics?.confirmation?.false : 'NO' },
                { value: language?.statics?.confirmation?.true ? language?.statics?.confirmation?.true : 'YES', click: () => del() }]} />) : null
          )
        }

      </Flex>

    </Flex>
    <GradesMenu display={'flex'}
      title_type={useBreakpointValue({ base: 0, sm: 0, md: 0, lg: 0, xl: 1 })}
      pi_icon={'pi-trophy'}
      title={language?.profile?.progressTitle ? language?.profile?.progressTitle : 'GRADES'}
      title_info={{
        info_a: {
          pi_icon: 'pi-trophy',
          title: language?.profile?.progressTitle ? language?.profile?.progressTitle : 'GRADES'
        },
        info_b: {
          pi_icon: 'pi-hashtag',
          title: language?.profile?.elementarySchool ? language?.profile?.elementarySchool : 'Elementary-School'
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
          title: language?.profile?.progressTitle ? language?.profile?.progressTitle : 'GRADES'
        },
        info_b: {
          pi_icon: 'pi-hashtag',
          title: language?.profile?.highSchool ? language?.profile?.highSchool : 'High-School'
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