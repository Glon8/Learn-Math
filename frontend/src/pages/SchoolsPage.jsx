import { Flex, Stack, Text, Separator, useBreakpointValue } from "@chakra-ui/react"
import "primeicons/primeicons.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { userContext } from "../components/UserContext.jsx";
import { getTopicNames } from "../util/Statics.js";

import TitleSlot from '../components/TitleSlot.jsx'
import TopicBut from '../components/TopicBut.jsx'

function SchoolsPage() {
  const navigate = useNavigate();
  const { pos } = userContext();

  const navShort = useBreakpointValue({ base: true, sm: true, md: false, lg: false, xl: false });
  const [useSchool, setSchool] = useState(true);
  const [topic, setTopic] = useState(getTopicNames());

  const toExercise = (topic) => {
    navigate('/exercise', { state: { exerciseId: topic[0], exerciseWritten: topic[1] } })
  };

  return (<Flex w={'100vw'}
    alignItems={'center'}
    flexDirection={"column"}
    paddingLeft={pos === 'left' ? '5rem' : ''}
    paddingRight={pos === 'right' ? '5rem' : ''}
    paddingTop={pos === 'top' ? { base: '5rem', sm: '5rem', md: '10%' } : { md: '5%' }}
    paddingBottom={pos === 'bottom' ? '5rem' : ''}>

    <Stack border borderColor={"black"} borderWidth={1}
      paddingX={5}
      paddingY={7}
      rounded={'xl'}
      gap={3}
      w={{ base: 'full', sm: 'auto' }}
      minW={{ base: 'auto', sm: '25rem' }}
      maxW={'65rem'}>

      <TitleSlot pi_icon={'pi-list-check'} title={'SCHOOLS TOPICS'} />
      <Separator />
      <Flex justify={'space-between'}
        gapX={3}
        hideBelow={'md'}>

        <TopicBut pi_icon={'pi-list-check'}
          title={'Teenage-School'}
          onClick={() => { setSchool(true) }}
          showSub={true}
        />
        {/* on mobile this explanation possible to add as toast! */}
        <Text hideBelow={"xl"} width={'full'} textAlign={'center'}>Select topic that you would like to exercise at!</Text>
        <TopicBut
          pi_icon={'pi-list-check'}
          title={'High-School'}
          onClick={() => { setSchool(false) }}
          showSub={true}
          dir={'row-reverse'}
        />

      </Flex>
      {
        navShort ? null : <Separator />
      }
      {
        Object.entries(topic).map((topic, index) => {
          if (navShort) {
            return (<TopicBut key={topic[0]}
              pi_icon={'pi-hashtag'}
              title={topic[1]}
              onClick={() => { toExercise(topic) }}
              showSub={false}
              subTitle={'Some subtitle'}
              dir={'column'}
            />)
          }
          else {
            if (useSchool && index >= 0 && index < 7) {
              return (<TopicBut key={topic[0]}
                pi_icon={'pi-hashtag'}
                title={topic[1]}
                onClick={() => { toExercise(topic) }}
                showSub={false}
                subTitle={'Some subtitle'}
              />)
            }
            else if (!useSchool && index >= 7) {
              return (<TopicBut key={topic[0]}
                pi_icon={'pi-hashtag'}
                title={topic[1]}
                onClick={() => { toExercise(topic) }}
                showSub={false}
                subTitle={'Some subtitle'}
                dir={'row-reverse'}
              />)
            }
          }
        })
      }

    </Stack >

  </Flex >)
}

export default SchoolsPage