import { Flex, Text } from "@chakra-ui/react"
import "primeicons/primeicons.css";

import { languageContext } from "../../../context/LanguagesContext";

function NavOptionsInsides({ type, mode = 'light' }) {
    const { language, defPack } = languageContext();

    const optionsList = {
        'signOut': {
            'icon': 'pi-sign-out',
            'text': language?.navMenu?.signOut ?? defPack.navMenu.signOut,
        },
        'signUp': {
            'icon': 'pi-user-edit',
            'text': language?.navMenu?.signUp ?? defPack.navMenu.signUp,
        },
        'signIn': {
            'icon': 'pi-sign-in',
            'text': language?.navMenu?.signIn ?? defPack.navMenu.signIn,
        },
        'mode': {
            'icon': mode === 'light' ? `pi-moon` : `pi-sun`,
            'text': language?.navMenu?.mode ?? defPack.navMenu.mode,
        },
    };

    return (<Flex width={'full'} alignItems={'center'} gap={3}>

        <i className={`pi ` + optionsList[type].icon} />
        <Text>{optionsList[type].text}</Text>

    </Flex>)
}

export default NavOptionsInsides