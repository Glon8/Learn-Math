import { Button, Flex, Separator, Text } from "@chakra-ui/react"
import { useColorMode } from "./ui/color-mode.jsx";
import { useEffect, useState } from "react"
import { userContext } from "../context/UserContext.jsx";
import { languageContext } from '../context/LanguagesContext.jsx'
import { useNavigate } from "react-router-dom";

import ScoresPresent from "./ScoresPresent.jsx";
import TitleSlot from '../components/TitleSlot.jsx'

function FinishForm({ newScore, oldScore }) {
    const navigate = useNavigate();
    const { lang } = userContext();
    const { language } = languageContext();
    const { colorMode, toggleColorMode } = useColorMode();

    const [useTitle, setTitle] = useState();
    const [useEnding, setEnding] = useState();

    const toSchools = () => { navigate('/schools'); }

    const titleVoca = [
        (language?.ending?.subTitle?.one ? language?.ending?.subTitle?.one : 'Splendid!!'),
        (language?.ending?.subTitle?.two ? language?.ending?.subTitle?.two : 'Well Done!!'),
        (language?.ending?.subTitle?.three ? language?.ending?.subTitle?.three : 'Congratulations!!'),
        (language?.ending?.subTitle?.four ? language?.ending?.subTitle?.four : 'You made it!!')
    ];

    const negVoca = [
        (language?.ending?.negVoca?.one ? language?.ending?.negVoca?.one : 'Aaawww.... you could be done better!'),
        (language?.ending?.negVoca?.two ? language?.ending?.negVoca?.two : 'It isnt great, dont give up! Try again!'),
        (language?.ending?.negVoca?.three ? language?.ending?.negVoca?.three : 'Focus, you can do better than this!'),
        (language?.ending?.negVoca?.four ? language?.ending?.negVoca?.four : 'Try to catch the tail! Try over again!')
    ];

    const posVoca = [
        (language?.ending?.negVoca?.one ? language?.ending?.posVoca?.one : 'Cool! Nailed it! Try it a bit harder now!'),
        (language?.ending?.posVoca?.two ? language?.ending?.posVoca?.two : 'You imporoved, or at least didnt loosed the total grade! Well done!'),
        (language?.ending?.posVoca?.three ? language?.ending?.posVoca?.three : 'Ho! Ho! Look at the grade! Spike difficulty awaits you in settings!'),
        (language?.ending?.posVoca?.four ? language?.ending?.posVoca?.four : 'Nice! On the next try exercises might be harder!'),
    ];

    const randomTitle = () => {
        const ind = Math.floor(Math.random() * titleVoca.length);

        setTitle(titleVoca[ind]);
    }
    const randomNegative = () => {
        const ind = Math.floor(Math.random() * negVoca.length);

        setEnding(negVoca[ind]);
    }
    const randomPositive = () => {
        const ind = Math.floor(Math.random() * posVoca.length);

        setEnding(posVoca[ind]);
    }

    useEffect(() => {
        randomTitle();

        if (newScore < oldScore) randomNegative();
        else randomPositive();

    }, [newScore]);

    return (<Flex w={'100vw'} h={'100vh'}
        position={'fixed'}
        top={0}
        justifyContent={'center'}
        alignItems={'center'}
        display={newScore != false ? 'flex' : 'none'}
        bg='#1D282E/65'
        zIndex={5}>
        {
            // empty space tto track the click outside of the form
        }
        <Flex w={'full'} h={'full'}
            position={'fixed'}
            onClick={() => { toSchools(); newScore = false; }}
            right={0}
            top={0}
            zIndex={10} />
        {
            // form itself
        }
        <Flex w={'full'}
            maxW={'25rem'}
            h={'fit'}
            justify={'space-between'}
            align={'center'}
            border
            borderWidth={1}
            marginY={'10rem'}
            rounded={'xl'}
            flexDirection={'column'}
            paddingY={7}
            paddingX={5}
            zIndex={15}
            gap={3}
            _light={{
                borderColor: "#1D282E",
                backgroundColor: 'white',
                boxShadow: 'lg',
            }}
            _dark={{
                background: '#8b8da0',
                borderColor: '#1D282E',
                boxShadow: '0 0 2rem 0.5rem rgb(238, 246, 249)',
            }}>

            <Flex width={'full'}
                flexDirection={'column'}
                gapY={3}
                _light={{ color: '#1D282E' }}
                _dark={{ color: '#EEF6F9' }}>

                <Flex justify={'space-between'}>
                    <TitleSlot title={language?.ending?.title ? language?.ending?.title : 'Summary'}
                        pi_icon={'pi-verified'} />
                    <Button focusRing={'inside'}
                        onClick={() => { toSchools(); newScore = false; }}
                        _light={{
                            background: "#8b8da0/20",
                            borderColor: "#B1B7BA/10",
                            focusRingColor: '#B1B7BA',
                            color: '#1D282E/90'
                        }}
                        _dark={{
                            background: "#1D282E",
                            borderColor: "#1D282E",
                            focusRingColor: '#B1B7BA',
                            color: '#EEF6F9'
                        }}
                    ><i className="pi pi-times" /></Button>
                </Flex>
                <Separator />
                <Flex _light={{
                    boxShadow: 'sm',
                    paddingX: 3,
                    paddingY: 1,
                }}
                    _dark={{
                        gap: 3
                    }}
                    flexDir={'column'}>

                    <Text fontWeight={'bold'}
                        fontSize={'2xl'}
                        textAlign={'center'}
                        background={{ _dark: '#1D282E/65' }}
                        rounded={'sm'}
                        boxShadow={{ _dark: '0 0 5px 2px black' }}>{useTitle}</Text>
                    {
                        colorMode == 'light' ? <Separator /> : ''
                    }
                    <Text background={{ _dark: '#464547' }}
                        direction={lang == 'he' ? 'rtl' : 'ltr'}
                        rounded={'sm'}
                        paddingX={3}
                        paddingY={1}>{(language?.ending?.prefix ? language?.ending?.prefix : 'Lets see... ') + useEnding}</Text>

                </Flex>
                <Flex justify={'space-between'}>
                    {
                        // the grades preview ll go here!
                    }
                    <ScoresPresent title={language?.ending?.curScore ? language?.ending?.curScore : 'Current Score'}
                        score={newScore ?? 0}
                        color={newScore != false && newScore != null ?
                            (newScore < oldScore ?
                                ('red') :
                                (newScore == oldScore ?
                                    ('') :
                                    ('green'))) :
                            ('red')} />
                    <ScoresPresent title={language?.ending?.totScore ? language?.ending?.totScore : 'Total Score'}
                        score={oldScore.toFixed(2) ?? 0} />
                </Flex>
            </Flex>

        </Flex>

    </Flex>);
}

export default FinishForm;