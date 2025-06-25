import { Flex, useBreakpointValue } from "@chakra-ui/react"
import "primeicons/primeicons.css";
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react";

import NavMenu from './NavMenu.jsx'
import NavBut from "./NavBut.jsx";
import SignForm from './SignForm.jsx'

function NavBar() {
    const navigate = useNavigate();

    const user = false

    /*const user = {
        _id: 1110,
        status: 0,
        shared: false,
        name: 'Ruslan',
        email: null,
        password: null,
        secret: null,
        answer: null,
        language: 'english',
        navPosition: 'left'
    };*/

    const navShort = useBreakpointValue({ sm: true, md: true, lg: false, xl: false });
    const [navSide, setNavSide] = useState(user ? user.navPosition : 'top');
    const [useSignUp, setSignUp] = useState(false);
    const [useSignIn, setSignIn] = useState(false);

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

    useEffect(() => {
        user.navPosition ? setNavSide(user.navPosition) : setNavSide('top');
    }, [user.navPosition]);

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

    return (<Flex w={'100vw'}
        h={'100vh'}
        position={'absolute'}
    >

        <Flex border
            borderStartWidth={navSide === 'right' ? 2 : 0}
            borderEndWidth={navSide === 'left' ? 2 : 0}
            borderTopWidth={navSide === 'bottom' ? 2 : 0}
            borderBottomWidth={navSide === 'top' ? 2 : 0}
            borderColor={'blackAlpha.500'}
            position={'fixed'}
            width={navSide === 'top' || navSide === 'bottom' ? '100%' : 20}
            height={navSide === 'top' || navSide === 'bottom' ? 20 : '100%'}
            padding={3}
            flexDir={navSide === 'top' || navSide === 'bottom' ? 'row' : 'column-reverse'}
            right={navSide === 'right' ? 0 : 'auto'}
            left={navSide === 'left' ? 0 : "auto"}
            top={navSide === 'top' ? 0 : 'auto'}
            bottom={navSide === 'bottom' ? 0 : 'auto'}
            justify={'space-between'}
            backgroundColor={'rgb(166, 166, 166)'}
            zIndex={5}
        >
            <Flex flexDirection={'row'}
                justifyContent={'center'}
                alignItems={'center'}
                gap={3}>

                <NavBut title={'Learn Math'}
                    pi_icon={'pi-sparkles'}
                    navShort={navShort}
                    navSide={navSide}
                    onClick={to_main} />

            </Flex>
            <Flex flexDirection={navSide === 'top' || navSide === 'bottom' ? 'row' : 'column-reverse'}
                alignItems={'center'}
                gap={navShort ? 0.5 : 3}>
                {
                    navButList.map((butt, index) => {
                        return (<NavBut key={index}
                            title={butt.title}
                            pi_icon={butt.pi_icon}
                            navShort={navShort}
                            navSide={navSide}
                            onClick={butt.onClick} />)
                    })
                }
                <NavMenu title={'Menu'}
                    pi_icon={'pi-align-justify'}
                    navShort={navShort}
                    navPosition={(side) => setNavSide(side)}
                    user={user}
                    signInForm={() => {
                        setSignUp(false)
                        setSignIn(!useSignIn)
                    }}
                    signUpForm={() => {
                        setSignUp(!useSignUp)
                        setSignIn(false)
                    }} />

            </Flex>

        </Flex >
        <SignForm isIn={useSignIn}
            isUp={useSignUp}
            close={() => {
                setSignIn(false);
                setSignUp(false);
            }}
            callToast={(title, desc, color) => {
                callToast(title, desc, color)
            }} />

    </Flex>)
}

export default NavBar