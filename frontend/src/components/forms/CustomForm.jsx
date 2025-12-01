import { Flex, Separator, Text, Button } from "@chakra-ui/react"
import "primeicons/primeicons.css";
import { useState } from "react";

import { languageContext } from "../../context/LanguagesContext.jsx";

import CustomFormInput from "../CustomFormInput.jsx";
import CustomFormTiles from "../tabs/CustomFormTiles.jsx";
import CustomFormDesc from "../tabs/CustomFormDesc.jsx";

function CustomForm() {
    const { language, defPack } = languageContext();
    const [useClear, setClear] = useState(false);

    const colors = [
        '#BD613C',
        '#778D45',
        '#217074'
    ];

    const offsets = [1, 2, 3, 4];

    return (<Flex alignItems={'center'}
        w={'100%'}
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
            paddingX={3}>{language?.statics?.customForm?.title ?? defPack.statics.customForm.title}</Text>
        <Flex flexDir={'row-reverse'} justifyContent={'center'} gap={0.5}>

            <CustomFormTiles color={'#217074'}
                borderColor={'#217074'}>{language?.statics?.customForm?.ones ?? defPack.statics.customForm.ones}</CustomFormTiles>
            <CustomFormTiles color={'#778D45'}
                borderColor={'#778D45'}>{language?.statics?.customForm?.tens ?? defPack.statics.customForm.tens}</CustomFormTiles>
            <CustomFormTiles color={'#BD613C'}
                borderColor={'#BD613C'}>{language?.statics?.customForm?.hund ?? defPack.statics.customForm.hund}</CustomFormTiles>
            <CustomFormTiles color={'#BBC6C8'}
                borderColor={'#BBC6C8'}>{language?.statics?.customForm?.sign ?? defPack.statics.customForm.sign}</CustomFormTiles>

        </Flex>

        <Flex gapX={'3'}>

            <Flex justifyContent={'center'} alignItems={'center'}>
                <CustomFormInput key={0} color={'#BBC6C8'} clear={useClear} holder={'#'} />
            </Flex>
            <Flex flexDir={'column'} gapY={1}>
                {
                    offsets.map((offset, xind) => {
                        return (
                            <>
                                <Flex key={offset + (2 + xind ^ 2)} flexDir={'row'} gapX={0.5} alignItems={xind === 1 ? 'start' : ''}>
                                    {
                                        colors.map((thing, ind) => {
                                            return <CustomFormInput key={(ind + offset)} color={thing ?? ''} clear={useClear} />
                                        })
                                    }
                                </Flex>
                                {(xind === 0 || xind === 2) && < Separator size={'lg'}/>}
                            </>)
                    })
                }
            </Flex>
            <Flex flexDir={'column'} textAlign={'center'}>

                <CustomFormDesc title={language?.statics?.customForm?.rem ?? defPack.statics.customForm.rem} />
                <Separator marginY={{ base: 3, sm: 4 }} />
                <CustomFormDesc title={language?.statics?.customForm?.fstNum ?? defPack.statics.customForm.fstNum} marginBottom={4} />
                <CustomFormDesc title={language?.statics?.customForm?.secNum ?? defPack.statics.customForm.secNum} />
                <Separator marginY={{ base: 3, sm: 4 }} />
                <CustomFormDesc title={language?.statics?.customForm?.res ?? defPack.statics.customForm.res} />

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
            }}>{language?.statics?.customForm?.but ?? defPack.statics.customForm.but}</Button>

    </Flex >);
}

export default CustomForm