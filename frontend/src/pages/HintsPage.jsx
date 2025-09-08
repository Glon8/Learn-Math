import { Flex, Text, Separator, Stack } from "@chakra-ui/react"
import "primeicons/primeicons.css";
import { useState } from "react";
import ReactMarkDown from 'react-markdown'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'

import { userContext } from "../context/UserContext";
import { topicNames } from "../util/Statics.js";
import { languageContext } from "../context/LanguagesContext.jsx";

import CustomForm from "../components/CustomForm.jsx";
import TwoTitlesSlot from "../components/TwoTitlesSlot";
import TopicBut from "../components/TopicBut";
import Spin from "../components/Spin";
import TextArea from "../components/TextArea";
import { useEffect } from "react";

function HintsPage() {
  const { pos, logs, lang } = userContext();
  const { language } = languageContext();

  const [useSchool, setSchool] = useState(true);
  const [useTop, setTop] = useState('sum_substract');

  const [topic, setTopic] = useState(language?.statics?.topics ? language?.statics?.topics : topicNames);

  const mixedText = (message) => {
    const part = message.split(/(\$[^$]*\$)/g);

    return part.map((part, i) => {
      if (part.startsWith('$') && part.endsWith('$')) {
        const math = part.slice(1, -1);

        return <InlineMath key={i} math={math} />
      }
      return <ReactMarkDown key={i}>{part}</ReactMarkDown>
    });
  }

  /*
  hints vocabulary ll have 6 types of data:
  0. main title { type: 0 },
  1. sub title { type: 1, body: '' },
  2. description { type: 2, body: '' },
  3. exercise form { type: 3 },
  4. example Latex/Katex { type: 4, body: String.raw`` },
  5. example Geogebra
  */
  const hintsVoca = {
    sum_substract: [
      { type: 0 },
      { type: 1, body: language?.statics?.longDesc?.sum_substract?.subTitle ? language?.statics?.longDesc?.sum_substract?.subTitle : 'MISSING' },
      { type: 2, body: language?.statics?.longDesc?.sum_substract?.desc ? language?.statics?.longDesc?.sum_substract?.desc : 'MISSING' },
      { type: 4, body: '0,1,2,3,4,5,6,7,8,9' },
      { type: 2, body: language?.statics?.longDesc?.sum_substract?.desc2 ? language?.statics?.longDesc?.sum_substract?.desc2 : 'MISSING' },
      { type: 4, body: String.raw`\begin{array}{l} \text{2 - ${language?.statics?.longDesc?.sum_substract?.lk?.['1'] ? language?.statics?.longDesc?.sum_substract?.lk?.['1'] : 'biggest weight of ones'}} \\ \text{23 - ${language?.statics?.longDesc?.sum_substract?.lk?.['2'] ? language?.statics?.longDesc?.sum_substract?.lk?.['2'] : 'biggest weight of tens'}} \\ \text{234 - ${language?.statics?.longDesc?.sum_substract?.lk?.['3'] ? language?.statics?.longDesc?.sum_substract?.lk?.['3'] : 'biggest weight of hundreds'}} \end{array}` },
      { type: 2, body: language?.statics?.longDesc?.sum_substract?.desc3 ? language?.statics?.longDesc?.sum_substract?.desc3 : 'MISSING' },
      { type: 4, body: String.raw`\begin{array}{l} \text{${language?.statics?.longDesc?.sum_substract?.lk2?.['1'] ? language?.statics?.longDesc?.sum_substract?.lk2?.['1'] : 'number 23 have:'}} \\ \text{2 ${language?.statics?.longDesc?.sum_substract?.lk2?.['2'] ? language?.statics?.longDesc?.sum_substract?.lk2?.['2'] : 'as tens'} = 20} \\ \text{3 ${language?.statics?.longDesc?.sum_substract?.lk2?.['3'] ? language?.statics?.longDesc?.sum_substract?.lk2?.['3'] : 'as ones'} = 3} \end{array}` },
      { type: 2, body: language?.statics?.longDesc?.sum_substract?.desc4 ? language?.statics?.longDesc?.sum_substract?.desc4 : 'MISSING' },
      { type: 1, body: language?.statics?.longDesc?.sum_substract?.subTitle2 ? language?.statics?.longDesc?.sum_substract?.subTitle2 : 'MISSING' },
      { type: 2, body: language?.statics?.longDesc?.sum_substract?.desc5 ? language?.statics?.longDesc?.sum_substract?.desc5 : 'MISSING' },
      { type: 4, body: String.raw`\begin{array}{l} 2 + 2 = 4 \\ 0 + 5 = 5 \\ 1 + 3 = 4 \end{array}` },
      { type: 2, body: language?.statics?.longDesc?.sum_substract?.desc6 ? language?.statics?.longDesc?.sum_substract?.desc6 : 'MISSING' },
      { type: 4, body: String.raw`\begin{array}{l} 11 + 2 = 13 \\ \text{${language?.statics?.longDesc?.ones ? language?.statics?.longDesc?.ones : 'ones:'} }1 + 2 = 3 \\ \text{${language?.statics?.longDesc?.tens ? language?.statics?.longDesc?.tens : 'tens:'} }1 + 0 = 1 \end{array}` },
      { type: 2, body: language?.statics?.longDesc?.sum_substract?.desc7 ? language?.statics?.longDesc?.sum_substract?.desc7 : 'MISSING' },
      { type: 4, body: String.raw`5 + 5 = 10` },
      { type: 2, body: language?.statics?.longDesc?.sum_substract?.desc8 ? language?.statics?.longDesc?.sum_substract?.desc8 : 'MISSING' },
      { type: 4, body: String.raw`\begin{array}{l} 19 + 2 = 21 \\ \text{${language?.statics?.longDesc?.ones ? language?.statics?.longDesc?.ones : 'ones:'} }9 + 2 = 11 \\ \text{${language?.statics?.longDesc?.sum_substract?.lk3?.['1'] ? language?.statics?.longDesc?.sum_substract?.lk3?.['1'] : 'ones without reminder:'} }1 \\ \text{${language?.statics?.longDesc?.sum_substract?.lk3?.['2'] ? language?.statics?.longDesc?.sum_substract?.lk3?.['2'] : 'reminder of tens:'} }1 \\ \text{${language?.statics?.longDesc?.tens ? language?.statics?.longDesc?.tens : 'tens:'} }1 + 0 + 1 = 2 \end{array}` },
      { type: 2, body: language?.statics?.longDesc?.sum_substract?.desc9 ? language?.statics?.longDesc?.sum_substract?.desc9 : 'MISSING' },
      { type: 3 },
      { type: 1, body: language?.statics?.longDesc?.sum_substract?.subTitle3 ? language?.statics?.longDesc?.sum_substract?.subTitle3 : 'MISSING' },
      { type: 2, body: language?.statics?.longDesc?.sum_substract?.desc10 ? language?.statics?.longDesc?.sum_substract?.desc10 : 'MISSING' },
      { type: 4, body: String.raw`5 - 2 = 3` },
      { type: 2, body: language?.statics?.longDesc?.sum_substract?.desc11 ? language?.statics?.longDesc?.sum_substract?.desc11 : 'MISSING' },
      { type: 4, body: String.raw`\begin{array}{l} 17 - 6 = 11 \\ \text{${language?.statics?.longDesc?.ones ? language?.statics?.longDesc?.ones : 'ones:'} }7 - 6 = 1 \\ \text{${language?.statics?.longDesc?.sum_substract?.lk4?.['1'] ? language?.statics?.longDesc?.sum_substract?.lk4?.['1'] : 'ones without reminder:'} }1 \\ \text{${language?.statics?.longDesc?.sum_substract?.lk4?.['2'] ? language?.statics?.longDesc?.sum_substract?.lk4?.['2'] : 'reminder of tens:'} }0 \\ \text{${language?.statics?.longDesc?.tens ? language?.statics?.longDesc?.tens : 'tens:'} }1 + 0 + 0 = 1 \end{array}` },
      { type: 2, body: language?.statics?.longDesc?.sum_substract?.desc12 ? language?.statics?.longDesc?.sum_substract?.desc12 : 'MISSING' },
      { type: 4, body: String.raw`12 - 5 = 7` },
      { type: 2, body: language?.statics?.longDesc?.sum_substract?.desc13 ? language?.statics?.longDesc?.sum_substract?.desc13 : 'MISSING' },
      { type: 4, body: String.raw`\begin{array}{l} 12 - 5 = 7 \\ \text{${language?.statics?.longDesc?.ones ? language?.statics?.longDesc?.ones : 'ones:'} }2 - 5 = -3 \\ \text{${language?.statics?.longDesc?.tens ? language?.statics?.longDesc?.tens : 'tens:'} }10 - 3 = 7 \end{array}` },
      { type: 2, body: language?.statics?.longDesc?.sum_substract?.desc14 ? language?.statics?.longDesc?.sum_substract?.desc14 : 'MISSING' },
      { type: 4, body: String.raw`\begin{array}{l} 12 - 5 = 7 \\ \text{${language?.statics?.longDesc?.tens ? language?.statics?.longDesc?.tens : 'tens:'} }10 - 5 = 5 \\ \text{${language?.statics?.longDesc?.ones ? language?.statics?.longDesc?.ones : 'ones:'} }5 + 2 = 7 \end{array}` },
      { type: 2, body: language?.statics?.longDesc?.sum_substract?.desc15 ? language?.statics?.longDesc?.sum_substract?.desc15 : 'MISSING' },
      { type: 3 },
    ],
    multiply_divide: [
      { type: 0 },
      { type: 1, body: language?.statics?.longDesc?.multiply_divide?.subTitle ? language?.statics?.longDesc?.multiply_divide?.subTitle : 'MISSING' },
      { type: 2, body: language?.statics?.longDesc?.multiply_divide?.desc ? language?.statics?.longDesc?.multiply_divide?.desc : 'MISSING' },
      { type: 4, body: String.raw`\begin{array}{l} 1 \text{ x } 10 = 10 \\ 10 \text{ x } 10 = 100 \\ 100 \text{ x } 10 = 1000 \end{array}` },
      { type: 2, body: language?.statics?.longDesc?.multiply_divide?.desc2 ? language?.statics?.longDesc?.multiply_divide?.desc2 : 'MISSING' },
      { type: 4, body: String.raw`\begin{array}{l} 10 \text{ : } 10 = 1 \\ 100 \text{ : } 10 = 10 \\ 1000 \text{ : } 10 = 100 \end{array}` },
      { type: 2, body: language?.statics?.longDesc?.multiply_divide?.desc3 ? language?.statics?.longDesc?.multiply_divide?.desc3 : 'MISSING' },
      { type: 1, body: language?.statics?.longDesc?.multiply_divide?.subTitle2 ? language?.statics?.longDesc?.multiply_divide?.subTitle2 : 'MISSING' },
      { type: 2, body: language?.statics?.longDesc?.multiply_divide?.desc4 ? language?.statics?.longDesc?.multiply_divide?.desc4 : 'MISSING' },
      { type: 4, body: String.raw`12 \text{ x } 2 = 24` },
      { type: 2, body: language?.statics?.longDesc?.multiply_divide?.desc5 ? language?.statics?.longDesc?.multiply_divide?.desc5 : 'MISSING' },
      { type: 4, body: String.raw`\begin{array}{l} 12 \text{ x } 2 = 24 \\ \text{${language?.statics?.longDesc?.ones ? language?.statics?.longDesc?.ones : 'ones:'} }2 \text{ x } 2 = 4 \\ \text{${language?.statics?.longDesc?.tens ? language?.statics?.longDesc?.tens : 'tens:'} }1 \text{ x } 2 = 2 \end{array}` },
      { type: 2, body: language?.statics?.longDesc?.multiply_divide?.desc6 ? language?.statics?.longDesc?.multiply_divide?.desc6 : 'MISSING' },
      { type: 4, body: String.raw`\begin{array}{l} 12 \text{ x } 12 = 144 \\ \text{${language?.statics?.longDesc?.ones ? language?.statics?.longDesc?.ones : 'ones:'} }2 \text{ x } 12 = 24 \\ \text{${language?.statics?.longDesc?.tens ? language?.statics?.longDesc?.tens : 'tens:'} }1 \text{ x } 12 = 12 \\ \text{${language?.statics?.longDesc?.multiply_divide?.lk?.['1'] ? language?.statics?.longDesc?.multiply_divide?.lk?.['1'] : 'added weight to tens:'} }120 \\ \text{${language?.statics?.longDesc?.final ? language?.statics?.longDesc?.final : 'final answer:'} }120 + 24 = 144 \end{array}` },
      { type: 2, body: language?.statics?.longDesc?.multiply_divide?.desc7 ? language?.statics?.longDesc?.multiply_divide?.desc7 : 'MISSING' },
      { type: 1, body: language?.statics?.longDesc?.multiply_divide?.subTitle3 ? language?.statics?.longDesc?.multiply_divide?.subTitle3 : 'MISSING' },
      { type: 4, body: String.raw`13\text{ x }42 = ?` },
      { type: 3 },
      { type: 1, body: language?.statics?.longDesc?.multiply_divide?.subTitle4 ? language?.statics?.longDesc?.multiply_divide?.subTitle4 : 'MISSING' },
      { type: 2, body: language?.statics?.longDesc?.multiply_divide?.desc8 ? language?.statics?.longDesc?.multiply_divide?.desc8 : 'MISSING' },
      { type: 2, body: language?.statics?.longDesc?.multiply_divide?.desc9 ? language?.statics?.longDesc?.multiply_divide?.desc9 : 'MISSING' },
      { type: 2, body: language?.statics?.longDesc?.multiply_divide?.desc10 ? language?.statics?.longDesc?.multiply_divide?.desc10 : 'MISSING' },
      { type: 2, body: language?.statics?.longDesc?.multiply_divide?.desc11 ? language?.statics?.longDesc?.multiply_divide?.desc11 : 'MISSING' },
      { type: 2, body: language?.statics?.longDesc?.multiply_divide?.desc12 ? language?.statics?.longDesc?.multiply_divide?.desc12 : 'MISSING' },
      { type: 4, body: String.raw`\text{${language?.statics?.longDesc?.multiply_divide?.lk2?.['1'] ? language?.statics?.longDesc?.multiply_divide?.lk2?.['1'] : 'Full answer: quotient'}} \frac{\text{${language?.statics?.longDesc?.multiply_divide?.lk2?.['2'] ? language?.statics?.longDesc?.multiply_divide?.lk2?.['2'] : 'reminder'}}}{\text{${language?.statics?.longDesc?.multiply_divide?.lk2?.['3'] ? language?.statics?.longDesc?.multiply_divide?.lk2?.['3'] : 'divider'}}}` },
      { type: 2, body: language?.statics?.longDesc?.multiply_divide?.desc13 ? language?.statics?.longDesc?.multiply_divide?.desc13 : 'MISSING' },
      { type: 2, body: language?.statics?.longDesc?.multiply_divide?.desc14 ? language?.statics?.longDesc?.multiply_divide?.desc14 : 'MISSING' },
      { type: 4, body: String.raw`\begin{array}{l} 5\text{ x }24 = 120 \\ \text{${language?.statics?.longDesc?.ones ? language?.statics?.longDesc?.ones : 'ones:'} }4\text{ x }5 = 20 \\ \text{${language?.statics?.longDesc?.tens ? language?.statics?.longDesc?.tens : 'tens:'} }2\text{ x }5 = 10 \\ \text{${language?.statics?.longDesc?.multiply_divide?.lk3?.['1'] ? language?.statics?.longDesc?.multiply_divide?.lk3?.['1'] : 'added weight to tens:'} }100 \\ \text{${language?.statics?.longDesc?.final ? language?.statics?.longDesc?.final : 'final answer:'} }100 + 20 = 120 \end{array}` },
      { type: 2, body: language?.statics?.longDesc?.multiply_divide?.desc15 ? language?.statics?.longDesc?.multiply_divide?.desc15 : 'MISSING' },
      { type: 4, body: String.raw`\begin{array}{l} 120\text{ : }5 = 24 \\ \text{${language?.statics?.longDesc?.multiply_divide?.lk4?.['1'] ? language?.statics?.longDesc?.multiply_divide?.lk4?.['1'] : 'the biggest weight is hundreds'}} \\ \text{${language?.statics?.longDesc?.multiply_divide?.lk4?.['2'] ? language?.statics?.longDesc?.multiply_divide?.lk4?.['2'] : 'and we know that:'} } \\ 100\text{ : } 5 = 20 \\ \text{${language?.statics?.longDesc?.quotient ? language?.statics?.longDesc?.quotient : 'quotient:'} }20 \\ \text{${language?.statics?.longDesc?.reminder ? language?.statics?.longDesc?.reminder : 'reminder:'} } 100 - 20\text{ x }5 = 0 \\ \text{${language?.statics?.longDesc?.multiply_divide?.lk4?.['3'] ? language?.statics?.longDesc?.multiply_divide?.lk4?.['3'] : 'there is no reminder left'}} \\ \text{${language?.statics?.longDesc?.multiply_divide?.lk4?.['4'] ? language?.statics?.longDesc?.multiply_divide?.lk4?.['4'] : 'the next is tens'}}\\ 20 \text{ : } 5 = 4 \\ \text{${language?.statics?.longDesc?.quotient ? language?.statics?.longDesc?.quotient : 'quotient:'} }20 + 4 \\ \text{${language?.statics?.longDesc?.reminder ? language?.statics?.longDesc?.reminder : 'reminder:'} }20 - 5\text{ x }4 = 0 \\ \text{${language?.statics?.longDesc?.multiply_divide?.lk4?.['5'] ? language?.statics?.longDesc?.multiply_divide?.lk4?.['5'] : 'there is no reminder left'}} \\ \text{${language?.statics?.longDesc?.multiply_divide?.lk4?.['6'] ? language?.statics?.longDesc?.multiply_divide?.lk4?.['6'] : 'the next is ones'}}\\  0\text{ : }5 = 0 \\ \text{${language?.statics?.longDesc?.quotient ? language?.statics?.longDesc?.quotient : 'quotient:'} }24 + 0 \\ \text{${language?.statics?.longDesc?.reminder ? language?.statics?.longDesc?.reminder : 'reminder:'} }0 \end{array}` },
      { type: 2, body: language?.statics?.longDesc?.multiply_divide?.desc16 ? language?.statics?.longDesc?.multiply_divide?.desc16 : 'MISSING' },
      { type: 1, body: language?.statics?.longDesc?.multiply_divide?.subTitle5 ? language?.statics?.longDesc?.multiply_divide?.subTitle5 : 'MISSING' },
      { type: 4, body: String.raw`248\text{ : }8 = ?` },
      { type: 3 },
    ],
    mixed: [
      { type: 0 },
      { type: 1, body: language?.statics?.longDesc?.mixed?.subTitle ? language?.statics?.longDesc?.mixed?.subTitle : 'MISSING' },
      { type: 2, body: language?.statics?.longDesc?.mixed?.desc ? language?.statics?.longDesc?.mixed?.desc : 'MISSING' },
      { type: 4, body: String.raw`5 + 6 \text{ x } 2 = ?` },
      { type: 2, body: language?.statics?.longDesc?.mixed?.desc2 ? language?.statics?.longDesc?.mixed?.desc2 : 'MISSING' },
      { type: 4, body: String.raw`\begin{array}{l} 1.\text{ ${language?.statics?.longDesc?.mixed?.lk?.['1'] ? language?.statics?.longDesc?.mixed?.lk?.['1'] : 'Parentheses/Brackets'}} \\ 2.\text{ ${language?.statics?.longDesc?.mixed?.lk?.['2'] ? language?.statics?.longDesc?.mixed?.lk?.['2'] : 'Exponents/Powers And Roots'}} \\ 3.\text{ ${language?.statics?.longDesc?.mixed?.lk?.['3'] ? language?.statics?.longDesc?.mixed?.lk?.['3'] : 'Multiplication And Division'}} \\ 4.\text{ ${language?.statics?.longDesc?.mixed?.lk?.['4'] ? language?.statics?.longDesc?.mixed?.lk?.['4'] : 'Sum And Substract'}} \end{array}` },
      { type: 2, body: language?.statics?.longDesc?.mixed?.desc3 ? language?.statics?.longDesc?.mixed?.desc3 : 'MISSING' },
      { type: 4, body: String.raw`\begin{array}{l} 5 + 6 = 11 \\ 11\text{ x }2 = 22 \end{array}` },
      { type: 2, body: language?.statics?.longDesc?.mixed?.desc4 ? language?.statics?.longDesc?.mixed?.desc4 : 'MISSING' },
      { type: 4, body: String.raw`\begin{array}{l} 6\text{ x }2 = 12 \\ 12 + 5 = 17 \end{array}` },
      { type: 2, body: language?.statics?.longDesc?.mixed?.desc5 ? language?.statics?.longDesc?.mixed?.desc5 : 'MISSING' },
      { type: 4, body: String.raw`5 \text{ x } (6 : 2) = ?` },
      { type: 3 },
      { type: 2, body: language?.statics?.longDesc?.mixed?.desc6 ? language?.statics?.longDesc?.mixed?.desc6 : 'MISSING' },
      { type: 4, body: String.raw`\begin{array}{l} 6\text{ : }2 = 3 \\ 3\text{ x }5 = 15 \end{array}` },
      { type: 2, body: language?.statics?.longDesc?.mixed?.desc7 ? language?.statics?.longDesc?.mixed?.desc7 : 'MISSING' },
    ],
    power_root: [
      { type: 0 },
      { type: 1, body: language?.statics?.longDesc?.power_root?.subTitle ? language?.statics?.longDesc?.power_root?.subTitle : 'MISSING' },
      { type: 2, body: language?.statics?.longDesc?.power_root?.desc ? language?.statics?.longDesc?.power_root?.desc : 'MISSING' },
      { type: 4, body: String.raw`\begin{array}{l} 3^{2} = 9 \\ \text{${language?.statics?.longDesc?.power_root?.lk?.['1'] ? language?.statics?.longDesc?.power_root?.lk?.['1'] : 'can be seen as:'}} \\ 3\text{ x } 3 = 9 \end{array}` },
      { type: 2, body: language?.statics?.longDesc?.power_root?.desc2 ? language?.statics?.longDesc?.power_root?.desc2 : 'MISSING' },
      { type: 4, body: String.raw`\begin{array}{l} 5^{3} = 125 \\ \text{${language?.statics?.longDesc?.power_root?.lk2?.['1'] ? language?.statics?.longDesc?.power_root?.lk2?.['1'] : 'can be seen as:'}} \\ 5\text{ x }5\text{ x } 5 = 125 \end{array}` },
      { type: 1, body: language?.statics?.longDesc?.power_root?.subTitle2 ? language?.statics?.longDesc?.power_root?.subTitle2 : 'MISSING' },
      { type: 2, body: language?.statics?.longDesc?.power_root?.desc3 ? language?.statics?.longDesc?.power_root?.desc3 : 'MISSING' },
      { type: 4, body: String.raw`\begin{array}{l} \sqrt{9} = 3 \\ \text{${language?.statics?.longDesc?.power_root?.lk3?.['1'] ? language?.statics?.longDesc?.power_root?.lk3?.['1'] : 'reverse:'} } \\ 9\text{ : }3 = 3 \end{array}` },
      { type: 2, body: language?.statics?.longDesc?.power_root?.desc4 ? language?.statics?.longDesc?.power_root?.desc4 : 'MISSING' },
      { type: 4, body: String.raw`\begin{array}{l} \sqrt[3]{125} = 5 \\ \text{${language?.statics?.longDesc?.power_root?.lk4?.['1'] ? language?.statics?.longDesc?.power_root?.lk4?.['1'] : 'first reverse:'} } \\ 125\text{ : } 5 = 25 \\ \text{${language?.statics?.longDesc?.power_root?.lk4?.['2'] ? language?.statics?.longDesc?.power_root?.lk4?.['2'] : 'second reverse:'} }\\ 25\text{ : }5 = 5\end{array}` },
      { type: 2, body: language?.statics?.longDesc?.power_root?.desc5 ? language?.statics?.longDesc?.power_root?.desc5 : 'MISSING' },
      { type: 2, body: language?.statics?.longDesc?.power_root?.desc6 ? language?.statics?.longDesc?.power_root?.desc6 : 'MISSING' },
      { type: 4, body: String.raw`\begin{array}{l} \text{${language?.statics?.longDesc?.power_root?.lk5?.['1'] ? language?.statics?.longDesc?.power_root?.lk5?.['1'] : 'root of two:'}} \\ \sqrt[2]{9}\text{ ${language?.statics?.longDesc?.power_root?.lk5?.['2'] ? language?.statics?.longDesc?.power_root?.lk5?.['2'] : 'or'} }\sqrt{9} \\ \text{${language?.statics?.longDesc?.power_root?.lk5?.['3'] ? language?.statics?.longDesc?.power_root?.lk5?.['3'] : 'root of three and higher:'}} \\ \sqrt[3]{27} \end{array}` },
      { type: 2, body: language?.statics?.longDesc?.power_root?.desc7 ? language?.statics?.longDesc?.power_root?.desc7 : 'MISSING' },
      { type: 4, body: String.raw`\begin{array}{l} 2 = 2^{1} \\ 7 = 7^{1} \\ \text{${language?.statics?.longDesc?.power_root?.lk6?.['1'] ? language?.statics?.longDesc?.power_root?.lk6?.['1'] : 'and so on...'}} \end{array}` },
      { type: 2, body: language?.statics?.longDesc?.power_root?.desc8 ? language?.statics?.longDesc?.power_root?.desc8 : 'MISSING' },
      { type: 4, body: String.raw`\begin{array}{l} 1 = 0^{0} \text{ (${language?.statics?.longDesc?.power_root?.lk7?.['1'] ? language?.statics?.longDesc?.power_root?.lk7?.['1'] : 'no proof'})} \\ 1 = 9^{0} \\ 1 = 123123^{0} \\ \text{${language?.statics?.longDesc?.power_root?.lk7?.['2'] ? language?.statics?.longDesc?.power_root?.lk7?.['2'] : 'and so on...'}} \end{array}` },
      { type: 1, body: language?.statics?.longDesc?.power_root?.subTitle3 ? language?.statics?.longDesc?.power_root?.subTitle3 : 'MISSING' },
      { type: 4, body: String.raw`2^{5} = ?` },
      { type: 3 },
    ],
    fraction_fractionMixed: [
      { type: 0 },
      { type: 1, body: '' },
      { type: 2, body: '' },
    ],
    forms_sizes: [
      { type: 0 },
      { type: 1, body: '' },
      { type: 2, body: '' },
    ],
    exam_basic: [
      { type: 0 },
      { type: 1, body: '' },
      { type: 2, body: '' },
    ],
    equasions_basic: [
      { type: 0 },
      { type: 1, body: '' },
      { type: 2, body: '' },
    ],
    equations_two_more: [
      { type: 0 },
      { type: 1, body: '' },
      { type: 2, body: '' },
    ],
    verbal_problems: [
      { type: 0 },
      { type: 1, body: '' },
      { type: 2, body: '' },
    ],
    geometry: [
      { type: 0 },
      { type: 1, body: '' },
      { type: 2, body: '' },
    ],
    quadratic_equation: [
      { type: 0 },
      { type: 1, body: '' },
      { type: 2, body: '' },
    ],
    circles: [
      { type: 0 },
      { type: 1, body: '' },
      { type: 2, body: '' },
    ],
    exam_advanced: [
      { type: 0 },
      { type: 1, body: '' },
      { type: 2, body: '' },
    ],
  };

  useEffect(() => {
    setTopic(language?.statics?.topics ? language?.statics?.topics : topicNames);
  }, [language]);

  return (<Flex alignItems={'center'}
    flexDirection={"column"}
    w={'100%'}
    paddingLeft={pos === 'left' ? { base: '3rem', sm: '3rem', md: '3rem', lg: '5rem' } : ''}
    paddingRight={pos === 'right' ? { base: '3rem', sm: '3rem', md: '3rem', lg: '5rem' } : ''}
    paddingTop={pos === 'top' ? { base: '2.5rem', sm: '2.5rem', md: '2.5rem', lg: '10%' } : { md: '5%' }}
    paddingBottom={pos === 'bottom' ? { base: '2.5rem', sm: '2.5rem', md: '2.5rem', lg: '5rem' } : ''}>

    <Stack border
      borderWidth={1}
      paddingX={5}
      paddingY={7}
      rounded={'xl'}
      width={{ base: "100%", sm: '80%' }}
      h={'fit'}
      gap={3}
      maxW={'65rem'}
      _light={{
        boxShadow: 'lg',
        background: 'white',
        borderColor: '#B1B7BA'
      }}
      _dark={{
        boxShadow: '0 0 2rem 0.5rem rgb(238, 246, 249)',
        background: '#8b8da0',
        borderColor: '#1D282E',
      }}>

      <TwoTitlesSlot title_info={{
        title_a: {
          pi_icon: 'pi-question',
          title: language?.hints?.hintsTitle ? language?.hints?.hintsTitle : 'HINTS'
        },
        title_b: {
          pi_icon: 'pi-list-check',
          title: language?.hints?.schoolsTopicTitle ? language?.hints?.schoolsTopicTitle : 'SCHOOLS TOPICS'
        },

      }} />
      <Separator marginTop={3} />
      <Flex hideFrom={'lg'}>
        {
          // BUG: (minor) by resizing the screen to mobile, it should reset value
          //  of the useTop or set cur value to the Spin.
        }
        <Spin classList={topic}
          additional={{ teach: (language?.hints?.teach ? language?.hints?.teach : 'Discuss With Teach!') }}
          getValue={(value) => setTop(value)} />
      </Flex>

      <Flex hideBelow={'lg'} justify={'space-between'}>
        <TopicBut pi_icon={'pi-list-check'}
          title={language?.hints?.elementarySchool ? language?.hints?.elementarySchool : 'Elementary-School'}
          onClick={() => setSchool(true)}
          showSub={true}
        />

        <TopicBut pi_icon={'pi-list-check'}
          title={language?.hints?.highSchool ? language?.hints?.highSchool : 'High-School'}
          onClick={() => setSchool(false)}
          showSub={true}
          dir={'row-reverse'}
        />
      </Flex>
      <Flex gap={3}
        flexDirection={useSchool ? 'row-reverse' : 'row'}
        position={'relative'}
      >

        <Flex position={'relative'}
          w={'full'}
          h={{ base: 'fit', sm: 'auto' }}
          border
          borderWidth={1}
          justifyItems={'center'}
          rounded={'xl'}
          flexDirection={"column"}
          gapY={3}
          padding={5}
          _light={{
            borderColor: '#B1B7BA/40',
            color: '#1D282E'
          }}
          _dark={{
            borderColor: '#1D282E',
            color: '#EEF6F9',
            background: '#464547'
          }}>

          <Flex flexDir='column'
            h={'fit'}
            gapY={3}>
            {
              useTop == 'teach' ? (!!logs?.user ? (
                <Flex color={{ _light: '#1D282E', _dark: '#EEF6F9' }}
                  flexDirection={'column'}
                  gapY={3}>

                  <Flex flexDirection={'column'}
                    gapX={2}
                    boxShadow={'sm'}
                    rounded={'sm'}
                    paddingX={3}
                    paddingY={1}>

                    <Text fontWeight={'medium'}>{language?.hints?.user ? language?.hints?.user : 'User:'}</Text>
                    <ReactMarkDown>{logs.user}</ReactMarkDown>

                  </Flex>
                  <Flex flexDirection={'column'}
                    gapX={2}
                    boxShadow={'sm'}
                    rounded={'sm'}
                    paddingX={3}
                    paddingY={1}>

                    <Text fontWeight={'medium'}>{language?.hints?.teacher ? language?.hints?.teacher : 'Teacher:'}</Text>
                    <Flex flexDir={'column'}>{mixedText(logs.model)}</Flex>

                  </Flex>

                </Flex>) :
                (<Text color={{ _light: '#1D282E', _dark: '#EEF6F9' }}
                  h={'fit'}
                  boxShadow={'sm'}
                  rounded={'sm'}
                  paddingX={3}
                  paddingY={1}>
                  {language?.hints?.teacherWelcome ?
                    language?.hints?.teacherWelcome :
                    'Its a chat with virtual teach! Ask it freely about math topics and exercises struggle!'}
                </Text>)
              ) :
                (
                  language?.statics?.longDesc ? (hintsVoca[useTop].map((thing, ind) => {
                    if (thing.length != 0 && (!!thing.type || !thing?.type && thing?.type == 0)) {
                      if (thing.type == 0) // Matin title
                        return (<Text key={ind}
                          hideBelow={'lg'}
                          h={'fit'}
                          color={{ _light: '#1D282E/90', _dark: '#EEF6F9' }}
                          fontWeight={'bold'}
                          fontSize={'xl'}
                          textAlign={'center'}
                          marginBottom={3}
                          background={{ _dark: '#1D282E/65' }}
                          boxShadow={{ _dark: '0 0 5px 2px #EEF6F9' }}
                          rounded={{ _dark: 'sm' }}
                          paddingX={3}
                        >
                          {topic[useTop].toUpperCase()}
                        </Text>)
                      else if (thing.type == 1) // Sub title
                        return (<Text key={ind}
                          h={'fit'}
                          color={{ _light: '#1D282E/90', _dark: '#EEF6F9' }}
                          fontWeight={'medium'}
                          textAlign={'left'}
                          marginBottom={1}
                          background={{ _dark: '#1D282E/65' }}
                          boxShadow={{ _dark: '0 0 5px 2px #EEF6F9' }}
                          rounded={{ _dark: 'sm' }}
                          paddingX={3}
                        >
                          {thing.body}
                        </Text>)
                      else if (thing.type == 2) // Description
                        return (<Text key={ind}
                          boxShadow={'sm'}
                          rounded={'sm'}
                          paddingX={3}
                          paddingY={1}
                          h={'fit'}
                          color={{ _light: '#1D282E/90', _dark: '#EEF6F9' }}
                          textAlign={'left'}
                          marginBottom={3}
                        >
                          {thing.body}
                        </Text>)
                      else if (thing.type == 3) return (<CustomForm />) // Custom form
                      else if (thing.type == 4) // LaTeX and KaTeX form
                        return (<Flex justifyContent={'center'}
                          boxShadow={'sm'}
                          rounded={'sm'}
                          paddingX={3}
                          paddingY={1}>
                          <BlockMath math={!thing.body ? '\\text{LaTeX and KaTeX goes here!}' : thing.body} />
                        </Flex>);
                      else if (thing.type == 5) { // GEOGEBRA
                      }
                    }
                    else return <Text h={'fit'}
                      color={{ _light: '#1D282E/90', _dark: '#EEF6F9' }}
                      fontWeight={'medium'}
                      fontSize={'lg'}
                      textAlign={'center'}
                    >
                      {`Missing description!`}
                    </Text>
                  })) : (<Text h={'fit'}
                    color={{ _light: '#1D282E/90', _dark: '#EEF6F9' }}
                    fontWeight={'medium'}
                    fontSize={'lg'}
                    textAlign={'center'}
                  >
                    {`${topic[useTop]} missing description!`}
                  </Text>)
                )
            }
          </Flex>
          {
            useTop == 'teach' ? (<TextArea />) : null
          }
        </Flex>
        <Flex flexDirection={"column"} gapY={3} hideBelow={'lg'}>

          <Separator />
          <TopicBut
            pi_icon={'pi-question'}
            title={language?.hints?.placeholder ? language?.hints?.placeholder : 'Discuss With Teach!'}
            onClick={() => setTop('teach')}
            showSub={true}
          />
          <Separator />
          {
            Object.entries(topic).map((topic, index) => {
              if (useSchool && index >= 0 && index < 7)
                return (<TopicBut key={topic[0]}
                  pi_icon={'pi-hashtag'}
                  title={topic[1]}
                  onClick={() => setTop(topic[0])}
                  showSub={true}
                />)
              else if (!useSchool && index >= 7 && index < 14)
                return (<TopicBut key={topic[0]}
                  pi_icon={'pi-hashtag'}
                  title={topic[1]}
                  onClick={() => setTop(topic[0])}
                  showSub={true}
                />)
            })
          }
        </Flex>

      </Flex>

    </Stack >

  </Flex >)
}

export default HintsPage