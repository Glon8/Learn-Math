import { Flex, Text, Separator, Stack } from "@chakra-ui/react"
import "primeicons/primeicons.css";
import { useState } from "react";
import ReactMarkDown from 'react-markdown'
import { InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'

import { userContext } from "../context/UserContext";
import { topicNames } from "../util/Statics.js";
import { languageContext } from "../context/LanguagesContext.jsx";

import TwoTitlesSlot from "../components/TwoTitlesSlot";
import TopicBut from "../components/TopicBut";
import Spin from "../components/Spin";
import TextArea from "../components/TextArea";
import { useEffect } from "react";

function HintsPage() {
  const { pos, logs } = userContext();
  const { language } = languageContext();

  const [useSchool, setSchool] = useState(true);
  const [useTop, setTop] = useState('sum_substract');

  const [topic, setTopic] = useState(language?.statics?.topics ? language?.statics?.topics : topicNames);

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
    setTopic(language?.statics?.topics ? language?.statics?.topics : topicNames);
  }, [language]);

  return (<Flex alignItems={'center'}
    flexDirection={"column"}
    w={'100%'}
    paddingLeft={pos === 'left' ? { base: '3rem', sm: '3rem', md: '3rem', lg: '5rem' } : ''}
    paddingRight={pos === 'right' ? { base: '3rem', sm: '3rem', md: '3rem', lg: '5rem' } : ''}
    paddingTop={pos === 'top' ? { base: '2.5rem', sm: '2.5rem', md: '2.5rem', lg: '10%' } : { md: '5%' }}
    paddingBottom={pos === 'bottom' ? { base: '2.5rem', sm: '2.5rem', md: '2.5rem', lg: '5rem' } : ''}>

    <Stack border
      borderWidth={1}
      paddingX={5}
      paddingY={7}
      rounded={'xl'}

      h={'fit'}
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
          title: language?.hints?.hintsTitle ? language?.hints?.hintsTitle : 'HINTS'
        },
        title_b: {
          pi_icon: 'pi-list-check',
          title: language?.hints?.schoolsTopicTitle ? language?.hints?.schoolsTopicTitle : 'SCHOOLS TOPICS'
        },

      }} />
      <Separator colorPalette="green" />
      <Flex hideFrom={'lg'}>
        {
          // BUG: (minor) by resizing the screen to mobile, it should reset value
          //  of the useTop or set cur value to the Spin.
        }
        <Spin classList={topic}
          additional={{ teach: (language?.hints?.teach ? language?.hints?.teach : 'Discuss With Teach!') }}
          getValue={(value) => setTop(value)} />
      </Flex>

      <Flex hideBelow={'lg'} justify={'space-between'}>
        <TopicBut pi_icon={'pi-list-check'}
          title={language?.hints?.elementarySchool ? language?.hints?.elementarySchool : 'Elementary-School'}
          onClick={() => setSchool(true)}
          showSub={true}
        />

        <TopicBut pi_icon={'pi-list-check'}
          title={language?.hints?.highSchool ? language?.hints?.highSchool : 'High-School'}
          onClick={() => setSchool(false)}
          showSub={true}
          dir={'row-reverse'}
        />
      </Flex>
      <Flex gap={3}
        flexDirection={useSchool ? 'row-reverse' : 'row'}
        position={'relative'}>

        <Flex position={'relative'}
          w={'full'}
          h={'auto'}
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

          <Flex flexDir='column' h={'full'} minH={'60%'}>
            {
              useTop == 'teach' ? (!!logs?.user ? (
                <Flex color={{ _light: '#1D282E', _dark: '#EEF6F9' }}
                  flexDirection={'column'}
                  gapY={3}>

                  <Flex flexDirection={'column'}
                    gapX={2}>

                    <Text fontWeight={'medium'}>{language?.hints?.user ? language?.hints?.user : 'User:'}</Text>
                    <ReactMarkDown>{logs.user}</ReactMarkDown>

                  </Flex>
                  <Flex flexDirection={'column'}
                    gapX={2}>

                    <Text fontWeight={'medium'}>{language?.hints?.teacher ? language?.hints?.teacher : 'Teacher:'}</Text>
                    <Flex flexDir={'column'}>{mixedText(logs.model)}</Flex>

                  </Flex>

                </Flex>) :
                (<Text color={{ _light: '#1D282E', _dark: '#EEF6F9' }}>
                  {language?.hints?.teacherWelcome ?
                    language?.hints?.teacherWelcome :
                    'Its a chat with virtual teach! Ask it freely about math topics and exercises struggle!'}
                </Text>)
              ) :
                (<Text color={{ _light: '#1D282E', _dark: '#EEF6F9' }}>Topics explanation here! This tab is scrollabble! Current topic is {topic[useTop]}</Text>)
            }
          </Flex>
          {
            useTop == 'teach' ? (<TextArea />) : null
          }
        </Flex>
        <Flex flexDirection={"column"} gapY={3} hideBelow={'lg'}>

          <Separator />
          <TopicBut
            pi_icon={'pi-question'}
            title={language?.hints?.placeholder ? language?.hints?.placeholder : 'Discuss With Teach!'}
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