import React from 'react'

import { 
  Text,
  VStack
} from '@chakra-ui/react'

import Card from '../utilities/Card'
import StructuredProducts from '../StructuredProducts'
import Vaults from '../Vaults'

const Home = () => {
  return (
    <VStack
      spacing={4}
    >
      <Card>
        <Text
          fontSize='2xl'
          fontWeight='bold'
        >
          Welcome to Satay Finance
        </Text>
        <Text>
          Pioneering Yield Aggregation on Aptos and Sui
        </Text>
      </Card>
      <Vaults />
      <StructuredProducts />
    </VStack>
  )
}

export default Home