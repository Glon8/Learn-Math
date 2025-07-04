import { Flex, Text, Button } from "@chakra-ui/react"
import "primeicons/primeicons.css";
import { useEffect, useState } from "react";

function Spin({ classList, additional, getValue }) {
  const [usePage, setPage] = useState(0);
  const [useTitles, setTitles] = useState([]);
  const [useNames, setNames] = useState([]);

  const forward = () => {
    usePage >= useNames.length - 1 ? setPage(0) : setPage(usePage + 1);

    getValue(useTitles[usePage >= useNames.length - 1? 0 : usePage + 1]);
  }
  const backward = () => {
    usePage <= 0 ? setPage(useNames.length - 1) : setPage(usePage - 1);

    getValue(useTitles[usePage <= 0? useNames.length - 1 : usePage - 1]);
  }


  useEffect(() => {
    const pseudoTitles = [];
    const pseudoNames = [];

    Object.entries(classList).map((item) => {
      pseudoTitles.push(item[0]);
      pseudoNames.push(item[1].toUpperCase());
    });

    if (additional) {
      const [[key, value]] = Object.entries(additional);
      pseudoTitles.push(key);
      pseudoNames.push(value.toUpperCase());
    }

    setTitles(pseudoTitles)
    setNames(pseudoNames);
  }, []);

  return (<Flex flexDirection={'row'}
    justify={'space-between'}
    alignItems={'center'}
    width={'full'}>

    <Button onClick={backward}
      bg={'gray.200'} color={'black'}>
      <i className="pi pi-angle-left" />
    </Button>
    <Text fontWeight={'medium'} fontSize={'lg'} textAlign={'center'}>{useNames[usePage]}</Text>
    <Button onClick={forward} bg={'gray.200'} color={'black'}>
      <i className="pi pi-angle-right" />
    </Button>

  </Flex>)
}

export default Spin