import { Button, Flex, Text, Menu, Portal } from "@chakra-ui/react"
import "primeicons/primeicons.css";
import { useEffect, useState } from "react";
import { useColorMode } from "./ui/color-mode.jsx";
import { callToast } from "./Toast.jsx";

import { userContext } from '../context/UserContext.jsx'
import { signContext } from "../context/SignContext.jsx";
import { languageContext } from "../context/LanguagesContext.jsx";

import SelectionCheckMenu from "./SelectionCheckMenu";
import SelectionCheckSwitchMenu from "./SelectionCheckSwitchMenu";
import Tool from "./Tooltip.jsx";

function NavMenu({ close, autoClose, navShort, pi_icon }) {
    const { pos, mode, upUser, user, out, lang, set } = userContext();
    const { isIn, isUp } = signContext();
    const { language } = languageContext();

    const { colorMode, toggleColorMode } = useColorMode();

    const [useOpen, setOpen] = useState(close ? close : false);

    //========================< language settings
    const languages = [{
        value: 'en',
        title: language?.navMenu?.languages?.en ? language?.navMenu?.languages?.en : 'EN',
        onClick: () => upUser('language', 'en')
    }, {
        value: 'he',
        title: language?.navMenu?.languages?.he ? language?.navMenu?.languages?.he : 'HE',
        onClick: () => upUser('language', 'he')
    }, {
        value: 'ru',
        title: language?.navMenu?.languages?.ru ? language?.navMenu?.languages?.ru : 'RU',
        onClick: () => upUser('language', 'ru')
    }];
    const default_languages = lang ? lang : 'en';

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
        title: language?.navMenu?.position?.top ? language?.navMenu?.position?.top : 'Top',
        onClick: () => toTop()
    }, {
        value: 'left',
        title: language?.navMenu?.position?.left ? language?.navMenu?.position?.left : 'Left',
        onClick: () => toLeft()
    }, {
        value: 'bottom',
        title: language?.navMenu?.position?.bottom ? language?.navMenu?.position?.bottom : 'Bottom',
        onClick: () => toBottom()
    }, {
        value: 'right',
        title: language?.navMenu?.position?.right ? language?.navMenu?.position?.right : 'Right',
        onClick: () => toRight()
    }];

    //========================< useStates
    useEffect(() => {
        setOpen(close);
    }, [close]);

    useEffect(() => {
        toggleColorMode(mode ? (mode === 'light' ? 'light' : 'dark') : ('light'));
    }, [mode]);

    return (<Tool navSide={pos}
        navShort={navShort}
        title={language?.navMenu?.trigger ? language?.navMenu?.trigger : 'Menu'}
        value={
            <Menu.Root open={useOpen}
                onInteractOutside={autoClose ? null : () => setOpen(false)}
                positioning={pos === 'top' ? { placement: 'bottom' } :
                    pos === 'left' ? { placement: 'right-end' } :
                        pos === 'bottom' ? { placement: 'top' } :
                            pos === 'right' ? { placement: 'left-end' } : ''}
            >

                <Menu.Trigger asChild>

                    <Button focusRing={'inside'}
                        onClick={() => setOpen(!useOpen)}
                        w={'full'}
                        background="#1D282E"
                        borderColor="#1D282E"
                        focusRingColor='#B1B7BA'
                        color='#EEF6F9'
                    >
                        <i className={`pi ${pi_icon}`} />
                        {
                            navShort ? null : <Text>{language?.navMenu?.trigger ? language?.navMenu?.trigger : 'Menu'}</Text>
                        }
                    </Button>

                </Menu.Trigger>
                <Portal>

                    <Menu.Positioner>

                        <Menu.Content _dark={{
                            background: '#1D282E/95',
                            borderColor: '#1D282E'
                        }}>

                            <Menu.ItemGroup>
                                <Menu.ItemGroupLabel
                                    color={{ _light: '#1D282E', _dark: '#EEF6F9' }}
                                >
                                    {
                                        user._id != null ? (lang != 'he' ?
                                            (`${!user.status ?
                                                (language?.navMenu?.userStatusLocal ? language?.navMenu?.userStatusLocal : 'Local') :
                                                (language?.navMenu?.userStatusOnline ? language?.navMenu?.userStatusOnline : 'Online')}
                                                 ${language?.navMenu?.userStatus ? language?.navMenu?.userStatus : 'user'}:`) :
                                            (`:${language?.navMenu?.userStatus ? language?.navMenu?.userStatus : 'user'} 
                                                 ${!user.status ? (language?.navMenu?.userStatusLocal ? language?.navMenu?.userStatusLocal : 'Local') :
                                                    (language?.navMenu?.userStatusOnline ? language?.navMenu?.userStatusOnline : 'Online')} `)) :
                                            (language?.navMenu?.userStatusNegative ? language?.navMenu?.userStatusNegative : 'No user connected!')
                                    }
                                </Menu.ItemGroupLabel>
                                {
                                    user._id != null ?
                                        (<Menu.ItemGroupLabel
                                            color={{ _light: '#1D282E', _dark: '#EEF6F9' }}
                                        >
                                            {user.name}
                                        </Menu.ItemGroupLabel>)
                                        : null
                                }
                                <Menu.Separator />
                                <Menu.Item display={user._id != null ? '' : 'none'}>
                                    <Button focusRing={'inside'}
                                        onClick={() => {
                                            out();
                                            setOpen(false);
                                            callToast('Info:', 'You logged out', '', '', pos);
                                        }}
                                        color={"black"}
                                        w={'full'}
                                        _light={{
                                            background: "white",
                                            borderColor: "#B1B7BA/20",
                                            focusRingColor: '#B1B7BA',
                                            color: '#1D282E'
                                        }}
                                        _dark={{
                                            background: "#1D282E",
                                            borderColor: "#737E80",
                                            focusRingColor: '#B1B7BA',
                                            color: '#EEF6F9'
                                        }}
                                    >

                                        <Flex width={'full'}
                                            alignItems={'center'}
                                            gap={3}>

                                            <i className={`pi pi-sign-out`} />
                                            <Text>{language?.navMenu?.signOut ? language?.navMenu?.signOut : 'Sign Out'}</Text>

                                        </Flex>

                                    </Button>
                                </Menu.Item>
                                <Menu.Item display={user._id != null ? 'none' : ''}>
                                    <Button focusRing={'inside'}
                                        onClick={() => {
                                            setOpen(false);
                                            isUp(true);
                                        }}
                                        w={'full'}
                                        _light={{
                                            background: "white",
                                            borderColor: "#B1B7BA/20",
                                            focusRingColor: '#B1B7BA',
                                            color: '#1D282E'
                                        }}
                                        _dark={{
                                            background: "#1D282E",
                                            borderColor: "#737E80",
                                            focusRingColor: '#B1B7BA',
                                            color: '#EEF6F9'
                                        }}
                                    >

                                        <Flex width={'full'}
                                            alignItems={'center'}
                                            gap={3}>

                                            <i className={`pi pi-user-edit`} />
                                            <Text>{language?.navMenu?.signUp ? language?.navMenu?.signUp : 'Sign Up'}</Text>

                                        </Flex>

                                    </Button>
                                </Menu.Item>
                                <Menu.Item display={user._id != null ? 'none' : ''}>
                                    <Button focusRing={'inside'}
                                        onClick={() => {
                                            setOpen(false);
                                            isIn(true);
                                        }}
                                        w={'full'}
                                        _light={{
                                            background: "white",
                                            borderColor: "#B1B7BA/20",
                                            focusRingColor: '#B1B7BA',
                                            color: '#1D282E'
                                        }}
                                        _dark={{
                                            background: "#1D282E",
                                            borderColor: "#737E80",
                                            focusRingColor: '#B1B7BA',
                                            color: '#EEF6F9'
                                        }}
                                    >

                                        <Flex width={'full'}
                                            alignItems={'center'}
                                            gap={3}>

                                            <i className={`pi pi-sign-in`} />
                                            <Text>{language?.navMenu?.signIn ? language?.navMenu?.signIn : 'Sign In'}</Text>

                                        </Flex>

                                    </Button>
                                </Menu.Item>

                            </Menu.ItemGroup>
                            <Menu.Separator />
                            <Menu.ItemGroup>
                                <Menu.Item>
                                    <Button focusRing={'inside'}
                                        w={'full'}
                                        onClick={() => {
                                            mode === 'light' ?
                                                upUser('mode', 'dark') :
                                                upUser('mode', 'light')
                                        }}
                                        _light={{
                                            background: "white",
                                            borderColor: "#B1B7BA/20",
                                            focusRingColor: '#B1B7BA',
                                            color: '#1D282E'
                                        }}
                                        _dark={{
                                            background: "#1D282E/80",
                                            borderColor: "#737E80",
                                            focusRingColor: '#B1B7BA',
                                            color: '#EEF6F9'
                                        }}
                                    >

                                        <Flex width={'full'}
                                            alignItems={'center'}
                                            gap={3}>

                                            <i className={`pi pi-moon`} />
                                            <Text>{language?.navMenu?.mode ? language?.navMenu?.mode : 'Mode'}</Text>

                                        </Flex>

                                    </Button>
                                </Menu.Item>
                                <Menu.Item>
                                    <SelectionCheckSwitchMenu title={language?.navMenu?.languages?.trigger ? language?.navMenu?.languages?.trigger : 'Languages'}
                                        pi_icon={'pi-language'}
                                        navSide={pos}
                                        default_option={default_languages}
                                        options={languages}
                                    />
                                </Menu.Item>
                                <Menu.Item>
                                    <SelectionCheckMenu
                                        title={language?.navMenu?.settings?.trigger ? language?.navMenu?.settings?.trigger : 'Lesson Settings'}
                                        pi_icon={'pi-cog'}
                                        navSide={pos}
                                        default_options={default_lesson_settings}
                                        switch_board={true}
                                        options={lesson_settings}
                                        getSwitches={(thing) => { thing != set ? upUser('settings', thing) : null }} />
                                </Menu.Item>
                                <Menu.Item>
                                    <SelectionCheckSwitchMenu title={language?.navMenu?.position?.trigger ? language?.navMenu?.position?.trigger : 'Menu Position'}
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

            </ Menu.Root>}
    />)
}

export default NavMenu