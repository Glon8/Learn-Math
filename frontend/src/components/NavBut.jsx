import { Button, Flex, Text } from "@chakra-ui/react"
import "primeicons/primeicons.css";

import OnHoverTag from "./OnHoverTag.jsx";

/*
   <NavBut
    title={'title}
    pi_icon={'pi-cog'}
    navShort={navShort}
    hoverTrig={some boolean}
    navSide={navSide}
    stichh={(stat) => something(stat)}
    onClick={something} />
*/

function NavBut({ display, pi_icon, title, navShort, hoverTrig, navSide, stichh, onClick }) {
    return (<Flex display={display ? 'none' : 'flex'}
        position={"relative"}
        justifyContent={'center'}
        maxW={'20rem'}
        marginStart={navShort ? 0 : (navSide === 'left' ? 24 : 0)}
        marginEnd={navShort ? 0 : (navSide === 'right' ? 24 : 0)}>

        <Button backgroundColor={'black'} onClick={() => onClick()}
            onMouseOver={() => {
                navShort ?
                    stichh(true) : null
            }}
            onMouseLeave={() => {
                navShort ?
                    stichh(false) : null
            }}
            width={navShort ? 'auto' : (navSide === 'right' || navSide === 'left' ? '9rem' : 'auto')} >

            <Flex flexDirection={'row'} gap={3}>
                <i className={`pi ${pi_icon ? pi_icon : ''}`} />
                {
                    navShort ? null :
                        (<Text textAlign={'center'}>{title}</Text>)
                }
            </Flex>

        </Button>

        <OnHoverTag value={title}
            display={hoverTrig ? 'flex' : 'none'}
            top={12}
            bottom={12}
            right={16}
            left={16}
            navSide={navSide} />

    </Flex>)
}

export default NavBut