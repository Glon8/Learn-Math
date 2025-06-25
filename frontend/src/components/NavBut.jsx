import { Button, Flex, Text } from "@chakra-ui/react"
import "primeicons/primeicons.css";

import Tool from "./Tooltip";

/*
   <NavBut
    title={'title}
    pi_icon={'pi-cog'}
    navShort={navShort}
    navSide={navSide}
    onClick={something} />
*/

function NavBut({ display, pi_icon, title, navShort, navSide, onClick }) {
    return (<Flex display={display ? 'none' : 'flex'}
        justifyContent={'center'}
        maxW={'20rem'}
        marginStart={navShort ? 0 : (navSide === 'left' ? 24 : 0)}
        marginEnd={navShort ? 0 : (navSide === 'right' ? 24 : 0)}>

        <Tool title={title}
            disabled={navShort}
            navSide={navSide}
            value={
                <Button backgroundColor={'black'}
                    onClick={onClick}
                    width={navShort ? 'auto' :
                        (navSide === 'right' || navSide === 'left' ? '9rem' : 'auto')} >

                    <Flex flexDirection={'row'} gap={3}>
                        <i className={`pi ${pi_icon ? pi_icon : ''}`} />
                        {
                            navShort ? null :
                                (<Text textAlign={'center'}>{title}</Text>)
                        }
                    </Flex>

                </Button>
            } />

    </Flex>)
}

export default NavBut