import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import Card from './Card'

const IncorrectNetwork = () => {
  return (
    <Card>
        <Text
            fontSize="xl"
            fontWeight="bold"
        >
            Incorrect Network
        </Text>
        <Text>
            Satay is currently only available on the Aptos devnet. You must connect your Pontem wallet and switch to the Aptos devnet to use Satay.
        </Text>
    </Card>
  )
}

export default IncorrectNetwork