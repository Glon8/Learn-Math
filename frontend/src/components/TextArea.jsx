import { Field, Textarea } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { userContext } from "./UserContext";

function TextArea({ transPack }) {
    const { logs, send } = userContext();

    const [useValue, setValue] = useState('');
    const [useHolder, setHolder] = useState(!!transPack?.holder ? transPack.holder.pre : 'Ask teach!');
    const [useDisable, setDisable] = useState('');
    useEffect(() => {
        setDisable(false);

        setHolder(!!transPack?.holder ? transPack.holder.pre : 'Ask teach!');
    }, [logs?.user]);

    return (<Field.Root>
        <Textarea disabled={useDisable ? true : false}
            value={useValue}
            bottom={0}
            onChange={(el) => setValue(el.target.value)}
            onKeyDown={(el) => {
                if (el.key === 'Enter' && !el.shiftKey) {
                    el.preventDefault();

                    send(useValue);
                    setDisable(true);
                    setValue('');
                    setHolder(!!transPack?.holder ? transPack.holder.post : 'Await for teacher to respond, please...');
                }
            }}
            minH={'5rem'}
            placeholder={useHolder}
            autoresize
            maxH={'10rem'}
            maxLength={350}
            _light={{
                color: '#1D282E',
                borderColor: '#B1B7BA/20'
            }}
            _dark={{
                borderColor: '#1D282E',
                color: '#EEF6F9',
                background: '#1D282E'
            }}
        />
        <Field.HelperText
            color={{ _light: '#1D282E', _dark: '#EEF6F9' }}
        >{!!transPack?.limit ? transPack.limit : ('Max 350 characters')}</Field.HelperText>
    </Field.Root>)
}

export default TextArea