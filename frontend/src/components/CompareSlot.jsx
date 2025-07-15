import { Text, Flex } from "@chakra-ui/react"
import "primeicons/primeicons.css";

function CompareSlot({ value_a, value_b, category, disableDark }) {
    return (<Flex width={'full'}
        minW={'17rem'}
        position={'relative'}
        flexDirection={'row'}
        justify={'space-between'}
        alignItems={'center'}
        h={'2rem'}
        color={{ _light: '#1D282E', _dark: '#EEF6F9' }}
    >
        <Text fontSize={'xl'}
            textAlign={'center'}
            fontWeight={{ _dark: 'bold' }}
            color={`${value_a > value_b ? 'green' : ''}`}
            left={0}
            opacity={value_a ? 1 : 0.5}
        >{value_a}</Text>
        <Text textAlign={'center'}
            position={'absolute'}
            left={'20%'}
            color={{ _light: '#1D282E', _dark: '#EEF6F9' }}
            background={disableDark === true ? '' : { _dark: '#1D282E/65' }}
            rounded={disableDark === true ? '' : { _dark: 'sm' }}
        >{category}</Text>
        <Text fontSize={'xl'}
            textAlign={'center'}
            color={`${value_b > value_a ? 'green' : ''}`}
            right={0}
            fontWeight={{ _dark: 'bold' }}
            opacity={value_b ? 1 : 0.5}
        >{value_b}</Text>

    </Flex>)
}

export default CompareSlot