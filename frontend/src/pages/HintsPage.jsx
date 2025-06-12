import { Flex, Text, Separator, Stack, Button } from "@chakra-ui/react"
import "primeicons/primeicons.css";
import TwoTitlesSlot from "../components/TwoTitlesSlot";

function HintsPage() {
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
    paddingX={'10%'}
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
      <Button color={"black"} background={'gray.100'}>I would like discuss the topic with the teach!</Button>
      <Flex gap={3}>

        <Flex w={'full'} border borderColor={"gray.300"} borderWidth={1} justifyItems={'center'} rounded={'xl'} flexDirection={"column"} gapY={3} padding={5}>

          <Text>Topics explanation here! This tab is scrollabble!</Text>

        </Flex>
        <Flex flexDirection={"column"} gapY={3}>
          <Separator />
          {

            Object.entries(topic_names).map((topic) => {
              if (topic[0] === 'equasions_basic') {
                return (<Separator key={topic[0]}>

                  <Flex justifyContent={'right'}
                    marginTop={1}>

                    <Button
                      color={"black"}
                      background={'gray.100'}
                      width={'full'}
                    >

                      <Flex width={'full'} justifyContent={'right'} gap={3}>
                        <Text textAlign={'right'}>{topic[1]}</Text>
                      </Flex>

                    </Button>

                  </Flex>

                </Separator>)
              }
              else return (<Button key={topic[0]}
                color={"black"}
                background={'gray.100'}
              >

                <Flex width={'full'} justifyContent={'right'} gap={3}>
                  <Text textAlign={'right'}>{topic[1]}</Text>
                </Flex>

              </Button>)
            })
          }
        </Flex>

      </Flex>

    </Stack>

  </Flex>)
}

export default HintsPage