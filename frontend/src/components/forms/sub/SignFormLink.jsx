import { Flex, Link } from "@chakra-ui/react"
import { userContext } from "../../../context/UserContext.jsx"
import { languageContext } from '../../../context/LanguagesContext.jsx'

function SignFormLink({ label, value, onClick }) {
    const { lang } = userContext();
    const { language, defPack } = languageContext();

    return (<Flex fontSize={'sm'} color={{ _light: '#1D282E', _dark: '#EEF6F9' }}
        flexDir={lang == 'he' ? 'row-reverse' : 'row'} justifyContent={lang == 'he' ? 'start' : ''} >

        {language?.sign?.[label] ?? defPack.sign?.[label]}
        <Link onClick={() => onClick()} marginX={1} > {language?.sign?.[value] ?? defPack.sign?.[value]} </Link>

    </Flex>)
}

export default SignFormLink