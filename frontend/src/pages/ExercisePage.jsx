import { Flex, Stack, Text, Separator, Button } from "@chakra-ui/react"
import "primeicons/primeicons.css";
import { useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from 'react'
import { userContext } from "../context/UserContext.jsx";
import { languageContext } from "../context/LanguagesContext.jsx";
import axios from "axios";

import { callToast } from '../components/Toast.jsx'

import TwoTitlesSlot from '../components/TwoTitlesSlot.jsx'
import ExerciseForm from "../components/ExerciseForm.jsx";
import FinishForm from "../components/FinishForm.jsx";

function ExercisePage() {
    const location = useLocation();
    const { exerciseId, exerciseWritten } = location.state || {};

    const { user, upScore, score, pos, pingSchedule, set } = userContext();
    const { language } = languageContext();

    const [useGrade, setGrade] = useState(0);
    const [useExercise, setExercise] = useState([]);
    const appendScore = useRef(false);
    const oldGrade = useRef(!!score?.[exerciseId] ? score[exerciseId] : 0);

    const avrGrade = useRef(0);

    const [useScores, setScores] = useState([]);

    const addGrade = () => {
        appendScore.current = useGrade;

        upScore(exerciseId, useGrade);

        if (user._id === null) callToast('Info:', 'Dear user, note, that unable to save your progress for the future, because you are not logged in!', '', '', pos);
    }

    const testAddGrade = () => {
        const grade = Math.floor(Math.random() * 100) + 1;

        appendScore.current = grade;

        upScore(exerciseId, grade);
        //upScore(exerciseId, useGrade);

        if (user._id === null) callToast('Info:', 'Dear user, note, that unable to save your progress for the future, because you are not logged in!', '', '', pos);
    }

    const fetchExercises = async (topic, grade, settings) => {
        //console.log(topic)
        //console.log(grade)
        // console.log(settings)
        await pingSchedule();

        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_API}/api/exercise/get-exercise`, { topic: topic, grade: grade, settings: settings });

            const data = res.data.data;

            console.log('Exercise fetch success!');
            console.log(data);

            setExercise(data);
        }
        catch (error) {
            console.log('Error in fetching exercises: ' + error.message);
            callToast('Error:', error.message, '', 'error', pos);
        }
    }

    const exerciseCheckList = () => {
        return !!useExercise && useExercise.length !== 0
    }

    const averageGrade = async () => {
        let questionsList = [];
        let totalQuestions = 0;

        useExercise.forEach((thing) => {
            const length = thing.ans.length
            questionsList.push(length);
            console.log(questionsList[questionsList.length - 1])
        });

        //console.log('questionsList')
        //console.log(questionsList)

        for (let i = 0; i < questionsList.length; i++) {
            if (!!questionsList[i])
                totalQuestions += questionsList[i];
            else totalQuestions += 0;
        }

        //console.log('totalQuestions is ' + totalQuestions)

        let shouldBe = !!totalQuestions ? (100 / totalQuestions) : 0;

        //console.log('unpolished average grade is ' + shouldBe)

        shouldBe = shouldBe.toFixed(1);

        //console.log('polished average grade is ' + shouldBe)

        return parseFloat(shouldBe);
    }

    useEffect(() => {
        // update useGrade

        console.log('scores are :')
        console.log(useScores)

        let gradeUpdated = 0;

        useScores.forEach((item) => {
            if (!!item)
                for (let i = 0; i < item.length; i++) if (!!item[i]) gradeUpdated += avrGrade.current;
        });

        console.log('gradeUpdated: ' + gradeUpdated)
        console.log('averageGrade: ' + avrGrade.current)

        setGrade(gradeUpdated);
    }, [useScores]);

    useEffect(() => {
        const fetch = async () => {
            avrGrade.current = await averageGrade();
        }

        fetch();
    }, [useExercise])

    useEffect(() => {
        const fetch = async () => {
            await fetchExercises(exerciseId, score[exerciseId], set);

            console.log('averageGrade: ' + avrGrade.current)
        }

        fetch();
    }, []);

    return (<Flex alignItems={'center'}
        flexDirection={"column"}
        paddingLeft={pos === 'left' ? { base: '3rem', sm: '3rem', md: '3rem', lg: '5rem' } : ''}
        paddingRight={pos === 'right' ? { base: '3rem', sm: '3rem', md: '3rem', lg: '5rem' } : ''}
        paddingTop={pos === 'top' ? { base: '2.5rem', sm: '2.5rem', md: '2.5rem', lg: '10%' } : { md: '5%' }}
        paddingBottom={pos === 'bottom' ? { base: '2.5rem', sm: '2.5rem', md: '2.5rem', lg: '5rem' } : ''}
    >

        <Stack border
            w={{ base: "100%", sm: 'fit' }}
            borderWidth={1}
            paddingX={5}
            paddingY={7}
            rounded={'xl'}
            marginX={2}
            marginBottom={5}
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
                    title: `${language?.exercise?.title ? language?.exercise?.title : 'Exercise'} 
    ${language?.statics?.topics?.[exerciseId] ? language?.statics?.topics[exerciseId] : exerciseWritten}`
                },
                title_b: {
                    pi_icon: !!set[0] ? 'pi-verified' : null,
                    title: !!set[0] ? useGrade : null
                }
            } : {
                title_a: {
                    pi_icon: 'pi-hashtag',
                    title: `${language?.exercise?.title ? language?.exercise?.title : 'Exercise'} 
    ${language?.statics?.topics?.[exerciseId] ? language?.statics?.topics[exerciseId] : exerciseWritten}`
                }
            }} />
            {
                exerciseCheckList() ?
                    (<Separator paddingTop={3}>
                        <Text textAlign={'center'}
                            fontWeight={'medium'}
                        >{language?.exercise?.explanation ?
                            language?.exercise?.explanation :
                            'Solve exercises to recieve a grade! (Max grade is 100)'}</Text>
                    </Separator>) : null
            }
            <Separator marginTop={3} />
            <Flex flexDir={'column'} gapY={'2rem'}>
                {
                    useExercise.length != 0 ? (
                        useExercise.map((item, index) => {
                            return (<ExerciseForm ind={(index + 1)}
                                key={index}
                                item={item}
                                getValue={(thing) => {
                                    setScores((prev) => {
                                        const temp = [...prev];

                                        temp[index] = thing;

                                        return temp;
                                    });
                                    console.log(useScores)
                                }
                                }
                                sett={{
                                    formSign: !!set[1] ? set[1] : false,
                                    trueLock: !!set[2] ? set[2] : false
                                }}
                            />)
                        })
                    ) : (<Flex gapX={3}>

                        <i className="pi pi-wrench" />
                        <Text>
                            {
                                language?.statics?.error?.exerciseMissing ?
                                    language?.statics?.error?.exerciseMissing :
                                    ('Oooopps... its seems like something wrong, try to reconnect to internet or refresh the page.')
                            }
                        </Text>

                    </Flex>)
                }
            </Flex>
            {
                useExercise.length != 0 ?
                    (< Button focusRing={'inside'}
                        onClick={() => addGrade()}
                        marginTop={5}
                        _light={{
                            backgroundColor: 'white',
                            borderColor: '#B1B7BA/20',
                            focusRingColor: '#B1B7BA',
                            color: '#1D282E'
                        }}
                        _dark={{
                            background: "#1D282E",
                            borderColor: "#1D282E",
                            focusRingColor: '#B1B7BA',
                            color: '#EEF6F9'
                        }} >{language?.exercise?.done ?
                            language?.exercise?.done :
                            'Done'}</Button>) : null
            }
            {
                useExercise.length != 0 ?
                    (< Button focusRing={'inside'}
                        onClick={() => testAddGrade()}
                        marginTop={3}
                        _light={{
                            backgroundColor: 'white',
                            borderColor: '#B1B7BA/20',
                            focusRingColor: '#B1B7BA',
                            color: '#1D282E'
                        }}
                        _dark={{
                            background: "#1D282E",
                            borderColor: "#1D282E",
                            focusRingColor: '#B1B7BA',
                            color: '#EEF6F9'
                        }}>Add a random grade (Test)
                    </Button>) : null
            }

        </Stack>
        {
            appendScore.current != null && appendScore.current != false ? <FinishForm newScore={appendScore.current} oldScore={oldGrade.current} /> : null
        }
    </Flex >)
}

export default ExercisePage