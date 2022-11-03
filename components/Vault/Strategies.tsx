import React from 'react'

import { 
    VStack,
    Text,
} from '@chakra-ui/react'

import Card from '../utilities/Card'
import StrategyComponent from '../Strategy'

import { Strategy } from '../../types/vaults'

interface Props {
    strategies: Strategy[]
}

const Strategies: React.FC<Props> = ({ strategies }) => {
  return (
    <Card>
        <VStack
            alignItems='flex-start'
        >
            <Text
                fontSize="xl"
                fontWeight="bold"
            >
                Strategies
            </Text>
            {
                strategies.length > 0 ? (
                    strategies.map(strategy => (
                        <StrategyComponent 
                            key={strategy.strategyModule}
                            strategy={strategy}
                        />
                    ))
                ) : (
                    <Text>No active strategies.</Text>
                )
            }
        </VStack>
    </Card>
  )
}

export default Strategies