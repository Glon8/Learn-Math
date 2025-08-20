import { Text, Flex, Input } from "@chakra-ui/react"
import { useEffect, useState } from "react";

/*
<Slot placeholder={'optional titles'}
 value={'any title'}
 category={'title'}
 auto={true}
 getValue((value) => {console.log(value)})
 />
*/

function Slot({ placeholder, value, getValue, category, edit, color, dir, auto, disableDark, maxLength }) {
    const [useValue, setValue] = useState(value ? value : '');

    useEffect(() => {
        setValue(value);
    }, [value]);

    return (<Flex w={'100%'}
        h={'2rem'}
        minW={'17rem'}
        flexDirection={dir ? dir : 'row'}
        alignItems={'center'}
        justify={'space-between'}>

        <Input width={auto ? '7rem' : '15rem'}
            value={useValue}
            placeholder={placeholder ? placeholder : ''}
            disabled={edit ? false : true}
            fontWeight={{ _dark: 'bold' }}
            color={color ? color : ({ _light: '#1D282E', _dark: '#EEF6F9' })}
            maxLength={maxLength ? maxLength : 16}
            borderWidth={edit === true ? 1 : 0}
            textAlign={edit ? 'center' : ''}
            fontSize={'xl'}
            padding={0}
            rounded={'md'}
            onChange={(el) => {
                const value = el.target.value;

                setValue(value);
                getValue ? getValue(value) : null;
            }}
            opacity={!edit && useValue ? 1 : ''}
            paddingStart={edit ? 0 : 1}
            backgroundColor={{ _light: 'white', _dark: '#1D282E', _disabled: 'transparent' }}
        />
        <Flex w={auto ? 'full' : '7rem'}
            justifyContent={'end'}
            paddingX={3}
            paddingY={2}
            alignItems={'center'}
            boxShadow={'sm'}
            rounded={'sm'}
            color={{ _light: '#1D282E', _dark: '#EEF6F9' }}
            background={disableDark === true ? '' : { _dark: '#1D282E/65' }}>
            <Text textAlign={'right'}
            >{category}</Text>
        </Flex>

    </Flex>)
}

export default Slot