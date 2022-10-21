import React from 'react'

import { 
  Text,
  VStack
} from '@chakra-ui/react'

import Card from '../utilities/Card'
import VaultsList from '../Vaults/VaultsList'

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
      <VaultsList />
    </VStack>
  )
}

export default Home