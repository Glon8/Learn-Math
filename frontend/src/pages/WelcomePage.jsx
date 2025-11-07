import { Flex, Image } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import { userContext } from "../context/UserContext";

import AINote from '../components/AINote.jsx'
import WelcomeImage from '../images/ChatGPTLearnMathEnterenceLogo.png';

function WelcomePage() {
    const navigate = useNavigate();
    const { pos } = userContext();

    const to_schools = () => { navigate('/schools') }

    return (<Flex w={'100%'} h={'100vh'}
        marginX={{lg: '', xl:'auto'}}
        maxW={'2000px'}
        justifyContent={'center'}
        alignItems={'center'}
        paddingLeft={pos === 'left' ? { base: '2.5rem', sm: '2.5rem', md: '2.5rem', lg: '5rem' } : ''}
        paddingRight={pos === 'right' ? { base: '2.5rem', sm: '2.5rem', md: '2.5rem', lg: '5rem' } : ''}
        paddingTop={!pos || pos === 'top' ? { base: '2.5rem', sm: '2.5rem', md: '2.5rem', lg: '5rem' } : ''}
        paddingBottom={pos === 'bottom' ? { base: '2.5rem', sm: '2.5rem', md: '2.5rem', lg: '5rem' } : ''}
        onClick={to_schools}
        flexDirection={'row'}
        bg={'transparent'}>

        <Flex w={'50%'} maxH={'100%'}>
            <Image src={WelcomeImage} alt="welcome-image" />
        </Flex>
        
        <AINote />

    </Flex>)
}

export default WelcomePage