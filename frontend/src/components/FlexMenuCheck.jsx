import { Flex, Menu, Portal, Text } from "@chakra-ui/react"
import "primeicons/primeicons.css";

function FlexMenuCheck({ close, disabled, pi_icon, title, list, list_checked }) {
    return (<Menu.Root positioning={{ placement: 'left-start', gutter: 2 }} closeOnSelect={close ? false : true}>

        <Menu.Trigger disabled={disabled ? disabled : false}>

            <Flex flexDirection={'row'} gap={3}>
                <i className={`pi ${pi_icon}`} /><Text textAlign={'center'}>{title}</Text>
            </Flex>

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