import { Center, Flex, Text, Image, Menu, Portal, Separator } from "@chakra-ui/react"
import "primeicons/primeicons.css";
import { useState } from "react";

import TitleSlot from "../components/TitleSlot";
import Slot from "../components/Slot";
import CheckCard from '../components/CheckCard.jsx'
import FlexMenu from "../components/FlexMenu.jsx";

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
    answer: null
  };

  const my_scores = {
    _id: 1110,
    summary_substraction: 20,
    multiplication_division: null,
    mixed: null,
    power_root: null,
    fraction_fractionMixed: null,
    forms_sizes: null,
    exam_basic: null,
    equasions_basic: null,
    equations_two_unknowns: null,
    verbal_problems: null,
    geometry: null,
    quadratic_equation: null,
    circles: null,
    exam_advanced: null
  };

  const topic_names = {
    summary_substraction: 'summary & substraction',
    multiplication_division: 'multiplication & division',
    mixed: 'mixed',
    power_root: 'power & root',
    fraction_fractionMixed: 'fractions',
    forms_sizes: 'forms & sizes',
    exam_basic: 'exam basic',
    equasions_basic: 'equasions - basic',
    equations_two_unknowns: 'equasions - two unknowns',
    verbal_problems: 'verbal problems',
    geometry: 'geometry',
    quadratic_equation: 'quadratic equation',
    circles: 'circles',
    exam_advanced: 'exam advanced'
  };

  return (<Center paddingTop={'3rem'}>

    <Flex gap={5}>

      <Flex height={'fit'} width={'25rem'} gapY={3} padding={4}
        flexDirection={"column"}
        border borderRadius={"xl"}
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
        <Flex gapY={3} paddingBottom={4} flexDirection={"column"} textAlign={'center'}>
          
          {
            //< MENU DISABLED!!!!
          }
          <FlexMenu pi_icon={'pi-book'}
            title={'Share my grades'}
            inner_title={'Are you sure?'}
            options={['NO', 'YES']}
            disabled={my_user.status === 0? true : false } /> 
          <CheckCard title={'Edit Profile'} ifChange={() => set_profile_edit(!use_profile_edit)} />
          <Text textAlign={'center'}> (POPUP as error for local user)<br /> To share your grades, you must be an online user.<br />
            You can check the profile for your status <br /> or in right top corner menu.</Text>

        </Flex>

      </Flex>
      <Flex height={'fit'} width={'25rem'} gapY={3} padding={4} flexDirection={"column"} border borderRadius={"xl"} borderColor={'black'} borderWidth={1} textAlign={'center'} >

        <TitleSlot pi_icon={'pi-trophy'} title={'PROGRESS'} />
        <Separator />
        {
          Object.entries(topic_names)
            .map((topic) => {
              const score = my_scores[topic];

              if (topic[0] === 'equasions_basic')
                return (
                  <Separator>
                    <Slot key={score} value={score ? score : 0} category={topic[1]} />
                  </Separator>)
              else return (<Slot key={score} value={score ? score : 0} category={topic[1]} />)
            })
        }

      </Flex>

    </Flex>

  </Center>)
}

export default ProfilePage