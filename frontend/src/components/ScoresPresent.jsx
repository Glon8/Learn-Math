import { Flex, Separator, Text } from "@chakra-ui/react"

export default function ScoresPresent({ score, title, width, color }) {
    return (<Flex w={width ?? '10rem'}
        flexDir={'column'}
        border
        _light={{
            color: '#1D282E',
            boxShadow: "md",
            borderWidth: 1,
            borderColor: '#1D282E/20'
        }}
        _dark={{
            color: '#EEF6F9',
            boxShadow: '0 0 5px 2px black'
        }}
        rounded={'xl'}>

        <Flex paddingX={3}
            paddingTop={1}
            roundedTop={'xl'}
            justifyContent={'center'}
            _dark={{
                background: '#1D282E/65',
            }}>
            <Text textAlign={'center'}
                fontWeight={'medium'}
                fontSize={'xl'}>{title ?? 'Title'}</Text>
        </Flex>
        <Separator _light={{
            marginTop: 1,
            marginBottom: 3
        }} />
        <Flex paddingX={3}
            paddingBottom={1}
            roundedBottom={'xl'}
            justifyContent={'center'}
            _dark={{ background: '#464547' }}>
            <Text textAlign={'center'}
                fontWeight={'bold'}
                fontSize={'lg'}
                color={color ?? ''}>{score != null ? score : 'Score'}</Text>
        </Flex>

    </ Flex >)
}
