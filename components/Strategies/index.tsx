import React from 'react'

import { Text, VStack } from '@chakra-ui/react'

import StrategyComponent from './Strategy'

import { Strategy } from '../../types/vaults'

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
                fontSize="lg"
                fontWeight="bold"
            >
                Approved Strategies
            </Text>
            {
                strategies.length > 0 ? (
                    strategies.map((strategy) => (
                        <StrategyComponent
                            key={strategy.strategyModule}
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