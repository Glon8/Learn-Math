import { Flex, Separator } from "@chakra-ui/react"
import "primeicons/primeicons.css";

import TitleSlot from "../slots/TitleSlot";
import TwoTitlesSlot from "../slots/TwoTitlesSlot";
import Slot from "../slots/Slot";

function GradesMenu({ display, title_type, pi_icon, title, title_info, topic_names, fst_scores, size, part }) {
    return (<Flex display={display ?? 'none'}
        h={'fit'}
        width={{ base: 'full', sm: '25rem' }}
        justifyContent={'center'}
        gapY={3}
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
            title_type === 0 ? (<TitleSlot pi_icon={pi_icon ?? ''} title={title ?? 'Deffault Title'} />) :
                (title_type === 1 && title_info ? (<TwoTitlesSlot title_info={title_info ?? ''} />) :
                    'error: "title_type" accepts 0 or 1')
        }
        <Separator />
        {
            topic_names ?
                (Object.entries(topic_names).map(([topicKey, topicValue], index) => {
                    const score = fst_scores?.[topicKey] ? Math.trunc(fst_scores?.[topicKey]) : 0;

                    if (size === 0) {
                        if (part === 0) {
                            if (index < 7) {
                                return (<Slot key={topicValue} value={score ?? 0} category={topicValue} defRev={1}  />)
                            }
                        }
                        else {
                            if (index >= 7) {
                                return (<Slot key={topicValue} value={score ?? 0} category={topicValue} defRev={1} />)
                            }
                        }
                    }
                    else if (size === 1) {
                        if (index === 7) {
                            return (<Separator key={topicValue}
                                paddingTop={3}>
                                <Slot key={score} value={score ?? 0} category={topicValue} defRev={1} />
                            </Separator>)
                        }
                        else return (<Slot key={topicValue} value={score ?? 0} category={topicValue} defRev={1} />)
                    }
                })) : (<Text color={{ _light: '#1D282E', _dark: '#EEF6F9' }}>Something wrong, perhaps no list?</Text>)
        }
    </Flex>)
}

export default GradesMenu