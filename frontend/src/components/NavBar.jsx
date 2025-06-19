import { Flex, useBreakpointValue } from "@chakra-ui/react"
import "primeicons/primeicons.css";
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react";
import { useColorMode } from "./ui/color-mode.jsx";

import NavMenu from './NavMenu.jsx'
import NavBut from "./NavBut.jsx";
import SignForm from './SignForm.jsx'
import Toast from "./Toast.jsx";

function NavBar() {
    const navigate = useNavigate();

    const user = false

    /*const user = {
        _id: 1110,
        status: 0,
        shared: false,
        name: 'Ruslan',
        email: null,
        password: null,
        secret: null,
        answer: null,
        language: 'english',
        navPosition: 'left'
    };*/

    const { colorMode, toggleColorMode } = useColorMode();
    const navShort = useBreakpointValue({ sm: true, md: true, lg: false, xl: false });
    const [navSide, setNavSide] = useState(user ? user.navPosition : 'top');
    const [useNavOpen, setNavOpen] = useState(false);
    const [useSignUp, setSignUp] = useState(false);
    const [useSignIn, setSignIn] = useState(false);
    const [useMode, setMode] = useState(false);
    const [useToast, setToast] = useState({
        hidden: true,
        title: 'Toast title',
        desc: 'Toast description',
        color: 'black'
    });

    const [useMainPop, setMainPop] = useState(false);
    const [useHintPop, setHintPop] = useState(false);
    const [useScorePop, setScorePop] = useState(false);
    const [useProfilePop, setProfilePop] = useState(false);
    const [useSchoolsPop, setSchoolsPop] = useState(false);
    const [useMenuPop, setMenuPop] = useState(false);

    const to_main = () => { navigate('/'); }
    const to_profile = () => { navigate('/profile') }
    const to_top_scores = () => { navigate('/top-scores') }
    const to_hints = () => { navigate('/hints') }
    const to_schools = () => { navigate('/schools') }

    const callToast = (title, desc, color) => {
        setToast({
            hidden: false,
            title: title,
            desc: desc,
            color: color
        });
    }

    const navButList = [
        {
            title: 'Hints',
            pi_icon: 'pi-question',
            hoverTrig: useHintPop,
            stichh: (stat) => setHintPop(stat),
            onClick: to_hints,
        },
        {
            title: 'Top Scores',
            pi_icon: 'pi-crown',
            hoverTrig: useScorePop,
            stichh: (stat) => setScorePop(stat),
            onClick: to_top_scores,
        },
        {
            title: 'Profile',
            pi_icon: 'pi-id-card',
            hoverTrig: useProfilePop,
            stichh: (stat) => setProfilePop(stat),
            onClick: to_profile,
        },
        {
            title: 'Schools',
            pi_icon: 'pi-list-check',
            hoverTrig: useSchoolsPop,
            stichh: (stat) => setSchoolsPop(stat),
            onClick: to_schools,
        },
        {
            title: 'Menu',
            pi_icon: 'pi-align-justify',
            hoverTrig: useMenuPop,
            stichh: (stat) => setMenuPop(stat),
            onClick: () => setNavOpen(!useNavOpen),
        },
    ];

    useEffect(() => {
        user.navPosition ? setNavSide(user.navPosition) : setNavSide('top');
    }, [user.navPosition]);

    /*
            <Button bg={'black'} _dark={{bg: 'red'}} onClick={toggleColorMode}>
                Switch to {colorMode === 'light' ? 'dark' : 'light'}
            </Button>
    */
    return (<Flex border
        borderStartWidth={navSide === 'right' ? 2 : 0}
        borderEndWidth={navSide === 'left' ? 2 : 0}
        borderTopWidth={navSide === 'bottom' ? 2 : 0}
        borderBottomWidth={navSide === 'top' ? 2 : 0}
        borderColor={'blackAlpha.500'}
        position={'fixed'}
        width={navSide === 'top' || navSide === 'bottom' ? '100%' : 20}
        height={navSide === 'top' || navSide === 'bottom' ? 20 : '100%'}
        padding={3}
        flexDir={navSide === 'top' || navSide === 'bottom' ? 'row' : 'column-reverse'}
        right={navSide === 'right' ? 0 : 'auto'}
        left={navSide === 'left' ? 0 : "auto"}
        top={navSide === 'top' ? 0 : 'auto'}
        bottom={navSide === 'bottom' ? 0 : 'auto'}
        justify={'space-between'}
        backgroundColor={'rgb(166, 166, 166)'}
        zIndex={5}
    >
        <Flex flexDirection={'row'}
            justifyContent={'center'}
            alignItems={'center'}
            gap={3}>

            <NavBut title={'Learn Math'}
                pi_icon={'pi-sparkles'}
                navShort={navShort}
                hoverTrig={useMainPop}
                navSide={navSide}
                stichh={(stat) => setMainPop(stat)}
                onClick={to_main} />

        </Flex>
        <Flex flexDirection={navSide === 'top' || navSide === 'bottom' ? 'row' : 'column-reverse'}
            alignItems={'center'}
            gap={navShort ? 0.5 : 3}>
            {
                navButList.map((butt, index) => {
                    return (<NavBut key={index}
                        title={butt.title}
                        pi_icon={butt.pi_icon}
                        navShort={navShort}
                        hoverTrig={butt.hoverTrig}
                        navSide={navSide}
                        stichh={butt.stichh}
                        onClick={butt.onClick} />)
                })
            }
            <Flex position={"absolute"}
                display={useNavOpen ? 'flex' : 'none'}
                right={
                    navSide === 'right' ? (navShort? '4.5rem' : '10.5rem') :
                        navSide === 'top' ? 3 :
                            navSide === 'bottom' ? 3 : 'auto'
                }
                left={
                    navShort? (navSide === 'left' ? '4.5rem' : 'auto'):
                    (navSide === 'left' ? '10.5rem' : 'auto')
                }
                top={
                    navSide === 'right' ? 3 :
                        navSide === 'left' ? 3 :
                            navSide === 'top' ? 16 : 'auto'
                }
                bottom={
                    navSide === 'bottom' ? 16 : 'auto'
                }
                onMouseLeave={() => { setNavOpen(false) }}
            >
                <NavMenu disabled={false}
                    close={true}
                    useShort={navShort}
                    navPosition={(side) => { setNavSide(side) }}
                    signUpForm={() => {
                        setSignUp(!useSignUp)
                        setSignIn(false)
                    }}
                    signInForm={() => {
                        setSignUp(false)
                        setSignIn(!useSignIn)
                    }}
                    modeState={() => setMode(!useMode)}
                    user={user} />
            </Flex>

        </Flex>
        <SignForm isIn={useSignIn}
            isUp={useSignUp}
            close={() => {
                setSignIn(false);
                setSignUp(false);
            }}
            callToast={(title, desc, color) => {
                callToast(title, desc, color)
            }} />
        <Flex position={'absolute'}
            right={
                navSide === 'right' ? '70vw' :
                    navSide === 'top' ? 5 :
                        navSide === 'bottom' ? 5 : 'auto'
            }
            left={
                navSide === 'left' ? '70vw' : 'auto'
            }
            top={
                navSide === 'right' ? '90vh' :
                    navSide === 'left' ? '90vh' : 'auto'
            }
            bottom={
                navSide === 'top' ? '-90vh' :
                    navSide === 'bottom' ? '90vh' : 'auto'
            }
        >
            <Toast hidden={useToast.hidden}
                pi_icon={'pi-info-circle'}
                title={useToast.title}
                desc={useToast.desc}
                color={useToast.color} />
        </Flex>

    </Flex >)
}

export default NavBar