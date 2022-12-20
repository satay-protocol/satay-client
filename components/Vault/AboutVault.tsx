import React from 'react'

import {
  Box,
  Text,
  useColorModeValue,
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
        bg={useColorModeValue('gray.50', 'gray.800')}
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