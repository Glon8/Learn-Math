import { Flex, Text, Separator, useBreakpointValue, Button } from "@chakra-ui/react"
import "primeicons/primeicons.css";
import { useState } from "react";
import { callToast } from '../components/Toast.jsx'

import { verString, verEmail, verPassword } from '../util/Statics.js'
import { getTopicNames } from "../util/Statics.js";
import { userContext } from '../components/UserContext.jsx'

import TitleSlot from "../components/TitleSlot";
import Slot from "../components/Slot";
import CheckCard from '../components/CheckCard.jsx'
import FlexMenu from "../components/FlexMenu.jsx";
import GradesMenu from "../components/GradesMenu.jsx";
import PassSlot from "../components/PassSlot.jsx";

function ProfilePage() {
  const { user, stat, share,
    score, upUser, pos } = userContext();

  const [use_profile_edit, set_profile_edit] = useState(false);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(null);
  const [newPass, setNewPass] = useState(null);
  const [confPass, setConfPass] = useState(null);
  const [secQues, setSecQues] = useState(user.secret);
  const [secAns, setSecAns] = useState(user.answer);

  const [topic, setTopic] = useState(getTopicNames());

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
        if (user.password != password)
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

      <TitleSlot pi_icon={'pi-id-card'} title={'PROFILE'} />
      <Separator />
      <Slot value={user.name ? user.name : 'No User'}
        category={'Name'}
        edit={use_profile_edit}
        getValue={(thing) => setName(thing)}
      />
      {
        stat && user._id != null && user._id != 0 ?
          <Slot value={user.email ? user.email : null}
            placeholder={'-----'}
            category={'Email'}
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
        stat && user._id != null && user._id != 0 ?
          <PassSlot value={user.password ? user.password : null}
            placeholder={'-----'}
            category={use_profile_edit && stat ? 'New Password' : 'Password'}
            edit={use_profile_edit && stat ? true : false}
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
            category={'Secret Question'}
            edit={true}
            getValue={(thing) => setSecQues(thing)}
          /> : ''
      }
      {
        use_profile_edit && stat && user._id != null && user._id != 0 ?
          <Slot value={user.answer ? user.answer : ''}
            placeholder={'-----'}
            category={'Secret Answer'}
            getValue={(thing) => setSecAns(thing)}
            edit={true}
          /> : ''
      }
      <Slot value={!stat ? 'Local' : 'Online'} category={'Status'} />
      <Slot value={share ? 'Shared' : 'Not Shared'} category={'Scores'} />
      <Separator />
      <Flex gapY={3} flexDirection={"column"} textAlign={'center'}>

        {
          //< MENU throws out a toast!!!! as status is local
        }
        {
          !!stat ? (<FlexMenu pi_icon={'pi-book'}
            title={'Share my grades'}
            inner_title={'Are you sure?'}
            options={['NO', 'YES']}
            disabled={stat ? true : false}
            callToast={warningMes} />) :
            (<Button onClick={warningMes}
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
              <i className="pi pi-book" /><Text>Share my grades</Text>
            </Button>)
        }
        <CheckCard pi_icon={'pi-thumbtack'}
          title={'Edit Profile'}
          disabled={user._id != null ? false : true}
          ifChange={() => {
            set_profile_edit(!use_profile_edit);

            if (use_profile_edit) update();
          }} />

      </Flex>

    </Flex>
    <GradesMenu display={'flex'}
      title_type={useBreakpointValue({ base: 0, sm: 0, md: 0, lg: 0, xl: 1 })}
      pi_icon={'pi-trophy'}
      title={'PROGRESS'}
      title_info={{
        info_a: {
          pi_icon: 'pi-trophy',
          title: 'PROGRESS'
        },
        info_b: {
          pi_icon: 'pi-hashtag',
          title: 'Elementary-School'
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
          title: 'PROGRESS'
        },
        info_b: {
          pi_icon: 'pi-hashtag',
          title: 'High-School'
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