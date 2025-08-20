import { Text, Flex, Input, Button } from "@chakra-ui/react"
import "primeicons/primeicons.css";
import { useEffect } from "react";
import { useState } from "react";

function PassSlot({ placeholder, value, visible, getValue, edit, category, dir, auto, disableDark, maxLength }) {
    const [useValue, setValue] = useState(value ? ' ' + value : '');
    const [useVisible, setVisible] = useState(visible ? true : false);

    useEffect(() => {
        setValue(value);
    }, [value]);

    return (<Flex width={'full'}
        flexDirection={dir ? dir : 'row'}
        justify={'space-between'}>

        <Flex position={'relative'}
            w={auto ? 'auto' : '15rem'}>

            <Input type={useVisible ? 'text' : "password"}
                placeholder={placeholder ? placeholder : ''}
                disabled={edit ? false : true}
                value={useValue}
                maxLength={maxLength ? maxLength : 16}
                borderWidth={edit === true ? 1 : 0}
                textAlign={edit ? 'center' : ''}
                fontSize={'xl'}
                padding={0}
                rounded={'md'}
                fontWeight={{ _dark: 'bold' }}
                onChange={(el) => {
                    const value = el.target.value;

                    setValue(value);
                    getValue ? getValue(value) : null;
                }}
                paddingStart={edit ? 0 : 1}
                color={{ _light: '#1D282E', _dark: '#EEF6F9' }}
                backgroundColor={{ _light: 'white', _dark: '#1D282E', _disabled: 'transparent' }}
            />
            <Button display={edit ? '' : 'none'}
                position={'absolute'}
                rounded={'md'}
                right={'0'}
                bg={'transparent'}
                onClick={() => setVisible(!useVisible)}
                color={{ _light: '#B1B7BA/40', _dark: '#EEF6F9' }}
            >
                <i className="pi pi-eye" />
            </Button>
        </Flex>
        <Flex w={auto ? 'auto' : '7rem'}
            justifyContent={'end'}
            paddingX={3}
            rounded={disableDark === true ? '' : { _dark: 'sm' }}
            color={{ _light: '#1D282E', _dark: '#EEF6F9' }}
            background={disableDark === true ? '' : { _dark: '#1D282E/65' }}
            boxShadow={'sm'}>
            <Text textAlign={'right'}
            >{category}</Text>
        </Flex>

    </Flex>)
}

export default PassSlot