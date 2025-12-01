import { Button } from "@chakra-ui/react"

function NavOptions({ body, onClick }) {
    return (<Button focusRing={'inside'}
        w={'full'}
        onClick={() => onClick()}
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
        {body}
    </Button>)
}

export default NavOptions