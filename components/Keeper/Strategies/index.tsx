import { VStack } from '@chakra-ui/react'
import React from 'react'
import { structToString } from '../../../services/aptosUtils'
import { KeeperInfo } from '../../../types/strategy'
import Strategy from './Strategy'

interface Props {
    strategies: KeeperInfo[]
}

const Strategies: React.FC<Props> = ({ strategies }) => {
  return (
    <VStack
        alignItems="flex-start"
    >
        {
            strategies.map((strategy) => {
                return (
                    <Strategy
                        key={structToString(strategy.strategyWitness)}
                        keeperInfo={strategy}
                    />
                )
            })
        }
    </VStack>
  )
}

export default Strategies