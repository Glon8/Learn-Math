import { Button, Flex, Text } from "@chakra-ui/react"
import "primeicons/primeicons.css";

import Tool from "./Tooltip";

function NavBut({ display, pi_icon, title, navShort, navSide, onClick }) {
    return (<Flex display={display ? 'none' : 'flex'}
        justifyContent={'center'}
        maxW={'20rem'}
        marginStart={navShort ? (navSide === 'left' ? 2 : 0) :
            (navSide === 'left' ? 24 : 0)}
        marginEnd={navShort ? (navSide === 'right' ? 2 : 0) :
            (navSide === 'right' ? 24 : 0)}
        marginTop={navShort ? (navSide === 'top' ? 2 : 0) : 0}
        marginBottom={navShort ? (navSide === 'bottom' ? 2 : 0) : 0}
    >

        <Tool title={title}
            disabled={navShort}
            navSide={navSide}
            value={
                <Button focusRing={'inside'}
                    onClick={onClick}
                    width={navShort ? 'auto' :
                        (navSide === 'right' || navSide === 'left' ? '9rem' : 'auto')}
                    background="#1D282E"
                    borderColor="#1D282E"
                    focusRingColor='#B1B7BA'>

                    <Flex flexDirection={'row'}
                        gap={3}
                        color='#EEF6F9'>
                        <i className={`pi ${pi_icon ? pi_icon : ''}`} />
                        {
                            navShort ? null :
                                (<Text textAlign={'center'}>{title}</Text>)
                        }
                    </Flex>

                </Button>
            } />

    </Flex >)
}

export default NavBut