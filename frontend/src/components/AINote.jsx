import { Flex, Text } from "@chakra-ui/react";

import { userContext } from "../components/UserContext";

function AINote() {
    const { pos } = userContext();
    
    return (<Flex position={'fixed'}
        left={pos === 'top' ||
            pos === 'bottom' ||
            pos === 'right' ? 5 : ''}
        bottom={pos === 'top' ||
            pos === 'left' ||
            pos === 'right' ? 5 : ''}
        right={pos === 'left' ? 5 : ''}
        top={pos === 'bottom' ? 5 : ''}
        padding={2}
        rounded={'xl'}
        border
        borderWidth={1}
        _light={{
            color: '#1D282E/50',
            backgroundColor: '#EEF6F9/60',
            borderColor: '#B1B7BA/60'
        }}
        _dark={{
            color: '#1D282E/50',
            backgroundColor: '#EEF6F9/60',
            borderColor: '#1D282E/60'
        }}>
        <Text fontWeight={'bold'}>Some images were created by AI</Text>
    </Flex>)
}

export default AINote