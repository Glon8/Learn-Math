import { Text, Flex, Editable } from "@chakra-ui/react"
import "primeicons/primeicons.css";

function Slot({ value, category, edit, color }) {
    return (<Flex width={'1xs'} flexDirection={'row'} justify={'space-between'}>

        <Editable.Root width={'fit'}
         edit={edit? true : false}
          fontSize={'xl'}
           textAlign={'center'}
            defaultValue={`${value}`}
            color={color? color : ''}>
            <Editable.Preview />
            <Editable.Input />
        </Editable.Root>
        <Text textAlign={'right'}>{category}</Text>

    </Flex>)
}

export default Slot