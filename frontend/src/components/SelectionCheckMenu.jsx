import { Flex, Button, Menu, Portal, Text, useBreakpointValue } from "@chakra-ui/react"
import "primeicons/primeicons.css";
import { useEffect, useState } from "react";

function SelectionCheckMenu({ options, default_options, disabled, navSide, title, pi_icon, close, getSwitches }) {
    const [useOpen, setOpen] = useState(close ? close : false);

    const [use_switches, set_switches] = useState(default_options ?? []);
    let applied_switches = [];

    // func. to apply multiple inputs as switches
    const update_switches = (index, onclick) => {
        applied_switches = [...use_switches];

        applied_switches[index] = !applied_switches[index];

        set_switches(applied_switches);

        if (applied_switches[index]) onclick ? onclick() : null;
        else { console.log("there could be a pull out func.") }
    };

    getSwitches ? useEffect(() => {
        getSwitches(use_switches);
    }, [use_switches]) : null;

    useEffect(() => {
        setOpen(close);
    }, [close]);

    /*
    positioning={...}
        navSide === 'top' || navSide === 'bottom' ? { placement: {base: 'bottom', sm: 'left'} } :
            navSide === 'left' ? { placement: 'right-end' } :
                navSide === 'right' ? { placement: 'left-end' } : ''
    */

    return (<Menu.Root>
        <Menu.Trigger asChild>
            <Button onClick={() => setOpen(!useOpen)}
                w={'full'}
                _light={{
                    background: "#8b8da0/20",
                    borderColor: "#B1B7BA/10",
                    focusRingColor: '#B1B7BA/20',
                    color: '#1D282E/90'
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
                }}
                >

                    <Flex flexDirection={'column'} gapY={1}>
                        {
                            options?.map((option, index) => {
                                const value = option.value;

                                return (
                                    <Button key={value}
                                        disabled={disabled ?? false}
                                        onClick={() => update_switches(index, option.onClick)}
                                        _light={{
                                            background: "#8b8da0/20",
                                            borderColor: "#B1B7BA/10",
                                            focusRingColor: '#B1B7BA',
                                            color: '#1D282E/90'
                                        }}
                                        _dark={{
                                            background: "#1D282E/80",
                                            borderColor: "#737E80",
                                            focusRingColor: '#B1B7BA',
                                            color: '#EEF6F9',
                                        }}
                                    >

                                        <Flex width={'full'}
                                            gapX={3}
                                            justify={"space-between"}>
                                            {option.title}<i className={`pi ${use_switches[index] === true ? 'pi-check' : ''}`} />
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

export default SelectionCheckMenu