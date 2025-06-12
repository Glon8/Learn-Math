import { Flex, Text } from "@chakra-ui/react"
import "primeicons/primeicons.css";

// < <OnHoverTag value={'test'} display={''} navSidenavSide={'top'} top={0} bottom={0} right={0} left={0} />

function OnHoverTag({ value, display, navSide, top, bottom, right, left }) {
    return (<Flex position={"absolute"}
        display={display ? display : 'flex'}
        bg={'white'}
        zIndex={20}
        rounded={'md'}
        width={'6rem'}
        height={'3rem'}
        border
        borderColor={'black'}
        borderWidth={1}
        justifyContent={'center'}
        align={'center'}
        right={
            navSide === 'right' ?  right  : 'auto'
        }
        left={
            navSide === 'left' ? left : 'auto'
        }
        top={
            navSide === 'top' ? top : 'auto'
        }
        bottom={
            navSide === 'bottom' ? bottom : 'auto'
        }>
        <Text fontWeight={'medium'}>{value}</Text>
    </Flex>)
}

export default OnHoverTag