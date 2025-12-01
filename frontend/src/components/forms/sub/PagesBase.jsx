import { Flex } from '@chakra-ui/react'

import { userContext } from '../../../context/UserContext'

function PagesBase({ children, ...rest }) {
    const { pos } = userContext();
    
    return (<Flex {...rest}
        w={'100%'}
        flexDirection={'column'}
        paddingLeft={pos === 'left' ? { base: '3rem', sm: '3rem', md: '3rem', lg: '5rem' } : ''}
        paddingRight={pos === 'right' ? { base: '3rem', sm: '3rem', md: '3rem', lg: '5rem' } : ''}
        paddingTop={!pos || pos === 'top' ? { base: '2.5rem', sm: '2.5rem', md: '2.5rem', lg: '10%' } : { md: '5%' }}
        paddingBottom={pos === 'bottom' ? { base: '2.5rem', sm: '2.5rem', md: '2.5rem', lg: '5rem' } : ''}>
        {children}
    </Flex>)
}

export default PagesBase