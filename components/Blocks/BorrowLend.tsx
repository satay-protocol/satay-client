import React from 'react'

import { Flex, Text } from '@chakra-ui/react'

import Card from '../utilities/Card'
import BlocksView from './BlocksView'

import { borrowLend } from '../../data/blocks'

const BorrowLend = () => {
  return (
    <Flex
        flexDirection='column'
        gap={4}
    >
        <Card>
            <Text
                fontSize='2xl'
                fontWeight='bold'
            >
                Lend
            </Text>
            <Text>
                Earn yield on your staked coins.
            </Text>
        </Card>
        <BlocksView 
            blocks={borrowLend}
        />
    </Flex>
  )
}

export default BorrowLend