import { Text, Flex, Menu, Portal, Separator, Button, useBreakpointValue } from "@chakra-ui/react"
import "primeicons/primeicons.css";
import { useEffect, useState } from "react";

import TitleSlot from "./TitleSlot";
import Slot from "./Slot";
import CompareSlot from "./CompareSlot";
import TwoTitlesSlot from "./TwoTitlesSlot";

function TopScoresSlot({ i, fst_user, fst_scores, topic_names, use_compare, sec_user, sec_scores, autoClose }) {

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
            <Text textAlign={'center'}>{fst_user ?? 'No User'}</Text>
          </Flex>
          <Text>
            {!fst_scores.averageScore || fst_scores.averageScore === 0 ? 0 : fst_scores.averageScore.toFixed(2)}
          </Text>

        </Flex>

      </Button>

    </Menu.Trigger>
    <Portal>

      <Menu.Positioner>

        <Menu.Content display={close === false ? "none" : ''}
          paddingX={5}
          paddingY={3}
          marginLeft={sec_user.navPosition === 'left' ? '0.5rem' :
            (sec_user.navPosition != 'right' ? '1rem' : 0)}
          marginRight={sec_user.navPosition === 'right' ? '0.5rem' :
            (sec_user.navPosition != 'left' ? '1rem' : 0)}
          _dark={{
            background: '#1D282E/95'
          }}
        >

          <TitleSlot pi_icon={'pi-graduation-cap'}
            title={'Scores'}
            disableDark={true} />
          {
            use_compare ?
              (<Flex marginTop={3}>
                <TwoTitlesSlot title_info={{
                  title_a: {
                    pi_icon: '',
                    title: fst_user ?? 'No User'
                  },
                  title_b: {
                    pi_icon: '',
                    title: sec_user?.name ?? 'No User'
                  }
                }} width={'100%'}
                  disableDark={true}
                  boldness={'normal'} />
              </Flex>) : ''
          }
          <Separator marginTop={3} />
          {
            !fst_scores || fst_scores.length <= 0 ?
              (<Text>Whoops! Something went wrong, no grades awailable.</Text>) :
              (// split users grades list in to seperate lists per user
                Object.entries(topic_names).map(([topicKey, topicValue], ind) => {

                  const score = Math.trunc(fst_scores[topicKey]) ?? 0;

                  if (!use_compare) { // < without compare

                    if (topicKey === 'equasions_basic')
                      return (<Separator key={ind + topicValue}
                        paddingTop={3}
                        marginTop={5}>
                        <Slot value={score ?? 0}
                          category={topicValue}
                          auto={true}
                          placeholder={'0'}
                          disableDark={true} />
                      </Separator>)
                    else
                      return (<Flex marginTop={5}
                        key={ind + topicValue}>
                        <Slot key={ind + topicValue}
                          value={score ?? 0}
                          category={topicValue}
                          auto={true}
                          placeholder={'0'}
                          disableDark={true} />
                      </Flex>)

                  }
                  else {

                    const user_score = Math.trunc(sec_scores[topicKey]);

                    if (topicKey === 'equasions_basic')
                      return (<Separator key={ind + topicValue}
                        paddingTop={3}
                        marginTop={5}>
                        <CompareSlot value_a={score ?? 0}
                          value_b={user_score ?? 0}
                          category={topicValue}
                          disableDark={true} />
                      </Separator>)
                    else
                      return (<Flex marginTop={5}
                        key={ind + topicValue}
                      >
                        <CompareSlot key={ind + topicValue}
                          value_a={score ?? 0}
                          value_b={user_score ?? 0}
                          category={topicValue}
                          disableDark={true} />
                      </Flex>)

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