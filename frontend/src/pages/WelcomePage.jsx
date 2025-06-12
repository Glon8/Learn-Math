import { Box, Image } from "@chakra-ui/react"
import { useNavigate } from 'react-router-dom'

function WelcomePage() {
    const navigate = useNavigate();

    const to_schools = () => { navigate('/schools') }

    return (<Box h={'100vh'}
        onClick={to_schools}
        justifyItems={'center'}
        paddingX={'10%'}
        paddingY={'10%'}>

        <Image src="" alt="welcome-image" />

    </Box>)
}

export default WelcomePage