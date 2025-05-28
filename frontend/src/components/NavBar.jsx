import { Button, Flex, Menu, Portal, Text, useCheckboxGroup } from "@chakra-ui/react"
import "primeicons/primeicons.css";
import { useNavigate } from 'react-router-dom'

function NavBar() {
    const navigate = useNavigate();

    const to_main = () => { navigate('/'); }
    const to_profile = () => { navigate('/profile') }
    const to_top_scores = () => { navigate('/top-scores') }
    const to_hints = () => { navigate('/hints') }
    const to_schools = () => { navigate('/schools') }

    const languages = [{
        value: 'english',
        title: 'EN'
    }, {
        value: 'hebrew',
        title: 'HE'
    }, {
        value: 'russian',
        title: 'RU'
    }];
    const languages_checked = useCheckboxGroup({ defaultValue: ['hebrew'] });

    const menu_pos = [{
        value: 'top',
        title: 'Top'
    }, {
        value: 'left',
        title: 'Left'
    }, {
        value: 'bottom',
        title: 'Bottom'
    }, {
        value: 'right',
        title: 'Right'
    }];
    const menu_pos_checked = useCheckboxGroup({ defaultValue: ['top'] });

    const lesson_settings = [{
        value: 'set1',
        title: 'Form awaits to be fully filled'
    }, {
        value: 'set2',
        title: 'Exercises instant replacement'
    }, {
        value: 'set3',
        title: '...'
    }];
    const lesson_settings_checked = useCheckboxGroup({ defaultValue: ['set1'] });

    const user = {
    _id: 1110,
    status: 0,
    shared: false,
    name: 'Ruslan',
    email: null,
    password: null,
    secret: null,
    answer: null
  };

    return (<Flex border borderBottomWidth={2}
        borderColor={'blackAlpha.500'}
        height={20}
        padding={3}
        flexDir={'row'}
        justify={'space-between'}
        backgroundColor={'blackAlpha.400'}
    >

        <Flex flexDirection={'row'} alignItems={'center'} gap={3}>

            <Button backgroundColor={'black'} onClick={to_main}><i className="pi pi-sparkles" />Learn Math</Button>

        </Flex>
        <Flex flexDirection={'row'} alignItems={'center'} gap={3}>

            <Button backgroundColor={'black'} onClick={to_hints} ><i className="pi pi-question" />Hints</Button>
            <Button backgroundColor={'black'} onClick={to_top_scores} ><i className="pi pi-crown" />Top Scores</Button>
            <Button backgroundColor={'black'} onClick={to_profile} ><i className="pi pi-id-card" />Profile</Button>
            <Button backgroundColor={'black'} onClick={to_schools} ><i className="pi pi-list-check" />Schools</Button>
            <Menu.Root closeOnSelect={false}>

                <Menu.Trigger backgroundColor={'black'}>
                    <i className='pi pi-align-justify' style={{ color: 'white'}} />
                </Menu.Trigger>
                <Portal>
                    <Menu.Positioner>

                        <Menu.Content width={'12rem'}>

                            <Menu.ItemGroup>

                                <Text paddingStart={2}>{user.status === 0? 'Local' : 'Online'} user: {user.name}</Text>
                                <Menu.Item value='sign-up'><i className="pi pi-user-edit" />Sign Up</Menu.Item>
                                <Menu.Item value='sign-in'><i className="pi pi-sign-in" />Sign In</Menu.Item>
                                <Menu.Item value='sign-out'><i className="pi pi-sign-out" />Sign Out</Menu.Item>

                            </Menu.ItemGroup>
                            <Menu.Separator />
                            <Menu.ItemGroup>

                                <Menu.Item value='mode' ><i className="pi pi-moon" /><Text>Mode</Text></Menu.Item>
                                <Menu.Root positioning={{ placement: 'right-start', gutter: 2 }} closeOnSelect={false}>

                                    <Menu.TriggerItem>
                                        <i className="pi pi-language" /><Text>Language</Text>
                                    </Menu.TriggerItem>
                                    <Portal>

                                        <Menu.Positioner>

                                            <Menu.Content>

                                                <Menu.ItemGroup>
                                                    {
                                                        languages.map(({ title, value }) =>
                                                            <Menu.CheckboxItem key={value}
                                                                value={value}
                                                                checked={languages_checked.isChecked(value)}
                                                                onCheckedChange={() => languages_checked.toggleValue(value)}
                                                            >
                                                                {title}<Menu.ItemIndicator />
                                                            </Menu.CheckboxItem>
                                                        )
                                                    }
                                                </Menu.ItemGroup>

                                            </Menu.Content>

                                        </Menu.Positioner>

                                    </Portal>

                                </Menu.Root>
                                <Menu.Root closeOnSelect={false}>

                                    <Menu.TriggerItem>
                                        <i className="pi pi-cog" /><Text>Lesson Settings</Text>
                                    </Menu.TriggerItem>

                                    <Menu.Positioner>

                                        <Menu.Content>

                                            <Menu.ItemGroup>

                                                {
                                                    lesson_settings.map(({ title, value }) =>
                                                        <Menu.CheckboxItem key={value}
                                                            value={value}
                                                            checked={lesson_settings_checked.isChecked(value)}
                                                            onCheckedChange={() => lesson_settings_checked.toggleValue(value)}>
                                                            {title}<Menu.ItemIndicator />
                                                        </Menu.CheckboxItem>
                                                    )
                                                }

                                            </Menu.ItemGroup>

                                        </Menu.Content>

                                    </Menu.Positioner>

                                </Menu.Root>
                                <Menu.Root closeOnSelect={false}>

                                    <Menu.TriggerItem>
                                        <i className="pi pi-angle-down" /><Text>Menu Position</Text>
                                    </Menu.TriggerItem>
                                    <Portal>

                                        <Menu.Positioner>

                                            <Menu.Content>

                                                <Menu.ItemGroup>

                                                    {
                                                        menu_pos.map(({ title, value }) =>
                                                            <Menu.CheckboxItem key={value}
                                                                value={value}
                                                                checked={menu_pos_checked.isChecked(value)}
                                                                onCheckedChange={() => menu_pos_checked.toggleValue(value)}
                                                            >
                                                                {title}<Menu.ItemIndicator />
                                                            </Menu.CheckboxItem>
                                                        )
                                                    }

                                                </Menu.ItemGroup>

                                            </Menu.Content>

                                        </Menu.Positioner>

                                    </Portal>

                                </Menu.Root>

                            </Menu.ItemGroup>

                        </Menu.Content>

                    </Menu.Positioner>

                </Portal>

            </Menu.Root>

        </Flex>

    </Flex>)
}

export default NavBar