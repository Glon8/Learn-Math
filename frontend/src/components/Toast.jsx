import { Separator, Flex, Text } from "@chakra-ui/react"
import "primeicons/primeicons.css";

// <Toast hidden={false} pi_icon={'pi-info-circle'} title={'Toast title'} desc={'Toast description'} />

function Toast({ hidden, pi_icon, title, desc, color }) {
    return (<Flex
        minW={'15rem'}
        maxW={'25rem'}
        h={'auto'}
        maxH={'10rem'}
        display={hidden ? 'none' : 'flex'}
        border
        borderWidth={1}
        borderColor={'black'}
        zIndex={5}
        flexDirection={'column'}
        bg={'white'}
        rounded={"xl"}
        padding={3}>

        {
            pi_icon || title ? (
                <Flex width={'1xs'} flexDirection={'row'} alignItems={'center'} gapX={2}>

                    {
                        // another style option for the icon => style={{color: (color? color : '')}}
                        pi_icon ? <i className={`pi ${pi_icon}`} /> : null
                    }
                    <Text color={color ? color : ''} fontWeight={'medium'} fontSize={'lg'} textAlign={'center'}>{title}</Text>

                </Flex>) : null
        }
        {
            pi_icon || title ? (<Separator />) : null
        }
        <Text marginTop={1}>{desc ? desc : ''}</Text>

    </Flex>)
}

export default Toast