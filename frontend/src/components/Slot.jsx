import { Text, Flex, Input } from "@chakra-ui/react"
import { useEffect, useState } from "react";

function Slot({ placeholder, value, getValue, category, edit, color, dir, auto }) {
    const [useValue, setValue] = useState(value ? value : '');

    useEffect(() => {
        setValue(value)
    },[value]);

    /*
    <Slot placeholder={'optional titles'}
     value={'any title'}
     category={'title'}
     auto={true}
     getValue((value) => {console.log(value)})
     />
    */

    return (<Flex w={'1xs'}
        flexDirection={dir ? dir : 'row'}
        justify={'space-between'}>
            
        <Input width={auto ? 'fit' : '15rem'}
            value={useValue}
            placeholder={placeholder ? placeholder : ''}
            disabled={edit ? false : true}
            color={color ? color : ''}
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
        />
        <Text
            w={auto ? 'full' :'7rem'}
            textAlign={'right'}>{category}</Text>

    </Flex>)
}

export default Slot