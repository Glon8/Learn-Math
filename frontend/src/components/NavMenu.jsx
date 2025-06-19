import { Separator, Button, Flex, Text } from "@chakra-ui/react"
import "primeicons/primeicons.css";
import { useState } from "react";

import SelectionCheckMenu from "./SelectionCheckMenu";
import SelectionCheckSwitchMenu from "./SelectionCheckSwitchMenu";

function NavMenu({ hidden, user, navPosition, signUpForm, signInForm, modeState, useShort }) {
    const [navSide, setNavSide] = useState(user ? user.navPosition : 'top');

    const [use_languages, set_languages] = useState(true);
    const [use_settings, set_settings] = useState(true);
    const [use_position, set_position] = useState(true);

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
    const default_languages = user ? user.language : 'english';

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
    const default_lesson_settings = ['set1'];

    const toTop = () => {
        navPosition('top')
        setNavSide('top')
    }
    const toLeft = () => {
        navPosition('left')
        setNavSide('left')
    }
    const toBottom = () => {
        navPosition('bottom')
        setNavSide('bottom')
    }
    const toRight = () => {
        navPosition('right')
        setNavSide('right')
    }

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
    const default_menu_pos = navSide;

    return (<Flex padding={1} gap={3}
        hidden={hidden ? hidden : false}
        flexDirection={navSide === 'bottom' ? "column-reverse" : 'column'}
        width={'13rem'}
        rounded={'md'}
        border
        borderColor={'black'}
        bg={"white"}
        borderWidth={1}
    >
        {
            user ? (<Text marginStart={4}>{user.status === 0 ? 'Local' : 'Online'} user: {user.name}</Text>) :
                (<Text marginStart={4}>No user connected!</Text>)
        }
        {
            user ? (<Button
                backgroundColor={'white'}
                onClick={() => { console.log('sign out') }}
                color={"black"}
            >

                <Flex width={'full'}
                    alignItems={'center'}
                    gap={3}>

                    <i className={`pi pi-sign-out`} />
                    <Text>Sign Out</Text>

                </Flex>

            </Button>) :
                (<Flex flexDirection={navSide === 'bottom' ? "column-reverse" : 'column'}>

                    <Button
                        backgroundColor={'white'}
                        onClick={signUpForm}
                        color={"black"}
                    >

                        <Flex width={'full'}
                            alignItems={'center'}
                            gap={3}>

                            <i className={`pi pi-user-edit`} />
                            <Text>Sign Up</Text>

                        </Flex>

                    </Button>
                    <Button
                        backgroundColor={'white'}
                        onClick={signInForm}
                        color={"black"}
                    >

                        <Flex width={'full'}
                            alignItems={'center'}
                            gap={3}>

                            <i className={`pi pi-sign-in`} />
                            <Text>Sign In</Text>

                        </Flex>

                    </Button>

                </Flex>)
        }
        <Separator />
        <Button backgroundColor={'white'}
            color={'black'}
            onClick={modeState}>

            <Flex width={'full'}
                alignItems={'center'}
                gap={3}>

                <i className={`pi pi-moon`} />
                <Text>Mode</Text>

            </Flex>

        </Button>
        <Button
            backgroundColor={'white'}
            onClick={() => {
                set_position(true)
                set_languages(!use_languages)
                set_settings(true)
            }}
            color={"black"}
        >

            <Flex width={'full'}
                alignItems={'center'}
                gap={3}>

                <i className={`pi pi-language`} />
                <Text>Language</Text>

            </Flex>

        </Button>
        <Button
            backgroundColor={'white'}
            onClick={() => {
                set_position(true)
                set_settings(!use_settings)
                set_languages(true)
            }}
            color={"black"}
        >

            <Flex width={'full'}
                alignItems={'center'}
                gap={3}>

                <i className={`pi pi-cog`} />
                <Text>Lesson Settings</Text>

            </Flex>

        </Button>
        <Button
            backgroundColor={'white'}
            onClick={() => {
                set_position(!use_position)
                set_languages(true)
                set_settings(true)
            }}
            color={"black"}
        >

            <Flex width={'full'}
                alignItems={'center'}
                gap={3}>

                <i className={`pi pi-angle-down`} />
                <Text>Menu Position</Text>

            </Flex>

        </Button>
        <Flex onMouseLeave={() => { set_languages(true) }}
            position={'absolute'}
            width={'auto'}
            right={
                useShort ? (navSide === 'right' ? 0.75 :
                    navSide === 'top' ? 0.75 :
                        navSide === 'bottom' ? 0.75 : 'auto') :
                    (navSide === 'right' ? '13rem' :
                        navSide === 'top' ? '13rem' :
                            navSide === 'bottom' ? '13rem' : 'auto')
            }
            left={
                useShort ? (navSide === 'left' ? 0.75 : 'auto') :
                    (navSide === 'left' ? '13rem' : 'auto')
            }
            top={
                useShort ? (navSide === 'right' ? '15.2rem' :
                    navSide === 'left' ? '15.2rem' :
                        navSide === 'top' ? '15.2rem' : 'auto') :
                    (navSide === 'right' ? '12.5rem' :
                        navSide === 'left' ? '12.5rem' :
                            navSide === 'top' ? '12.5rem' : 'auto')
            }
            bottom={
                useShort ? (navSide === 'bottom' ? '15.2rem' : 'auto') :
                    (navSide === 'bottom' ? '12.5rem' : 'auto')
            }
            flexDirection={navSide === 'bottom' ? "column-reverse" : 'column'}
        >
            <SelectionCheckSwitchMenu default_option={default_languages}
                hidden={use_languages}
                options={languages}
            />
        </Flex>
        <Flex onMouseLeave={() => { set_settings(true) }}
            position={'absolute'}
            width={'auto'}
            right={
                useShort ? (navSide === 'top' ? 0.75 :
                    navSide === 'left' ? '0.3rem' :
                        navSide === 'bottom' ? 0.75 : 'auto') :
                    (navSide === 'right' ? '13rem' :
                        navSide === 'top' ? '13rem' :
                            navSide === 'bottom' ? '13rem' : 'auto')
            }
            left={
                useShort ? (navSide === 'left' ? '0.3rem' : 'auto') :
                    (navSide === 'left' ? '13rem' : 'auto')
            }
            top={
                useShort ? (navSide === 'right' ? '18.5rem' :
                    navSide === 'left' ? '18.5rem' :
                        navSide === 'top' ? '18.5rem' : 'auto') :
                    (navSide === 'right' ? '15.5rem' :
                        navSide === 'left' ? '15.5rem' :
                            navSide === 'top' ? '15.5rem' : 'auto')
            }
            bottom={
                useShort ? (navSide === 'bottom' ? '18.5rem' : 'auto') :
                    (navSide === 'bottom' ? '15.5rem' : 'auto')
            }
            flexDirection={navSide === 'bottom' ? "column-reverse" : 'column'}>
            <SelectionCheckMenu default_options={default_lesson_settings}
                hidden={use_settings}
                width={'20rem'}
                switch_board={true}
                options={lesson_settings} />
        </Flex>
        <Flex onMouseLeave={() => { set_position(true) }}
            position={'absolute'}
            width={'auto'}
            right={
                useShort ? (navSide === 'right' ? 0.75 :
                    navSide === 'top' ? 0.75 :
                        navSide === 'bottom' ? 0.75 : 'auto') :
                    (navSide === 'right' ? '13rem' :
                        navSide === 'top' ? '13rem' :
                            navSide === 'bottom' ? '13rem' : 'auto')
            }
            left={
                useShort ? (navSide === 'left' ? 0.75 : 'auto') :
                    navSide === 'left' ? '13rem' : 'auto'
            }
            top={
                useShort ? (navSide === 'right' ? '21.6rem' :
                    navSide === 'left' ? '21.6rem' :
                        navSide === 'top' ? '21.6rem' : 'auto') :
                    (navSide === 'right' ? '19rem' :
                        navSide === 'left' ? '19rem' :
                            navSide === 'top' ? '19rem' : 'auto')
            }
            bottom={
                useShort ? (navSide === 'bottom' ? '21.6rem' : 'auto') :
                    (navSide === 'bottom' ? '19rem' : 'auto')
            }
            flexDirection={navSide === 'bottom' ? "column-reverse" : 'column'} >
            <SelectionCheckSwitchMenu default_option={default_menu_pos}
                hidden={use_position}
                options={menu_pos}
            />
        </Flex>

    </Flex>)
}

export default NavMenu