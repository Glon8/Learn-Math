import { Text, Button } from "@chakra-ui/react"
import "primeicons/primeicons.css";

function ShareWarning({ warningMes, user, value }) {
    return (<Button onClick={warningMes}
        disabled={user._id === 0 ? false : true}
        width={'full'}
        flexDirection={'row'}
        gap={3}
        color={'black'}
        focusRing={'inside'}
        _light={{
            backgroundColor: '#8b8da0/20',
            borderColor: '#B1B7BA/10',
            focusRingColor: '#B1B7BA/20',
            color: '#1D282E/90'
        }}
        _dark={{
            background: "#1D282E",
            borderColor: "#1D282E",
            focusRingColor: '#B1B7BA',
            color: '#EEF6F9'
        }}>
        <i className="pi pi-book" /><Text>{value}</Text>
    </Button>)
}

export default ShareWarning