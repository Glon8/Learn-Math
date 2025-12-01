import { Flex, Button } from "@chakra-ui/react"
import "primeicons/primeicons.css";

function SelectionMenuOptions({ disabled, onClick, title, pi_icon }) {
    return (<Button disabled={disabled ?? false}
        onClick={onClick}
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

        <Flex width={'full'} gapX={3} justify={"space-between"}>
            {title}<i className={`pi ` + pi_icon} />
        </Flex>

    </Button>)
}

export default SelectionMenuOptions