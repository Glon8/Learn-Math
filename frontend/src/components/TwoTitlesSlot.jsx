import { Flex, Text } from "@chakra-ui/react"
import "primeicons/primeicons.css";

function TwoTitlesSlot({ title_info, boldness }) {
    return (<Flex width={'1xs'}
        flexDirection={'row'}
        justify={'space-between'}
        color={{_light: '#1D282E', _dark: 'white'}}
    >

        {
            Object.entries(title_info).map((info) => {
                return (<Flex key={info[0]} width={'1xs'} flexDirection={'row'} alignItems={'center'} gapX={2}>

                    {
                        info[1].pi_icon ? <i className={`pi ${info[1].pi_icon}`} /> : null
                    }
                    <Text fontWeight={`${boldness ? boldness : 'medium'}`} fontSize={'lg'} textAlign={'center'}>{info[1].title}</Text>

                </Flex>)
            })
        }

    </Flex>)
}

export default TwoTitlesSlot