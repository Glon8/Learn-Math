import { Flex, Separator } from "@chakra-ui/react"
import "primeicons/primeicons.css";

import TitleSlot from "../components/TitleSlot";
import TwoTitlesSlot from "../components/TwoTitlesSlot";
import CompareSlot from "./CompareSlot";
import Slot from "../components/Slot";

/* 
<GradesMenu display={'flex'}
        title_type={0 one, 1 two}
        pi_icon={if title_type 0}
        title={if title_type 0}
        title_info={if title_type 1
                    example
                    {title_a: {
                                    pi_icon: '',
                                    title: 'title a'
                                  },
                                  title_b: {
                                    pi_icon: '',
                                    title: 'title b'
                                  }}
                    }
        topic_names={topic_names}
        my_scores={my_scores}
        comparable={0 highlight, 1 table}
        compare_to_grades={other users grades}
    />
*/
function GradesMenuComparable({ display, title_type, pi_icon, title, title_info, topic_names, my_scores, comparable, compare_to_grades }) {

    return (<Flex display={display ? display : 'none'}
        height={'fit'}
        width={'25rem'}
        gapY={3}
        paddingX={5}
        paddingY={7}
        flexDirection={"column"}
        border borderRadius={"xl"}
        borderColor={'black'}
        borderWidth={1}
        textAlign={'center'} >
        {
            title_type === 0 ? (<TitleSlot pi_icon={pi_icon ? pi_icon : ''} title={title ? title : 'Deffault Title'} />) :
                (title_type === 1 && title_info ? (<TwoTitlesSlot title_info={title_info ? title_info : ''} />) :
                    'error: "title_type" accepts 0 or 1')
        }
        {
            comparable === 1 && my_scores && my_scores.length > 0 ?
                (<TwoTitlesSlot title_info={{
                    title_a: {
                        pi_icon: title_info.title_a.pi_icon,
                        title: title_info.title_a.title
                    },
                    title_b: {
                        pi_icon: title_info.title_b.pi_icon,
                        title: title_info.title_b.title
                    }
                }}
                    boldness={'normal'} />)
                : ''
        }
        <Separator />
        {
            topic_names && my_scores ?
                (comparable === 0 ? (Object.entries(topic_names).map((topic, i) => {
                    const score = my_scores[topic[0]];

                    if (topic[0] === 'equasions_basic')
                        return (
                            <Separator key={i + topic[1]}>
                                <Slot value={score ? score : 0} category={topic[1]} />
                            </Separator>)
                    else return (<Slot key={i + topic[1]} value={score ? score : 0} category={topic[1]} />)
                })) :
                    (comparable === 1 ? (Object.entries(topic_names).map((topic, i) => {
                        const score = my_scores[topic[0]];
                        const other_score = compare_to_grades[topic[0]];

                        if (topic[0] === 'equasions_basic')
                            return (
                                <Separator key={i + topic[1]}>
                                    <Slot value={score ? score : 0}
                                        category={topic[1]}
                                        color={score > other_score ? 'green' : ''} />
                                </Separator>)
                        else return (<Slot key={i + topic[1]}
                            value={score ? score : 0}
                            category={topic[1]}
                            color={score > other_score ? 'green' : ''} />)
                    })) :
                        (comparable === 2 ? (Object.entries(topic_names).map((topic, i) => {
                            const score = my_scores[topic[0]];
                            const other_score = compare_to_grades[topic[0]];

                            if (topic[0] === 'equasions_basic')
                                return (<Separator key={i + topic[1]}>
                                    <CompareSlot value_a={score ? score : 0} value_b={other_score ? other_score : 0} category={topic[1]} />
                                </Separator>)
                            else return (<CompareSlot key={i + topic[1]}
                                value_a={score ? score : 0}
                                value_b={other_score ? other_score : 0}
                                category={topic[1]} />)
                        })) : 'Something missing... maybe a list.')
                    ))  : 'Something missing... maybe a list.'
        }
    </Flex>)
}

export default GradesMenuComparable