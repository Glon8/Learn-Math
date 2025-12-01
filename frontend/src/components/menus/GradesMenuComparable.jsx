import { Flex, Separator, Text } from "@chakra-ui/react"
import "primeicons/primeicons.css";

import { languageContext } from "../../context/LanguagesContext";

import TitleSlot from "../slots/TitleSlot";
import TwoTitlesSlot from "../slots/TwoTitlesSlot";
import CompareSlot from "../slots/CompareSlot";
import Slot from "../slots/Slot";

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
    fst_scores,
    comparable,
    sec_scores,
    sec_user }) {
    const { language, defPack } = languageContext();

    return (<Flex display={display ?? 'none'}
        height={'fit'}
        width={'25rem'}
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
            title_type === 0 ? (<TitleSlot pi_icon={pi_icon ?? ''} title={title ?? 'Deffault Title'} />) :
                (title_type === 1 && title_info ? (comparable === 2 ?
                    (<TitleSlot pi_icon={pi_icon ?? ''} title={title ?? 'Deffault Title'} />) :
                    (<TwoTitlesSlot title_info={title_info ?? ''} />)
                ) : null)
        }
        {
            comparable === 2 && fst_scores && title_info ?
                (<TwoTitlesSlot title_info={{
                    title_a: {
                        pi_icon: '',
                        title: sec_user
                    },
                    title_b: {
                        pi_icon: '',
                        title: title_info.title_b.title
                    }
                }}
                    boldness={'normal'} />)
                : null
        }
        <Separator />
        {
            topic_names && fst_scores ?
                (Object.entries(topic_names).map((topic, i) => {
                    const score = fst_scores[topic[0]] ? Math.trunc(fst_scores[topic[0]]) : 0;
                    const other_score = sec_scores?.[topic[0]] ? Math.trunc(sec_scores?.[topic[0]]) : null;

                    switch (comparable) {
                        case 0: {
                            if (topic[0] === 'equasions_basic')
                                return (
                                    <Separator key={i + topic[1]}
                                        paddingTop={3}>
                                        <Slot value={score ?? 0}
                                            placeholder={'0'}
                                            category={topic[1]} defRev={true}
                                        />
                                    </Separator>)
                            else return (<Slot key={i + topic[1]}
                                placeholder={'0'}
                                value={score ?? 0}
                                category={topic[1]}  defRev={true}
                            />)
                        }
                        case 1: {
                            if (topic[0] === 'equasions_basic')
                                return (
                                    <Separator key={i + topic[1]}
                                        paddingTop={3}>
                                        <Slot value={score ?? 0}
                                            placeholder={'0'}
                                            category={topic[1]}
                                            color={score > other_score ? 'green' : ''}  defRev={true}
                                        />
                                    </Separator>)
                            else return (<Slot key={i + topic[1]}
                                placeholder={'0'}
                                value={score ?? 0}
                                category={topic[1]}
                                color={score > other_score ? 'green' : ''}  defRev={true}
                            />)
                        }
                        case 2: {
                            if (topic[0] === 'equasions_basic')
                                return (<Separator key={i + topic[1]}
                                    paddingTop={3}>
                                    <CompareSlot value_a={other_score ?? 0}
                                        value_b={score ?? 0}
                                        category={topic[1]}
                                    />
                                </Separator>)
                            else return (<CompareSlot key={i + topic[1]}
                                value_a={other_score ?? 0}
                                value_b={score ?? 0}
                                category={topic[1]}
                            />)
                        }
                    }
                })) : (<Text color={{ _light: '#1D282E', _dark: '#EEF6F9' }}>{language?.statics?.error?.listMissing ?? defPack.statics.error.listMissing}</Text>)
        }
    </Flex>)
}

export default GradesMenuComparable