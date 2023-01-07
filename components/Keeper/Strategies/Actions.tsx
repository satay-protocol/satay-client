import React from 'react'

import { SimpleGrid, Text, VStack } from '@chakra-ui/react'

import HarvestTend from './HarvestTend'

import useCreditAvailable from '../../../hooks/strategy/useCreditAvailable'
import useDebtOutstanding from '../../../hooks/strategy/useDebtOutstanding'

import { StructData } from '../../../types/aptos'
import VaultStrategyEntry from './VaultStrategyEntry'

interface Props {
    vaultId: string,
    strategyWitness: StructData,
    baseCoinSymbol: string,
    decimals: number,
    baseCoinType: StructData
}

const Actions: React.FC<Props> = ({ vaultId, strategyWitness, baseCoinSymbol, decimals, baseCoinType}) => {

    const creditAvailable = useCreditAvailable(strategyWitness, vaultId, baseCoinType, decimals);
    const debtOutstanding = useDebtOutstanding(strategyWitness, vaultId, baseCoinType, decimals);

    return (
        <VStack
            alignItems="flex-start"
            w="100%"
            spacing={4}
        >
            {/* <Text
                fontSize="lg"
                fontWeight="semibold"
            >
                Actions
            </Text> */}
            <SimpleGrid
                columns={2}
                gap={4}
                w="100%"
            >
                <VaultStrategyEntry 
                    title='Credit Available'
                    value={`${creditAvailable} ${baseCoinSymbol}`}
                />
                <VaultStrategyEntry
                    title='Debt Outstanding'
                    value={`${debtOutstanding} ${baseCoinSymbol}`}
                />
            </SimpleGrid>
            <HarvestTend 
                vaultId={vaultId}
                strategyWitness={strategyWitness}
                creditAvailable={creditAvailable}
                debtOutstanding={debtOutstanding}
            />
        </VStack>
    )
}

export default Actions