import { Flex, useBreakpointValue } from "@chakra-ui/react"
import "primeicons/primeicons.css";
import { useNavigate } from 'react-router-dom'

import { userContext } from "../context/UserContext.jsx";
import { languageContext } from "../context/LanguagesContext.jsx";

import NavMenu from './NavMenu.jsx';
import NavBut from "./NavBut.jsx";

function NavBar() {
    const navigate = useNavigate();

    const { pos } = userContext();
    const { language } = languageContext();

    const navShort = useBreakpointValue({ base: true, sm: true, md: true, lg: false, xl: false });

    const to_main = () => { navigate('/'); }
    const to_profile = () => { navigate('/profile') }
    const to_top_scores = () => { navigate('/top-scores') }
    const to_hints = () => { navigate('/hints') }
    const to_schools = () => { navigate('/schools') }

    const navButList = [
        {
            title: language?.navBar?.hints? language.navBar.hints : 'Hints',
            pi_icon: 'pi-question',
            onClick: to_hints,
        },
        {
            title: language?.navBar?.topScores? language.navBar.topScores : 'Top Scores',
            pi_icon: 'pi-crown',
            onClick: to_top_scores,
        },
        {
            title: language?.navBar?.profile? language.navBar.profile : 'Profile',
            pi_icon: 'pi-id-card',
            onClick: to_profile,
        },
        {
            title: language?.navBar?.schools? language.navBar.schools : 'Schools',
            pi_icon: 'pi-list-check',
            onClick: to_schools,
        },
    ];

    return (<Flex border
        borderStartWidth={pos === 'right' ? 2 : 0}
        borderEndWidth={pos === 'left' ? 2 : 0}
        borderTopWidth={pos === 'bottom' ? 2 : 0}
        borderBottomWidth={pos === 'top' ? 2 : 0}
        borderColor={'blackAlpha.500'}
        position={'fixed'}
        width={pos === 'left' || pos === 'right' ? { base: 15, sm: 15, md: 15, lg: 20, xl: 20 } : '100%'}
        height={pos === 'left' || pos === 'right' ? '100%' : { base: 15, sm: 15, md: 15, lg: 20, xl: 20 }}
        flexDir={pos === 'left' || pos === 'right' ? 'column-reverse' : 'row'}
        padding={3}
        right={pos === 'right' ? 0 : 'auto'}
        left={pos === 'left' ? 0 : "auto"}
        top={pos === 'top' ? 0 : 'auto'}
        bottom={pos === 'bottom' ? 0 : 'auto'}
        justify={'space-between'}
        backgroundColor={'rgb(166, 166, 166)'}
        zIndex={5}
        _light={{
            background: '#A0835C',
            borderColor: '#1D282E'
        }}
        _dark={{
            background: '#50423d',
            borderColor: '#8d7361'
        }}
    >
        <Flex flexDirection={'row'}
            justifyContent={'center'}
            alignItems={'center'}
            gap={3}>

            <NavBut title={language?.navBar?.main? language.navBar.main : 'Learn Math' }
                pi_icon={'pi-sparkles'}
                navShort={navShort}
                navSide={pos}
                onClick={to_main} />

        </Flex>
        <Flex flexDirection={pos === 'left' || pos === 'right' ? 'column-reverse' : 'row'}
            alignItems={'center'}
            gap={navShort ? 0.5 : 3}>
            {
                navButList.map((butt, index) => {
                    return (<NavBut key={index}
                        title={butt.title}
                        pi_icon={butt.pi_icon}
                        navShort={navShort}
                        navSide={pos}
                        onClick={butt.onClick} />)
                })
            }
            <Flex marginStart={navShort ? (pos === 'left' ? 2 : 0) :
                (pos === 'left' ? 24 : 0)}
                marginEnd={navShort ? (pos === 'right' ? 2 : 0) :
                    (pos === 'right' ? 24 : 0)}
                marginTop={navShort ? (pos === 'top' ? 2 : 0) : 0}
                marginBottom={navShort ? (pos === 'bottom' ? 2 : 0) : 0}
                w={navShort ? 'auto' :
                    (pos === 'right' || pos === 'left' ? '9rem' : 'auto')}
                maxW={'20rem'}>
                <NavMenu  pi_icon={'pi-align-justify'}
                    navShort={navShort}
                />
            </Flex>

        </Flex>

    </Flex >)
}

export default NavBar