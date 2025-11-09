import { Stack, Text, Flex, Separator, Button, useBreakpointValue } from "@chakra-ui/react"
import "primeicons/primeicons.css";
import { useState, useEffect } from "react";

import { userContext } from "../context/UserContext.jsx";
import { topScoresContext } from "../context/TopScoresContext.jsx";
import { languageContext } from "../context/LanguagesContext.jsx";

import TitleSlot from '../components/TitleSlot.jsx'
import CheckCard from "../components/CheckCard.jsx";
import FlexMenu from "../components/FlexMenu.jsx";
import GradesMenuComparable from "../components/GradesMenuComparable.jsx";
import TopScoresSlot from "../components/TopScoresSlot.jsx";
import { callToast } from "../components/Toast.jsx";
import LoadingBanner from "../components/LoadindBanner.jsx";

function ScorePage() {
  const { user, score, pos,
    share, upTop, outTop,
    upUser } = userContext();
  const { users, scores } = topScoresContext();
  const { language, defPack } = languageContext();

  const [topic, setTopic] = useState(language?.statics?.topics ?? defPack.statics.topics);
  const [use_compare, set_compare] = useState(false);
  const [useToCompare, setToCompare] = useState(0);

  const to_compare = useBreakpointValue({ sm: 0, md: 0, lg: (use_compare ? 2 : 0), xl: (use_compare ? 1 : 0) });

  const warningMes = () => callToast('Info:', 'Unable to share your grades! Please make online account to do so! You can check your status in profile or top left corner menu!', '', '', pos);

  useEffect(() => {
    setTopic(language?.statics?.topics ?? defPack.statics.topics);
  }, [language]);

  return (<Flex gap={5} w={'100%'}
    paddingLeft={pos === 'left' ? { base: '3rem', sm: '3rem', md: '3rem', lg: '5rem' } : ''}
    paddingRight={pos === 'right' ? { base: '3rem', sm: '3rem', md: '3rem', lg: '5rem' } : ''}
    paddingTop={!pos || pos === 'top' ? { base: '2.5rem', sm: '2.5rem', md: '2.5rem', lg: '10%' } : { md: '5%' }}
    paddingBottom={pos === 'bottom' ? { base: '2.5rem', sm: '2.5rem', md: '2.5rem', lg: '5rem' } : ''}
    flexDirection={{ sm: 'column', md: 'row' }}
    alignItems={{ sm: 'center', md: '' }}
    justifyContent={{ sm: '', md: 'center' }}>

    <Stack height={'fit'}
      paddingX={5}
      paddingY={7}
      gap={3}
      alignSelf={{ base: 'center', sm: 'center', md: 'start' }}
      justifyItems={'center'}
      rounded={'xl'}
      border
      borderWidth={1}
      w={{ base: 'full', sm: '25rem' }}
      _light={{
        boxShadow: 'lg',
        backgroundColor: 'white',
        borderColor: '#B1B7BA'
      }}
      _dark={{
        boxShadow: '0 0 2rem 0.5rem rgb(238, 246, 249)',
        background: '#8b8da0',
        borderColor: '#1D282E',
      }}
    >

      <Stack>
        <TitleSlot pi_icon={'pi-crown'} title={language?.topScores?.topScoresTitle ?? defPack.topScores.topScoresTitle} />
        <Separator marginTop={3} />
        {
          !users || users.length <= 0 || !scores || scores.length <= 0 ?
            (<LoadingBanner text={language?.topScores?.topLoading ?? defPack.topScores.topLoading} toggle={true} />) :
            (users.map((useri, i) => {
              return (<Flex key={i}>
                <Flex display={{ base: 'flex', sm: 'flex', md: 'flex', lg: 'none', xl: 'none' }}
                  w={'full'}>

                  <TopScoresSlot i={i}
                    user={useri}
                    user_scores_list={scores ?? []}
                    topic_names={topic}
                    use_compare={use_compare}
                    my_user={user}
                    my_scores={score}
                  />

                </Flex>
                <Flex display={{ base: 'none', sm: 'none', md: 'none', lg: 'flex', xl: 'flex' }}>
                  <Button onClick={() => setToCompare(i)}
                    _light={{
                      backgroundColor: '#8b8da0/20',
                      borderColor: '#B1B7BA/10',
                      focusRingColor: '#B1B7BA/20',
                      color: '#1D282E/90'
                    }}
                    _dark={{
                      background: "#1D282E",
                      borderColor: "#1D282E",
                      focusRingColor: '#B1B7BA',
                      color: '#EEF6F9'
                    }}
                  >
                    <Flex width={'xs'} flexDirection={'row'} justify={'space-between'}>

                      <Flex flexDirection={'row'} gap={3}>
                        <Text>{1 + i}</Text>
                        <i className="pi pi-trophy" />
                        <Text textAlign={'center'}>{useri.name}</Text>
                      </Flex>
                      <Text>
                        {
                          scores.map((score) => {
                            if (useri._id === score.userId) {
                              if (!score['averageScore'] || score['averageScore'] === 0) return 0;
                              else return (`${score['averageScore'].toFixed(2)}`);
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
        !users || users.length <= 0 || !scores || scores.length <= 0 ? null :
          (<Flex flexDirection={'column'} gapY={3}>

            <CheckCard pi_icon={'pi-thumbtack'} title={language?.topScores?.compare ?? defPack.topScores.compare} ifChange={() => set_compare(!use_compare)} />
            {
              !!user._id ? (
                share === 'false' || share === false ? (<FlexMenu pi_icon={'pi-book'}
                  title={language?.topScores?.share ?? defPack.topScores.share}
                  inner_title={language?.statics?.confirmation?.question ?? defPack.statics.confirmation.question}
                  options={[
                    { value: language?.statics?.confirmation?.false ?? defPack.statics.confirmation.false },
                    { value: language?.statics?.confirmation?.true ?? defPack.statics.confirmation.true, click: () => { upTop(); upUser('shared', true); } }]} />) :
                  (<FlexMenu pi_icon={'pi-book'}
                    title={language?.topScores?.remove ?? defPack.topScores.remove}
                    inner_title={language?.statics?.confirmation?.question ?? defPack.statics.confirmation.question}
                    options={[
                      { value: language?.statics?.confirmation?.false ?? defPack.statics.confirmation.false },
                      { value: language?.statics?.confirmation?.true ?? defPack.statics.confirmation.true, click: () => { outTop(); upUser('shared', false); } }]} />)
              ) :
                (<Button onClick={warningMes}
                  disabled={user._id === 0 ? false : true}
                  width={'full'}
                  flexDirection={'row'}
                  gap={3}
                  color={'black'}
                  focusRing={'inside'}
                  _light={{
                    backgroundColor: '#8b8da0/20',
                    borderColor: '#B1B7BA/10',
                    focusRingColor: '#B1B7BA/20',
                    color: '#1D282E/90'
                  }}
                  _dark={{
                    background: "#1D282E",
                    borderColor: "#1D282E",
                    focusRingColor: '#B1B7BA',
                    color: '#EEF6F9'
                  }}>
                  <i className="pi pi-book" /><Text>{language?.topScores?.share ?? defPack.topScores.share}</Text>
                </Button>)

            }

          </Flex>)
      }
    </Stack>
    {
      !users || users.length <= 0 || !scores || scores.length <= 0 ? null :
        (<GradesMenuComparable display={{ base: 'none', sm: 'none', md: 'none', lg: 'none', xl: 'flex' }}
          title_type={1}
          pi_icon={'pi-trophy'}
          title={language?.topScores?.progressTitle ?? defPack.topScores.progressTitle}
          title_info={{
            title_a: {
              pi_icon: 'pi-trophy',
              title: language?.topScores?.progressTitle ?? defPack.topScores.progressTitle
            },
            title_b: {
              pi_icon: '',
              title: !!(user.name) ? user.name :
                (language?.statics?.error?.noUser ?? defPack.statics.error.noUser)
            }
          }
          }
          topic_names={topic}
          my_scores={score}
          comparable={use_compare ? 1 : 0}
          compare_to_grades={scores[useToCompare]}
          compare_to={!!(users[useToCompare].name) ? users[useToCompare].name :
            (language?.statics?.error?.noUser ?? defPack.statics.error.noUser)}
        />)
    }
    {
      !users || users.length <= 0 || !scores || scores.length <= 0 ? null :
        (<GradesMenuComparable display={{ base: 'none', sm: 'none', md: 'none', lg: 'flex', xl: 'flex' }}
          title_type={1}
          pi_icon={'pi-trophy'}
          title={language?.topScores?.progressTitle ?? defPack.topScores.progressTitle}
          title_info={{
            title_a: {
              pi_icon: 'pi-trophy',
              title: language?.topScores?.progressTitle ?? defPack.topScores.progressTitle
            },
            title_b: {
              pi_icon: '',
              title: !!(users[useToCompare].name) ? users[useToCompare].name :
                (language?.statics?.error?.noUser ?? defPack.statics.error.noUser)
            }
          }
          }
          topic_names={topic}
          my_scores={scores[useToCompare]}
          comparable={to_compare}
          compare_to_grades={score}
          compare_to={!!(user.name) ? user.name :
            (language?.statics?.error?.noUser ?? defPack.statics.error.noUser)}
        />)
    }

  </Flex>)
}

export default ScorePage