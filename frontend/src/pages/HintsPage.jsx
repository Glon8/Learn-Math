import { Flex, Text, Separator, Stack } from "@chakra-ui/react"
import "primeicons/primeicons.css";
import { useState } from "react";

import { userContext } from "../components/UserContext";
import { getTopicNames } from "../util/Statics.js";

import TwoTitlesSlot from "../components/TwoTitlesSlot";
import TopicBut from "../components/TopicBut";
import Spin from "../components/Spin";
import TextArea from "../components/TextArea";

function HintsPage() {
  const { pos } = userContext();
  const [useSchool, setSchool] = useState(true);
  const [useTop, setTop] = useState('sum_substract');

  const [topic, setTopic] = useState(getTopicNames());

  return (<Flex alignItems={'center'}
    flexDirection={"column"}
    w={'100vw'}
    paddingLeft={pos === 'left' ? { base: '3rem', sm: '3rem', md: '3rem', lg: '5rem' } : ''}
    paddingRight={pos === 'right' ? { base: '3rem', sm: '3rem', md: '3rem', lg: '5rem' } : ''}
    paddingTop={pos === 'top' ? { base: '2.5rem', sm: '2.5rem', md: '2.5rem', lg: '10%' } : { md: '5%' }}
    paddingBottom={pos === 'bottom' ? { base: '2.5rem', sm: '2.5rem', md: '2.5rem', lg: '5rem' } : ''}>

    <Stack border
      borderWidth={1}
      paddingX={5}
      paddingY={7}
      rounded={'xl'}
      gap={3}
      maxW={'65rem'}
      _light={{
        boxShadow: 'lg',
        background: 'white',
        borderColor: '#B1B7BA'
      }}
      _dark={{
        boxShadow: '0 0 2rem 0.5rem rgb(238, 246, 249)',
        background: '#8b8da0',
        borderColor: '#1D282E',
      }}>

      <TwoTitlesSlot title_info={{
        title_a: {
          pi_icon: 'pi-question',
          title: 'HINTS'
        },
        title_b: {
          pi_icon: 'pi-list-check',
          title: 'SCHOOLS TOPICS'
        },

      }} />
       <Separator colorPalette="green" />
      <Flex hideFrom={'lg'}>
        <Spin classList={topic}
          additional={{ teach: 'Discuss With Teach!' }}
          getValue={(value) => setTop(value)} />
      </Flex>

      <Flex hideBelow={'lg'} justify={'space-between'}>
        <TopicBut pi_icon={'pi-list-check'}
          title={'Elementary-School'}
          onClick={() => setSchool(true)}
          showSub={true}
        />

        <TopicBut pi_icon={'pi-list-check'}
          title={'High-School'}
          onClick={() => setSchool(false)}
          showSub={true}
          dir={'row-reverse'}
        />
      </Flex>
      <Flex gap={3}
        flexDirection={useSchool ? 'row-reverse' : 'row'}>

        <Flex position={'relative'}
          w={'full'}
          border
          borderWidth={1}
          justifyItems={'center'}
          rounded={'xl'}
          flexDirection={"column"}
          gapY={3}
          padding={5}
          _light={{
            borderColor: '#B1B7BA/40',
            color: '#1D282E'
          }}
          _dark={{
            borderColor: '#1D282E',
            color: '#EEF6F9',
            background: '#464547'
          }}>

          <Text>Topics explanation here! This tab is scrollabble! Current topic is {topic[useTop]}</Text>
          {
            useTop == 'teach' ? (<TextArea getValue={(value) => {
              console.log(value)
            }} />) : null
          }
        </Flex>
        <Flex flexDirection={"column"} gapY={3} hideBelow={'lg'}>

          <Separator />
          <TopicBut
            pi_icon={'pi-question'}
            title={'Discuss With Teach!'}
            onClick={() => setTop('teach')}
            showSub={true}
          />
          <Separator />
          {
            Object.entries(topic).map((topic, index) => {
              if (useSchool && index >= 0 && index < 7)
                return (<TopicBut key={topic[0]}
                  pi_icon={'pi-hashtag'}
                  title={topic[1]}
                  onClick={() => setTop(topic[0])}
                  showSub={true}
                />)
              else if (!useSchool && index >= 7 && index < 14)
                return (<TopicBut key={topic[0]}
                  pi_icon={'pi-hashtag'}
                  title={topic[1]}
                  onClick={() => setTop(topic[0])}
                  showSub={true}
                />)
            })
          }
        </Flex>

      </Flex>

    </Stack>

  </Flex>)
}

export default HintsPage