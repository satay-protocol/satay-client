import React from 'react'

import { Text, VStack } from '@chakra-ui/react'

import ApproveStrategy from './ApproveStrategy'
import Strategy from './Strategy'

import useVaultStrategies from '../../../hooks/utility/useVaultStrategies'

import { Coin } from '../../../types/coin'
import { structToString } from '../../../services/aptosUtils'

interface Props {
    vaultAddress: string,
    vaultId: string,
    baseCoin: Coin
}

const Strategies: React.FC<Props> = ({ vaultAddress, vaultId, baseCoin }) => {

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
                strategies.map((strategy, index) => (
                    <Strategy 
                        key={index}
                        strategy={strategy}
                        vaultId={vaultId}
                        vaultAddress={vaultAddress}
                    />
                ))
            }
            <ApproveStrategy 
                vaultId={vaultId}
                baseCoin={baseCoin}
                approvedStrategies={strategies.map(strategy => structToString(strategy.strategyWitness))}
            />
        </VStack>
    )
}

export default Strategies