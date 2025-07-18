import { Flex, Stack, Text, Separator, Button } from "@chakra-ui/react"
import "primeicons/primeicons.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from 'react'
import { userContext } from "../components/UserContext.jsx";
import { callToast } from '../components/Toast.jsx'

import TwoTitlesSlot from '../components/TwoTitlesSlot.jsx'

function ExercisePage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, upScore, pos } = userContext();

    const [useGrade, setGrade] = useState(0);

    const exercisesList = [
        {
            form: '1 + 2 = ',
            answer: 3
        }, {
            form: '72 + 9 = ',
            answer: 81
        }, {
            form: '43 + 2 = ',
            answer: 45
        }, {
            form: '67 + 33 = ',
            answer: 100
        }, {
            form: '4 + 9 = ',
            answer: 11
        }
    ];

    const { exerciseId, exerciseWritten } = location.state || {};
    const toMain = () => { navigate('/'); }
    const addGrade = () => {
        const grade = Math.floor(Math.random() * 100) + 1;

        upScore(exerciseId, grade);
        //upScore(exerciseId, useGrade);

        if (user._id === null) callToast('Info:', 'Dear user, note, that unable to save your progress for the future, because you are not logged in!', '', '', pos);
    }

    const exerciseCheckList = () => {
        return exercisesList && exercisesList.length !== 0
    }

    return (<Flex alignItems={'center'}
        flexDirection={"column"}
        paddingLeft={pos === 'left' ? { base: '3rem', sm: '3rem', md: '3rem', lg: '5rem' } : ''}
        paddingRight={pos === 'right' ? { base: '3rem', sm: '3rem', md: '3rem', lg: '5rem' } : ''}
        paddingTop={pos === 'top' ? { base: '2.5rem', sm: '2.5rem', md: '2.5rem', lg: '10%' } : { md: '5%' }}
        paddingBottom={pos === 'bottom' ? { base: '2.5rem', sm: '2.5rem', md: '2.5rem', lg: '5rem' } : ''}
    >

        <Stack border
            borderWidth={1}
            paddingX={5}
            paddingY={7}
            rounded={'xl'}
            gap={3}
            h={'fit'}
            maxW={'65rem'}
            _light={{
                boxShadow: 'lg',
                backgroundColor: 'white',
                borderColor: '#B1B7BA',
                color: '#1D282E'
            }}
            _dark={{
                boxShadow: '0 0 2rem 0.5rem rgb(238, 246, 249)',
                background: '#8b8da0',
                borderColor: '#1D282E',
                color: '#EEF6F9'
            }}>

            <TwoTitlesSlot title_info={exerciseCheckList() ? {
                title_a: {
                    pi_icon: 'pi-hashtag',
                    title: `Exercise ${exerciseWritten}`
                },
                title_b: {
                    pi_icon: 'pi-verified',
                    title: useGrade
                }
            } : {
                title_a: {
                    pi_icon: 'pi-hashtag',
                    title: `Exercise ${exerciseWritten}`
                }
            }} />
            {
                exerciseCheckList() ?
                    (<Separator paddingTop={3}>
                        <Text textAlign={'center'}
                            fontWeight={'medium'}
                        >Solve exercises to recieve a grade! (Max grade is 100)</Text>
                    </Separator>) : null
            }
            <Separator />
            <Text>(those exercises returned from server as array! also popups on progress or issues ll be shown below.)</Text>
            {
                exerciseCheckList() ? exercisesList.map((exercise, index) => {
                    return (<Flex key={index} gapX={2} fontWeight={'medium'}>
                        <Text marginEnd={3}>{1 + index}.</Text>
                        <Text>{exercise.form}</Text>
                        <Text>{exercise.answer}</Text>
                    </Flex>)
                }) :
                    (<Text><i className="pi pi-wrench" /> Oooopps... its seems like something wrong, try to reconnect to internet or refresh the page.</Text>)
            }

            <Button focusRing={'inside'}
                onClick={() => addGrade()}
                _light={{
                    background: "white",
                    borderColor: "#B1B7BA/20",
                    focusRingColor: '#B1B7BA',
                    color: '#1D282E'
                }}
                _dark={{
                    background: "#1D282E",
                    borderColor: "#1D282E",
                    focusRingColor: '#B1B7BA',
                    color: '#EEF6F9'
                }}>Done</Button>

        </Stack>

    </Flex>)
}

export default ExercisePage