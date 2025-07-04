import { Center, Stack, Text, Flex, Separator, Button, useBreakpointValue } from "@chakra-ui/react"
import "primeicons/primeicons.css";
import { useState } from "react";

import { userContext } from "../components/UserContext.jsx";
import { topScoresContext } from "../components/TopScoresContext.jsx";

import TitleSlot from '../components/TitleSlot.jsx'
import CheckCard from "../components/CheckCard.jsx";
import FlexMenu from "../components/FlexMenu.jsx";
import GradesMenuComparable from "../components/GradesMenuComparable.jsx";
import TopScoresSlot from "../components/TopScoresSlot.jsx";

function ScorePage() {
  const { user, stat, score } = userContext();
  const { users, scores } = topScoresContext();

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
            !users || users.length <= 0 ?
              (<Text>Whoops! Something went wrong or no users shared their scores.</Text>) : ''
          }
          {
            !users || users.length <= 0 ? null :
              (users.map((useri, i) => {
                return (<Flex key={i}>
                  <Flex display={{ sm: 'flex', md: 'flex', lg: 'none', xl: 'none' }}>

                    <TopScoresSlot i={i}
                      close={useBreakpointValue({ lg: false, xl: false })}
                      user={useri}
                      user_scores_list={scores}
                      topic_names={topic_names}
                      use_compare={use_compare}
                      my_user={user}
                      my_scores={score}
                      temp={temp} />

                  </Flex>
                  <Flex display={{ sm: 'none', md: 'none', lg: 'flex', xl: 'flex' }}>
                    <Button color={'black'}
                      onClick={() => setToCompare(i)}>
                      <Flex width={'xs'} flexDirection={'row'} justify={'space-between'}>

                        <Flex flexDirection={'row'} gap={3}>
                          <Text>{1 + i}</Text>
                          <i className="pi pi-trophy" />
                          <Text textAlign={'center'}>{useri.name}</Text>
                        </Flex>
                        <Text>
                          {
                            !scores && scores.length <= 0 ? '0' : temp = 0
                          }
                          {
                            scores.map((scores) => {
                              if (useri._id === scores._id) {
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
              }))
          }
        </Stack>
        {
          //< MENU throws toast!!!! as status is local
        }
        {
          !users || users.length <= 0 || !scores || scores.length <= 0 ? null :
            (<Flex flexDirection={'column'}>

              <FlexMenu pi_icon={'pi-book'}
                title={'Share my grades'}
                inner_title={'Are you sure?'}
                options={['NO', 'YES']}
                disabled={stat === 0 ? true : false} />

              <CheckCard pi_icon={'pi-thumbtack'} title={'Compare with my grades'} ifChange={() => set_compare(!use_compare)} />

              <Text textAlign={'center'}> (POPUP as error for local user)<br /> To share your grades, you must be an online user.<br />
                You can check the profile for your status <br /> or in right top corner menu.</Text>

            </Flex>)
        }
      </Stack>
      {
        !users || users.length <= 0 || !scores || scores.length <= 0 ? null :
          (<GradesMenuComparable display={{ sm: 'none', md: 'none', lg: 'flex', xl: 'flex' }}
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
                title: user.name ? user.name : 'Name'
              }
            }
            }
            topic_names={topic_names}
            my_scores={score}
            comparable={useBreakpointValue({ sm: 0, md: 0, lg: (use_compare ? 2 : 0), xl: (use_compare ? 1 : 0) })}
            compare_to_grades={useBreakpointValue({
              sm: scores[0],
              md: scores[0],
              lg: scores[useToCompare],
              xl: scores[useToCompare]
            })}
            compare_to={users[useToCompare].name}
          />)
      }
      {
        !users || users.length <= 0 || !scores || scores.length <= 0 ? null :
          (<GradesMenuComparable display={{ sm: 'none', md: 'none', lg: 'none', xl: 'flex' }}
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
                title: users[useToCompare].name
              }
            }
            }
            topic_names={topic_names}
            my_scores={scores[useToCompare]}
            comparable={use_compare ? 1 : 0}
            compare_to_grades={score}
          />)
      }

    </Flex>

  </Center >)
}

export default ScorePage