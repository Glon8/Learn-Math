import { Button, Flex, Text, Menu, Portal } from "@chakra-ui/react"
import "primeicons/primeicons.css";
import { useEffect, useState } from "react";
import { useColorMode } from "./ui/color-mode.jsx";

import SelectionCheckMenu from "./SelectionCheckMenu";
import SelectionCheckSwitchMenu from "./SelectionCheckSwitchMenu";
import Tool from "./Tooltip.jsx";

function NavMenu({ user, navPosition, signUpForm, signInForm, close, autoClose, navShort, title, pi_icon }) {
    const [useOpen, setOpen] = useState(close ? close : false);

    const [navSide, setNavSide] = useState(user ? user.navPosition : 'top');

    const { colorMode, toggleColorMode } = useColorMode();

    const languages = [{
        value: 'english',
        title: 'EN',
        onClick: () => console.log('language selected english!')
    }, {
        value: 'hebrew',
        title: 'HE',
        onClick: () => console.log('language selected hebrew!')
    }, {
        value: 'russian',
        title: 'RU',
        onClick: () => console.log('language selected russian!')
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
        setOpen(false)
    }
    const toLeft = () => {
        navPosition('left')
        setNavSide('left')
        setOpen(false)
    }
    const toBottom = () => {
        navPosition('bottom')
        setNavSide('bottom')
        setOpen(false)
    }
    const toRight = () => {
        navPosition('right')
        setNavSide('right')
        setOpen(false)
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

    useEffect(() => {
        setOpen(close);
    }, [close]);

    return (<Tool navSide={navSide}
        navShort={navShort}
        title={title}
        value={
            <Menu.Root open={useOpen}
                onInteractOutside={autoClose ? null : () => setOpen(false)}
                positioning={navSide === 'top' ? { placement: 'bottom' } :
                    navSide === 'left' ? { placement: 'right-end' } :
                        navSide === 'bottom' ? { placement: 'top' } :
                            navSide === 'right' ? { placement: 'left-end' } : ''}>

                <Menu.Trigger asChild>

                    <Button bg={'black'} onClick={() => setOpen(!useOpen)}>
                        <i className={`pi ${pi_icon}`} />
                        {
                            navShort ? null : <Text>{title}</Text>
                        }
                    </Button>

                </Menu.Trigger>
                <Portal>

                    <Menu.Positioner>

                        <Menu.Content>

                            <Menu.ItemGroup>
                                <Menu.ItemGroupLabel>
                                    {
                                        user ? (`${user.status === 0 ? 'Local' : 'Online'} user: ${user.name}`) :
                                            ('No user connected!')
                                    }
                                </Menu.ItemGroupLabel>
                                <Menu.Item>
                                    <Button hidden={user ? false : true}
                                        backgroundColor={'white'}
                                        onClick={() => { console.log('sign out') }}
                                        color={"black"}
                                        w={'full'}
                                    >

                                        <Flex width={'full'}
                                            alignItems={'center'}
                                            gap={3}>

                                            <i className={`pi pi-sign-out`} />
                                            <Text>Sign Out</Text>

                                        </Flex>

                                    </Button>
                                </Menu.Item>
                                <Menu.Item>
                                    <Button hidden={user ? true : false}
                                        backgroundColor={'white'}
                                        onClick={() => {
                                            setOpen(false);
                                            signUpForm()
                                        }}
                                        color={"black"}
                                        w={'full'}
                                    >

                                        <Flex width={'full'}
                                            alignItems={'center'}
                                            gap={3}>

                                            <i className={`pi pi-user-edit`} />
                                            <Text>Sign Up</Text>

                                        </Flex>

                                    </Button>
                                </Menu.Item>
                                <Menu.Item>
                                    <Button hidden={user ? true : false}
                                        backgroundColor={'white'}
                                        onClick={() => {
                                            setOpen(false);
                                            signInForm()
                                        }}
                                        color={"black"}
                                        w={'full'}
                                    >

                                        <Flex width={'full'}
                                            alignItems={'center'}
                                            gap={3}>

                                            <i className={`pi pi-sign-in`} />
                                            <Text>Sign In</Text>

                                        </Flex>

                                    </Button>
                                </Menu.Item>

                            </Menu.ItemGroup>
                            <Menu.Separator />
                            <Menu.ItemGroup paddingX={3}>
                                <Menu.Item>
                                    <Button backgroundColor={'white'}
                                        color={'black'}
                                        w={'full'}
                                        onClick={toggleColorMode}>

                                        <Flex width={'full'}
                                            alignItems={'center'}
                                            gap={3}>

                                            <i className={`pi pi-moon`} />
                                            <Text>Mode</Text>

                                        </Flex>

                                    </Button>
                                </Menu.Item>
                                <Menu.Item>
                                    <SelectionCheckSwitchMenu title={'Languages'}
                                        pi_icon={'pi-language'}
                                        navSide={navSide}
                                        default_option={default_languages}
                                        options={languages}
                                    />
                                </Menu.Item>
                                <Menu.Item>
                                    <SelectionCheckMenu
                                        title={'Lesson Settings'}
                                        pi_icon={'pi-cog'}
                                        navSide={navSide}
                                        default_options={default_lesson_settings}
                                        switch_board={true}
                                        options={lesson_settings} />
                                </Menu.Item>
                                <Menu.Item>
                                    <SelectionCheckSwitchMenu title={'Menu Position'}
                                        pi_icon={'pi-angle-down'}
                                        navSide={navSide}
                                        default_option={default_menu_pos}
                                        options={menu_pos}
                                    />
                                </Menu.Item>
                            </Menu.ItemGroup>

                        </Menu.Content>

                    </Menu.Positioner>

                </Portal>

            </Menu.Root>}
    />)
}

export default NavMenu