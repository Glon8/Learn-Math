import { Stack, Text, Flex, Separator, Button, useBreakpointValue } from "@chakra-ui/react"
import "primeicons/primeicons.css";
import { useState } from "react";

import { userContext } from "../components/UserContext.jsx";
import { topScoresContext } from "../components/TopScoresContext.jsx";
import { getTopicNames } from "../util/Statics.js";

import TitleSlot from '../components/TitleSlot.jsx'
import CheckCard from "../components/CheckCard.jsx";
import FlexMenu from "../components/FlexMenu.jsx";
import GradesMenuComparable from "../components/GradesMenuComparable.jsx";
import TopScoresSlot from "../components/TopScoresSlot.jsx";

function ScorePage() {
  const { user, stat, score, pos } = userContext();
  const { users, scores } = topScoresContext();

  const [topic, setTopic] = useState(getTopicNames);
  const [use_compare, set_compare] = useState(false);
  const [useToCompare, setToCompare] = useState(0);

  const to_close = useBreakpointValue({ lg: false, xl: false });
  const to_compare = useBreakpointValue({ sm: 0, md: 0, lg: (use_compare ? 2 : 0), xl: (use_compare ? 1 : 0) });
  const to_compare_grades = useBreakpointValue(scores?{
    sm: scores[0],
    md: scores[0],
    lg: scores[useToCompare],
    xl: scores[useToCompare]
  } : '');


  let temp = 0;

  return (<Flex gap={5} w={'100vw'}
    paddingLeft={pos === 'left' ? '5rem' : ''}
    paddingRight={pos === 'right' ? '5rem' : ''}
    paddingTop={pos === 'top' ? { base: '5rem', sm: '5rem', md: '10%' } : { md: '5%' }}
    paddingBottom={pos === 'bottom' ? '5rem' : ''}
    flexDirection={{sm: 'column', md: 'row'}}
    alignItems={{sm: 'center', md: ''}}
    justifyContent={{sm: '', md: 'center'}}>
      
    <Stack height={'fit'}
      paddingX={5}
      paddingY={7}
      gap={3}
      alignSelf={{base: 'center', sm: 'center', md:'start'}}
      justifyItems={'center'}
      rounded={'xl'}
      border borderColor={'black'}
      borderWidth={1}
      w={{base: 'full', sm: '25rem'}}
      >

      <Stack>
        <TitleSlot pi_icon={'pi-crown'} title={'TOP SCORES'} />
        <Separator />
        {
          !users || users.length <= 0 ?
            (<Text>Whoops! Something went wrong or no users shared their scores.</Text>) :
            (users.map((useri, i) => {
              return (<Flex key={i}>
                <Flex display={{base:'flex', sm: 'flex', md: 'flex', lg: 'none', xl: 'none' }}
                w={'full'}>

                  <TopScoresSlot i={i}
                    close={to_close}
                    user={useri}
                    user_scores_list={scores}
                    topic_names={topic}
                    use_compare={use_compare}
                    my_user={user}
                    my_scores={score}
                    temp={temp} />

                </Flex>
                <Flex display={{base:'none', sm: 'none', md: 'none', lg: 'flex', xl: 'flex' }}>
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
                              Object.entries(topic).map((topic) => {
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
          (<Flex flexDirection={'column'} gapY={3}>

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
        (<GradesMenuComparable display={{base:'none', sm: 'none', md: 'none', lg: 'flex', xl: 'flex' }}
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
              title: user.name ? user.name : 'No User'
            }
          }
          }
          topic_names={topic}
          my_scores={score}
          comparable={to_compare}
          compare_to_grades={to_compare_grades}
          compare_to={users[useToCompare].name}
        />)
    }
    {
      !users || users.length <= 0 || !scores || scores.length <= 0 ? null :
        (<GradesMenuComparable display={{base:'none', sm: 'none', md: 'none', lg: 'none', xl: 'flex' }}
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
          topic_names={topic}
          my_scores={scores[useToCompare]}
          comparable={use_compare ? 1 : 0}
          compare_to_grades={score}
        />)
    }

  </Flex>)
}

export default ScorePage