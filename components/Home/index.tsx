import React from 'react'

import { 
  Container, 
  Text,
  VStack
} from '@chakra-ui/react'

const Home = () => {
  return (
    <Container>
      <VStack>
        <Text
          fontSize='2xl'
          fontWeight='bold'
        >
          Welcome to Satay Finance
        </Text>
        <Text>
          View a vault to get started.
        </Text>
      </VStack>
    </Container>
  )
}

export default Home