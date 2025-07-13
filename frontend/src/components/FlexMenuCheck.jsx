import { Menu, Portal, Text, Button } from "@chakra-ui/react"
import "primeicons/primeicons.css";
import { useEffect, useState } from "react";

function FlexMenuCheck({ close, disabled, pi_icon, title, list, list_checked, autoClose }) {
    const [useOpen, setOpen] = useState(close ? close : false);

    useEffect(() => {
        setOpen(close);
    }, [close]);

    return (<Menu.Root open={useOpen}
        positioning={{ placement: 'left-start', gutter: 2 }}
        closeOnSelect={close ? false : true}
        onInteractOutside={autoClose ? null : () => setOpen(false)}>

        <Menu.Trigger asChild disabled={disabled ? disabled : false}>

            <Button onClick={() => setOpen(!useOpen)}
                flexDirection={'row'}
                gap={3}
                >
                <i className={`pi ${pi_icon}`} /><Text textAlign={'center'}>{title}</Text>
            </Button>

        </Menu.Trigger>
        <Portal>

            <Menu.Positioner>

                <Menu.Content>

                    <Menu.ItemGroup>

                        {
                            list.map(({ title, value }) =>
                                <Menu.CheckboxItem key={value}
                                    value={value}
                                    checked={list_checked.isChecked(value)}
                                    onCheckedChange={() => list_checked.toggleValue(value)}
                                >
                                    {title}<Menu.ItemIndicator />
                                </Menu.CheckboxItem>
                            )
                        }

                    </Menu.ItemGroup>

                </Menu.Content>

            </Menu.Positioner>

        </Portal>

    </Menu.Root>)
}

export default FlexMenuCheck