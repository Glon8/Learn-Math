import { Flex, Text, Separator, Stack } from "@chakra-ui/react"
import "primeicons/primeicons.css";
import { useState } from "react";

import TwoTitlesSlot from "../components/TwoTitlesSlot";
import TopicBut from "../components/TopicBut";
import Spin from "../components/Spin";
import TextArea from "../components/TextArea";

function HintsPage() {
  const [useSchool, setSchool] = useState(true);
  const [useTop, setTop] = useState('sum_substract');

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
      gap={3}>

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
      <Separator />
      <Flex hideFrom={'lg'}>
        <Spin classList={topic_names}
          additional={{ teach: 'Discuss With Teach!' }}
          getValue={(value) => setTop(value)} />
      </Flex>

      <Flex hideBelow={'lg'} justify={'space-between'}>
        <TopicBut pi_icon={'pi-list-check'}
          title={'Teenage-School'}
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
          borderColor={"gray.300"}
          borderWidth={1}
          justifyItems={'center'}
          rounded={'xl'}
          flexDirection={"column"}
          gapY={3}
          padding={5}>

          <Text>Topics explanation here! This tab is scrollabble! Current topic is {topic_names[useTop]}</Text>
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
            Object.entries(topic_names).map((topic, index) => {
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