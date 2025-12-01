import { Text, Flex } from "@chakra-ui/react"
import "primeicons/primeicons.css";

function TitleSlot({ pi_icon, title, disableDark }) {
    return (<Flex width={'1xs'}
        flexDirection={'row'}
        alignItems={'center'}
        gapX={3}
        paddingX={3}
        color={{ _light: '#1D282E', _dark: '#EEF6F9' }}
        background={disableDark === true ? '' : { _dark: '#1D282E/65' }}
        rounded={{ _dark: 'sm' }}
        boxShadow={disableDark === true ? '' : { _dark: '0 0 5px 2px black' }}
    >
        {
            pi_icon ? <i className={`pi ${pi_icon}`} /> : null
        }
        <Text fontWeight={'medium'} fontSize={'lg'} textAlign={'center'}>{title}</Text>

    </Flex>)
}

export default TitleSlot