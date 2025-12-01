import { Text } from "@chakra-ui/react"

function CustomFormTiles({ children, ...rest }) {
    return (<Text {...rest}
        backgroundColor={{ _dark: '#1D282E/80' }}
        border
        borderWidth={2}
        fontWeight={'bold'}
        padding={2} >
        {children}
    </Text>)
}

export default CustomFormTiles