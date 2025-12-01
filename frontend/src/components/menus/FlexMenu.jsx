import { Text, Menu, Portal, Separator, Button } from "@chakra-ui/react"
import "primeicons/primeicons.css";
import { useEffect, useState } from "react";

function FlexMenu({ pi_icon, title, inner_title, options, close, autoClose, onClick }) {
    const [useOpen, setOpen] = useState(close ? close : false);

    useEffect(() => {
        setOpen(close);
    }, [close]);

    return (<Menu.Root open={useOpen}
        onInteractOutside={autoClose ? null : () => setOpen(false)}>

        <Menu.Trigger asChild w={'full'}>

            <Button onClick={() => {
                setOpen(!useOpen);

                !!onClick ? onClick() : null;
            }}
                width={'xs'}
                flexDirection={'row'}
                gap={3}
                color={'black'}
                focusRing={'inside'}
                _light={{
                    backgroundColor: 'white',
                    borderColor: '#B1B7BA/20',
                    focusRingColor: '#B1B7BA/20',
                    color: '#1D282E'
                }}
                _dark={{
                    background: "#1D282E",
                    borderColor: "#1D282E",
                    focusRingColor: '#B1B7BA',
                    color: '#EEF6F9'
                }}>
                <i className={`pi ${pi_icon}`} /><Text textAlign={'center'}>{title}</Text>
            </Button>

        </Menu.Trigger>
        <Portal>

            <Menu.Positioner>

                <Menu.Content width={'xs'}
                    marginStart={5}
                    _dark={{
                        background: '#1D282E/95',
                        borderColor: '#1D282E'
                    }}>
                    {
                        inner_title ?
                            (<Text fontWeight={'medium'}
                                fontSize={'lg'}
                                textAlign={'center'}
                                color={{ _light: '#1D282E', _dark: '#EEF6F9' }}
                            >{inner_title}</Text>) : ''
                    }
                    {
                        inner_title ?
                            (<Separator />) : ''
                    }
                    {
                        options.map((option, index) => {
                            return (<Menu.Item key={index}>
                                <Button value={`${option.value}`}
                                    w={'full'}
                                    _light={{
                                        backgroundColor: 'white',
                                        borderColor: '#B1B7BA/20',
                                        focusRingColor: '#B1B7BA/20',
                                        color: '#1D282E'
                                    }}
                                    _dark={{
                                        background: "#1D282E",
                                        borderColor: "#1D282E",
                                        focusRingColor: '#B1B7BA',
                                        color: '#EEF6F9'
                                    }}
                                    onClick={() => {
                                        setOpen(false);
                                        option.click ? option.click() : null;
                                    }}
                                >{option.value}</Button>
                            </Menu.Item>)
                        })
                    }
                </Menu.Content>

            </Menu.Positioner>

        </Portal>

    </Menu.Root>)
}

export default FlexMenu