import { Text } from '@chakra-ui/react'
import React from 'react'
import Card from '../utilities/Card'

const NotManager = () => {
  return (
    <Card>
        <Text>
            Not Authorized
        </Text>
        <Text>
            You are not authorized to access this page because your currently connected address is not the manager address.
        </Text>
    </Card>
  )
}

export default NotManager