import { Flex, Image } from "@chakra-ui/react";
import { useColorMode } from "./ui/color-mode.jsx";

import { userContext } from "../context/UserContext";

import AINote from './AINote.jsx'
import Girl from '../images/ChatGPTHighSchoolGirl.png'
import SittingGirl from '../images/ChatGPTHighSchoolGirlSitting.png'
import Boy from '../images/ChatGPTHighSchoolBoy.png'
import ReadingBoy from '../images/ChatGPTHighSchoolBoyReading.png'

function BackGroundImage() {

    const { colorMode, toggleColorMode } = useColorMode();

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
            left={pos === 'left' ? '4rem' : -1}
            bottom={pos === 'bottom' ? '5rem' : 0}
            display={{ base: 'none', sm: 'none', md: 'none', lg: 'none', xl: 'flex' }}
        >
            <Image maxH={'70%'}
                src={!!colorMode ? (colorMode === 'light' ? Girl : ReadingBoy) : Girl}
                alt="welcome-image" />
        </Flex>
        <Flex h={'auto'}
            maxW={{ _light: '25rem', _dark: '18rem' }}
            position={'fixed'}
            bottom={pos === 'bottom' ? '5rem' : 0}
            right={pos === 'right' ? '4rem' : -1}
            display={{ base: 'none', sm: 'none', md: 'none', lg: 'none', xl: 'flex' }}>
            <Image maxH={'70%'}
                src={!!colorMode ? (colorMode === 'light' ? Boy : SittingGirl) : Boy}
                alt="welcome-image" />
        </Flex>
        <Flex display={{ base: 'none', sm: 'none', md: 'none', lg: 'none', xl: 'flex' }}>
            <AINote />
        </Flex>

    </Flex>)
}

export default BackGroundImage