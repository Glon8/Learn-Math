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

    return (<Menu.Root positioning={
        navSide === 'top' ? { placement: 'left' } :
            navSide === 'left' ? { placement: 'right-end' } :
                navSide === 'bottom' ? { placement: 'left' } :
                    navSide === 'right' ? { placement: 'left-end' } : {placement: 'left'}}>
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
                                    color={"black"}
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