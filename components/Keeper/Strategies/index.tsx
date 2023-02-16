import React from 'react'

import { Box, Text, VStack } from '@chakra-ui/react'

import Strategy from './Strategy'

import { structToString } from '../../../services/aptosUtils'

import { KeeperInfo } from '../../../types/strategy'

interface Props {
    strategies: KeeperInfo[]
}

const Strategies: React.FC<Props> = ({ strategies }) => {
  return (
    <VStack
        alignItems="flex-start"
    >
        {
            strategies.length > 0 ? (
                strategies.map((strategy) => {
                    return (
                        <Strategy
                            key={structToString(strategy.strategyWitness)}
                            keeperInfo={strategy}
                        />
                    )
                })
            ) : (
                <Box>
                    <Text>
                        You are not the keeper of any strategies.
                    </Text>
                </Box>
            )
            
        }
    </VStack>
  )
}

export default Strategies