import React from 'react'

import {
  Box,
  Text,
  VStack
} from '@chakra-ui/react'

interface Props {
  about: string;
}

const AboutVault : React.FC<Props> = ({ about }) => {
  return (
    <VStack
      alignItems='flex-start'
    >
      <Text
        fontSize='xl'
        fontWeight='bold'
      >
        About
      </Text>
      <Box
        p={4}
        bg='gray.50'
        rounded='lg'
      >
        <Text>
          {about}
        </Text>
      </Box>
    </VStack>
  )
}

export default AboutVault