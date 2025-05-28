import { Text, Flex } from "@chakra-ui/react"
import "primeicons/primeicons.css";

function TitleSlot({pi_icon, title}) {
    return (<Flex width={'1xs'} flexDirection={'row'} gapX={2}>

        <i className={`pi ${pi_icon}`} />
        <Text fontWeight={'medium'} fontSize={'lg'} textAlign={'center'}>{title}</Text>

    </Flex>)
}

export default TitleSlot