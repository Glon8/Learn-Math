import { Flex, Image } from "@chakra-ui/react"
import { useNavigate } from 'react-router-dom'

import NavMenu from "../components/NavMenu";

function WelcomePage() {
    const navigate = useNavigate();

    const to_schools = () => { navigate('/schools') }

    return (<Flex w={'100vw'}
        h={'100vh'}
        justifyContent={'center'}
        paddingX={'20%'}
        paddingY={'10%'}
        onClick={null}
        flexDirection={'column'}>

        <Image src="" alt="welcome-image" />

    </Flex>)
}

export default WelcomePage