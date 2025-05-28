import { CheckboxCard } from "@chakra-ui/react"
import "primeicons/primeicons.css";

// <CheckCard title={'do something'} ifChange={() => {}} disabled={false} />

function CheckCard({title, ifChange, disabled}) {
  return (<CheckboxCard.Root disabled={disabled? disabled : false} onChange={ifChange} marginStart={5} maxW={'xs'}>

        <CheckboxCard.HiddenInput />
        <CheckboxCard.Control>

            <CheckboxCard.Label><i className="pi pi-thumbtack" />{title}</CheckboxCard.Label>
            <CheckboxCard.Indicator />

        </CheckboxCard.Control>

    </CheckboxCard.Root>)
}

export default CheckCard
