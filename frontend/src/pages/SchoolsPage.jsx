import { Flex, Stack, Text, Separator, Button } from "@chakra-ui/react"
import "primeicons/primeicons.css";

import TitleSlot from '../components/TitleSlot.jsx'
import { useNavigate } from "react-router-dom";

function SchoolsPage() {
  const navigate = useNavigate();

  const toExercise = (topic) => {
    navigate('/exercise', { state: { exerciseId: topic[0], exerciseWritten: topic[1] } })
  };

  const toTop = () => { console.log('top') }
  const toLeft = () => { console.log('left') }
  const toBottom = () => { console.log('bottom') }
  const toRight = () => { console.log('right') }

  const options = {
    top: {
      label: 'Top',
      onClick: toTop
    },
    left: {
      label: 'Left',
      onClick: toLeft
    },
    bottom: {
      label: 'Bottom',
      onClick: toBottom
    },
    right: {
      label: 'Right',
      onClick: toRight
    }
  };

  const topic_names = {
    summary_substraction: 'summary & substraction',
    multiplication_division: 'multiplication & division',
    mixed: 'mixed',
    power_root: 'power & root',
    fraction_fractionMixed: 'fractions',
    forms_sizes: 'forms & sizes',
    exam_basic: 'exam - basic',
    equasions_basic: 'equasions - basic',
    equations_two_unknowns: 'equasions - two unknowns',
    verbal_problems: 'verbal problems',
    geometry: 'geometry',
    quadratic_equation: 'quadratic equation',
    circles: 'circles',
    exam_advanced: 'exam - advanced'
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

      <TitleSlot pi_icon={'pi-list-check'} title={'SCHOOLS TOPICS'} />
      <Separator />
      <Text textAlign={'center'}>Select topic that you would like to exercise at!</Text>
      <Separator />
      {

        Object.entries(topic_names).map((topic) => {
          if (topic[0] === 'equasions_basic') {
            return (<Separator key={topic[0]}
              paddingTop={1}>

              <Flex
                flexDirection={"row"}
                gapX={3}
                alignItems={'center'}>

                <Button bg={'gray.100'}
                  color={'black'}
                  width={'15rem'}
                  onClick={() => {
                    toExercise(topic);
                  }}>

                  <Flex width={'full'}
                    alignItems={'center'}
                    gap={3}>
                    <i className="pi pi-hashtag" />{topic[1]}
                  </Flex>

                </Button>
                <Text fontWeight={'medium'}>-</Text>
                <Text>Summary Explanation</Text>

              </Flex>

            </Separator>)
          }
          else return (<Flex key={topic[0]}
            flexDirection={"row"}
            gapX={3}
            alignItems={'center'}>

            <Button bg={'gray.100'}
              color={'black'}
              width={'15rem'}
              onClick={() => { toExercise(topic) }}
            >

              <Flex width={'full'}
                alignItems={'center'}
                gap={3}>
                <i className="pi pi-hashtag" />{topic[1]}
              </Flex>

            </Button>
            <Text fontWeight={'medium'}>-</Text>
            <Text>Summary Explanation</Text>

          </Flex>)
        })
      }

    </Stack >

  </Flex >)
}

export default SchoolsPage