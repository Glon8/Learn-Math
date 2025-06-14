import { Button, Flex, Text } from "@chakra-ui/react"
import "primeicons/primeicons.css";
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react";

import OnHoverTag from "./OnHoverTag.jsx";
import NavMenu from './NavMenu.jsx'
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

    const navShort = false;
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

    useEffect(() => {
        user.navPosition ? setNavSide(user.navPosition) : setNavSide('top');
    }, [user.navPosition]);

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

            <Flex position={"relative"}
                justifyContent={'center'}
                marginStart={navSide === 'left' ? 24 : 0}
                marginEnd={navSide === 'right' ? 24 : 0}>
                <Button backgroundColor={'black'} onClick={to_main}
                    onMouseOver={() => {
                        navShort && !(navSide === 'right' || navSide === 'left') ?
                            setMainPop(true) : null
                    }}
                    onMouseLeave={() => {
                        navShort && !(navSide === 'right' || navSide === 'left') ?
                            setMainPop(false) : null
                    }}
                    width={navSide === 'right' || navSide === 'left' ? '9rem' : 'auto'}>

                    <Flex flexDirection={'row'} gap={3}>
                        <i className={`pi pi-sparkles`} />
                        {
                            navShort ? (navSide === 'right' || navSide === 'left' ?
                                (<Text textAlign={'center'}>Learn Math</Text>) : null) :
                                (<Text textAlign={'center'}>Learn Math</Text>)
                        }
                    </Flex>

                </Button>
                <OnHoverTag value={'Main'}
                    display={useMainPop ? 'flex' : 'none'}
                    top={12}
                    bottom={12}
                    right={16}
                    left={16}
                    navSide={navSide} />

            </Flex>


        </Flex>
        <Flex flexDirection={navSide === 'top' || navSide === 'bottom' ? 'row' : 'column-reverse'}
            alignItems={'center'}
            gap={navShort ? 0.5 : 3}>

            <Flex position={"relative"}
                justifyContent={'center'}
                maxW={'20rem'}
                marginStart={navSide === 'left' ? 24 : 0}
                marginEnd={navSide === 'right' ? 24 : 0}>

                <Button backgroundColor={'black'} onClick={to_hints}
                    onMouseOver={() => {
                        navShort && !(navSide === 'right' || navSide === 'left') ?
                            setHintPop(true) : null
                    }}
                    onMouseLeave={() => {
                        navShort && !(navSide === 'right' || navSide === 'left') ?
                            setHintPop(false) : null
                    }}
                    width={navSide === 'right' || navSide === 'left' ? '9rem' : 'auto'} >

                    <Flex flexDirection={'row'} gap={3}>
                        <i className={`pi pi-question`} />
                        {
                            navShort ? (navSide === 'right' || navSide === 'left' ?
                                (<Text textAlign={'center'}>Hints</Text>) : null) :
                                (<Text textAlign={'center'}>Hints</Text>)
                        }
                    </Flex>

                </Button>

                <OnHoverTag value={'Hints'}
                    display={useHintPop ? 'flex' : 'none'}
                    top={12}
                    bottom={12}
                    right={16}
                    left={16}
                    navSide={navSide} />

            </Flex>
            <Flex position={'relative'}
                justifyContent={'center'}
                marginStart={navSide === 'left' ? 24 : 0}
                marginEnd={navSide === 'right' ? 24 : 0}>

                <Button backgroundColor={'black'} onClick={to_top_scores}
                    onMouseOver={() => {
                        navShort && !(navSide === 'right' || navSide === 'left') ?
                            setScorePop(true) : null
                    }}
                    onMouseLeave={() => {
                        navShort && !(navSide === 'right' || navSide === 'left') ?
                            setScorePop(false) : null
                    }}
                    width={navSide === 'right' || navSide === 'left' ? '9rem' : 'auto'} >

                    <Flex flexDirection={'row'} gap={3}>
                        <i className={`pi pi-crown`} />
                        {
                            navShort ? (navSide === 'right' || navSide === 'left' ?
                                (<Text textAlign={'center'}>Top Scores</Text>) : null) :
                                (<Text textAlign={'center'}>Top Scores</Text>)
                        }
                    </Flex>

                </Button>
                <OnHoverTag value={'Top Scores'}
                    display={useScorePop ? 'flex' : 'none'}
                    top={12}
                    bottom={12}
                    right={16}
                    left={16}
                    navSide={navSide} />


            </Flex>
            <Flex position={'relative'}
                justifyContent={'center'}
                marginStart={navSide === 'left' ? 24 : 0}
                marginEnd={navSide === 'right' ? 24 : 0}>

                <Button backgroundColor={'black'} onClick={to_profile}
                    onMouseOver={() => {
                        navShort && !(navSide === 'right' || navSide === 'left') ?
                            setProfilePop(true) : null
                    }}
                    onMouseLeave={() => {
                        navShort && !(navSide === 'right' || navSide === 'left') ?
                            setProfilePop(false) : null
                    }}
                    width={navSide === 'right' || navSide === 'left' ? '9rem' : 'auto'} >

                    <Flex flexDirection={'row'} gap={3}>
                        <i className={`pi pi-id-card`} />
                        {
                            navShort ? (navSide === 'right' || navSide === 'left' ?
                                (<Text textAlign={'center'}>Profile</Text>) : null) :
                                (<Text textAlign={'center'}>Profile</Text>)
                        }
                    </Flex>

                </Button>

                <OnHoverTag value={'Profile'}
                    display={useProfilePop ? 'flex' : 'none'}
                    top={12}
                    bottom={12}
                    right={16}
                    left={16}
                    navSide={navSide} />

            </Flex>

            <Flex position={'relative'}
                justifyContent={'center'}
                marginStart={navSide === 'left' ? 24 : 0}
                marginEnd={navSide === 'right' ? 24 : 0}>

                <Button backgroundColor={'black'} onClick={to_schools}
                    onMouseOver={() => {
                        navShort && !(navSide === 'right' || navSide === 'left') ?
                            setSchoolsPop(true) : null
                    }}
                    onMouseLeave={() => {
                        navShort && !(navSide === 'right' || navSide === 'left') ?
                            setSchoolsPop(false) : null
                    }}
                    width={navSide === 'right' || navSide === 'left' ? '9rem' : 'auto'} >

                    <Flex flexDirection={'row'} gap={3}>
                        <i className={`pi pi-list-check`} />
                        {
                            navShort ? (navSide === 'right' || navSide === 'left' ?
                                (<Text textAlign={'center'}>Schools</Text>) : null) :
                                (<Text textAlign={'center'}>Schools</Text>)
                        }
                    </Flex>

                </Button>

                <OnHoverTag value={'Schools'}
                    display={useSchoolsPop ? 'flex' : 'none'}
                    top={12}
                    bottom={12}
                    right={16}
                    left={16}
                    navSide={navSide} />

            </Flex>
            <Flex position={'relative'}
                justifyContent={'center'}
                marginStart={navSide === 'left' ? 24 : 0}
                marginEnd={navSide === 'right' ? 24 : 0}>

                <Button backgroundColor={'black'} onClick={() => { setNavOpen(!useNavOpen) }}
                    onMouseOver={() => {
                        navShort && !(navSide === 'right' || navSide === 'left') ?
                            setMenuPop(true) : null
                    }}
                    onMouseLeave={() => {
                        navShort && !(navSide === 'right' || navSide === 'left') ?
                            setMenuPop(false) : null
                    }}
                    width={navSide === 'right' || navSide === 'left' ? '9rem' : 'auto'}
                >

                    <Flex flexDirection={'row'} gap={3}>
                        <i className={`pi pi-align-justify`} />
                        {
                            navShort ? (navSide === 'right' || navSide === 'left' ?
                                (<Text textAlign={'center'}>Menu</Text>) : null) :
                                (<Text textAlign={'center'}>Menu</Text>)

                        }
                    </Flex>

                </Button>

                <OnHoverTag value={'Menu'}
                    display={useMenuPop ? 'flex' : 'none'}
                    top={12}
                    bottom={12}
                    right={16}
                    left={16}
                    navSide={navSide} />

            </Flex>
            <Flex position={"absolute"}
                display={useNavOpen ? 'flex' : 'none'}
                right={
                    navSide === 'right' ? '10rem' :
                        navSide === 'top' ? 3 :
                            navSide === 'bottom' ? 3 : 'auto'
                }
                left={
                    navSide === 'left' ? '10rem' : 'auto'
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