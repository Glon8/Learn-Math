import { Button, Flex, Text, Menu, Portal } from "@chakra-ui/react"
import "primeicons/primeicons.css";
import { useEffect, useState, useId } from "react";
import { useColorMode } from "./ui/color-mode.jsx";

import { userContext } from './UserContext.jsx'
import { signContext } from "./Signcontext.jsx";

import SelectionCheckMenu from "./SelectionCheckMenu";
import SelectionCheckSwitchMenu from "./SelectionCheckSwitchMenu";
import Tool from "./Tooltip.jsx";

function NavMenu({ close, autoClose, navShort, title, pi_icon }) {
    const { pos, mode, upUser, user, out, lang, set } = userContext();
    const { isIn, isUp } = signContext();

    const triggerId = useId();
    const { colorMode, toggleColorMode } = useColorMode();

    const [useOpen, setOpen] = useState(close ? close : false);

    //========================< language settings
    const languages = [{
        value: 'english',
        title: 'EN',
        onClick: () => upUser('language', 'english')
    }, {
        value: 'hebrew',
        title: 'HE',
        onClick: () => upUser('language', 'hebrew')
    }, {
        value: 'russian',
        title: 'RU',
        onClick: () => upUser('language', 'russian')
    }];
    const default_languages = lang ? lang : 'english';

    //========================< lesson settings
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
    const default_lesson_settings = set ? set : [];


    //========================< menu position settings
    const toTop = () => {
        setOpen(false);

        upUser('navPosition', 'top');
    }
    const toLeft = () => {
        setOpen(false);

        upUser('navPosition', 'left');
    }
    const toBottom = () => {
        setOpen(false);

        upUser('navPosition', 'bottom');
    }
    const toRight = () => {
        setOpen(false);

        upUser('navPosition', 'right');
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

    //========================< useStates
    useEffect(() => {
        setOpen(close);
    }, [close]);

    useEffect(() => {
        toggleColorMode(mode === 'light' ? 'light' : 'dark');
    }, [mode]);

    return (<Tool navSide={pos}
        navShort={navShort}
        title={title}
        value={
            <Menu.Root open={useOpen}
                onInteractOutside={autoClose ? null : () => setOpen(false)}
                positioning={pos === 'top' ? { placement: 'bottom' } :
                    pos === 'left' ? { placement: 'right-end' } :
                        pos === 'bottom' ? { placement: 'top' } :
                            pos === 'right' ? { placement: 'left-end' } : ''}>

                <Menu.Trigger asChild>

                    <Button bg={'black'}
                        onClick={() => setOpen(!useOpen)}
                        w={'full'}>
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
                                        user._id != null ? (`${!user.status ? 'Local' : 'Online'} user: ${user.name}`) :
                                            ('No user connected!')
                                    }
                                </Menu.ItemGroupLabel>
                                <Menu.Item display={user._id != null ? '' : 'none'}>
                                    <Button backgroundColor={'white'}
                                        onClick={() => {
                                            out();
                                            setOpen(false);
                                        }}
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
                                <Menu.Item display={user._id != null ? 'none' : ''}>
                                    <Button backgroundColor={'white'}
                                        onClick={() => {
                                            setOpen(false);
                                            isUp(true);
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
                                <Menu.Item display={user._id != null ? 'none' : ''}>
                                    <Button backgroundColor={'white'}
                                        onClick={() => {
                                            setOpen(false);
                                            isIn(true);
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
                            <Menu.ItemGroup>
                                <Menu.Item>
                                    <Button backgroundColor={'white'}
                                        color={'black'}
                                        w={'full'}
                                        onClick={() => {
                                            mode === 'light' ?
                                                upUser('mode', 'dark') :
                                                upUser('mode', 'light')
                                        }}>

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
                                        navSide={pos}
                                        default_option={default_languages}
                                        options={languages}
                                    />
                                </Menu.Item>
                                <Menu.Item>
                                    <SelectionCheckMenu
                                        title={'Lesson Settings'}
                                        pi_icon={'pi-cog'}
                                        navSide={pos}
                                        default_options={default_lesson_settings}
                                        switch_board={true}
                                        options={lesson_settings}
                                        getSwitches={(thing) => { thing != set ? upUser('settings', thing) : null }} />
                                </Menu.Item>
                                <Menu.Item>
                                    <SelectionCheckSwitchMenu title={'Menu Position'}
                                        pi_icon={'pi-angle-down'}
                                        navSide={pos}
                                        default_option={pos}
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