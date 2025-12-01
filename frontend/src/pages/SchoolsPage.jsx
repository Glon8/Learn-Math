import { Flex, Separator, useBreakpointValue } from "@chakra-ui/react"
import "primeicons/primeicons.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import 'katex/dist/katex.min.css'

import { languageContext } from '../context/LanguagesContext.jsx';

import TitleSlot from '../components/slots/TitleSlot.jsx'
import SchoolsClasses from "../components/buttons/sub/SchoolsClasses.jsx";
import SchoolsExplanation from "../components/tabs/SchoolsExplanation.jsx";
import SchoolNavigation from "../components/buttons/sub/SchoolNavigation.jsx";
import PagesBase from "../components/forms/sub/PagesBase.jsx";
import PagesBaseStack from "../components/forms/sub/PagesBaseStack.jsx";

function SchoolsPage() {
  const navigate = useNavigate();
  const { language, defPack } = languageContext();

  const navShort = useBreakpointValue({ base: true, sm: true, md: false, lg: false, xl: false });
  const [useSchool, setSchool] = useState(true);
  const [topic, setTopic] = useState(language?.statics?.topics ?? defPack.statics.topics);

  const toExercise = (topic) => {
    navigate('/exercise', { state: { exerciseId: topic[0], exerciseWritten: topic[1] } })
  };

  useEffect(() => {
    setTopic(language?.statics?.topics ?? defPack.statics.topics);
  }, [language]);

  return (<PagesBase alignItems={'center'}>

    <PagesBaseStack w={{ base: "100%", sm: '80%' }}
      minW={{ base: 'auto', sm: '25rem' }}
      maxW={'65rem'}>

      <TitleSlot pi_icon={'pi-list-check'} title={language?.schools?.schoolsTopicTitle ?? defPack.schools.schoolsTopicTitle} />
      <Separator marginTop={3} />
      <Flex justify={'space-between'}
        gapX={3}
        hideBelow={'md'}>

        <SchoolsClasses type={'elementary'} onClick={(val) => setSchool(val)} />
        <SchoolsExplanation />
        {/* on mobile this explanation possible to add as toast! */}
        <SchoolsClasses type={'high'} onClick={(val) => setSchool(val)} />

      </Flex>
      {
        navShort ? null : <Separator />
      }
      {
        Object.entries(topic).map((topic, index) => {
          if (navShort) {
            return (<SchoolNavigation key={topic[0]} dir={'column'} topic={topic} onClick={() => { toExercise(topic) }} />)
          }
          else {
            if (useSchool && index >= 0 && index < 7) {
              return (<SchoolNavigation key={topic[0]} topic={topic} onClick={() => { toExercise(topic) }} />)
            }
            else if (!useSchool && index >= 7) {
              return (<SchoolNavigation key={topic[0]} dir={'row-reverse'} topic={topic} onClick={() => { toExercise(topic) }} />)
            }
          }
        })
      }

    </PagesBaseStack >

  </PagesBase >)
}

export default SchoolsPage