import React from 'react'

import { Text, VStack, Flex } from '@chakra-ui/react'

import Offerings from './Offerings'

const Home = () => {

  return (
    <VStack
      spacing={8}
    >
      <Flex
          flexDirection='column'
          alignItems='center'
      >
        <Text
          fontSize='3xl'
          fontWeight='extrabold'
        >
          Welcome to Satay Finance
        </Text>
        <Text
          fontWeight='semibold'
          textAlign='center'
          fontSize='lg'
        >
          Pioneering Yield Aggregation on Aptos
        </Text>
      </Flex>
      <Offerings />
    </VStack>
  )
}

export default Home