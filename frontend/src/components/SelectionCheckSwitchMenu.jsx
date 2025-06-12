import {
    Flex, Button
} from "@chakra-ui/react"
import "primeicons/primeicons.css";
import { useState } from "react";

function SelectionCheckSwitchMenu({ width, options, default_option, navPosition, hidden }) {
    const [use_value, set_value] = useState(default_option ? default_option : '');

    return (<Flex
        hidden={hidden ? true : false}
        flexDirection={navPosition === 'bottom' ? "column-reverse" : 'column'}
        width={width ? width : '13rem'}
        rounded={'lg'}
        border
        borderColor={'black'}
        bg={"white"}
        borderWidth={1}>
        {
            options?.map((option) => {
                const value = option.value;

                return (<Button key={value}
                    disabled={value === use_value ? true : false}
                    onClick={() => {
                        set_value(value);
                        option.onClick();
                    }}
                    color={"black"}

                >

                    <Flex
                        width={'full'}
                        justify={"space-between"}>
                        {option.title}<i className={`pi ${value === use_value ? 'pi-check' : ''}`} />
                    </Flex>

                </Button>)
            })
        }
    </Flex>)
}

export default SelectionCheckSwitchMenu