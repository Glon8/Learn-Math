import { Stack, Text, Flex, Separator, Button, useBreakpointValue } from "@chakra-ui/react"
import "primeicons/primeicons.css";
import { useState, useEffect } from "react";

import { userContext } from "../context/UserContext.jsx";
import { topScoresContext } from "../context/TopScoresContext.jsx";
import { languageContext } from "../context/LanguagesContext.jsx";

import TitleSlot from '../components/slots/TitleSlot.jsx'
import CheckCard from "../components/CheckCard.jsx";
import GradesMenuComparable from "../components/menus/GradesMenuComparable.jsx";
import TopScoresSlot from "../components/slots/TopScoresSlot.jsx";
import { callToast } from "../components/Toast.jsx";
import LoadingBanner from "../components/LoadindBanner.jsx";
import ProfileValidReq from "../components/menus/sub/ProfileValidReq.jsx";
import ShareWarning from "../components/buttons/ShareWarning.jsx";
import PagesBase from "../components/forms/sub/PagesBase.jsx";
import PagesBaseStack from "../components/forms/sub/PagesBaseStack.jsx";

function ScorePage() {
  const { user, score, pos, share } = userContext();
  const { users, scores } = topScoresContext();
  const { language, defPack } = languageContext();

  const [topic, setTopic] = useState(language?.statics?.topics ?? defPack.statics.topics);
  const [use_compare, set_compare] = useState(false);
  const [other_user, set_other_user] = useState({});
  const [other_grades, set_other_grades] = useState({});

  const to_compare = useBreakpointValue({ sm: 0, md: 0, lg: (use_compare ? 2 : 0), xl: (use_compare ? 1 : 0) });

  const compareMenus = [
    {
      'display': { base: 'none', sm: 'none', md: 'none', lg: 'none', xl: 'flex' },
      'title': user.name ?? (language?.statics?.error?.noUser ?? defPack.statics.error.noUser),
      'fst_scores': score,
      'comparable': use_compare ? 1 : 0,
      'sec_scores': other_grades,
      'sec_user': other_user.name ?? (language?.statics?.error?.noUser ?? defPack.statics.error.noUser),
    },
    {
      'display': { base: 'none', sm: 'none', md: 'none', lg: 'flex', xl: 'flex' },
      'title': other_user.name ?? (language?.statics?.error?.noUser ?? defPack.statics.error.noUser),
      'fst_scores': other_grades,
      'comparable': to_compare,
      'sec_scores': score,
      'sec_user': user.name ?? (language?.statics?.error?.noUser ?? defPack.statics.error.noUser),
    },
  ];

  const warningMes = () => callToast('Info:', 'Unable to share your grades! Please make online account to do so! You can check your status in profile or top left corner menu!', '', '', pos);

  useEffect(() => {
    setTopic(language?.statics?.topics ?? defPack.statics.topics);
  }, [language]);

  useEffect(() => {
    set_other_grades(!!scores && scores.length > 0 ? scores.find(item => item.userId === other_user._id) : {});
  }, [other_user]);

  useEffect(() => {
    if (!!scores && !!users) {
      const id = scores[0]?.userId;

      set_other_user(!!users && users.length > 0 ? users.find(item => item._id === id) : {});
    }
  }, [users, scores]);

  return (<PagesBase gap={5} md={{ flexDirection: 'row' }}
    alignItems={{ sm: 'center', md: '' }}
    justifyContent={{ sm: '', md: 'center' }}>

    <PagesBaseStack alignSelf={{ base: 'center', sm: 'center', md: 'start' }}
      justifyItems={'center'}
      w={{ base: 'full', sm: '25rem' }} >

      <Stack>
        <TitleSlot pi_icon={'pi-crown'} title={language?.topScores?.topScoresTitle ?? defPack.topScores.topScoresTitle} />
        <Separator marginTop={3} />
        {
          !users || users.length <= 0 || !scores || scores.length <= 0 ?
            (<LoadingBanner text={language?.topScores?.topLoading ?? defPack.topScores.topLoading} toggle={true} />) :
            (scores.map((cScore, i) => {
              const cUser = users.find(item => item._id === cScore.userId);

              return (<Flex key={i}>
                <Flex display={{ base: 'flex', sm: 'flex', md: 'flex', lg: 'none', xl: 'none' }}
                  w={'full'}>

                  <TopScoresSlot i={i}
                    fst_user={cUser.name}
                    fst_scores={cScore ?? {}}
                    topic_names={topic}
                    use_compare={use_compare}
                    sec_user={user}
                    sec_scores={score}
                  />

                </Flex>
                <Flex display={{ base: 'none', sm: 'none', md: 'none', lg: 'flex', xl: 'flex' }}>
                  <Button onClick={() => set_other_user(cUser)}
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
                        <Text textAlign={'center'}>{cUser.name}</Text>
                      </Flex>
                      <Text>
                        {!cScore.averageScore || cScore.averageScore === 0 ? 0 : cScore.averageScore.toFixed(2)}
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
                share === 'false' || share === false ?
                  (<ProfileValidReq type={'share'} />) :
                  (<ProfileValidReq type={'remove'} />)
              ) : (<ShareWarning warningMes={warningMes} user={user} value={language?.topScores?.share ?? defPack.topScores.share} />)
            }

          </Flex>)
      }
    </PagesBaseStack>
    {
      !users || users.length <= 0 || !scores || scores.length <= 0 ? null :
        (compareMenus.map((thing, ind) => {
          return (<GradesMenuComparable display={thing.display}
            key={'gmc' + ind}
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
                title: thing.title
              }
            }}
            fst_scores={thing.fst_scores}
            topic_names={topic}
            comparable={thing.comparable}
            sec_scores={thing.sec_scores}
            sec_user={thing.sec_user}
          />)
        }))
    }

  </PagesBase>)
}

export default ScorePage