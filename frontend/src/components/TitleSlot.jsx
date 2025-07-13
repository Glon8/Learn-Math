import { Text, Flex } from "@chakra-ui/react"
import "primeicons/primeicons.css";

function TitleSlot({ pi_icon, title }) {
    return (<Flex width={'1xs'}
        flexDirection={'row'}
        alignItems={'center'}
        gapX={2}
        color={{_light: '#1D282E', _dark: 'white'}}>
        {
            pi_icon ? <i className={`pi ${pi_icon}`} /> : null
        }
        <Text fontWeight={'medium'} fontSize={'lg'} textAlign={'center'}>{title}</Text>

    </Flex>)
}

export default TitleSlot