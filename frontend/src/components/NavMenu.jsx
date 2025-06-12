import { Separator, Button, Flex, Text } from "@chakra-ui/react"
import "primeicons/primeicons.css";

import SelectionCheckMenu from "./SelectionCheckMenu";
import SelectionCheckSwitchMenu from "./SelectionCheckSwitchMenu";
import { useState } from "react";

function NavMenu({ hidden, user, group_a, group_b, mode, navPosition }) {
    const [use_languages, set_languages] = useState(true);
    const [use_settings, set_settings] = useState(true);
    const [use_position, set_position] = useState(true);

    return (<Flex padding={1} gap={3}
        hidden={hidden ? hidden : false}
        flexDirection={navPosition === 'bottom' ? "column-reverse" : 'column'}
        width={'13rem'}
        rounded={'md'}
        border
        borderColor={'black'}
        bg={"white"}
        borderWidth={1}
    >
        {
            user ? (<Text marginStart={4}>{user.status === 0 ? 'Local' : 'Online'} user: {user.name}</Text>) :
                (<Text marginStart={4}>No user connected!</Text>)
        }
        {
            user ? (group_a ? Object.entries(group_a).map((item) => {
                if (item[0] === 'button_c')
                    return (<Button key={item[0]}
                        backgroundColor={'white'}
                        onClick={item[1].onClick}
                        color={"black"}
                    >

                        <Flex width={'full'}
                            alignItems={'center'}
                            gap={3}>

                            <i className={`pi ${item[1].pi_icon}`} />
                            {item[1].value}

                        </Flex>

                    </Button>)
            }) : null) :
                (group_a ? Object.entries(group_a).map((item) => {
                    if (item[0] === 'button_a' || item[0] === 'button_b')
                        return (<Button key={item[0]}
                            backgroundColor={'white'}
                            onClick={item[1].onClick}
                            color={"black"}
                        >

                            <Flex width={'full'}
                                alignItems={'center'}
                                gap={3}>

                                <i className={`pi ${item[1].pi_icon}`} />
                                {item[1].value}

                            </Flex>

                        </Button>)
                }) : null)
        }
        {
            group_a && group_b ? (<Separator />) : null
        }
        {
            mode ? (<Button backgroundColor={'white'} color={'black'} onClick={mode.onClick}>

                <Flex width={'full'}
                    alignItems={'center'}
                    gap={3}>

                    <i className={`pi ${mode.pi_icon}`} />
                    <Text>{mode.value}</Text>

                </Flex>

            </Button>) : null
        }

        <Button
            backgroundColor={'white'}
            onClick={() => {
                set_position(true)
                set_languages(!use_languages)
                set_settings(true)
            }}
            color={"black"}
        >

            <Flex width={'full'}
                alignItems={'center'}
                gap={3}>

                <i className={`pi pi-globe`} />
                {group_b.menu_a.title}

            </Flex>

        </Button>

        <Button
            backgroundColor={'white'}
            onClick={() => {
                set_position(true)
                set_settings(!use_settings)
                set_languages(true)
            }}
            color={"black"}
        >

            <Flex width={'full'}
                alignItems={'center'}
                gap={3}>

                <i className={`pi pi-cog`} />
                {group_b.menu_b.title}

            </Flex>

        </Button>

        <Button
            backgroundColor={'white'}
            onClick={() => {
                set_position(!use_position)
                set_languages(true)
                set_settings(true)
            }}
            color={"black"}
        >

            <Flex width={'full'}
                alignItems={'center'}
                gap={3}>

                <i className={`pi pi-angle-down`} />
                {group_b.menu_c.title}

            </Flex>

        </Button>
        <Flex onMouseLeave={() => { set_languages(true) }}
            position={'absolute'}
            width={'auto'}
            right={
                navPosition === 'right' ? '13rem' :
                    navPosition === 'top' ? '13rem' :
                        navPosition === 'bottom' ? '13rem' : 'auto'
            }
            left={
                navPosition === 'left' ? '13rem' : 'auto'
            }
            top={
                navPosition === 'right' ? '10rem' :
                    navPosition === 'left' ? '10rem' :
                        navPosition === 'top' ? '10rem' : 'auto'
            }
            bottom={
                navPosition === 'bottom' ? '10rem' : 'auto'
            }
            flexDirection={navPosition === 'bottom' ? "column-reverse" : 'column'}
        >
            <SelectionCheckSwitchMenu default_option={group_b.menu_a.list_checked}
                hidden={use_languages}
                options={group_b.menu_a.list}
            />
        </Flex>
        <Flex onMouseLeave={() => { set_settings(true) }}
            position={'absolute'}
            width={'auto'}
            right={
                navPosition === 'right' ? '13rem' :
                    navPosition === 'top' ? '13rem' :
                        navPosition === 'bottom' ? '13rem' : 'auto'
            }
            left={
                navPosition === 'left' ? '13rem' : 'auto'
            }
            top={
                navPosition === 'right' ? '13rem' :
                    navPosition === 'left' ? '13rem' :
                        navPosition === 'top' ? '13rem' : 'auto'
            }
            bottom={
                navPosition === 'bottom' ? '13rem' : 'auto'
            }
            flexDirection={navPosition === 'bottom' ? "column-reverse" : 'column'}>
            <SelectionCheckMenu default_options={group_b.menu_b.list_checked}
                hidden={use_settings}
                width={'20rem'}
                switch_board={true}
                options={group_b.menu_b.list} />
        </Flex>
        <Flex onMouseLeave={() => { set_position(true) }}
            position={'absolute'}
            width={'auto'}
            right={
                navPosition === 'right' ? '13rem' :
                    navPosition === 'top' ? '13rem' :
                        navPosition === 'bottom' ? '13rem' : 'auto'
            }
            left={
                navPosition === 'left' ? '13rem' : 'auto'
            }
            top={
                navPosition === 'right' ? '16rem' :
                    navPosition === 'left' ? '16rem' :
                        navPosition === 'top' ? '16rem' : 'auto'
            }
            bottom={
                navPosition === 'bottom' ? '16rem' : 'auto'
            }
            flexDirection={navPosition === 'bottom' ? "column-reverse" : 'column'} >
            <SelectionCheckSwitchMenu default_option={group_b.menu_c.list_checked}
                hidden={use_position}
                options={group_b.menu_c.list}
            />
        </Flex>

    </Flex>)
}

export default NavMenu