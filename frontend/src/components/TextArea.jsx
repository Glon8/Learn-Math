import { Field, Textarea } from "@chakra-ui/react"
import { useState } from "react"

function TextArea({ getValue }) {
    const [useValue, setvalue] = useState('');

    return (<Field.Root>
        <Textarea value={useValue}
            bottom={0}
            onChange={(el) => {
                const value = el.target.value;

                setvalue(value);
                getValue(value);
            }}
            minH={'5rem'}
            placeholder="Ask teach!"
            autoresize
            maxH={'10rem'}
            maxLength={350} 
            _light={{
                color:'#1D282E',
                borderColor: '#B1B7BA/20'
            }}
            _dark={{}}
            />
        <Field.HelperText
        color={{_light: '#1D282E', _dark: 'white'}}
        >Max 350 characters</Field.HelperText>
    </Field.Root>)
}

export default TextArea