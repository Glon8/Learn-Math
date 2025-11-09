import { Flex, Text } from "@chakra-ui/react"
import "primeicons/primeicons.css";

import { userContext } from "../context/UserContext";

function LoadingBanner({ toggle, text }) {
    const { lang } = userContext();

    return (<Flex display={toggle ? "flex" : 'none'}
        maxW={'25rem'}
        height={'15rem'}
        color={{ _light: '#1D282E', _dark: '#EEF6F9' }}
        flexDir={'column'}
        marginTop={'2rem'}
        gapY={'5rem'}
        justifyContent={'center'}
        textAlign={'center'}
    >

        <i className="pi pi-spin pi-spinner" style={{ fontSize: '3rem' }} />
        <Text direction={lang == 'he' ? 'rtl' : 'ltr'}>{text}</Text>

    </ Flex >)
}

export default LoadingBanner