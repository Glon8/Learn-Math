import {
    Flex, Button
} from "@chakra-ui/react"
import "primeicons/primeicons.css";
import { useEffect, useState } from "react";

function SelectionCheckMenu({ width, options, default_options, disabled, navPosition, hidden }) {
    const [use_switches, set_switches] = useState([]);
    let applied_switches = [];

    const fill_active = () => {
        options.map((option) => {
            let def_value;

            default_options.map((def) => {
                if (option.value === def) def_value = def;
            });

            def_value ? applied_switches.push(true) : applied_switches.push(false);
        });

        set_switches(applied_switches)
    }

    // func. to apply multiple inputs as switches
    const update_switches = (index, onclick) => {
        applied_switches = [...use_switches];

        applied_switches[index] = !applied_switches[index];

        set_switches(applied_switches);

        if (applied_switches[index]) onclick();
        else { console.log("there could be a pull out func.") }
    };

    useEffect(() => {
        if (applied_switches.length === 0) fill_active();
    }, []);

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
            options?.map((option, index) => {
                const value = option.value;

                return (
                    <Button key={value}
                        disabled={disabled ? disabled : false}
                        onClick={() => { update_switches(index, option.onClick) }}
                        color={"black"}
                    >

                        <Flex width={'full'}
                            justify={"space-between"}>
                            {option.title}<i className={`pi ${use_switches[index] === true ? 'pi-check' : ''}`} />
                        </Flex>

                    </Button>)
            })
        }
    </Flex>)
}

export default SelectionCheckMenu