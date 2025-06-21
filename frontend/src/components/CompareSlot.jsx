import { Text, Flex } from "@chakra-ui/react"
import "primeicons/primeicons.css";

function CompareSlot({ value_a, value_b, category }) {
    return (<Flex width={'1xs'}
        flexDirection={'row'}
        position={'relative'}
        h={'2rem'}
    >

        <Text fontSize={'xl'}
            textAlign={'center'}
            color={`${value_a > value_b ? 'green' : ''}`}
            position={'absolute'}
            left={0}
            opacity={value_a ? 1 : 0.5}
        >{value_a}</Text>
        <Text textAlign={'center'}
            position={'absolute'}
            left={'30%'} >{category}</Text>
        <Text fontSize={'xl'}
            textAlign={'center'}
            color={`${value_b > value_a ? 'green' : ''}`}
            position={'absolute'}
            right={0}
            opacity={value_b? 1 : 0.5}
        >{value_b}</Text>

    </Flex>)
}

export default CompareSlot