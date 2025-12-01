import { Flex, Text } from "@chakra-ui/react"

import { userContext } from "../../../context/UserContext";
import { languageContext } from "../../../context/LanguagesContext";

function HintLogs({ type, innerBody }) {
    const { lang } = userContext();
    const { language, defPack } = languageContext();

    const logsList = {
        'user': {
            'title': language?.hints?.user ?? defPack.hints.user,
        },
        'teacher': {
            'title': language?.hints?.teacher ?? defPack.hints.teacher,
            'innerFlex': 'column',
        },
        'teacher welcome': {
            'title': language?.hints?.teacherWelcome ?? defPack.hints.teacherWelcome,
            'color': { _light: '#1D282E', _dark: '#EEF6F9' },
            'height': 'fit',
            'gap': '',
            'flexDir': '',
            'fontWeight': '',
        },
    };

    return (<Flex boxShadow={'sm'}
        rounded={'sm'}
        paddingX={3}
        paddingY={1}
        flexDirection={logsList[type].flexDir ?? 'column'}
        gapX={logsList[type].gap ?? 2}
        color={logsList[type].color ?? ''}
        h={logsList[type].height ?? ''}>

        <Text fontWeight={logsList[type].fontWeight ?? 'medium'}
            direction={lang == 'he' ? 'rtl' : 'ltr'} >{logsList[type].title}</Text>
        {
            type !== 'teacher welcome' && (<Flex flexDir={logsList[type].innerFlex ?? ''}
                dir={lang == 'he' ? 'rtl' : 'ltr'} >{innerBody}</Flex>)
        }
    </Flex>)
}

export default HintLogs