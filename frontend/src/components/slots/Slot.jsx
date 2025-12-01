import { Text, Flex, Input, Button } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import "primeicons/primeicons.css";

function Slot({ placeholder, value, getValue, category, edit, color, dir, input_width, label_width, disableDark, maxLength, visible, type = 'text', defRev }) {
    const [useValue, setValue] = useState(value ?? '');
    const [useVisible, setVisible] = useState(visible || type === 'text' ? true : false);

    useEffect(() => {
        setValue(value);
    }, [value]);

    return (<Flex w={'100%'}
        minH={'2rem'}
        flexDirection={dir ?? 'row'}
        alignItems={'center'}
        justify={'space-between'}>

        <Flex position={'relative'}
            w={input_width ?? (!!defRev ? '33%' : '66%')}>

            <Input type={useVisible ? 'text' : (type ?? "password")}
                value={useValue}
                placeholder={placeholder ?? ''}
                disabled={edit ? false : true}
                fontWeight={{ _dark: 'bold' }}
                color={color ?? ({ _light: '#1D282E', _dark: '#EEF6F9' })}
                maxLength={maxLength ?? 16}
                borderWidth={!!edit ? 1 : 0}
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
            {
                type === 'password' && (
                    <Button display={edit ? '' : 'none'}
                        position={'absolute'}
                        rounded={'md'}
                        right={'0'}
                        bg={'transparent'}
                        onClick={() => setVisible(!useVisible)}
                        color={{ _light: '#B1B7BA/40', _dark: '#EEF6F9' }}
                    > <i className="pi pi-eye" /> </Button>
                )
            }
        </Flex>
        <Flex w={label_width ?? (!!defRev ? '66%' : '33%')}
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