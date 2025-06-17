import { Flex, Text, Separator, Stack, Button } from "@chakra-ui/react"
import "primeicons/primeicons.css";
import { useState } from "react";

import TwoTitlesSlot from "../components/TwoTitlesSlot";
import TopicBut from "../components/TopicBut";

function HintsPage() {
  const [useSchool, setSchool] = useState(true);

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
      {
        // AI session popup speak goes here
      }
      <Flex justify={'space-between'}>
        <TopicBut pi_icon={'pi-list-check'}
          title={'Teenage-School'}
          onClick={() => { setSchool(true) }}
          showSub={true}
        />
        <Button color={"black"} background={'gray.100'}>I would like discuss the topic with the teach!</Button>

          <TopicBut pi_icon={'pi-list-check'}
            title={'High-School'}
            onClick={() => { setSchool(false) }}
            showSub={true}
            dir={'row-reverse'}
          />
      </Flex>
      <Flex gap={3}
        flexDirection={useSchool ? 'row-reverse' : 'row'}>

        <Flex w={'full'} border borderColor={"gray.300"} borderWidth={1} justifyItems={'center'} rounded={'xl'} flexDirection={"column"} gapY={3} padding={5}>

          <Text>Topics explanation here! This tab is scrollabble!</Text>

        </Flex>
        <Flex flexDirection={"column"} gapY={3}>
          <Separator />
          {

            Object.entries(topic_names).map((topic, index) => {
              if (useSchool && index >= 0 && index < 7)
                return (<TopicBut key={topic[0]}
                  pi_icon={'pi-hashtag'}
                  title={topic[1]}
                  onClick={() => { setSchool(true) }}
                  showSub={true}
                />)
              else if (!useSchool && index >= 7)
                return (<TopicBut key={topic[0]}
                  pi_icon={'pi-hashtag'}
                  title={topic[1]}
                  onClick={() => { setSchool(true) }}
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