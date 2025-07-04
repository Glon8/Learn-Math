import { Center, Flex, Text, Separator, useBreakpointValue } from "@chakra-ui/react"
import "primeicons/primeicons.css";
import { useState } from "react";

import { userContext } from '../components/UserContext.jsx'

import TitleSlot from "../components/TitleSlot";
import Slot from "../components/Slot";
import CheckCard from '../components/CheckCard.jsx'
import FlexMenu from "../components/FlexMenu.jsx";
import GradesMenu from "../components/GradesMenu.jsx";
import PassSlot from "../components/PassSlot.jsx";

function ProfilePage() {
  const { user, stat, share,
    score, upUser } = userContext();

  const [use_profile_edit, set_profile_edit] = useState(false);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [newPass, setNewPass] = useState(null);
  const [confPass, setConfPass] = useState(null);
  const [secQues, setSecQues] = useState(user.secret);
  const [secAns, setSecAns] = useState(user.answer);

  const update = () => {
    //validation goes here HERE!!!

    user.name != name ? upUser('name', name) : null;
    user.email != email ? upUser('email', email) : null;
    user.password != newPass ? upUser('password', newPass) : null;
    user.secret != secQues ? upUser('secret', secQues) : null;
    user.answer != secAns ? upUser('answer', secAns) : null;
  }

  const topic_names = {
    sum_substract: 'sum & substract',
    multiply_divide: 'multiply & divide',
    mixed: 'mixed',
    power_root: 'power & root',
    fraction_fractionMixed: 'fractions',
    forms_sizes: 'forms & sizes',
    exam_basic: 'exam: basic',
    equasions_basic: 'equasions: basic',
    equations_two_more: 'equasions: two & more',
    verbal_problems: 'verbal problems',
    geometry: 'geometry',
    quadratic_equation: 'quadratic equation',
    circles: 'circles',
    exam_advanced: 'exam: advanced'
  };

  return (<Center paddingTop={'3rem'}
    paddingX={'20%'}
    paddingY={'10%'}>
    <Flex gap={5}
      flexDirection={{ sm: 'column', md: 'column', lg: 'row' }}>

      <Flex height={'fit'} width={'25rem'} gapY={3} paddingX={5} paddingY={7}
        flexDirection={"column"}
        rounded={"xl"}
        borderColor={'black'}
        borderWidth={1}
        textAlign={'center'}>

        <TitleSlot pi_icon={'pi-id-card'} title={'PROFILE'} />
        <Separator />
        <Slot value={user.name ? user.name : 'Name'}
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
          <CheckCard pi_icon={'pi-thumbtack'} title={'Edit Profile'} ifChange={() => {
            set_profile_edit(!use_profile_edit);

            if (use_profile_edit) update();
          }} />
          <Text textAlign={'center'}> (POPUP as error for local user)<br /> To share your grades, you must be an online user.<br />
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
        topic_names={topic_names}
        my_scores={score}
        size={useBreakpointValue({ sm: 1, md: 1, lg: 1, xl: 0 })}
        part={0}
      />

      <GradesMenu display={{ sm: 'none', md: 'none', lg: 'none', xl: 'flex' }}
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
        topic_names={topic_names}
        my_scores={score}
        size={0}
        part={1}
      />

    </Flex>

  </Center>)
}

export default ProfilePage