import { Flex, useBreakpointValue } from "@chakra-ui/react"
import "primeicons/primeicons.css";
import { useNavigate } from 'react-router-dom'

import { userContext } from "./UserContext.jsx";

import NavMenu from './NavMenu.jsx';
import NavBut from "./NavBut.jsx";

function NavBar() {
    const navigate = useNavigate();

    const { pos } = userContext();

    const navShort = useBreakpointValue({ base: true, sm: true, md: true, lg: false, xl: false });

    const to_main = () => { navigate('/'); }
    const to_profile = () => { navigate('/profile') }
    const to_top_scores = () => { navigate('/top-scores') }
    const to_hints = () => { navigate('/hints') }
    const to_schools = () => { navigate('/schools') }

    const navButList = [
        {
            title: 'Hints',
            pi_icon: 'pi-question',
            onClick: to_hints,
        },
        {
            title: 'Top Scores',
            pi_icon: 'pi-crown',
            onClick: to_top_scores,
        },
        {
            title: 'Profile',
            pi_icon: 'pi-id-card',
            onClick: to_profile,
        },
        {
            title: 'Schools',
            pi_icon: 'pi-list-check',
            onClick: to_schools,
        },
    ];

    /*
    import { toaster } from "./ui/toaster.jsx";

                <Button bg={'black'}
                    onClick={() => toaster.create({
                        title: "Saved!",
                        description: "Your file was successfully saved.",
                        type: "success",
                        closable: true,
                        duration: 5000,
                    })}>Toaster</Button>
    */

    return (<Flex border
        borderStartWidth={pos === 'right' ? 2 : 0}
        borderEndWidth={pos === 'left' ? 2 : 0}
        borderTopWidth={pos === 'bottom' ? 2 : 0}
        borderBottomWidth={pos === 'top' ? 2 : 0}
        borderColor={'blackAlpha.500'}
        position={'fixed'}
        width={pos === 'top' || pos === 'bottom' ? '100%' : 20}
        height={pos === 'top' || pos === 'bottom' ? 20 : '100%'}
        padding={3}
        flexDir={pos === 'top' || pos === 'bottom' ? 'row' : 'column-reverse'}
        right={pos === 'right' ? 0 : 'auto'}
        left={pos === 'left' ? 0 : "auto"}
        top={pos === 'top' ? 0 : 'auto'}
        bottom={pos === 'bottom' ? 0 : 'auto'}
        justify={'space-between'}
        backgroundColor={'rgb(166, 166, 166)'}
        zIndex={5}
        _light={{
            background: '#A0835C',
            borderColor: '#1D282E'
        }}
        _dark={{
        }}
    >
        <Flex flexDirection={'row'}
            justifyContent={'center'}
            alignItems={'center'}
            gap={3}>

            <NavBut title={'Learn Math'}
                pi_icon={'pi-sparkles'}
                navShort={navShort}
                navSide={pos}
                onClick={to_main} />

        </Flex>
        <Flex flexDirection={pos === 'top' || pos === 'bottom' ? 'row' : 'column-reverse'}
            alignItems={'center'}
            gap={navShort ? 0.5 : 3}>
            {
                navButList.map((butt, index) => {
                    return (<NavBut key={index}
                        title={butt.title}
                        pi_icon={butt.pi_icon}
                        navShort={navShort}
                        navSide={pos}
                        onClick={butt.onClick} />)
                })
            }
            <Flex marginStart={navShort ? 0 : (pos === 'left' ? 24 : 0)}
                marginEnd={navShort ? 0 : (pos === 'right' ? 24 : 0)}
                w={navShort ? 'auto' :
                    (pos === 'right' || pos === 'left' ? '9rem' : 'auto')}
                maxW={'20rem'}>
                <NavMenu title={'Menu'}
                    pi_icon={'pi-align-justify'}
                    navShort={navShort}
                />
            </Flex>

        </Flex>

    </Flex >)
}

export default NavBar