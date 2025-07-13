import { Text, Flex, Input, Button } from "@chakra-ui/react"
import "primeicons/primeicons.css";
import { useState } from "react";

function PassSlot({ placeholder, value, visible, getValue, edit, category, dir, auto }) {
    const [useValue, setValue] = useState(value ? ' ' + value : '');
    const [useVisible, setVisible] = useState(visible ? true : false);

    return (<Flex width={'full'}
        flexDirection={dir ? dir : 'row'}
        justify={'space-between'}
        position={'relative'}>

        <Input w={auto ? 'auto' :'15rem'}
            type={useVisible ? 'text' : "password"}
            placeholder={placeholder ? placeholder : ''}
            disabled={edit ? false : true}
            value={useValue}
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
            paddingStart={edit ? 0 : 1}
            _light={{
                backgroundColor: 'white',
            }}
            _dark={{

            }}
        />
        <Button display={edit ? '' : 'none'}
            position={'absolute'}
            rounded={'md'}
            left={auto? '' : '11.5rem'}
            bg={'transparent'}
            onClick={() => setVisible(!useVisible)}
            color={{_light:'#B1B7BA/40', _dark: 'white'}}
        >
            <i className="pi pi-eye" />
        </Button>
        <Text w={auto ? 'auto' : '7rem'}
            textAlign={'right'}
            color={{_light:'#1D282E', _dark: 'white'}}
        >{category}</Text>

    </Flex>)
}

export default PassSlot