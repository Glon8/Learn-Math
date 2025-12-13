import { Center, Image, useBreakpointValue } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import { userContext } from "../context/UserContext";

import AINote from '../components/AINote.jsx'
import WelcomeImage from '../images/ChatGPTLearnMathEnterenceLogo.webp';

function WelcomePage() {
    const navigate = useNavigate();
    const { pos } = userContext();

    const to_schools = () => { navigate('/schools') }

    return (<Center w={'100%'} h={'100dvh'}
        paddingLeft={pos === 'left' ? { base: '2.5rem', sm: '2.5rem', md: '2.5rem', lg: '5rem' } : ''}
        paddingRight={pos === 'right' ? { base: '2.5rem', sm: '2.5rem', md: '2.5rem', lg: '5rem' } : ''}
        paddingTop={!pos || pos === 'top' ? { base: '2.5rem', sm: '2.5rem', md: '2.5rem', lg: '5rem' } : ''}
        paddingBottom={pos === 'bottom' ? { base: '2.5rem', sm: '2.5rem', md: '2.5rem', lg: '5rem' } : ''}
        onClick={to_schools}
        bg={'transparent'}
        position={'relative'}>

        <Image w={'50%'} h={'100%'} objectFit={'contain'} src={WelcomeImage} alt="welcome-image" />
        <AINote type={'main'} />

    </Center>)
}

export default WelcomePage