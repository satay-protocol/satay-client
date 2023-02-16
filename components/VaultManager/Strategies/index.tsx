import React from 'react'

import { Text, VStack } from '@chakra-ui/react'

import ApproveStrategy from './ApproveStrategy'
import Strategy from './Strategy'

import useVaultStrategies from '../../../hooks/utility/useVaultStrategies'

import { structToString } from '../../../services/aptosUtils'

import { Coin } from '../../../types/coin'

interface Props {
    vaultAddress: string,
    baseCoin: Coin
}

const Strategies: React.FC<Props> = ({ vaultAddress, baseCoin }) => {

    const strategies = useVaultStrategies(vaultAddress);

    return (
        <VStack
            alignItems='flex-start'
            w='100%'
        >
            <Text
                fontSize='xl'
                fontWeight='semibold'
            >
                Strategies
            </Text>
            {
                strategies.length === 0 && (
                    <Text>
                        No approved strategies
                    </Text>
                )
            }
            {
                strategies.map((strategy, index) => (
                    <Strategy 
                        key={index}
                        strategy={strategy}
                        baseCoin={baseCoin}
                        vaultAddress={vaultAddress}
                    />
                ))
            }
            <ApproveStrategy
                baseCoin={baseCoin}
                approvedStrategies={strategies.map(strategy => structToString(strategy.strategyWitness))}
            />
        </VStack>
    )
}

export default Strategies