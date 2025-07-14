import { Flex, Text, Button } from "@chakra-ui/react"
import "primeicons/primeicons.css";

/*
  <TopicBut display={false}
   pi_icon={'pi-cog'}
   title={'THIS IS A CRAZY TITLE!'}
   onClick={() => {}}
   subTitle={'THIS IS AWSOME SUBTITLE!'}
   align={false}
   justify={false}
   dir={false}
   />
*/

function TopicBut({ dir, display, pi_icon, title, onClick, subTitle, align, justify }) {
    return (<Flex display={display ? 'none' : 'flex'}
        w={'full'}
        flexDirection={dir ? dir : "row"}
        alignItems={align ? align : 'center'}
        justify={justify ? justify : 'space-between'}
    >

        <Button minW={'14.5rem'}
            focusRing={'inside'}
            w={{ base: 'full', sm: 'full', md: 'fit', lg: 'fit', xl: 'fit' }}
            onClick={onClick}
            _light={{
                backgroundColor: 'white',
                borderColor: '#B1B7BA/20',
                focusRingColor: '#B1B7BA',
                color: '#1D282E'
            }}
            _dark={{
                background: "#1D282E",
                borderColor: "#1D282E",
                focusRingColor: '#B1B7BA',
                color: '#EEF6F9'
            }}
        >

            <Flex width={'full'}
                alignItems={'center'}
                gap={3}>
                <Flex display={pi_icon ? 'flex' : 'none'}><i className={`pi ${pi_icon ? pi_icon : ''}`} /></Flex>
                {title}
            </Flex>

        </Button>
        <Flex display={subTitle ? 'flex' : 'none'}
            color={{ _light: '#1D282E', _dark: '#EEF6F9' }}>
            <Text>{subTitle}</Text>
        </Flex>

    </Flex>)
}

export default TopicBut