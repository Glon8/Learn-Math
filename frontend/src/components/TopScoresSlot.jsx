import { Text, Flex, Menu, Portal, Separator, Button, useBreakpointValue } from "@chakra-ui/react"
import "primeicons/primeicons.css";
import { useEffect, useState } from "react";

import TitleSlot from "./TitleSlot";
import Slot from "./Slot";
import CompareSlot from "./CompareSlot";
import TwoTitlesSlot from "./TwoTitlesSlot";

function TopScoresSlot({ i, user, user_scores_list, topic_names, use_compare, my_user, my_scores, autoClose }) {
  const [useOpen, setOpen] = useState(false);

  const close = useBreakpointValue({ lg: false, xl: false });

  useEffect(() => {
    setOpen(close);
  }, [close]);

  return (<Menu.Root open={useOpen}
    onOpenChange={close === false ? () => setOpen(!useOpen) : null}
    onInteractOutside={autoClose ? null : () => setOpen(false)}>

    <Menu.Trigger asChild>

      <Button flexDirection={'row'}
        focusRing={'inside'}
        w={'full'}
        onClick={() => setOpen(!useOpen)}
        _light={{
          backgroundColor: '#8b8da0/20',
          borderColor: '#B1B7BA/10',
          focusRingColor: '#B1B7BA',
          color: '#1D282E/90'
        }}
        _dark={{
          background: "#1D282E",
          borderColor: "#1D282E",
          focusRingColor: '#B1B7BA',
          color: '#EEF6F9'
        }}>

        <Flex
          w={'full'}
          justify={'space-between'}>

          <Flex flexDirection={'row'}
            gap={3}
          >
            <Text>{1 + i}</Text>
            <i className="pi pi-trophy" />
            <Text textAlign={'center'}>{user.name}</Text>
          </Flex>
          <Text>
            {
              user_scores_list.map((score) => {
                if (user._id === score.userId) {
                  if (!score['averageScore'] || score['averageScore'] === 0) return 0;
                  else return (`${score['averageScore'].toFixed(2)}`);
                }
              })
            }
          </Text>

        </Flex>

      </Button>

    </Menu.Trigger>
    <Portal>

      <Menu.Positioner>

        <Menu.Content display={close === false ? "none" : ''}
          paddingX={5}
          paddingY={3}
          marginLeft={my_user.navPosition === 'left' ? '0.5rem' :
            (my_user.navPosition != 'right' ? '1rem' : 0)}
          marginRight={my_user.navPosition === 'right' ? '0.5rem' :
            (my_user.navPosition != 'left' ? '1rem' : 0)}
          _dark={{
            background: '#1D282E/95'
          }}
        >

          <TitleSlot pi_icon={'pi-graduation-cap'}
            title={'Scores'}
            disableDark={true} />
          {
            use_compare && user_scores_list && user_scores_list.length > 0 ?
              (<Flex marginTop={3}>
                <TwoTitlesSlot title_info={{
                  title_a: {
                    pi_icon: '',
                    title: user.name ? user.name : 'No User'
                  },
                  title_b: {
                    pi_icon: '',
                    title: my_user.name ? my_user.name : 'No User'
                  }
                }}
                  disableDark={true}
                  boldness={'normal'} />
              </Flex>) : ''
          }
          <Separator marginTop={3} />
          {
            !user_scores_list || user_scores_list.length <= 0 ?
              (<Text>Whoops! Something went wrong, no grades awailable.</Text>) :
              // split users grades list in to seperate lists per user
              (user_scores_list.map((scores, i2) => {
                // split user grades list into seperate topics
                if (!use_compare && user._id.toString() === scores.userId.toString()) { // < without compare

                  return Object.entries(topic_names).map((topic) => {
                    const score = scores[topic[0]];

                    if (topic[0] === 'equasions_basic')
                      return (<Separator key={i2 + topic[1]}
                        paddingTop={3}
                        marginTop={5}>
                        <Slot value={score ? score : ''}
                          category={topic[1]}
                          auto={true}
                          placeholder={'0'}
                          disableDark={true} />
                      </Separator>)
                    else
                      return (<Flex marginTop={5}
                        key={i2 + topic[1]}>
                        <Slot key={i2 + topic[1]}
                          value={score ? score : ''}
                          category={topic[1]}
                          auto={true}
                          placeholder={'0'}
                          disableDark={true} />
                      </Flex>)
                  })

                }
                else if (!!use_compare && user._id.toString() === scores.userId.toString()) { // < with compare

                  return Object.entries(topic_names).map((topic) => {
                    const score = scores[topic[0]];
                    const user_score = my_scores[topic[0]];

                    if (topic[0] === 'equasions_basic')
                      return (<Separator key={i2 + topic[1]}
                        paddingTop={3}
                        marginTop={5}>
                        <CompareSlot value_a={score ? score : 0}
                          value_b={user_score ? user_score : 0}
                          category={topic[1]}
                          disableDark={true} />
                      </Separator>)

                    else
                      return (<Flex marginTop={5}
                        key={i2 + topic[1]}
                      >
                        <CompareSlot key={i2 + topic[1]}
                          value_a={score ? score : 0}
                          value_b={user_score ? user_score : 0}
                          category={topic[1]}
                          disableDark={true} />
                      </Flex>)
                  })

                }
              })
              )
          }

        </Menu.Content>

      </Menu.Positioner>

    </Portal>

  </Menu.Root>)
}

export default TopScoresSlot