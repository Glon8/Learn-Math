import { Stack } from '@chakra-ui/react'

function PagesBaseStack({ children, ...rest }) {
    return (<Stack {...rest}
        border
        borderWidth={1}
        paddingX={5}
        paddingY={7}
        rounded={'xl'}
        h={'fit'}
        gap={3}
        _light={{
            boxShadow: 'lg',
            background: 'white',
            borderColor: '#B1B7BA'
        }}
        _dark={{
            boxShadow: '0 0 2rem 0.5rem rgb(238, 246, 249)',
            background: '#8b8da0',
            borderColor: '#1D282E',
        }} >
        {children}
    </Stack>)
}

export default PagesBaseStack