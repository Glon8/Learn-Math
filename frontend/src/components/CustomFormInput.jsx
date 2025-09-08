import { Input } from "@chakra-ui/react"
import { useEffect, useState } from "react";

function CustomFormInput({ key, color, clear, holder }) {
    const [useValue, setValue] = useState('');

    useEffect(() => {
        setValue('');
    }, [clear]);

    return (<Input w={1}
        key={key}
        textAlign={'center'}
        maxLength={1}
        placeholder={holder ?? 0}
        color={color ?? ''}
        borderColor={color ?? ''}
        borderWidth={2}
        fontWeight={'bold'}
        backgroundColor={{ _dark: '#1D282E/80' }}
        value={useValue}
        onChange={(val) => {
            setValue(val.target.value);
        }} />)
}

export default CustomFormInput