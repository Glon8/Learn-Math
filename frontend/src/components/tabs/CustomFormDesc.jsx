import { Text } from "@chakra-ui/react"

function CustomFormDesc({ title, ...rest }) {
    return (<Text {...rest}
        w={'full'}
        minH={1}
        color={{ _light: '#1D282E/90', _dark: '#EEF6F9' }}
        fontWeight={'medium'}
        textAlign={'left'}
        background={{ _dark: '#1D282E/65' }}
        boxShadow={{ _dark: '0 0 5px 2px #EEF6F9' }}
        rounded={{ _dark: 'sm' }}
        paddingX={3}>{title ?? ''}</Text>)
}

export default CustomFormDesc