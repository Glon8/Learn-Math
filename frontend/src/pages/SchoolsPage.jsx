import { Flex, Stack, Text, Separator, useBreakpointValue } from "@chakra-ui/react"
import "primeicons/primeicons.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { InlineMath, BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'

import { userContext } from "../context/UserContext.jsx";
import { languageContext } from '../context/LanguagesContext.jsx';

import TitleSlot from '../components/TitleSlot.jsx'
import TopicBut from '../components/TopicBut.jsx'

function SchoolsPage() {
  const navigate = useNavigate();
  const { pos } = userContext();
  const { language, defPack } = languageContext();

  const navShort = useBreakpointValue({ base: true, sm: true, md: false, lg: false, xl: false });
  const [useSchool, setSchool] = useState(true);
  const [topic, setTopic] = useState(language?.statics?.topics ?? defPack.statics.topics);

  const toExercise = (topic) => {
    navigate('/exercise', { state: { exerciseId: topic[0], exerciseWritten: topic[1] } })
  };

  const mixedText = (message) => {
    const part = message.split(/(\$[^$]*\$)/g);

    return part.map((part, i) => {
      if (part.startsWith('$') && part.endsWith('$')) {
        const math = part.slice(1, -1);

        return <InlineMath key={i} math={math} />
      }
      return <ReactMarkDown key={i}>{part}</ReactMarkDown>
    });
  }

  useEffect(() => {
    setTopic(language?.statics?.topics ?? defPack.statics.topics);
  }, [language]);

  return (<Flex w={'100%'}
    alignItems={'center'}
    flexDirection={"column"}
    paddingLeft={pos === 'left' ? { base: '3rem', sm: '3rem', md: '3rem', lg: '5rem' } : ''}
    paddingRight={pos === 'right' ? { base: '3rem', sm: '3rem', md: '3rem', lg: '5rem' } : ''}
    paddingTop={!pos || pos === 'top' ? { base: '2.5rem', sm: '2.5rem', md: '2.5rem', lg: '10%' } : { md: '5%' }}
    paddingBottom={pos === 'bottom' ? { base: '2.5rem', sm: '2.5rem', md: '2.5rem', lg: '5rem' } : ''}>

    <Stack border borderWidth={1}
      paddingX={5}
      paddingY={7}
      rounded={'xl'}
      gap={3}
      w={{ base: "100%", sm: '80%' }}
      minW={{ base: 'auto', sm: '25rem' }}
      maxW={'65rem'}
      _light={{
        boxShadow: 'lg',
        backgroundColor: 'white',
        borderColor: '#B1B7BA'
      }}
      _dark={{
        boxShadow: '0 0 2rem 0.5rem rgb(238, 246, 249)',
        background: '#8b8da0',
        borderColor: '#1D282E',
      }}>

      <TitleSlot pi_icon={'pi-list-check'} title={language?.schools?.schoolsTopicTitle ?? defPack.schools.schoolsTopicTitle} />
      <Separator marginTop={3} />
      <Flex justify={'space-between'}
        gapX={3}
        hideBelow={'md'}>

        <TopicBut pi_icon={'pi-list-check'}
          title={language?.schools?.elementarySchool ?? defPack.schools.elementarySchool}
          onClick={() => { setSchool(true) }}
          showSub={true}
        />
        {/* on mobile this explanation possible to add as toast! */}
        <Text hideBelow={"xl"}
          border
          width={'full'}
          textAlign={'center'}
          background={{ _dark: '#1D282E/65' }}
          rounded={'sm'}
          paddingX={3}
          paddingY={1}
          boxShadow={'sm'}
          color={{ _light: '#1D282E', _dark: '#EEF6F9' }}
          fontWeight={'medium'}
        >{language?.schools?.innerTitle ?? defPack.schools.innerTitle}</Text>
        <TopicBut
          pi_icon={'pi-list-check'}
          title={language?.schools?.highSchool ?? defPack.schools.highSchool}
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
              subTitle={language?.statics?.shortDesc?.[topic[0]] ??
                defPack?.statics?.shortDesc?.[topic[0]]}
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
                subTitle={language?.statics?.shortDesc?.[topic[0]] ??
                  defPack?.statics?.shortDesc?.[topic[0]]
                }
              />)
            }
            else if (!useSchool && index >= 7) {
              return (<TopicBut key={topic[0]}
                pi_icon={'pi-hashtag'}
                title={topic[1]}
                onClick={() => { toExercise(topic) }}
                showSub={false}
                subTitle={language?.statics?.shortDesc?.[topic[0]] ??
                  defPack?.statics?.shortDesc?.[topic[0]]}
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