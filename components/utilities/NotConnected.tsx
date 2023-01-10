import React from 'react'

import { Text } from '@chakra-ui/react'

import Card from './Card'

const NotConnected = () => {
  return (
    <Card>
        <Text
            fontSize="xl"
            fontWeight="bold"
        >
            Not Connected
        </Text>
        <Text>
            You must have a connected wallet to view this page.
        </Text>
    </Card>
  )
}

export default NotConnected