import { Center, Stack, Text, Flex, Menu, Portal, Separator } from "@chakra-ui/react"
import "primeicons/primeicons.css";
import { useState } from "react";

import CompareSlot from '../components/CompareSlot.jsx'
import Slot from "../components/Slot.jsx";
import TitleSlot from '../components/TitleSlot.jsx'
import CheckCard from "../components/CheckCard.jsx";
import FlexMenu from "../components/FlexMenu.jsx";

function ScorePage() {
  const user_list = [
    {
      _id: 1111,
      name: 'Yoni'
    }, {
      _id: 1112,
      name: 'Rita'
    }, {
      _id: 1113,
      name: 'George'
    }
  ];

  const user_scores_list = [
    {
      _id: 1111,
      summary_substraction: 25,
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
    }, {
      _id: 1112,
      summary_substraction: 10,
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
    }, {
      _id: 1113,
      summary_substraction: 5,
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
    }
  ];

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

  const [use_compare, set_compare] = useState(false);
  let temp = 0;

  return (<Center paddingTop={'3rem'}>

    <Stack gap={5} justifyItems={'center'}>
      {
        !user_list || user_list.length <= 0 ?
          (<Text>Whoops! Something went wrong or no users shared their scores.</Text>) : ''
      }
      <Stack>
        {
          user_list.map((user, i) => {
            return (
              <Menu.Root key={i}>

                <Menu.Trigger>

                  <Flex width={'xs'} flexDirection={'row'} justify={'space-between'}>

                    <Flex flexDirection={'row'} gap={3}>
                      <Text>{1 + i}</Text>
                      <i className="pi pi-trophy" />
                      <Text textAlign={'center'}>{user.name}</Text>
                    </Flex>
                    <Text>
                      {
                        !user_scores_list && user_scores_list.length <= 0 ? '0' : temp = 0
                      }
                      {
                        user_scores_list.map((scores) => {
                          if (user._id === scores._id) {
                            Object.entries(topic_names).map((topic) => {
                              const score = scores[topic[0]];

                              temp = temp + score;
                            })

                            temp = temp / 13;

                            return (`${temp.toFixed(2)}`)
                          }
                        })
                      }
                    </Text>

                  </Flex>

                </Menu.Trigger>
                <Portal>

                  <Menu.Positioner>

                    <Menu.Content width={'xs'} paddingX={5} paddingY={3} marginStart={5}>

                      <TitleSlot pi_icon={'pi-graduation-cap'} title={'Scores'} />
                      {
                        use_compare && user_scores_list && user_scores_list.length > 0 ? (<Flex width={'1xs'} flexDirection={'row'} justify={'space-between'}>

                          <Text>{user.name}</Text>
                          <Text>{my_user.name}</Text>

                        </Flex>)
                          : ''
                      }
                      <Separator />
                      {
                        !user_scores_list || user_scores_list.length <= 0 ?
                          (<Text>Whoops! Something went wrong, no grades awailable.</Text>) : ''
                      }
                      {
                        // split users grades list in to seperate lists per user
                        user_scores_list.map((scores, i2) => {
                          // split user grades list into seperate topics
                          if (!use_compare) { // < without compare
                            // checking if user id match list id
                            if (user._id === scores._id)
                              return Object.entries(topic_names).map((topic) => {
                                const score = scores[topic[0]];

                                if (topic[0] === 'equasions_basic')
                                  return (
                                    <Separator>
                                      <Slot key={score} value={score ? score : 0} category={topic[1]} />
                                    </Separator>)
                                else return (<Slot key={i2} value={score ? score : 0} category={topic[1]} />)
                              })
                          } else { // < with compare
                            if (user._id === scores._id)
                              return Object.entries(topic_names).map((topic) => {
                                const score = scores[topic[0]];
                                const user_score = my_scores[topic[0]];

                                if (topic[0] === 'equasions_basic')
                                  return (
                                    <Separator>
                                      <CompareSlot key={score} value_a={score ? score : 0} value_b={user_score ? user_score : 0} category={topic[1]} />
                                    </Separator>)
                                else return (<CompareSlot key={i2}
                                  value_a={score ? score : 0}
                                  value_b={user_score ? user_score : 0}
                                  category={topic[1]} />)
                              })
                          }
                        })
                      }

                    </Menu.Content>

                  </Menu.Positioner>

                </Portal>

              </Menu.Root>)
          })
        }
      </Stack>
      {
        //< MENU DISABLED!!!!
      }
      <FlexMenu pi_icon={'pi-book'}
        title={'Share my grades'}
        inner_title={'Are you sure?'}
        options={['NO', 'YES']}
        disabled={my_user.status === 0? true : false } />
      <CheckCard title={'Compare with my grades'} ifChange={() => set_compare(!use_compare)} />
      <Text textAlign={'center'}> (POPUP as error for local user)<br /> To share your grades, you must be an online user.<br />
        You can check the profile for your status <br /> or in right top corner menu.</Text>

    </Stack>

  </Center >)
}

export default ScorePage