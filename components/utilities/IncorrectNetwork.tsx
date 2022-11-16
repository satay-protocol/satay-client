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
            Satay is currently only available on the Aptos testnet. You must connect your wallet and switch to the Aptos testnet to use Satay.
        </Text>
    </Card>
  )
}

export default IncorrectNetwork