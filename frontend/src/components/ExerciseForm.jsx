import { Flex, Stack, Text, Separator, Input, useBreakpointValue } from "@chakra-ui/react"
import "primeicons/primeicons.css";
import { useEffect, useState } from 'react'

import Geogebra from 'react-geogebra'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'

function ExerciseForm({ item, getValue, maxLength, color, ind }) {
    const [topic, setTopic] = useState('');
    const [exe, setExe] = useState('');
    const [ans, setAns] = useState('');
    const [desc, setDesc] = useState('');
    const [value, setValue] = useState([]);

    const [useIndex, setIndex] = useState(ind);
    const GGWidth = useBreakpointValue({ base: 315, sm: 350, md: 550, lg: 750, xl: 850 });
    const GGHight = useBreakpointValue({ base: 400, sm: 450, md: 500, lg: 550, });

    const answers = [];

    useEffect(() => {
        console.log(item);

        setTopic(item?.topic ? item?.topic : '');
        setExe(item?.exe ? item?.exe : '');
        setAns(item?.ans ? item?.ans : '');
        setDesc(item?.desc ? item?.desc : '');

        for (let i = 0; i < ans.length; i++) answers[i] = false;
    }, [item]);

    return (<Flex w={"100%"}
        h={"fit"}
        flexDir={'column'}
        paddingX={{ base: 3, sm: 3, md: 5 }}
        paddingY={7}
        gapY={3}
        border
        borderWidth={1}
        rounded={'xl'}
        _light={{
            boxShadow: 'lg',
            backgroundColor: 'white',
            borderColor: '#B1B7BA',
            color: '#1D282E'
        }}
        _dark={{
            boxShadow: '0 0 0.75rem 0.5rem #1D282E',
            background: '#8b8da0',
            borderColor: '#1D282E',
            color: '#EEF6F9'
        }}
    >
        <Flex gapX={3}>
            <Text w={!!desc || !!exe ? '5rem' : 'fit'}
                fontWeight={'bold'}>
                {
                    useIndex ? (useIndex + '.') : ('@')
                }
            </Text>
            {
                !desc && !exe ? (<Text>Ooops!! This exercise missing its body!</Text>) : ''
            }
        </Flex>
        {
            !!desc || !!exe ? (<Flex
                flexDir={'column'}
                gapY={3}
            >
                {
                    !!desc && !!topic ? (
                        <Flex
                            flexWrap={'wrap'}
                            flexDir={'column'}
                            gapY={3}
                            alignItems={'center'}
                        >
                            <Text whiteSpace={'normal'}>
                                {
                                    // KaTex & LaTeX to string method
                                    desc
                                }
                            </Text>
                            {
                                topic !== 'forms_sizes' && topic !== 'geometry' && topic !== 'circles' ? null :
                                    (
                                        // basic small and medium screens must be 325 in width and 450 hight!
                                        <Geogebra appName="test"
                                            width={GGWidth} // 750
                                            height={GGHight} // 550
                                            enableShiftDragZoom={false}
                                            showZoomButtons={false}
                                            enableRightClick={false}
                                            appletOnLoad={() => {
                                                const app = window.ggbApplet;

                                                app.setPerspective('G');

                                                app.evalCommand('A = (-3, -2)');
                                                app.evalCommand('B = (3,-2)');
                                                app.evalCommand('C = (-3, 2)');
                                                app.evalCommand('D = (3,2)');

                                                app.setFixed('A', true, true);
                                                app.setFixed('B', true, true);
                                                app.setFixed('C', true, true);
                                                app.setFixed('D', true, true);

                                                app.setLabelVisible("A", true);
                                                app.setLabelStyle("A", 1);
                                                app.setLabelVisible("B", true);
                                                app.setLabelStyle("B", 1);
                                                app.setLabelVisible("C", true);
                                                app.setLabelStyle("C", 1);
                                                app.setLabelVisible("D", true);
                                                app.setLabelStyle("D", 1);

                                                app.evalCommand('Polygon(A,B,D,C)');
                                            }} />
                                    )
                            }
                        </Flex>) : null
                }
                {
                    exe.map((item, index) => {
                        return (
                            <Flex w={'100%'}
                                key={index}
                                gap={5}
                                alignItems={!!item && !item?.type === 1 ? ('center') : ''}
                                flexDir={'column'}
                            >
                                {
                                    !!item ?
                                        (
                                            item?.type === 1 ?
                                                (<BlockMath math={item.message} />) :
                                                (<Text textAlign={'center'}>{item.message}</Text>)
                                        ) : null
                                }
                                <Input placeholder={`Answer No. ${useIndex}.${index}`}
                                    w={'100%'}
                                    value={value[index]}
                                    color={color ? color : ({ _light: '#1D282E', _dark: '#EEF6F9' })}
                                    backgroundColor={{ _light: 'white', _dark: '#1D282E', _disabled: 'transparent' }}
                                    rounded={'md'}
                                    maxLength={maxLength ? maxLength : 16}
                                    fontWeight={{ _dark: 'bold' }}
                                    onChange={(el) => {
                                        const val = el.target.value;

                                        answers[index] = ans[index] == val;

                                        setValue(prev => {
                                            const temp = [...prev];

                                            temp[index] = val;

                                            return temp;
                                        });
                                        // val must be compared with answer because it is encrypted!
                                        // also better to check via String.equals or contains
                                        if (!!getValue) {
                                            getValue(answers);
                                            console.log(ind + ': I pushed out new answers pack!')
                                            console.log(answers);

                                            console.log('my value is ' + val)
                                            console.log('desired value is ' + ans[index])
                                        }
                                    }}
                                />
                            </Flex>
                        );
                    })

                }
            </Flex>) : null
        }
    </Flex>)
}

export default ExerciseForm