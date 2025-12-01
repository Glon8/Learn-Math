import { Flex, Button, Text, Menu } from "@chakra-ui/react"
import "primeicons/primeicons.css";

function SelectionMenuTrigger({ onClick, pi_icon, title }) {
    return (
        <Menu.Trigger asChild>
            <Button onClick={onClick}
                w={'full'}
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
                    color: '#EEF6F9'
                }}
            >

                <Flex w={'full'} justifyContent={'start'} gapX={3}>
                    <i className={`pi ` + pi_icon} />
                    <Text>{title}</Text>
                </Flex>

            </Button>
        </Menu.Trigger>)
}

export default SelectionMenuTrigger