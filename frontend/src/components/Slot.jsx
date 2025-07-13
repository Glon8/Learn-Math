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

function Slot({ placeholder, value, getValue, category, edit, color, dir, auto }) {
    const [useValue, setValue] = useState(value ? value : '');

    useEffect(() => {
        setValue(value)
    }, [value]);

    return (<Flex w={'full'}
        flexDirection={dir ? dir : 'row'}
        justify={'space-between'}>

        <Input width={auto ? '7rem' : '15rem'}
            value={useValue}
            placeholder={placeholder ? placeholder : ''}
            disabled={edit ? false : true}
            color={color ? color : ({ _light: '#1D282E', _dark: 'white' })}
            maxLength={16}
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
            _light={{
                backgroundColor: 'white',
            }}
            _dark={{

            }}
        />
        <Text w={auto ? 'full' : '7rem'}
            textAlign={'right'}
            color={{ _light: '#1D282E', _dark: 'white' }}
        >{category}</Text>

    </Flex>)
}

export default Slot