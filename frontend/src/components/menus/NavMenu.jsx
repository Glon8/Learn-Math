import { Button, Flex, Text, Menu, Portal } from "@chakra-ui/react"
import "primeicons/primeicons.css";
import { useEffect, useState } from "react";
import { useColorMode } from "../ui/color-mode.jsx";
import { callToast } from "../Toast.jsx";

import { userContext } from '../../context/UserContext.jsx'
import { signContext } from "../../context/SignContext.jsx";
import { languageContext } from "../../context/LanguagesContext.jsx";

import SelectionCheckMenu from "./SelectionCheckMenu.jsx";
import SelectionCheckSwitchMenu from "./SelectionCheckSwitchMenu.jsx";
import NavOptions from "../buttons/sub/NavOptions.jsx";
import NavOptionsInsides from "../buttons/sub/NavOptionsInsides.jsx";

function NavMenu({ close, autoClose, navShort }) {
    const { pos, mode, upUser, user, out, lang, set } = userContext();
    const { isIn, isUp } = signContext();
    const { language, defPack } = languageContext();

    const { colorMode, toggleColorMode } = useColorMode();

    const [useOpen, setOpen] = useState(close ?? false);

    //========================< language settings
    const languages = [{
        value: 'en',
        title: language?.navMenu?.languages?.en ?? defPack.navMenu.languages.en,
        onClick: () => upUser('language', 'en')
    }, {
        value: 'he',
        title: language?.navMenu?.languages?.he ?? defPack.navMenu.languages.he,
        onClick: () => upUser('language', 'he')
    }, {
        value: 'ru',
        title: language?.navMenu?.languages?.ru ?? defPack.navMenu.languages.ru,
        onClick: () => upUser('language', 'ru')
    }];
    const default_languages = lang ?? 'en';

    //========================< lesson settings
    const lesson_settings = [{
        value: '123',
        title: language?.navMenu?.settings?.['123'] ?? defPack.navMenu.settings['123']
    }, {
        value: '124',
        title: language?.navMenu?.settings?.['124'] ?? defPack.navMenu.settings['124']
    }, {
        value: '125',
        title: language?.navMenu?.settings?.['125'] ?? defPack.navMenu.settings['125']
    }, {
        value: '126',
        title: language?.navMenu?.settings?.['126'] ?? defPack.navMenu.settings['126']
    }, {
        value: '127',
        title: language?.navMenu?.settings?.['127'] ?? defPack.navMenu.settings['127']
    }, {
        value: '128',
        title: language?.navMenu?.settings?.['128'] ?? defPack.navMenu.settings['128']
    }, {
        value: '129',
        title: language?.navMenu?.settings?.['129'] ?? defPack.navMenu.settings['129']
    },];
    const default_lesson_settings = set ?? [true, true, false, false, false, false, false];


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
        title: language?.navMenu?.position?.top ?? defPack.navMenu.position.top,
        onClick: () => toTop()
    }, {
        value: 'left',
        title: language?.navMenu?.position?.left ?? defPack.navMenu.position.left,
        onClick: () => toLeft()
    }, {
        value: 'bottom',
        title: language?.navMenu?.position?.bottom ?? defPack.navMenu.position.bottom,
        onClick: () => toBottom()
    }, {
        value: 'right',
        title: language?.navMenu?.position?.right ?? defPack.navMenu.position.right,
        onClick: () => toRight()
    }];

    //========================< useEffects
    useEffect(() => {
        setOpen(close);
    }, [close]);

    useEffect(() => {
        const color = !mode ? 'light' : mode;
        if (color !== colorMode) toggleColorMode();

    }, [mode]);

    return (<Menu.Root open={useOpen}
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

                <i className={`pi pi-align-justify`} />
                <Text lgDown={{ display: 'none' }}>{language?.navMenu?.trigger ?? defPack.navMenu.trigger}</Text>

            </Button>

        </Menu.Trigger>
        <Portal>

            <Menu.Positioner>

                <Menu.Content _dark={{
                    background: '#1D282E/95',
                    borderColor: '#1D282E'
                }}>

                    <Menu.ItemGroup>

                        <Menu.ItemGroupLabel color={{ _light: '#1D282E', _dark: '#EEF6F9' }} >
                            {
                                user._id != null ? (lang != 'he' ?
                                    (`${!user.status ?
                                        (language?.navMenu?.userStatusLocal ?? defPack.navMenu.userStatusLocal) :
                                        (language?.navMenu?.userStatusOnline ?? defPack.navMenu.userStatusOnline)}
                                                 ${language?.navMenu?.userStatus ?? defPack.navMenu.userStatus}:`) :
                                    (`:${language?.navMenu?.userStatus ?? defPack.navMenu.userStatus} 
                                                 ${!user.status ? (language?.navMenu?.userStatusLocal ?? defPack.navMenu.userStatusLocal) :
                                            (language?.navMenu?.userStatusOnline ?? defPack.navMenu.userStatusOnline)} `)) :
                                    (language?.navMenu?.userStatusNegative ?? defPack.navMenu.userStatusNegative)
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
                            <NavOptions onClick={() => { out(); setOpen(false); callToast('Info:', 'You logged out', '', '', pos); }}
                                body={<NavOptionsInsides type={'signOut'} />} />
                        </Menu.Item>
                        <Menu.Item display={user._id != null ? 'none' : ''}>
                            <NavOptions onClick={() => { setOpen(false); isUp(true); }}
                                body={<NavOptionsInsides type={'signUp'} />} />
                        </Menu.Item>
                        <Menu.Item display={user._id != null ? 'none' : ''}>
                            <NavOptions onClick={() => { setOpen(false); isIn(true); }}
                                body={<NavOptionsInsides type={'signIn'} />} />
                        </Menu.Item>

                    </Menu.ItemGroup>
                    <Menu.Separator />
                    <Menu.ItemGroup>
                        <Menu.Item>
                            <NavOptions onClick={() => { mode === 'light' ? upUser('mode', 'dark') : upUser('mode', 'light') }}
                                body={<NavOptionsInsides type={'mode'} mode={mode} />} />
                        </Menu.Item>
                        <Menu.Item>
                            <SelectionCheckSwitchMenu title={language?.navMenu?.languages?.trigger ?? defPack.navMenu.languages.trigger}
                                pi_icon={'pi-language'}
                                navSide={pos}
                                default_option={default_languages}
                                options={languages}
                            />
                        </Menu.Item>
                        <Menu.Item>
                            <SelectionCheckMenu
                                title={language?.navMenu?.settings?.trigger ?? defPack.navMenu.settings.trigger}
                                pi_icon={'pi-cog'}
                                navSide={pos}
                                default_options={default_lesson_settings}
                                switch_board={true}
                                options={lesson_settings}
                                getSwitches={(thing) => { thing != set ? upUser('settings', thing) : null }} />
                        </Menu.Item>
                        <Menu.Item>
                            <SelectionCheckSwitchMenu title={language?.navMenu?.position?.trigger ?? defPack.navMenu.position.trigger}
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

    </ Menu.Root>)
}

export default NavMenu