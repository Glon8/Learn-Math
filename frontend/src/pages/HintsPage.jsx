import { Flex, Text, Separator, Stack } from "@chakra-ui/react"
import "primeicons/primeicons.css";
import { useState } from "react";
import ReactMarkDown from 'react-markdown'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'

import { userContext } from "../context/UserContext";
import { languageContext } from "../context/LanguagesContext.jsx";
import { pingContext } from "../context/PingContext.jsx";

import LoadingBanner from "../components/LoadindBanner.jsx";
import CustomForm from "../components/CustomForm.jsx";
import TwoTitlesSlot from "../components/TwoTitlesSlot";
import TopicBut from "../components/TopicBut";
import Spin from "../components/Spin";
import TextArea from "../components/TextArea";
import { useEffect } from "react";

function HintsPage() {
  const { pos, logs, lang } = userContext();
  const { language, defPack } = languageContext();
  const { useRes } = pingContext();

  const [useSchool, setSchool] = useState(true);
  const [useTop, setTop] = useState('sum_substract');

  const [topic, setTopic] = useState(language?.statics?.topics ?? defPack.statics.topics);

  const cleanGeminiText = (raw) => {
    let text = raw;

    // Remove lone dollar signs that aren't closing anything
    const count = (text.match(/\$/g) || []).length;
    if (count % 2 !== 0) text = text.replace(/\$/g, ""); // odd count → remove all

    // Normalize multiple newlines and spacing
    text = text.replace(/\r?\n{2,}/g, "\n\n");
    text = text.replace(/[ \t]+/g, " ");

    text = text.replace(/\$([0-9]+)\n([0-9]+)\$/g, "\$$1$2\$");

    return text.trim();
  };

  // Faces & emotions
  const emojiMap = {
    ":smile:": "😄",
    ":grin:": "😁",
    ":laugh:": "😂",
    ":joy:": "🤣",
    ":wink:": "😉",
    ":blush:": "😊",
    ":relaxed:": "☺️",
    ":heart_eyes:": "😍",
    ":kissing_heart:": "😘",
    ":thinking:": "🤔",
    ":neutral_face:": "😐",
    ":expressionless:": "😑",
    ":unamused:": "😒",
    ":sweat:": "😓",
    ":cry:": "😢",
    ":sob:": "😭",
    ":angry:": "😠",
    ":rage:": "😡",
    ":fearful:": "😨",
    ":flushed:": "😳",
    ":scream:": "😱",
    ":sleeping:": "😴",
    ":zzz:": "💤",

    // Gestures & hands
    ":thumbsup:": "👍",
    ":thumbsdown:": "👎",
    ":ok_hand:": "👌",
    ":clap:": "👏",
    ":wave:": "👋",
    ":raised_hand:": "✋",
    ":pray:": "🙏",
    ":muscle:": "💪",
    ":point_up:": "☝️",
    ":point_down:": "👇",
    ":point_left:": "👈",
    ":point_right:": "👉",

    // Hearts & love
    ":heart:": "❤️",
    ":broken_heart:": "💔",
    ":yellow_heart:": "💛",
    ":green_heart:": "💚",
    ":blue_heart:": "💙",
    ":purple_heart:": "💜",
    ":sparkling_heart:": "💖",

    // Symbols
    ":star:": "⭐",
    ":star2:": "🌟",
    ":fire:": "🔥",
    ":check:": "✅",
    ":cross:": "❌",
    ":warning:": "⚠️",
    ":question:": "❓",
    ":exclamation:": "❗",

    // Objects
    ":book:": "📖",
    ":pencil:": "✏️",
    ":computer:": "💻",
    ":iphone:": "📱",
    ":lightbulb:": "💡",
    ":calendar:": "📅",
    ":alarm_clock:": "⏰",
    ":moneybag:": "💰",

    // Food & drink
    ":apple:": "🍎",
    ":banana:": "🍌",
    ":pizza:": "🍕",
    ":burger:": "🍔",
    ":coffee:": "☕",
    ":tea:": "🍵",
    ":cake:": "🍰",

    // Nature & animals
    ":sun:": "☀️",
    ":cloud:": "☁️",
    ":rainbow:": "🌈",
    ":moon:": "🌙",
    ":starry_night:": "🌌",
    ":dog:": "🐶",
    ":cat:": "🐱",
    ":mouse:": "🐭",
    ":lion:": "🦁",
    ":tiger:": "🐯",
    ":unicorn:": "🦄",

    // Math / logic
    ":plus:": "+",
    ":minus:": "-",
    ":times:": "×",
    ":divide:": "÷",
    ":equals:": "=",
    ":percent:": "%",
    ":infinity:": "∞",
    ":pi:": "π",
    ":sqrt:": "√",
    ":theta:": "θ",
    ":sigma:": "Σ",

    // Misc
    ":rocket:": "🚀",
    ":trophy:": "🏆",
    ":medal:": "🏅",
    ":bell:": "🔔",
    ":mag:": "🔍",
    ":scroll:": "📜",
    ":key:": "🔑",
    ":lock:": "🔒",
    ":unlock:": "🔓"
  };

  const parseHighlights = (text) => {
    const parts = text.split(/(\[\[[^\]]+\]\])/g);
    return parts.map((p, i) => {
      if (p.startsWith("[[") && p.endsWith("]]")) {
        const content = p.slice(2, -2);
        return (
          <Text
            key={i}
            backgroundColor={'yellow'}
            fontWeight={'bold'}
          >
            {content}
          </Text>
        );
      }

      // replace emojis
      let replaced = p.replace(/:\w+:/g, (match) => emojiMap[match] || match);
      return <ReactMarkDown key={i}>{replaced}</ReactMarkDown>;
    });
  };

  const mixedText = (message) => {
    const cleaned = cleanGeminiText(message);

    const parts = cleaned.split(/(\$\$[^$]*\$\$|\$[^$]*\$)/g);

    return parts.map((part, i) => {
      if (part.startsWith("$$") && part.endsWith("$$")) {
        const math = part.slice(2, -2);
        return <BlockMath key={i} math={math} />;
      }

      if (part.startsWith("$") && part.endsWith("$")) {
        const math = part.slice(1, -1);
        return <InlineMath key={i} math={math} />;
      }

      return parseHighlights(part);
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
      { type: 1, body: language?.statics?.longDesc?.sum_substract?.subTitle ?? defPack.statics.longDesc.sum_substract.subTitle },
      { type: 2, body: language?.statics?.longDesc?.sum_substract?.desc ?? defPack.statics.longDesc.sum_substract.desc },
      { type: 4, body: '0,1,2,3,4,5,6,7,8,9' },
      { type: 2, body: language?.statics?.longDesc?.sum_substract?.desc2 ?? defPack.statics.longDesc.sum_substract.desc2 },
      { type: 4, body: String.raw`\begin{array}{l} \text{2 - ${language?.statics?.longDesc?.sum_substract?.lk?.['1'] ?? defPack.statics.longDesc.sum_substract.lk['1']} } \\ \text{23 - ${language?.statics?.longDesc?.sum_substract?.lk?.['2'] ?? defPack.statics.longDesc.sum_substract.lk['2']} } \\ \text{234 - ${language?.statics?.longDesc?.sum_substract?.lk?.['3'] ?? defPack.statics.longDesc.sum_substract.lk['3']} } \end{array}` },
      { type: 2, body: language?.statics?.longDesc?.sum_substract?.desc3 ?? defPack.statics.longDesc.sum_substract.desc3 },
      { type: 4, body: String.raw`\begin{array}{l} \text{${language?.statics?.longDesc?.sum_substract?.lk2?.['1'] ?? defPack.statics.longDesc.sum_substract.lk2['1']} } \\ \text{2 ${language?.statics?.longDesc?.sum_substract?.lk2?.['2'] ?? defPack.statics.longDesc.sum_substract.lk2['2']} = 20} \\ \text{3 ${language?.statics?.longDesc?.sum_substract?.lk2?.['3'] ?? defPack.statics.longDesc.sum_substract.lk2['3']} = 3} \end{array}` },
      { type: 2, body: language?.statics?.longDesc?.sum_substract?.desc4 ?? defPack.statics.longDesc.sum_substract.desc4 },
      { type: 1, body: language?.statics?.longDesc?.sum_substract?.subTitle2 ?? defPack.statics.longDesc.sum_substract.subTitle2 },
      { type: 2, body: language?.statics?.longDesc?.sum_substract?.desc5 ?? defPack.statics.longDesc.sum_substract.desc5 },
      { type: 4, body: String.raw`\begin{array}{l} 2 + 2 = 4 \\ 0 + 5 = 5 \\ 1 + 3 = 4 \end{array}` },
      { type: 2, body: language?.statics?.longDesc?.sum_substract?.desc6 ?? defPack.statics.longDesc.sum_substract.desc6 },
      { type: 4, body: String.raw`\begin{array}{l} 11 + 2 = 13 \\ \text{${language?.statics?.longDesc?.ones ?? defPack.statics.longDesc.ones} }1 + 2 = 3 \\ \text{${language?.statics?.longDesc?.tens ?? defPack.statics.longDesc.tens} }1 + 0 = 1 \end{array}` },
      { type: 2, body: language?.statics?.longDesc?.sum_substract?.desc7 ?? defPack.statics.longDesc.sum_substract.desc7 },
      { type: 4, body: String.raw`5 + 5 = 10` },
      { type: 2, body: language?.statics?.longDesc?.sum_substract?.desc8 ?? defPack.statics.longDesc.sum_substract.desc8 },
      { type: 4, body: String.raw`\begin{array}{l} 19 + 2 = 21 \\ \text{${language?.statics?.longDesc?.ones ?? defPack.statics.longDesc.ones} }9 + 2 = 11 \\ \text{${language?.statics?.longDesc?.sum_substract?.lk3?.['1'] ?? defPack.statics.longDesc.sum_substract.lk3['1']} }1 \\ \text{${language?.statics?.longDesc?.sum_substract?.lk3?.['2'] ?? defPack.statics.longDesc.sum_substract.lk3['2']} }1 \\ \text{${language?.statics?.longDesc?.tens ?? defPack.statics.longDesc.tens} }1 + 0 + 1 = 2 \end{array}` },
      { type: 2, body: language?.statics?.longDesc?.sum_substract?.desc9 ?? defPack.statics.longDesc.sum_substract.desc9 },
      { type: 3 },
      { type: 1, body: language?.statics?.longDesc?.sum_substract?.subTitle3 ?? defPack.statics.longDesc.sum_substract.subTitle3 },
      { type: 2, body: language?.statics?.longDesc?.sum_substract?.desc10 ?? defPack.statics.longDesc.sum_substract.desc10 },
      { type: 4, body: String.raw`5 - 2 = 3` },
      { type: 2, body: language?.statics?.longDesc?.sum_substract?.desc11 ?? defPack.statics.longDesc.sum_substract.desc11 },
      { type: 4, body: String.raw`\begin{array}{l} 17 - 6 = 11 \\ \text{${language?.statics?.longDesc?.ones ?? defPack.statics.longDesc.ones} }7 - 6 = 1 \\ \text{${language?.statics?.longDesc?.sum_substract?.lk4?.['1'] ?? defPack.statics.longDesc.sum_substract.lk4['1']} }1 \\ \text{${language?.statics?.longDesc?.sum_substract?.lk4?.['2'] ?? defPack.statics.longDesc.sum_substract.lk4['2']} }0 \\ \text{${language?.statics?.longDesc?.tens ?? defPack.statics.longDesc.tens} }1 + 0 + 0 = 1 \end{array}` },
      { type: 2, body: language?.statics?.longDesc?.sum_substract?.desc12 ?? defPack.statics.longDesc.sum_substract.desc12 },
      { type: 4, body: String.raw`12 - 5 = 7` },
      { type: 2, body: language?.statics?.longDesc?.sum_substract?.desc13 ?? defPack.statics.longDesc.sum_substract.desc13 },
      { type: 4, body: String.raw`\begin{array}{l} 12 - 5 = 7 \\ \text{${language?.statics?.longDesc?.ones ?? defPack.statics.longDesc.ones} }2 - 5 = -3 \\ \text{${language?.statics?.longDesc?.tens ?? defPack.statics.longDesc.tens} }10 - 3 = 7 \end{array}` },
      { type: 2, body: language?.statics?.longDesc?.sum_substract?.desc14 ?? defPack.statics.longDesc.sum_substract.desc14 },
      { type: 4, body: String.raw`\begin{array}{l} 12 - 5 = 7 \\ \text{${language?.statics?.longDesc?.tens ?? defPack.statics.longDesc.tens} }10 - 5 = 5 \\ \text{${language?.statics?.longDesc?.ones ?? defPack.statics.longDesc.ones} }5 + 2 = 7 \end{array}` },
      { type: 2, body: language?.statics?.longDesc?.sum_substract?.desc15 ?? defPack.statics.longDesc.sum_substract.desc15 },
      { type: 3 },
    ],
    multiply_divide: [
      { type: 0 },
      { type: 1, body: language?.statics?.longDesc?.multiply_divide?.subTitle ?? defPack.statics.longDesc.multiply_divide.subTitle },
      { type: 2, body: language?.statics?.longDesc?.multiply_divide?.desc ?? defPack.statics.longDesc.multiply_divide.desc },
      { type: 4, body: String.raw`\begin{array}{l} 1 \text{ x } 10 = 10 \\ 10 \text{ x } 10 = 100 \\ 100 \text{ x } 10 = 1000 \end{array}` },
      { type: 2, body: language?.statics?.longDesc?.multiply_divide?.desc2 ?? defPack.statics.longDesc.multiply_divide.desc2 },
      { type: 4, body: String.raw`\begin{array}{l} 10 \text{ : } 10 = 1 \\ 100 \text{ : } 10 = 10 \\ 1000 \text{ : } 10 = 100 \end{array}` },
      { type: 2, body: language?.statics?.longDesc?.multiply_divide?.desc3 ?? defPack.statics.longDesc.multiply_divide.desc3 },
      { type: 1, body: language?.statics?.longDesc?.multiply_divide?.subTitle2 ?? defPack.statics.longDesc.multiply_divide.subTitle2 },
      { type: 2, body: language?.statics?.longDesc?.multiply_divide?.desc4 ?? defPack.statics.longDesc.multiply_divide.desc4 },
      { type: 4, body: String.raw`12 \text{ x } 2 = 24` },
      { type: 2, body: language?.statics?.longDesc?.multiply_divide?.desc5 ?? defPack.statics.longDesc.multiply_divide.desc5 },
      {
        type: 4,
        body: String.raw`\begin{array}{l}
      12 \text{ x } 2 = 24 \\
      \text{${language?.statics?.longDesc?.ones ?? defPack.statics.longDesc.ones}} 2 \text{ x } 2 = 4 \\
      \text{${language?.statics?.longDesc?.tens ?? defPack.statics.longDesc.tens}} 1 \text{ x } 2 = 2
    \end{array}`,
      },
      { type: 2, body: language?.statics?.longDesc?.multiply_divide?.desc6 ?? defPack.statics.longDesc.multiply_divide.desc6 },
      {
        type: 4,
        body: String.raw`\begin{array}{l}
      12 \text{ x } 12 = 144 \\
      \text{${language?.statics?.longDesc?.ones ?? defPack.statics.longDesc.ones}} 2 \text{ x } 12 = 24 \\
      \text{${language?.statics?.longDesc?.tens ?? defPack.statics.longDesc.tens}} 1 \text{ x } 12 = 12 \\
      \text{${language?.statics?.longDesc?.multiply_divide?.lk?.['1'] ?? defPack.statics.longDesc.multiply_divide.lk['1']}} 120 \\
      \text{${language?.statics?.longDesc?.final ?? defPack.statics.longDesc.final}} 120 + 24 = 144
    \end{array}`,
      },
      { type: 2, body: language?.statics?.longDesc?.multiply_divide?.desc7 ?? defPack.statics.longDesc.multiply_divide.desc7 },
      { type: 1, body: language?.statics?.longDesc?.multiply_divide?.subTitle3 ?? defPack.statics.longDesc.multiply_divide.subTitle3 },
      { type: 4, body: String.raw`13\text{ x }42 = ?` },
      { type: 3 },
      { type: 1, body: language?.statics?.longDesc?.multiply_divide?.subTitle4 ?? defPack.statics.longDesc.multiply_divide.subTitle4 },
      { type: 2, body: language?.statics?.longDesc?.multiply_divide?.desc8 ?? defPack.statics.longDesc.multiply_divide.desc8 },
      { type: 1, body: language?.statics?.longDesc?.multiply_divide?.subTitle5 ?? defPack.statics.longDesc.multiply_divide.subTitle5 },
      { type: 1, body: language?.statics?.longDesc?.multiply_divide?.subTitle6 ?? defPack.statics.longDesc.multiply_divide.subTitle6 },
      { type: 1, body: language?.statics?.longDesc?.multiply_divide?.subTitle7 ?? defPack.statics.longDesc.multiply_divide.subTitle7 },
      { type: 1, body: language?.statics?.longDesc?.multiply_divide?.subTitle8 ?? defPack.statics.longDesc.multiply_divide.subTitle8 },
      {
        type: 4,
        body: String.raw`\text{${language?.statics?.longDesc?.multiply_divide?.lk2?.['1'] ?? defPack.statics.longDesc.multiply_divide.lk2['1']}}
    \frac{\text{${language?.statics?.longDesc?.multiply_divide?.lk2?.['2'] ?? defPack.statics.longDesc.multiply_divide.lk2['2']}}}
    {\text{${language?.statics?.longDesc?.multiply_divide?.lk2?.['3'] ?? defPack.statics.longDesc.multiply_divide.lk2['3']}}}`,
      },
      { type: 2, body: language?.statics?.longDesc?.multiply_divide?.desc13 ?? defPack.statics.longDesc.multiply_divide.desc13 },
      { type: 2, body: language?.statics?.longDesc?.multiply_divide?.desc14 ?? defPack.statics.longDesc.multiply_divide.desc14 },
      {
        type: 4,
        body: String.raw`\begin{array}{l}
      5\text{ x }24 = 120 \\
      \text{${language?.statics?.longDesc?.ones ?? defPack.statics.longDesc.ones}} 4\text{ x }5 = 20 \\
      \text{${language?.statics?.longDesc?.tens ?? defPack.statics.longDesc.tens}} 2\text{ x }5 = 10 \\
      \text{${language?.statics?.longDesc?.multiply_divide?.lk3?.['1'] ?? defPack.statics.longDesc.multiply_divide.lk3['1']}} 100 \\
      \text{${language?.statics?.longDesc?.final ?? defPack.statics.longDesc.final}} 100 + 20 = 120
    \end{array}`,
      },
      { type: 2, body: language?.statics?.longDesc?.multiply_divide?.desc15 ?? defPack.statics.longDesc.multiply_divide.desc15 },
      {
        type: 4,
        body: String.raw`\begin{array}{l}
      120\text{ : }5 = 24 \\
      \text{${language?.statics?.longDesc?.multiply_divide?.lk4?.['1'] ?? defPack.statics.longDesc.multiply_divide.lk4['1']}} \\
      \text{${language?.statics?.longDesc?.multiply_divide?.lk4?.['2'] ?? defPack.statics.longDesc.multiply_divide.lk4['2']}} \\
      100\text{ : } 5 = 20 \\
      \text{${language?.statics?.longDesc?.quotient ?? defPack.statics.longDesc.quotient}} 20 \\
      \text{${language?.statics?.longDesc?.reminder ?? defPack.statics.longDesc.reminder}} 100 - 20\text{ x }5 = 0 \\
      \text{${language?.statics?.longDesc?.multiply_divide?.lk4?.['3'] ?? defPack.statics.longDesc.multiply_divide.lk4['3']}} \\
      \text{${language?.statics?.longDesc?.multiply_divide?.lk4?.['4'] ?? defPack.statics.longDesc.multiply_divide.lk4['4']}} \\
      20 \text{ : } 5 = 4 \\
      \text{${language?.statics?.longDesc?.quotient ?? defPack.statics.longDesc.quotient}} 20 + 4 \\
      \text{${language?.statics?.longDesc?.reminder ?? defPack.statics.longDesc.reminder}} 20 - 5\text{ x }4 = 0 \\
      \text{${language?.statics?.longDesc?.multiply_divide?.lk4?.['5'] ?? defPack.statics.longDesc.multiply_divide.lk4['5']}} \\
      \text{${language?.statics?.longDesc?.multiply_divide?.lk4?.['6'] ?? defPack.statics.longDesc.multiply_divide.lk4['6']}} \\
      0\text{ : }5 = 0 \\
      \text{${language?.statics?.longDesc?.quotient ?? defPack.statics.longDesc.quotient}} 24 + 0 \\
      \text{${language?.statics?.longDesc?.reminder ?? defPack.statics.longDesc.reminder}} 0
    \end{array}`,
      },
      { type: 2, body: language?.statics?.longDesc?.multiply_divide?.desc16 ?? defPack.statics.longDesc.multiply_divide.desc16 },
      { type: 1, body: language?.statics?.longDesc?.multiply_divide?.subTitle9 ?? defPack.statics.longDesc.multiply_divide.subTitle9 },
      { type: 4, body: String.raw`248\text{ : }8 = ?` },
      { type: 3 },
    ],
    mixed: [
      { type: 0 },
      { type: 1, body: language?.statics?.longDesc?.mixed?.subTitle ?? defPack.statics.longDesc.mixed.subTitle },
      { type: 2, body: language?.statics?.longDesc?.mixed?.desc ?? defPack.statics.longDesc.mixed.desc },
      { type: 4, body: String.raw`5 + 6 \text{ x } 2 = ?` },
      { type: 2, body: language?.statics?.longDesc?.mixed?.desc2 ?? defPack.statics.longDesc.mixed.desc2 },
      { type: 1, body: language?.statics?.longDesc?.mixed?.subTitle2 ?? defPack.statics.longDesc.mixed.subTitle2 },
      { type: 2, body: language?.statics?.longDesc?.mixed?.desc3 ?? defPack.statics.longDesc.mixed.desc3 },
      { type: 4, body: String.raw`\begin{array}{l} 5 + 6 = 11 \\ 11\text{ x }2 = 22 \end{array}` },
      { type: 2, body: language?.statics?.longDesc?.mixed?.desc4 ?? defPack.statics.longDesc.mixed.desc4 },
      { type: 4, body: String.raw`\begin{array}{l} 6\text{ x }2 = 12 \\ 12 + 5 = 17 \end{array}` },
      { type: 2, body: language?.statics?.longDesc?.mixed?.desc5 ?? defPack.statics.longDesc.mixed.desc5 },
      { type: 4, body: String.raw`5 \text{ x } (6 : 2) = ?` },
      { type: 3 },
      { type: 2, body: language?.statics?.longDesc?.mixed?.desc6 ?? defPack.statics.longDesc.mixed.desc6 },
      { type: 4, body: String.raw`\begin{array}{l} 6\text{ : }2 = 3 \\ 3\text{ x }5 = 15 \end{array}` },
      { type: 2, body: language?.statics?.longDesc?.mixed?.desc7 ?? defPack.statics.longDesc.mixed.desc7 },
    ],
    power_root: [
      { type: 0 },
      { type: 1, body: language?.statics?.longDesc?.power_root?.subTitle ?? defPack.statics.longDesc.power_root.subTitle },
      { type: 2, body: language?.statics?.longDesc?.power_root?.desc ?? defPack.statics.longDesc.power_root.desc },
      {
        type: 4,
        body: String.raw`\begin{array}{l}
      3^{2} = 9 \\
      \text{${language?.statics?.longDesc?.power_root?.lk?.['1'] ?? defPack.statics.longDesc.power_root.lk['1']}} \\
      3\text{ x } 3 = 9
    \end{array}`,
      },
      { type: 2, body: language?.statics?.longDesc?.power_root?.desc2 ?? defPack.statics.longDesc.power_root.desc2 },
      {
        type: 4,
        body: String.raw`\begin{array}{l}
      5^{3} = 125 \\
      \text{${language?.statics?.longDesc?.power_root?.lk2?.['1'] ?? defPack.statics.longDesc.power_root.lk2['1']}} \\
      5\text{ x }5\text{ x } 5 = 125
    \end{array}`,
      },
      { type: 1, body: language?.statics?.longDesc?.power_root?.subTitle2 ?? defPack.statics.longDesc.power_root.subTitle2 },
      { type: 2, body: language?.statics?.longDesc?.power_root?.desc3 ?? defPack.statics.longDesc.power_root.desc3 },
      {
        type: 4,
        body: String.raw`\begin{array}{l}
      \sqrt{9} = 3 \\
      \text{${language?.statics?.longDesc?.power_root?.lk3?.['1'] ?? defPack.statics.longDesc.power_root.lk3['1']}} \\
      9\text{ : }3 = 3
    \end{array}`,
      },
      { type: 2, body: language?.statics?.longDesc?.power_root?.desc4 ?? defPack.statics.longDesc.power_root.desc4 },
      {
        type: 4,
        body: String.raw`\begin{array}{l}
      \sqrt[3]{125} = 5 \\
      \text{${language?.statics?.longDesc?.power_root?.lk4?.['1'] ?? defPack.statics.longDesc.power_root.lk4['1']}} \\
      125\text{ : } 5 = 25 \\
      \text{${language?.statics?.longDesc?.power_root?.lk4?.['2'] ?? defPack.statics.longDesc.power_root.lk4['2']}} \\
      25\text{ : }5 = 5
    \end{array}`,
      },
      { type: 2, body: language?.statics?.longDesc?.power_root?.desc5 ?? defPack.statics.longDesc.power_root.desc5 },
      { type: 2, body: language?.statics?.longDesc?.power_root?.desc6 ?? defPack.statics.longDesc.power_root.desc6 },
      {
        type: 4,
        body: String.raw`\begin{array}{l}
      \text{${language?.statics?.longDesc?.power_root?.lk5?.['1'] ?? defPack.statics.longDesc.power_root.lk5['1']}} \\
      \sqrt[2]{9}\text{ ${language?.statics?.longDesc?.power_root?.lk5?.['2'] ?? defPack.statics.longDesc.power_root.lk5['2']}} \sqrt{9} \\
      \text{${language?.statics?.longDesc?.power_root?.lk5?.['3'] ?? defPack.statics.longDesc.power_root.lk5['3']}} \\
      \sqrt[3]{27}
    \end{array}`,
      },
      { type: 2, body: language?.statics?.longDesc?.power_root?.desc7 ?? defPack.statics.longDesc.power_root.desc7 },
      {
        type: 4,
        body: String.raw`\begin{array}{l}
      2 = 2^{1} \\
      7 = 7^{1} \\
      \text{${language?.statics?.longDesc?.power_root?.lk6?.['1'] ?? defPack.statics.longDesc.power_root.lk6['1']}}
    \end{array}`,
      },
      { type: 2, body: language?.statics?.longDesc?.power_root?.desc8 ?? defPack.statics.longDesc.power_root.desc8 },
      {
        type: 4,
        body: String.raw`\begin{array}{l}
      1 = 0^{0} \text{ (${language?.statics?.longDesc?.power_root?.lk7?.['1'] ?? defPack.statics.longDesc.power_root.lk7['1']})} \\
      1 = 9^{0} \\
      1 = 123123^{0} \\
      \text{${language?.statics?.longDesc?.power_root?.lk7?.['2'] ?? defPack.statics.longDesc.power_root.lk7['2']}}
    \end{array}`,
      },
      { type: 1, body: language?.statics?.longDesc?.power_root?.subTitle3 ?? defPack.statics.longDesc.power_root.subTitle3 },
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
      { type: 2, body: language?.statics?.longDesc?.exam_basic ?? defPack.statics.longDesc.exam_basic },
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
      { type: 2, body: language?.statics?.longDesc?.exam_advanced ?? defPack.statics.longDesc.exam_advanced },
    ],
  };

  useEffect(() => {
    setTopic(language?.statics?.topics ?? defPack.statics.topics);
  }, [language]);

  return (<Flex alignItems={'center'}
    flexDirection={"column"}
    w={'100%'}
    paddingLeft={pos === 'left' ? { base: '3rem', sm: '3rem', md: '3rem', lg: '5rem' } : ''}
    paddingRight={pos === 'right' ? { base: '3rem', sm: '3rem', md: '3rem', lg: '5rem' } : ''}
    paddingTop={!pos || pos === 'top' ? { base: '2.5rem', sm: '2.5rem', md: '2.5rem', lg: '10%' } : { md: '5%' }}
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
          title: language?.hints?.hintsTitle ?? defPack?.hints?.hintsTitle
        },
        title_b: {
          pi_icon: 'pi-list-check',
          title: language?.hints?.schoolsTopicTitle ?? defPack?.hints?.schoolsTopicTitle
        },

      }} />
      <Separator marginTop={3} />
      <Flex hideFrom={'lg'}>
        {
          // BUG: (minor) by resizing the screen to mobile, it should reset value
          //  of the useTop or set cur value to the Spin.
        }
        <Spin classList={topic}
          additional={{ teach: (language?.hints?.teach ?? defPack.hints.teach) }}
          getValue={(value) => setTop(value)} />
      </Flex>

      <Flex hideBelow={'lg'} justify={'space-between'}>
        <TopicBut pi_icon={'pi-list-check'}
          title={language?.hints?.elementarySchool ?? defPack.hints.elementarySchool}
          onClick={() => setSchool(true)}
          showSub={true}
        />

        <TopicBut pi_icon={'pi-list-check'}
          title={language?.hints?.highSchool ?? defPack.hints.highSchool}
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
              useTop == 'teach' ? (useRes ?
                (!!logs?.user ? (
                  <Flex color={{ _light: '#1D282E', _dark: '#EEF6F9' }}
                    flexDirection={'column'}
                    gapY={3}>

                    <Flex flexDirection={'column'}
                      gapX={2}
                      boxShadow={'sm'}
                      rounded={'sm'}
                      paddingX={3}
                      paddingY={1}>

                      <Text fontWeight={'medium'}
                        direction={lang == 'he' ? 'rtl' : 'ltr'}
                      >{language?.hints?.user ?? defPack.hints.user}</Text>
                      <Flex dir={lang == 'he' ? 'rtl' : 'ltr'}>
                        <ReactMarkDown>
                          {logs.user}
                        </ReactMarkDown>
                      </Flex>

                    </Flex>
                    <Flex flexDirection={'column'}
                      gapX={2}
                      boxShadow={'sm'}
                      rounded={'sm'}
                      paddingX={3}
                      paddingY={1}>

                      <Text fontWeight={'medium'}
                        direction={lang == 'he' ? 'rtl' : 'ltr'}
                      >{language?.hints?.teacher ?? defPack.hints.teacher}</Text>
                      <Flex flexDir={'column'}
                        dir={lang == 'he' ? 'rtl' : 'ltr'}
                      >{mixedText(logs.model)}</Flex>

                    </Flex>

                  </Flex>) :
                  (<Text color={{ _light: '#1D282E', _dark: '#EEF6F9' }}
                    h={'fit'}
                    boxShadow={'sm'}
                    rounded={'sm'}
                    paddingX={3}
                    paddingY={1}
                    direction={lang == 'he' ? 'rtl' : 'ltr'}>
                    {language?.hints?.teacherWelcome ?? defPack.hints.teacherWelcome}
                  </Text>)
                ) : (<Flex justifyContent={'center'}>
                  <LoadingBanner text={language?.hints?.teacherLoading ?? defPack.hints.teacherLoading} toggle={true} />
                </Flex>)
              ) :
                (hintsVoca[useTop].map((thing, ind) => {
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
                        direction={lang == 'he' ? 'rtl' : 'ltr'}
                        whiteSpace="pre-line"
                      >
                        {topic[useTop].toUpperCase()}
                      </Text>)
                    else if (thing.type == 1) // Sub title
                      return (<Text key={ind}
                        h={'fit'}
                        color={{ _light: '#1D282E/90', _dark: '#EEF6F9' }}
                        fontWeight={'medium'}
                        textAlign={lang == 'he' ? 'right' : 'left'}
                        marginBottom={1}
                        background={{ _dark: '#1D282E/65' }}
                        boxShadow={{ _dark: '0 0 5px 2px #EEF6F9' }}
                        rounded={{ _dark: 'sm' }}
                        paddingX={3}
                        direction={lang == 'he' ? 'rtl' : 'ltr'}
                        whiteSpace="pre-line"
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
                        textAlign={lang == 'he' ? 'right' : 'left'}
                        marginBottom={3}
                        direction={lang == 'he' ? 'rtl' : 'ltr'}
                      >
                        {thing.body}
                      </Text>)
                    else if (thing.type == 3) // Custom form
                      return (<Flex key={ind} justifyContent={'center'} >
                        <CustomForm />
                      </Flex>)
                    else if (thing.type == 4) // LaTeX and KaTeX form
                      return (<Flex key={ind}
                        justifyContent={'center'}
                        boxShadow={'sm'}
                        rounded={'sm'}
                        paddingX={3}
                        paddingY={1}>
                        <BlockMath math={!thing.body ? '\\text{LaTeX and KaTeX goes here!}' : thing.body} />
                      </Flex>);
                    else if (thing.type == 5) { // GEOGEBRA
                    }
                  }
                  else return <Text key={ind}
                    h={'fit'}
                    color={{ _light: '#1D282E/90', _dark: '#EEF6F9' }}
                    fontWeight={'medium'}
                    fontSize={'lg'}
                    textAlign={'center'}
                  >
                    {`Missing description!`}
                  </Text>
                }))
            }
          </Flex>
          {
            useTop == 'teach' && !!useRes ? (<TextArea />) : null
          }
        </Flex>
        <Flex flexDirection={"column"} gapY={3} hideBelow={'lg'}>

          <Separator />
          <TopicBut
            pi_icon={'pi-question'}
            title={language?.hints?.placeholder ?? defPack.hints.placeholder}
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