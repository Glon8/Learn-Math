import { Tooltip } from "@chakra-ui/react"

function Tool({navSide, disabled, title, value}) {
    return (<Tooltip.Root positioning={navSide === 'top' ? { placement: 'bottom' } :
            navSide === 'left' ? { placement: 'right-end' } :
                navSide === 'bottom' ? { placement: 'top' } :
                    navSide === 'right' ? { placement: 'left-end' } : ''}
            disabled={disabled ? false : true}
        ><Tooltip.Trigger asChild>
            {value}
            </Tooltip.Trigger>
            <Tooltip.Positioner>
                <Tooltip.Content fontSize={'xl'}>
                    {title}
                </Tooltip.Content>
            </Tooltip.Positioner>
        </Tooltip.Root >)
}

export default Tool