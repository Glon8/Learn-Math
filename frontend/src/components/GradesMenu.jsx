import { Flex, Separator } from "@chakra-ui/react"
import "primeicons/primeicons.css";

import TitleSlot from "../components/TitleSlot";
import TwoTitlesSlot from "../components/TwoTitlesSlot";
import Slot from "../components/Slot";

function GradesMenu({ display, title_type, pi_icon, title, title_info, topic_names, my_scores, size, part }) {
    return (<Flex display={display ? display : 'none'}
        h={'fit'}
        width={{ base: 'full', sm: '25rem' }}
        justifyContent={'center'}
        gapY={5}
        paddingX={5}
        paddingY={7}
        flexDirection={"column"}
        border
        borderRadius={"xl"}
        borderWidth={1}
        textAlign={'center'}
        _light={{
            boxShadow: 'lg',
            backgroundColor: 'white',
            borderColor: '#B1B7BA'
        }}
        _dark={{
            boxShadow: '0 0 2rem 0.5rem rgb(238, 246, 249)',
            background: '#8b8da0',
            borderColor: '#1D282E',
        }} >
        {
            title_type === 0 ? (<TitleSlot pi_icon={pi_icon ? pi_icon : ''} title={title ? title : 'Deffault Title'} />) :
                (title_type === 1 && title_info ? (<TwoTitlesSlot title_info={title_info ? title_info : ''} />) :
                    'error: "title_type" accepts 0 or 1')
        }
        <Separator />
        {
            topic_names ?
                (Object.entries(topic_names)
                    .map((topic, index) => {
                        const score = my_scores[topic[0]];

                        if (size === 0) {
                            if (part === 0) {
                                if (index < 7) {
                                    return (<Slot key={topic[1]} value={score ? score : 0} category={topic[1]} auto={true} />)
                                }
                            }
                            else {
                                if (index >= 7) {
                                    return (<Slot key={topic[1]} value={score ? score : 0} category={topic[1]} auto={true} />)
                                }
                            }
                        }
                        else if (size === 1) {
                            if (index === 7) {
                                return (<Separator key={topic[1]}
                                    paddingTop={3}>
                                    <Slot key={score} value={score ? score : 0} category={topic[1]} auto={true} />
                                </Separator>)
                            }
                            else return (<Slot key={topic[1]} value={score ? score : 0} category={topic[1]} auto={true} />)
                        }
                    })) : (<Text color={{ _light: '#1D282E', _dark: '#EEF6F9' }}>Something wrong, perhaps no list?</Text>)
        }
    </Flex>)
}

export default GradesMenu