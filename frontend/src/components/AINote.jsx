import { Flex, Text } from "@chakra-ui/react";

import { userContext } from "../context/UserContext";
import { languageContext } from "../context/LanguagesContext";

function AINote({ type }) {
    const { pos } = userContext();
    const { language, defPack } = languageContext();

    const display = {
        main: { base: 'flex', sm: 'flex', md: 'flex', lg: 'flex', xl: 'none' },
        bg: { base: 'none', sm: 'none', md: 'none', lg: 'none', xl: 'flex' },
    };

    return (<Flex display={display[type] ?? 'flex'}
        position={'fixed'}
        left={pos ? (pos === 'top' ||
            pos === 'bottom' ||
            pos === 'right' ? 5 : '') : 5}
        bottom={pos ? (pos === 'top' ||
            pos === 'left' ||
            pos === 'right' ? 5 : '') : 5}
        right={pos ? (pos === 'left' ? 5 : '') : ''}
        top={pos ? (pos === 'bottom' ? 5 : '') : ''}
        padding={2}
        rounded={'xl'}
        border
        borderWidth={1}
        borderColor={{ _light: '#B1B7BA/60', _dark: '#1D282E/60' }}
        color={'#1D282E/50'}
        backgroundColor={'#EEF6F9/60'}>
        <Text fontWeight={'bold'}>
            {language?.statics?.aiNote ?? defPack?.statics?.aiNote}
        </Text>
    </Flex>)
}

export default AINote