import { Text, Menu, Portal, Separator, Button } from "@chakra-ui/react"
import "primeicons/primeicons.css";
import { useEffect, useState } from "react";

// <Flexmenu disabled={false} close={true} pi_icon={''} title={'do something'} inner_title={'DO SOMETHING!'} options={['will do', 'negative']} />

function FlexMenu({ pi_icon, title, inner_title, options, close, disabled, autoClose }) {
    const [useOpen, setOpen] = useState(close ? close : false);

    useEffect(() => {
        setOpen(close);
    }, [close]);

    return (<Menu.Root open={useOpen}
        onInteractOutside={autoClose ? null : () => setOpen(false)}>

        <Menu.Trigger asChild w={'full'}>

            <Button disabled={disabled ? false : true}
                onClick={() => setOpen(!useOpen)}
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
                        options.map((value, index) => {
                            return (<Menu.Item key={index}
                                value={`${value}`}
                                color={{ _light: '#1D282E', _dark: '#EEF6F9' }}
                            >{value}</Menu.Item>)
                        })
                    }
                </Menu.Content>

            </Menu.Positioner>

        </Portal>

    </Menu.Root>)
}

export default FlexMenu