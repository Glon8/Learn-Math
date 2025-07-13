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
                background: "white",
                borderColor: "#B1B7BA",
                focusRingColor: '#1D282E',
                color: '#1D282E'
            }}
            _dark={{
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
