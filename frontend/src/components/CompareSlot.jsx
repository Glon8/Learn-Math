import { Text, Flex } from "@chakra-ui/react"
import "primeicons/primeicons.css";

function CompareSlot({value_a, value_b, category}) {
    return (<Flex width={'1xs'} flexDirection={'row'} justify={'space-between'}>

        <Text fontSize={'xl'} textAlign={'center'} color={`${value_a > value_b? 'green' : ''}`} >{value_a}</Text>
        <Text textAlign={'center'} >{category}</Text>
        <Text fontSize={'xl'} textAlign={'center'} color={`${value_b > value_a ? 'green' : ''}`}>{value_b}</Text>

    </Flex>)
}

export default CompareSlot