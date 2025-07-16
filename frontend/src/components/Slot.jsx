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

    return (<Flex w={'full'}
        flexDirection={dir ? dir : 'row'}
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
            justifyContent={'end'}>
            <Text textAlign={'right'}
                color={{ _light: '#1D282E', _dark: '#EEF6F9' }}
                background={disableDark === true ? '' : { _dark: '#1D282E/65' }}
                rounded={disableDark === true ? '' : { _dark: 'sm' }}
            >{category}</Text>
        </Flex>

    </Flex>)
}

export default Slot