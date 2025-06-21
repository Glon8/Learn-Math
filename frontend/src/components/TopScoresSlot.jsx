import { Text, Flex, Menu, Portal, Separator } from "@chakra-ui/react"
import "primeicons/primeicons.css";

import TitleSlot from "./TitleSlot";
import Slot from "./Slot";
import CompareSlot from "./CompareSlot";
import TwoTitlesSlot from "./TwoTitlesSlot";

/*
  <TopScoresSlot i={i}
   user={user}
   user_scores_list={user_scores_list}
   topic_names={topic_names}
   use_compare={use_compare}
   my_scores={my_scores}
   temp={temp}
   />
*/

function TopScoresSlot({ i, user, user_scores_list, topic_names, use_compare, my_user, my_scores, temp }) {
  return (<Menu.Root>

    <Menu.Trigger>

      <Flex width={'xs'} flexDirection={'row'} justify={'space-between'}>

        <Flex flexDirection={'row'} gap={3}>
          <Text>{1 + i}</Text>
          <i className="pi pi-trophy" />
          <Text textAlign={'center'}>{user.name}</Text>
        </Flex>
        <Text>
          {
            !user_scores_list && user_scores_list.length <= 0 ? '0' : temp = 0
          }
          {
            user_scores_list.map((scores) => {
              if (user._id === scores._id) {
                Object.entries(topic_names).map((topic) => {
                  const score = scores[topic[0]];

                  temp = temp + score;
                })

                temp = temp / 13;

                return (`${temp.toFixed(2)}`)
              }
            })
          }
        </Text>

      </Flex>

    </Menu.Trigger>
    <Portal>

      <Menu.Positioner>

        <Menu.Content width={'xs'} paddingX={5} paddingY={3} marginStart={5}>

          <TitleSlot pi_icon={'pi-graduation-cap'} title={'Scores'} />
          {
            use_compare && user_scores_list && user_scores_list.length > 0 ?
              (<TwoTitlesSlot title_info={{
                title_a: {
                  pi_icon: '',
                  title: user.name
                },
                title_b: {
                  pi_icon: '',
                  title: my_user.name
                }
              }}
                boldness={'normal'} />) : ''
          }
          <Separator />
          {
            !user_scores_list || user_scores_list.length <= 0 ?
              (<Text>Whoops! Something went wrong, no grades awailable.</Text>) : ''
          }
          {
            // split users grades list in to seperate lists per user
            user_scores_list.map((scores, i2) => {
              // split user grades list into seperate topics
              if (!use_compare) { // < without compare
                // checking if user id match list id
                if (user._id === scores._id)
                  return Object.entries(topic_names).map((topic) => {
                    const score = scores[topic[0]];

                    if (topic[0] === 'equasions_basic')
                      return (
                        <Separator key={i2 + topic[1]}>
                          <Slot value={score ? score : ''}
                            category={topic[1]}
                            auto={true}
                            placeholder={'0'} />
                        </Separator>)
                    else return (<Slot key={i2 + topic[1]}
                      value={score ? score : ''}
                      category={topic[1]}
                      auto={true}
                      placeholder={'0'} />)
                  })
              } else { // < with compare
                if (user._id === scores._id)
                  return Object.entries(topic_names).map((topic) => {
                    const score = scores[topic[0]];
                    const user_score = my_scores[topic[0]];

                    if (topic[0] === 'equasions_basic')
                      return (
                        <Separator key={i2 + topic[1]}>
                          <CompareSlot value_a={score ? score : 0} value_b={user_score ? user_score : 0} category={topic[1]} />
                        </Separator>)
                    else return (<CompareSlot key={i2 + topic[1]}
                      value_a={score ? score : 0}
                      value_b={user_score ? user_score : 0}
                      category={topic[1]} />)
                  })
              }
            })
          }

        </Menu.Content>

      </Menu.Positioner>

    </Portal>

  </Menu.Root>)
}

export default TopScoresSlot