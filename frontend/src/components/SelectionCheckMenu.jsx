import {
    Flex, Button, Menu, Portal, Text
} from "@chakra-ui/react"
import "primeicons/primeicons.css";
import { useEffect, useState } from "react";

function SelectionCheckMenu({ options, default_options, disabled, navPosition, title, pi_icon, close }) {
    const [useOpen, setOpen] = useState(close ? close : false);

    const [use_switches, set_switches] = useState([]);
    let applied_switches = [];

    const fill_active = () => {
        options.map((option) => {
            let def_value;

            default_options.map((def) => {
                if (option.value === def) def_value = def;
            });

            def_value ? applied_switches.push(true) : applied_switches.push(false);
        });

        set_switches(applied_switches)
    }

    // func. to apply multiple inputs as switches
    const update_switches = (index, onclick) => {
        applied_switches = [...use_switches];

        applied_switches[index] = !applied_switches[index];

        set_switches(applied_switches);

        if (applied_switches[index]) onclick();
        else { console.log("there could be a pull out func.") }
    };

    useEffect(() => {
        if (applied_switches.length === 0) fill_active();
    }, []);

    useEffect(() => {
        setOpen(close);
    }, [close]);

    return (<Menu.Root positioning={
        navPosition === 'top' ? { placement: 'left' } :
            navPosition === 'left' ? { placement: 'right-end' } :
                navPosition === 'bottom' ? { placement: 'left' } :
                    navPosition === 'right' ? { placement: 'left-end' } : { placement: 'left' }}>

        <Menu.Trigger asChild>
            <Button color={'black'}
                onClick={() => setOpen(!useOpen)}
                bg={'white'}
                w={'full'}>

                <Flex w={'full'} justifyContent={'start'} gapX={3}>
                    <i className={`pi ${pi_icon}`} />
                    <Text>{title}</Text>
                </Flex>

            </Button>
        </Menu.Trigger>
        <Portal>

            <Menu.Positioner>

                <Menu.Content>

                    <Flex flexDirection={'column'} gapY={1}>
                        {
                            options?.map((option, index) => {
                                const value = option.value;

                                return (
                                    <Button key={value}
                                        disabled={disabled ? disabled : false}
                                        onClick={() => { update_switches(index, option.onClick) }}
                                        color={"black"}
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