import { Flex, Menu, Portal } from "@chakra-ui/react"
import "primeicons/primeicons.css";
import { useState, useEffect } from "react";

import SelectionMenuTrigger from "../buttons/sub/SelectionMenuTrigger";
import SelectionMenuOptions from "../buttons/sub/SelectionMenuOptions";

function SelectionCheckSwitchMenu({ title, pi_icon, options, default_option, close }) {
    const [useOpen, setOpen] = useState(close ?? false);

    const [use_value, set_value] = useState(default_option ?? '');

    useEffect(() => {
        setOpen(close);
    }, [close]);

    return (<Menu.Root>
        <SelectionMenuTrigger onClick={() => setOpen(!useOpen)} pi_icon={pi_icon} title={title} />
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

                                return (<SelectionMenuOptions key={value} disabled={value === use_value ? true : false} onClick={() => { set_value(value); func(); }}
                                    title={option.title} pi_icon={value === use_value ? 'pi-check' : ''} />)
                            })
                        }
                    </Flex>

                </Menu.Content>

            </Menu.Positioner>

        </Portal>

    </Menu.Root>)
}

export default SelectionCheckSwitchMenu