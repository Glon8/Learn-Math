import { Flex, Text, Separator, useBreakpointValue } from "@chakra-ui/react"
import "primeicons/primeicons.css";
import { useState } from "react";

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
  const [password, setPassword] = useState(user.password);
  const [newPass, setNewPass] = useState(null);
  const [confPass, setConfPass] = useState(null);
  const [secQues, setSecQues] = useState(user.secret);
  const [secAns, setSecAns] = useState(user.answer);

  const [topic, setTopic] = useState(getTopicNames());

  const update = () => {
    //validation goes here HERE!!!

    user.name != name && name != null ? upUser('name', name) : null;
    user.email != email && name != null ? upUser('email', email) : null;
    user.password != newPass && name != null ? upUser('password', newPass) : null;
    user.secret != secQues && name != null ? upUser('secret', secQues) : null;
    user.answer != secAns && name != null ? upUser('answer', secAns) : null;
  }

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
        backgroundColor: 'white',
        borderColor: '#B1B7BA'
      }}
      _dark={{
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
        stat ?
          <Slot value={user.email ? user.email : null}
            placeholder={'-----'}
            category={'Email'}
            edit={use_profile_edit && stat ? true : false}
            getValue={(thing) => setEmail(thing)}
          /> : ''
      }
      {
        use_profile_edit && stat ?
          <PassSlot placeholder={'-----'}
            category={'Current Password'}
            edit={true}
            getValue={(thing) => setPassword(thing)}
          /> : ''
      }
      {
        stat ?
          <PassSlot value={user.password ? user.password : null}
            placeholder={'-----'}
            category={use_profile_edit && stat ? 'New Password' : 'Password'}
            edit={use_profile_edit && stat ? true : false}
            getValue={(thing) => setNewPass(thing)}
          /> : ''
      }
      {
        use_profile_edit && stat ?
          <PassSlot placeholder={'-----'}
            category={'Confirm Password'}
            edit={true}
            getValue={(thing) => setConfPass(thing)}
          /> : ''
      }
      {
        use_profile_edit && stat ?
          <Slot value={user.secret ? user.secret : ''}
            placeholder={'-----'}
            category={'Secret Question'}
            edit={true}
            getValue={(thing) => setSecQues(thing)}
          /> : ''
      }
      {
        use_profile_edit && stat ?
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
        <FlexMenu pi_icon={'pi-book'}
          title={'Share my grades'}
          inner_title={'Are you sure?'}
          options={['NO', 'YES']}
          disabled={stat ? true : false} />
        <CheckCard pi_icon={'pi-thumbtack'}
          title={'Edit Profile'}
          disabled={user._id != null ? false : true}
          ifChange={() => {
            set_profile_edit(!use_profile_edit);

            if (use_profile_edit) update();
          }} />
        <Text textAlign={'center'}
          color={{ _light: '#1D282E', _dark: '#EEF6F9' }}
        > (POPUP as error for local user)<br /> To share your grades, you must be an online user.<br />
          You can check the profile for your status <br /> or in right top corner menu.</Text>

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
          title: 'Teenage-School'
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