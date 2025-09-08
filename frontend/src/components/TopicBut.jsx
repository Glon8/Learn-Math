import { Flex, Text, Button } from "@chakra-ui/react"
import "primeicons/primeicons.css";
import { userContext } from "../context/UserContext";

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
    const { lang } = userContext();

    return (<Flex display={display ? 'none' : 'flex'}
        w={'full'}
        flexDirection={dir ? dir : "row"}
        alignItems={align ? align : 'center'}
        justify={justify ? justify : 'space-between'}
        gapX={3}
        gapY={dir ? 1 : ''}
    >

        <Button minW={'14.5rem'}
            focusRing={'inside'}
            w={{ base: 'full', sm: 'full', md: 'fit', lg: 'fit', xl: 'fit' }}
            onClick={onClick}
            _light={{
                backgroundColor: '#8b8da0/20',
                borderColor: '#B1B7BA/10',
                focusRingColor: '#B1B7BA',
                color: '#1D282E/90'
            }}
            _dark={{
                background: "#1D282E",
                borderColor: "#1D282E",
                focusRingColor: '#B1B7BA',
                color: '#EEF6F9'
            }}
        >

            <Flex width={'full'}
                maxW={'12.5rem'}
                alignItems={'center'}
                gap={3}
                overflow={'hidden'}>
                <Flex display={pi_icon ? 'flex' : 'none'}><i className={`pi ${pi_icon ? pi_icon : ''}`} /></Flex>
                {title}
            </Flex>

        </Button>
        <Flex display={subTitle ? 'flex' : 'none'}
            paddingX={3}
            paddingY={1}
            color={{ _light: '#1D282E', _dark: '#EEF6F9' }}
            background={{ _dark: '#464547' }}
            rounded={'sm'}
            w={'full'}
            justifyContent={dir === 'row-reverse' && lang != 'he' ? null : 'right'}
            overflow={'hidden'}
            boxShadow={'sm'}
        >
            <Text direction={lang == 'he' ? 'rtl' : 'ltr'}>{subTitle}</Text>
        </Flex>

    </Flex>)
}

export default TopicBut