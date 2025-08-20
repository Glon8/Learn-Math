import { CheckboxCard, Flex } from "@chakra-ui/react"
import "primeicons/primeicons.css";

// <CheckCard title={'do something'} ifChange={() => {}} disabled={false} />

function CheckCard({ pi_icon, title, ifChange, disabled, def_checked }) {
    return (<Flex>

        <CheckboxCard.Root disabled={disabled ? disabled : false}
            focusRing={'inside'}
            defaultChecked={def_checked ? def_checked : false}
            onChange={() => { ifChange() }}
            _light={{
                background: "#8b8da0/20",
                borderColor: "#B1B7BA/10",
                focusRingColor: '#1D282E',
                color: '#1D282E/90'
            }}
            _dark={{
                color: '#EEF6F9'
            }}
        >

            <CheckboxCard.HiddenInput />
            <CheckboxCard.Control>

                <CheckboxCard.Label><i className={`pi ${pi_icon ? pi_icon : ""}`} />{title}</CheckboxCard.Label>
                <CheckboxCard.Indicator />

            </CheckboxCard.Control>

        </CheckboxCard.Root>

    </Flex>)
}

export default CheckCard
