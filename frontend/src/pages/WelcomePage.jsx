import { Flex, Image } from "@chakra-ui/react"
import { useNavigate } from 'react-router-dom'
import { userContext } from "../components/UserContext";

function WelcomePage() {
    const navigate = useNavigate();
    const { pos } = userContext();

    const to_schools = () => { navigate('/schools') }

    return (<Flex w={'100vw'} h={'100vh'}
        justifyContent={'center'}
        alignItems={'center'}
        paddingLeft={pos === 'left' ? '5rem' : ''}
        paddingRight={pos === 'right' ? '5rem' : ''}
        paddingTop={pos === 'top' ? '5rem' : ''}
        paddingBottom={pos === 'bottom' ? '5rem' : ''}
        onClick={null}
        flexDirection={'column'}>

        <Image src="" alt="welcome-image" />

    </Flex>)
}

export default WelcomePage