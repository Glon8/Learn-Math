import { Flex, Text } from "@chakra-ui/react"
import "primeicons/primeicons.css";

function TwoTitlesSlot({ width, title_info, boldness, disableDark, color, fontSize }) {
    return (<Flex width={width ?? '1xs'}
        paddingX={3}
        flexDirection={'row'}
        justify={'space-between'}
        color={{ _light: '#1D282E', _dark: '#EEF6F9' }}
        background={disableDark === true ? '' : { _dark: '#1D282E/65' }}
        rounded={{ _dark: 'sm' }}
        boxShadow={disableDark === true ? '' : { _dark: '0 0 5px 2px black' }}
    >

        {
            Object.entries(title_info).map((info) => {
                return (<Flex key={info[0]} width={'1xs'} flexDirection={'row'} alignItems={'center'} gapX={3}>

                    {
                        info[1].pi_icon ? <i className={`pi ${info[1].pi_icon}`} style={{ color: color, fontSize: fontSize }} /> : null
                    }
                    <Text fontWeight={`${boldness ? boldness : 'medium'}`} fontSize={'lg'} textAlign={'center'}>{info[1].title}</Text>

                </Flex>)
            })
        }

    </Flex>)
}

export default TwoTitlesSlot