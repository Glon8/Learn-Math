import { Flex, Stack, Text, Separator, useBreakpointValue } from "@chakra-ui/react"
import "primeicons/primeicons.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import TitleSlot from '../components/TitleSlot.jsx'
import TopicBut from '../components/TopicBut.jsx'

function SchoolsPage() {
  const navigate = useNavigate();

  const navShort = useBreakpointValue({ sm:true, md: true, lg: false, xl: false });
  const [useSchool, setSchool] = useState(true);

  const toExercise = (topic) => {
    navigate('/exercise', { state: { exerciseId: topic[0], exerciseWritten: topic[1] } })
  };

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

  return (<Flex justifyItems={'center'}
    flexDirection={"column"}
    paddingTop={'3rem'}
    paddingX={'20%'}
    paddingY={'10%'}>

    <Stack border borderColor={"black"} borderWidth={1}
      paddingX={5}
      paddingY={7}
      rounded={'xl'}
      gap={3}
      minW={'25rem'}>

      <TitleSlot pi_icon={'pi-list-check'} title={'SCHOOLS TOPICS'} />
      <Separator />
      <Flex justify={'space-between'}
        gapX={3}
        hideBelow={'lg'}>

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
        Object.entries(topic_names).map((topic, index) => {
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