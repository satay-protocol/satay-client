import { Text } from '@chakra-ui/react'
import React from 'react'
import Card from '../utilities/Card'

const NotGovernance = () => {
  return (
    <Card>
        <Text
            fontSize="2xl"
            fontWeight="bold"
        >
            Not Authorized
        </Text>
        <Text>
            Only the Governor can view this page.
        </Text>
    </Card>
  )
}

export default NotGovernance