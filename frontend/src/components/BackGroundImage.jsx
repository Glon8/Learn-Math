import { Flex, Image } from "@chakra-ui/react";

import { userContext } from "../components/UserContext";

import AINote from './AINote.jsx'
import Girl from '../images/ChatGPTHighSchoolGirl.png'
import Boy from '../images/ChatGPTHighSchoolBoy.png'

function BackGroundImage() {
    const { pos } = userContext();

    return (<Flex w={'100%'} h={'100%'}
        position={'absolute'}
        paddingLeft={pos === 'left' ? '5rem' : ''}
        paddingRight={pos === 'right' ? '5rem' : ''}
        paddingTop={pos === 'top' ? '5rem' : ''}
        paddingBottom={pos === 'bottom' ? '5rem' : ''}
        zIndex={-5}
        _light={{
            bg: '#EEF6F9'
        }}
        _dark={{
            bg: '#c9bbae'
        }}>

        <Flex h={'auto'}
            maxW={'25rem'}
            position={'fixed'}
            left={-1}
            bottom={pos === 'bottom' ? '5rem' : 0}
            display={{ base: 'none', sm: 'none', md: 'none', lg: 'none', xl: 'flex' }}
            >
            <Image maxH={'70%'}
                src={Girl}
                alt="welcome-image" />
        </Flex>
        <Flex h={'auto'}
            maxW={'25rem'}
            position={'fixed'}
            bottom={pos === 'bottom' ? '5rem' : 0}
            right={-1}
            display={{ base: 'none', sm: 'none', md: 'none', lg: 'none', xl: 'flex' }}>
            <Image maxH={'70%'}
                src={Boy}
                alt="welcome-image" />
        </Flex>
        <Flex display={{base: 'none',sm: 'none',md:'none',lg: 'none',xl: 'flex'}}>
            <AINote />
        </Flex>

    </Flex>)
}

export default BackGroundImage