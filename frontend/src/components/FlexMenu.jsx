import { Text, Flex, Menu, Portal, Separator } from "@chakra-ui/react"
import "primeicons/primeicons.css";

// <Flexmenu disabled={false} pi_icon={''} title={'do something'} inner_title={'DO SOMETHING!'} options={['will do', 'negative']} />

function FlexMenu({ pi_icon, title, inner_title, options, disabled }) {
    return (<Menu.Root>

        <Menu.Trigger disabled={disabled? disabled : false}>

            <Flex width={'xs'} flexDirection={'row'} gap={3}>
                <i className={`pi ${pi_icon}`} /><Text textAlign={'center'}>{title}</Text>
            </Flex>

        </Menu.Trigger>
        <Portal>

            <Menu.Positioner>

                <Menu.Content width={'xs'} marginStart={5}>
                    {
                        inner_title ?
                            (<Text fontWeight={'medium'} fontSize={'lg'} textAlign={'center'}>{inner_title}</Text>) : ''
                    }
                    {
                        inner_title ?
                            (<Separator />) : ''
                    }
                    {
                        options.map((value, index) => {
                            return (<Menu.Item key={index} value={`${value}`}>{value}</Menu.Item>)
                        })
                    }
                </Menu.Content>

            </Menu.Positioner>

        </Portal>

    </Menu.Root>)
}

export default FlexMenu