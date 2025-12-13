import { Flex, Text, Separator, Button } from "@chakra-ui/react"
import "primeicons/primeicons.css";
import { useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from 'react'
import { userContext } from "../context/UserContext.jsx";
import { languageContext } from "../context/LanguagesContext.jsx";
import axios from "axios";

import { callToast } from '../components/Toast.jsx'

import TwoTitlesSlot from '../components/slots/TwoTitlesSlot.jsx'
import ExerciseForm from "../components/forms/ExerciseForm.jsx";
import FinishForm from "../components/forms/FinishForm.jsx";
import LoadingBanner from "../components/LoadindBanner.jsx";
import PagesBase from "../components/forms/sub/PagesBase.jsx";
import PagesBaseStack from "../components/forms/sub/PagesBaseStack.jsx";

function ExercisePage() {
    const location = useLocation();
    const { exerciseId, exerciseWritten } = location.state || {};

    const { user, upScore, score, pos, pingSchedule, set, token, repAns } = userContext();
    const { language, defPack } = languageContext();

    const [useGrade, setGrade] = useState(0);
    const [useExercise, setExercise] = useState([]);
    const [exeLang, setExeLang] = useState({});
    const [topicsLang, setTopicsLang] = useState('');

    const appendScore = useRef(false);
    const oldGrade = useRef(score?.[exerciseId] ?? 0);
    const avrGrade = useRef(0);

    const [useScores, setScores] = useState([]);

    const addGrade = () => {
        appendScore.current = useGrade;

        // local update of the scores
        upScore(exerciseId, useGrade);

        // online user sending answers to the server
        if (!!token) repAns(useScores, token, exerciseId);

        // note for unregistered users
        if (user._id === null) callToast('Info:', exeLang.offlineInfo, '', 'info', pos);
    }

    const fetchExercises = async (topic, grade, settings, theToken) => {
        await pingSchedule();

        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_API}/api/exercise/get-exercise`, { topic: topic, grade: grade, settings: settings, token: theToken });

            const data = res.data.data;

            setExercise(data);
        }
        catch (error) {
            callToast('Info:', language?.exercise?.fetchingErr ?? defPack.exercise.fetchingErr, '', 'info', pos);
        }
    }

    const exerciseCheckList = () => { return !!useExercise && useExercise.length !== 0 }

    const averageGrade = async () => {
        let questionsList = [];
        let totalQuestions = 0;

        useExercise.forEach((thing) => {
            const length = thing.ans.length
            questionsList.push(length);
            //console.log(questionsList[questionsList.length - 1])
        });

        for (let i = 0; i < questionsList.length; i++) {
            if (!!questionsList[i])
                totalQuestions += questionsList[i];
            else totalQuestions += 0;
        }

        let shouldBe = !!totalQuestions ? (100 / totalQuestions) : 0;

        shouldBe = shouldBe.toFixed(1);

        return parseFloat(shouldBe);
    }

    useEffect(() => {
        let gradeUpdated = 0;

        useScores.forEach((item) => {
            if (!!item)
                for (let i = 0; i < item.length; i++) if (!!item[i][0]) gradeUpdated += avrGrade.current;
        });

        setGrade(gradeUpdated);
    }, [useScores]);

    useEffect(() => {
        const fetch = async () => {
            avrGrade.current = await averageGrade();
        }

        fetch();
    }, [useExercise])

    useEffect(() => {
        setExeLang(language?.exercise ?? defPack.exercise);
        setTopicsLang(language?.statics?.topics?.[exerciseId] ?? exerciseWritten);
    }, [language]);

    useEffect(() => {
        const fetch = async () => {
            await fetchExercises(exerciseId, !!score?.[exerciseId] ?? 0, set, token);
        }

        fetch();
    }, []);

    return (<PagesBase alignItems={'center'}>

        <PagesBaseStack w={{ base: "100%", sm: 'fit' }}
            marginX={2}
            marginBottom={5}
            maxW={'65rem'}>
            <TwoTitlesSlot title_info={exerciseCheckList() ? {
                title_a: {
                    pi_icon: 'pi-hashtag',
                    title: `${exeLang.title} 
    ${topicsLang}`
                },
                title_b: {
                    pi_icon: !!set[0] ? 'pi-verified' : null,
                    title: !!set[0] ? useGrade : null
                }
            } : {
                title_a: {
                    pi_icon: 'pi-hashtag',
                    title: `${exeLang.title} 
    ${topicsLang}`
                }
            }} />
            {
                exerciseCheckList() ?
                    (<Separator paddingTop={3}>
                        <Text textAlign={'center'}
                            fontWeight={'medium'}
                        >
                            {exeLang.explanation}
                        </Text>
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

                                    //console.log(useScores)
                                }
                                }
                                sett={{
                                    formSign: !!set[1] ?? false,
                                    trueLock: !!set[2] ?? false
                                }}
                            />)
                        })
                    ) : (<LoadingBanner text={exeLang.exerciseLoading} toggle={true} />)
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
                        }} >{exeLang.done}
                    </Button>) : null
            }

        </PagesBaseStack>
        {
            appendScore.current != null && appendScore.current != false ? <FinishForm newScore={appendScore.current} oldScore={oldGrade.current} /> : null
        }
    </PagesBase >)
}

export default ExercisePage