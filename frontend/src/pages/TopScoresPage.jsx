import { Center, Stack, Text, Flex, Separator, Button, useBreakpointValue } from "@chakra-ui/react"
import "primeicons/primeicons.css";
import { useState } from "react";

import TitleSlot from '../components/TitleSlot.jsx'
import CheckCard from "../components/CheckCard.jsx";
import FlexMenu from "../components/FlexMenu.jsx";
import GradesMenuComparable from "../components/GradesMenuComparable.jsx";
import TopScoresSlot from "../components/TopScoresSlot.jsx";

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
      sum_substract: 25,
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
    }, {
      _id: 1112,
      sum_substract: 10,
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
    }, {
      _id: 1113,
      sum_substract: 5,
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

  {/*{sm: , md: , lg: , xl: }*/ }

  const [use_compare, set_compare] = useState(false);
  const [useToCompare, setToCompare] = useState(0);
  let temp = 0;

  return (<Center paddingTop={'3rem'}
    paddingX={'20%'}
    paddingY={'10%'}>

    <Flex gap={5}
      flexDirection={'row'}>

      <Stack height={'fit'}
        paddingX={5}
        paddingY={7}
        gap={3}
        justifyItems={'center'}
        rounded={'xl'}
        border borderColor={'black'}
        borderWidth={1}>

        <Stack>
          <TitleSlot pi_icon={'pi-crown'} title={'TOP SCORES'} />
          <Separator />
          {
            !user_list || user_list.length <= 0 ?
              (<Text>Whoops! Something went wrong or no users shared their scores.</Text>) : ''
          }
          {
            user_list.map((user, i) => {
              return (<Flex key={i}>
                <Flex display={{ sm: 'flex', md: 'flex', lg: 'none', xl: 'none' }}>

                  <TopScoresSlot i={i}
                    close = {useBreakpointValue({lg: false, xl: false})}
                    user={user}
                    user_scores_list={user_scores_list}
                    topic_names={topic_names}
                    use_compare={use_compare}
                    my_user={my_user}
                    my_scores={my_scores}
                    temp={temp} />

                </Flex>
                <Flex display={{ sm: 'none', md: 'none', lg: 'flex', xl: 'flex' }}>
                  <Button color={'black'}
                    onClick={() => setToCompare(i)}>
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
                  </Button>
                </Flex>

              </Flex>)
            })
          }
        </Stack>
        {
          //< MENU throws toast!!!! as status is local
        }
        <FlexMenu pi_icon={'pi-book'}
          title={'Share my grades'}
          inner_title={'Are you sure?'}
          options={['NO', 'YES']}
          disabled={my_user.status === 0 ? true : false} />

        <CheckCard pi_icon={'pi-thumbtack'} title={'Compare with my grades'} ifChange={() => set_compare(!use_compare)} />

        <Text textAlign={'center'}> (POPUP as error for local user)<br /> To share your grades, you must be an online user.<br />
          You can check the profile for your status <br /> or in right top corner menu.</Text>

      </Stack>

      <GradesMenuComparable display={{ sm: 'none', md: 'none', lg: 'flex', xl: 'flex' }}
        title_type={1}
        pi_icon={'pi-trophy'}
        title={'PROGRESS'}
        title_info={{
          title_a: {
            pi_icon: 'pi-trophy',
            title: 'PROGRESS'
          },
          title_b: {
            pi_icon: '',
            title: my_user.name
          }
        }
        }
        topic_names={topic_names}
        my_scores={my_scores}
        comparable={useBreakpointValue({ sm: 0, md: 0, lg: (use_compare ? 2 : 0), xl: (use_compare ? 1 : 0) })}
        compare_to_grades={useBreakpointValue({
          sm: user_scores_list[0],
          md: user_scores_list[0],
          lg: user_scores_list[useToCompare],
          xl: user_scores_list[useToCompare]
        })}
        compare_to={user_list[useToCompare].name}
      />
      <GradesMenuComparable display={{ sm: 'none', md: 'none', lg: 'none', xl: 'flex' }}
        title_type={1}
        pi_icon={'pi-trophy'}
        title={'PROGRESS'}
        title_info={{
          title_a: {
            pi_icon: 'pi-trophy',
            title: 'PROGRESS'
          },
          title_b: {
            pi_icon: '',
            title: user_list[useToCompare].name
          }
        }
        }
        topic_names={topic_names}
        my_scores={user_scores_list[useToCompare]}
        comparable={use_compare ? 1 : 0}
        compare_to_grades={my_scores}
      />

    </Flex>

  </Center >)
}

export default ScorePage