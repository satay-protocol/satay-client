import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { liquidStaking } from '../../data/blocks'
import Card from '../utilities/Card'
import BlocksView from './BlocksView'

const LiquidStaking = () => {
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
                Liquid Staking
            </Text>
            <Text>
                Earn yield on your staked coins.
            </Text>
        </Card>
        <BlocksView 
            blocks={liquidStaking}
        />
    </Flex>
  )
}

export default LiquidStaking