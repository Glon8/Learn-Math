import { Flex, Separator, Text, Button } from "@chakra-ui/react"
import "primeicons/primeicons.css";
import { useState } from "react";

import { languageContext } from "../context/LanguagesContext.jsx";

import CustomFormInput from "./CustomFormInput.jsx";

function CustomForm() {
    const { language } = languageContext();
    const [useClear, setClear] = useState(false);

    const colors = [
        '#BD613C',
        '#778D45',
        '#217074'
    ];

    return (<Flex alignItems={'center'}
        boxShadow={'sm'}
        rounded={'sm'}
        paddingX={3}
        paddingY={5}
        flexDir={'column'}
        gapY={2}>

        <Text w={'full'}
            color={{ _light: '#1D282E/90', _dark: '#EEF6F9' }}
            fontWeight={'medium'}
            textAlign={'left'}
            background={{ _dark: '#1D282E/65' }}
            boxShadow={{ _dark: '0 0 5px 2px #EEF6F9' }}
            rounded={{ _dark: 'sm' }}
            paddingX={3}>{language?.statics?.customForm?.title ? language?.statics?.customForm?.title : 'Custom form: Try yourself!'}</Text>
        <Flex flexDir={'row-reverse'}
            justifyContent={'center'}
            gap={0.5}>
            <Text color={'#217074'}
                backgroundColor={{ _dark: '#1D282E/80' }}
                border
                borderColor={'#217074'}
                borderWidth={2}
                fontWeight={'bold'}
                padding={2}>{language?.statics?.customForm?.ones ? language?.statics?.customForm?.ones : 'ones'}</Text>
            <Text color={'#778D45'}
                backgroundColor={{ _dark: '#1D282E/80' }}
                border
                borderColor={'#778D45'}
                borderWidth={2}
                fontWeight={'bold'}
                padding={2}>{language?.statics?.customForm?.tens ? language?.statics?.customForm?.tens : 'tens'}</Text>
            <Text color={'#BD613C'}
                backgroundColor={{ _dark: '#1D282E/80' }}
                border
                borderColor={'#BD613C'}
                borderWidth={2}
                fontWeight={'bold'}
                padding={2}>{language?.statics?.customForm?.hund ? language?.statics?.customForm?.hund : 'hundreeds'}</Text>
            <Text color={'#BBC6C8'}
                backgroundColor={{ _dark: '#1D282E/80' }}
                border
                borderColor={'#BBC6C8'}
                borderWidth={2}
                fontWeight={'bold'}
                padding={2}>{language?.statics?.customForm?.sign ? language?.statics?.customForm?.sign : 'sign'}</Text>
        </Flex>

        <Flex gapX={'3'}>

            <Flex justifyContent={'center'}
                alignItems={'center'}>
                <CustomFormInput key={0} color={'#BBC6C8'} clear={useClear} holder={'#'} />
            </Flex>
            <Flex flexDir={'column'} gapY={1}>

                <Flex flexDir={'row'}
                    gapX={0.5}
                    alignItems={'start'}>
                    {
                        colors.map((thing, ind) => {
                            return <CustomFormInput key={(ind + 1)} color={thing} clear={useClear} />
                        })
                    }
                </Flex>
                <Separator size={'lg'} />
                <Flex flexDir={'row'} gapX={0.5}>
                    {
                        colors.map((thing, ind) => {
                            return <CustomFormInput key={(ind + 2)} color={thing} clear={useClear} />
                        })
                    }
                </Flex>
                <Flex flexDir={'row'} gapX={0.5}>
                    {
                        colors.map((thing, ind) => {
                            return <CustomFormInput key={(ind + 3)} color={thing} clear={useClear} />
                        })
                    }
                </Flex>
                <Separator size={'lg'} />
                <Flex flexDir={'row'} gapX={0.5}>
                    {
                        colors.map((thing, ind) => {
                            return <CustomFormInput key={(ind + 4)} color={thing} clear={useClear} />
                        })
                    }
                </Flex>

            </Flex>
            <Flex flexDir={'column'}
                textAlign={'center'}>

                <Text w={'full'}
                    minH={1}
                    color={{ _light: '#1D282E/90', _dark: '#EEF6F9' }}
                    fontWeight={'medium'}
                    textAlign={'left'}
                    background={{ _dark: '#1D282E/65' }}
                    boxShadow={{ _dark: '0 0 5px 2px #EEF6F9' }}
                    rounded={{ _dark: 'sm' }}
                    paddingX={3}>{language?.statics?.customForm?.rem ? language?.statics?.customForm?.rem : 'reminder'}</Text>
                <Separator marginY={{ base: 3, sm: 4 }} />
                <Text w={'full'}
                    minH={1}
                    color={{ _light: '#1D282E/90', _dark: '#EEF6F9' }}
                    fontWeight={'medium'}
                    textAlign={'left'}
                    background={{ _dark: '#1D282E/65' }}
                    boxShadow={{ _dark: '0 0 5px 2px #EEF6F9' }}
                    rounded={{ _dark: 'sm' }}
                    paddingX={3}
                    marginBottom={3}>{language?.statics?.customForm?.fstNum ? language?.statics?.customForm?.fstNum : 'first number'}</Text>
                <Text w={'full'}
                    minH={1}
                    color={{ _light: '#1D282E/90', _dark: '#EEF6F9' }}
                    fontWeight={'medium'}
                    textAlign={'left'}
                    background={{ _dark: '#1D282E/65' }}
                    boxShadow={{ _dark: '0 0 5px 2px #EEF6F9' }}
                    rounded={{ _dark: 'sm' }}
                    paddingX={3}>{language?.statics?.customForm?.secNum ? language?.statics?.customForm?.secNum : 'second number'}</Text>
                <Separator marginY={{ base: 3, sm: 4 }} />
                <Text w={'full'}
                    minH={1}
                    color={{ _light: '#1D282E/90', _dark: '#EEF6F9' }}
                    fontWeight={'medium'}
                    textAlign={'left'}
                    background={{ _dark: '#1D282E/65' }}
                    boxShadow={{ _dark: '0 0 5px 2px #EEF6F9' }}
                    rounded={{ _dark: 'sm' }}
                    paddingX={3}>{language?.statics?.customForm?.res ? language?.statics?.customForm?.res : 'result / answer'}</Text>

            </Flex>

        </Flex>
        <Button w={'full'}
            onClick={() => setClear(!useClear)}
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
            }}>{language?.statics?.customForm?.but ? language?.statics?.customForm?.but : 'Clear'}</Button>
    </Flex >);
}

export default CustomForm