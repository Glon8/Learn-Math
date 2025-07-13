import { Text, Flex } from "@chakra-ui/react"
import "primeicons/primeicons.css";

function CompareSlot({ value_a, value_b, category }) {
    return (<Flex width={'full'}
        minW={'17rem'}
        position={'relative'}
        flexDirection={'row'}
        justify={'space-between'}
        alignItems={'center'}
        h={'2rem'}
    >
        <Text fontSize={'xl'}
            textAlign={'center'}
            color={`${value_a > value_b ? 'green' : ({ _light: '#1D282E', _black: 'white' })}`}
            left={0}
            opacity={value_a ? 1 : 0.5}
        >{value_a}</Text>
        <Text textAlign={'center'}
            position={'absolute'}
            left={'20%'}
            color={{ _light: '#1D282E', _black: 'white' }}
        >{category}</Text>
        <Text fontSize={'xl'}
            textAlign={'center'}
            color={`${value_b > value_a ? 'green' : ({ _light: '#1D282E', _black: 'white' })}`}
            right={0}
            opacity={value_b ? 1 : 0.5}
        >{value_b}</Text>

    </Flex>)
}

export default CompareSlot