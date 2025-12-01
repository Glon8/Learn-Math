import { Flex, Menu, Portal } from "@chakra-ui/react"
import "primeicons/primeicons.css";
import { useEffect, useState } from "react";

import SelectionMenuTrigger from "../buttons/sub/SelectionMenuTrigger";
import SelectionMenuOptions from "../buttons/sub/SelectionMenuOptions";

function SelectionCheckMenu({ options, default_options, disabled, title, pi_icon, close, getSwitches }) {
    const [useOpen, setOpen] = useState(close ? close : false);

    const [use_switches, set_switches] = useState(default_options ?? []);
    let applied_switches = [];

    // func. to apply multiple inputs as switches
    const update_switches = (index, onclick) => {
        applied_switches = [...use_switches];

        applied_switches[index] = !applied_switches[index];

        set_switches(applied_switches);

        if (applied_switches[index]) onclick ? onclick() : null;
        //else { console.log("there could be a pull out func.") }
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
        <SelectionMenuTrigger onClick={() => setOpen(!useOpen)} pi_icon={pi_icon} title={title} />
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

                                return (<SelectionMenuOptions key={value} disabled={disabled ?? false} onClick={() => update_switches(index, option.onClick)}
                                    title={option.title} pi_icon={use_switches[index] === true ? 'pi-check' : ''} />)
                            })
                        }
                    </Flex>

                </Menu.Content>

            </Menu.Positioner>

        </Portal>

    </Menu.Root>)
}

export default SelectionCheckMenu