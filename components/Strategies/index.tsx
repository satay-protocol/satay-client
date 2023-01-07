import React from 'react'

import { Text, VStack } from '@chakra-ui/react'

import StrategyComponent from './Strategy'

import { Strategy } from '../../types/strategy'
import { structToString } from '../../services/aptosUtils'

interface Props {
    strategies: Strategy[]
}

const Strategies : React.FC<Props> = ({ strategies }) => {

    return (
        <VStack
            spacing={2}
            alignItems='flex-start'
        >
            <Text
                fontWeight="bold"
            >
                Approved Strategies
            </Text>
            {
                strategies.length > 0 ? (
                    strategies.map((strategy) => (
                        <StrategyComponent
                            key={structToString(strategy.strategyWitness)}
                            strategy={strategy}
                        />
                    ))
                ) : (
                    <Text>
                        No approved strategies
                    </Text>
                )
            }
        </VStack>
    )
}

export default Strategies