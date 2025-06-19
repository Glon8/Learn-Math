import { Flex, Text, Button } from "@chakra-ui/react"
import "primeicons/primeicons.css";
import { useEffect, useState } from "react";

function Spin({ classList, additional }) {
  const [usePage, setPage] = useState(0);
  const [useArray, setArray] = useState([]);

  const forward = () => {
    usePage >= useArray.length-1 ? setPage(0) :  setPage(1 + usePage);
  }
  const backward = () => {
    usePage <= 0 ? setPage(useArray.length-1) : setPage(usePage-1);
  }

  useEffect(() => {
    const pseudo = [];

    Object.entries(classList).map((item) => {
      pseudo.push(item[1].toUpperCase());
    });

    additional? pseudo.push(additional.toUpperCase()) : null;
    
    setArray(pseudo);
  }, [classList]);

  return (<Flex flexDirection={'row'}
    justify={'space-between'}
    alignItems={'center'}
    width={'full'}>

    <Button onClick={backward} bg={'gray.200'} color={'black'}>
      <i className="pi pi-angle-left" />
    </Button>
    <Text fontWeight={'medium'} fontSize={'lg'} textAlign={'center'}>{useArray[usePage]}</Text>
    <Button onClick={forward} bg={'gray.200'} color={'black'}>
      <i className="pi pi-angle-right" />
    </Button>
  
  </Flex>)
}

export default Spin