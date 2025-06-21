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
function GradesMenuComparable({ display,
    title_type,
    pi_icon,
    title,
    title_info,
    topic_names,
    my_scores,
    comparable,
    compare_to_grades,
    compare_to }) {

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
                (title_type === 1 && title_info ? (comparable === 2 ?
                    (<TitleSlot pi_icon={pi_icon ? pi_icon : ''} title={title ? title : 'Deffault Title'} />) :
                    (<TwoTitlesSlot title_info={title_info ? title_info : ''} />)
                ) :
                    'error: "title_type" accepts 0 or 1')
        }
        {
            comparable === 2 && my_scores && title_info ?
                (<TwoTitlesSlot title_info={{
                    title_a: {
                        pi_icon: '',
                        title: compare_to
                    },
                    title_b: {
                        pi_icon: '',
                        title: title_info.title_b.title
                    }
                }}
                    boldness={'normal'} />)
                : ''
        }
        <Separator />
        {
            topic_names && my_scores ?
                (Object.entries(topic_names).map((topic, i) => {
                    const score = my_scores[topic[0]];
                    const other_score = compare_to_grades[topic[0]];

                    switch (comparable) {
                        case 0: {
                            if (topic[0] === 'equasions_basic')
                                return (
                                    <Separator key={i + topic[1]}>
                                        <Slot value={score ? score : ''}
                                            placeholder={'0'}
                                            category={topic[1]}
                                            auto={true}
                                        />
                                    </Separator>)
                            else return (<Slot key={i + topic[1]}
                                placeholder={'0'}
                                value={score ? score : ''}
                                category={topic[1]}
                                auto={true}
                            />)
                        }
                        case 1: {
                            if (topic[0] === 'equasions_basic')
                                return (
                                    <Separator key={i + topic[1]}>
                                        <Slot value={score ? score : ''}
                                            placeholder={'0'}
                                            category={topic[1]}
                                            color={score > other_score ? 'green' : ''}
                                            auto={true}
                                        />
                                    </Separator>)
                            else return (<Slot key={i + topic[1]}
                                placeholder={'0'}
                                value={score ? score : ''}
                                category={topic[1]}
                                color={score > other_score ? 'green' : ''}
                                auto={true}
                            />)
                        }
                        case 2: {
                            if (topic[0] === 'equasions_basic')
                                return (<Separator key={i + topic[1]}>
                                    <CompareSlot value_a={other_score ? other_score : 0}
                                        value_b={score ? score : 0}
                                        category={topic[1]}
                                    />
                                </Separator>)
                            else return (<CompareSlot key={i + topic[1]}
                                value_a={other_score ? other_score : 0}
                                value_b={score ? score : 0}
                                category={topic[1]}
                            />)
                        }
                    }
                })) : 'Something missing... maybe a list.'
        }
    </Flex>)
}

export default GradesMenuComparable