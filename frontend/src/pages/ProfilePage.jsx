import { Center, Flex, Text, Separator, useBreakpointValue } from "@chakra-ui/react"
import "primeicons/primeicons.css";
import { useState } from "react";

import TitleSlot from "../components/TitleSlot";
import Slot from "../components/Slot";
import CheckCard from '../components/CheckCard.jsx'
import FlexMenu from "../components/FlexMenu.jsx";
import GradesMenu from "../components/GradesMenu.jsx";

function ProfilePage() {
  const [use_profile_edit, set_profile_edit] = useState(false);

  const my_user = {
    _id: 1110,
    status: 0,
    shared: false,
    name: 'Ruslan',
    email: null,
    password: null,
    secret: null,
    answer: null,
    language: 'he',
    navPosition: 'top'
  };

  const my_scores = {
    _id: 1110,
    sum_substract: 20,
    multiply_divide: null,
    mixed: null,
    power_root: null,
    fraction_fractionMixed: null,
    forms_sizes: null,
    exam_basic: null,
    equasions_basic: null,
    equations_two_more: null,
    verbal_problems: null,
    geometry: null,
    quadratic_equation: null,
    circles: null,
    exam_advanced: null
  };

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
        <Slot value={my_user.name} category={'Name'} edit={use_profile_edit} />
        {
          my_user.status !== 0 ?
            <Slot value={my_user.email ? my_user.email : '-----'}
              category={'Email'}
              edit={use_profile_edit && my_user.status !== 0 ? true : false} /> : ''
        }
        {
          use_profile_edit && my_user.status !== 0 ?
            <Slot value={'-----'}
              category={'Current Password'}
              edit={true} /> : ''
        }
        {
          my_user.status !== 0 ?
            <Slot value={my_user.password ? my_user.password : '-----'}
              category={use_profile_edit && my_user.status !== 0 ? 'New Password' : 'Password'}
              edit={use_profile_edit && my_user.status !== 0 ? true : false} /> : ''
        }
        {
          use_profile_edit && my_user.status !== 0 ?
            <Slot value={'-----'}
              category={'Confirm Password'}
              edit={true} /> : ''
        }
        {
          use_profile_edit && my_user.status !== 0 ?
            <Slot value={my_user.secret ? my_user.secret : '-----'}
              category={'Secret Question'}
              edit={true} /> : ''
        }
        {
          use_profile_edit && my_user.status !== 0 ?
            <Slot value={my_user.answer ? my_user.answer : '-----'}
              category={'Secret Answer'}
              edit={true} /> : ''
        }
        <Slot value={my_user.status === 0 ? 'Local' : 'Online'} category={'Status'} />
        <Slot value={my_user.shared ? 'Shared' : 'Not Shared'} category={'Scores'} />
        <Separator />
        <Flex gapY={3} flexDirection={"column"} textAlign={'center'}>

          {
            //< MENU throws out a toast!!!! as status is local
          }
          <FlexMenu pi_icon={'pi-book'}
            title={'Share my grades'}
            inner_title={'Are you sure?'}
            options={['NO', 'YES']}
            disabled={my_user.status === 0 ? true : false} />
          <CheckCard pi_icon={'pi-thumbtack'} title={'Edit Profile'} ifChange={() => set_profile_edit(!use_profile_edit)} />
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
        my_scores={my_scores}
        size={useBreakpointValue({ sm: 1, md: 1, lg: 1, xl: 0 })}
        part={0}
      />

      {/*{sm: , md: , lg: , xl: }*/}

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
        my_scores={my_scores}
        size={0}
        part={1}
      />

    </Flex>

  </Center>)
}

export default ProfilePage