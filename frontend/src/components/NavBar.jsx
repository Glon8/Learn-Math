import { Button, Flex, Text } from "@chakra-ui/react"
import "primeicons/primeicons.css";
import { useNavigate } from 'react-router-dom'

import OnHoverTag from "./OnHoverTag.jsx";
import NavMenu from './NavMenu.jsx'
import { useEffect, useState } from "react";

function NavBar() {
    const navigate = useNavigate();

    const to_main = () => { navigate('/'); }
    const to_profile = () => { navigate('/profile') }
    const to_top_scores = () => { navigate('/top-scores') }
    const to_hints = () => { navigate('/hints') }
    const to_schools = () => { navigate('/schools') }

    const languages = [{
        value: 'english',
        title: 'EN'
    }, {
        value: 'hebrew',
        title: 'HE'
    }, {
        value: 'russian',
        title: 'RU'
    }];
    const languages_checked = 'hebrew';
    
    const toTop = () => { setNavSide('top') }
    const toLeft = () => { setNavSide('left') }
    const toBottom = () => { setNavSide('bottom') }
    const toRight = () => { setNavSide('right') }

    const menu_pos = [{
        value: 'top',
        title: 'Top',
        onClick: () => toTop()
    }, {
        value: 'left',
        title: 'Left',
        onClick: () => toLeft()
    }, {
        value: 'bottom',
        title: 'Bottom',
        onClick: () => toBottom()
    }, {
        value: 'right',
        title: 'Right',
        onClick: () => toRight()
    }];
    const menu_pos_checked = 'top';

    const lesson_settings = [{
        value: 'set1',
        title: 'Form awaits to be fully filled'
    }, {
        value: 'set2',
        title: 'Exercises instant replacement'
    }, {
        value: 'set3',
        title: '...'
    }];

    const lesson_settings_checked = ['set1'];

    //const user = false

    const user = {
        _id: 1110,
        status: 0,
        shared: false,
        name: 'Ruslan',
        email: null,
        password: null,
        secret: null,
        answer: null,
        language: 'he',
        navPosition: 'top'
    };

    const navShort = false;
    const [navSide, setNavSide] = useState('top');
    const [useNavOpen, setNavOpen] = useState(false);

    const [useMainPop, setMainPop] = useState(false);
    const [useHintPop, setHintPop] = useState(false);
    const [useScorePop, setScorePop] = useState(false);
    const [useProfilePop, setProfilePop] = useState(false);
    const [useSchoolsPop, setSchoolsPop] = useState(false);
    const [useMenuPop, setMenuPop] = useState(false);

    useEffect(() => {
        user.navSide ? setNavSide(user.navSide) : setNavSide('top');
    }, [user.navSide]);

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
        {
            //console.log(menu_pos_checked.value)
        }
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
            gap={3}>
            <Flex position={"relative"}
                justifyContent={'center'}
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
                    navPosition={navSide}
                    user={user}
                    group_a={{
                        button_a: { pi_icon: 'pi-user-edit', value: 'Sign Up', onClick: () => { console.log('sign up') } },
                        button_b: { pi_icon: 'pi-sign-in', value: 'Sign In', onClick: () => { console.log('sign in') } },
                        button_c: { pi_icon: 'pi-sign-out', value: 'Sign Out', onClick: () => { console.log('sign out') } },
                    }}
                    group_b={{
                        menu_a: {
                            pi_icon: 'pi-language',
                            title: 'Language',
                            list: languages,
                            list_checked: languages_checked
                        },
                        menu_b: {
                            pi_icon: 'pi-cog',
                            title: 'Lesson Settings',
                            list: lesson_settings,
                            list_checked: lesson_settings_checked
                        },
                        menu_c: {
                            pi_icon: 'pi-angle-down',
                            title: 'Menu Position',
                            list: menu_pos,
                            list_checked: menu_pos_checked
                        }
                    }}
                    mode={{
                        pi_icon: 'pi-moon',
                        value: 'Mode',
                        onClick: () => { console.log('mode changed') }
                    }} />

            </Flex>

        </Flex>

    </Flex >)
}

export default NavBar