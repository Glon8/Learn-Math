import {
    Flex, Button, Menu, Text, Portal
} from "@chakra-ui/react"
import "primeicons/primeicons.css";
import { useState, useEffect } from "react";

function SelectionCheckSwitchMenu({ title, pi_icon, options, default_option, navSide, close }) {
    const [useOpen, setOpen] = useState(close ? close : false);

    const [use_value, set_value] = useState(default_option ? default_option : '');

    useEffect(() => {
        setOpen(close);
    }, [close]);

    /*positioning={...}
     navSide === 'top' || navSide === 'bottom' ? { placement: {base: 'bottom', sm: 'left'} } :
            navSide === 'left' ? { placement: 'right-end' } :
                navSide === 'right' ? { placement: 'left-end' } : ''
    */

    return (<Menu.Root>
        <Menu.Trigger asChild>
            <Button onClick={() => setOpen(!useOpen)}
                w={'full'}
                _light={{
                    background: "white",
                    borderColor: "#B1B7BA/20",
                    focusRingColor: '#B1B7BA',
                    color: '#1D282E'
                }}
                _dark={{
                    background: "#1D282E/80",
                    borderColor: "#737E80",
                    focusRingColor: '#B1B7BA',
                    color: '#EEF6F9'
                }}
            >

                <Flex w={'full'} justifyContent={'start'} gapX={3}>
                    <i className={`pi ${pi_icon}`} />
                    <Text>{title}</Text>
                </Flex>

            </Button>
        </Menu.Trigger>
        <Portal>

            <Menu.Positioner>

                <Menu.Content _dark={{
                    color: '#1D282E/50',
                    background: '#1D282E/95',
                    borderColor: '#1D282E'
                }}>

                    <Flex flexDirection={'column'} gap={1}>
                        {
                            options?.map((option) => {
                                const value = option.value;
                                const func = option.onClick;

                                return (<Button key={value}
                                    disabled={value === use_value ? true : false}
                                    onClick={() => {
                                        set_value(value);
                                        func();
                                    }}
                                    _light={{
                                        background: "white",
                                        borderColor: "#B1B7BA/20",
                                        focusRingColor: '#B1B7BA',
                                        color: '#1D282E'
                                    }}
                                    _dark={{
                                        background: "#1D282E/80",
                                        borderColor: "#737E80",
                                        focusRingColor: '#B1B7BA',
                                        color: '#EEF6F9'
                                    }}
                                >

                                    <Flex
                                        width={'full'}
                                        gapX={3}
                                        justify={"space-between"}>
                                        {option.title}<i className={`pi ${value === use_value ? 'pi-check' : ''}`} />
                                    </Flex>

                                </Button>)
                            })
                        }
                    </Flex>

                </Menu.Content>

            </Menu.Positioner>

        </Portal>

    </Menu.Root>)
}

export default SelectionCheckSwitchMenu