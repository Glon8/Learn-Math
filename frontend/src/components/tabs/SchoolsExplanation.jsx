import { Text } from "@chakra-ui/react"

import { languageContext } from "../../context/LanguagesContext";

function SchoolsExplanation() {
    const { language, defPack } = languageContext();

    return (<Text hideBelow={"xl"}
        border
        width={'full'}
        textAlign={'center'}
        background={{ _dark: '#1D282E/65' }}
        rounded={'sm'}
        paddingX={3}
        paddingY={1}
        boxShadow={'sm'}
        color={{ _light: '#1D282E', _dark: '#EEF6F9' }}
        fontWeight={'medium'}
    >{language?.schools?.innerTitle ?? defPack.schools.innerTitle}</Text>)
}

export default SchoolsExplanation