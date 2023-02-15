import React from 'react'

import { SimpleGrid, VStack } from '@chakra-ui/react'

import HarvestTend from './HarvestTend'
import VaultStrategyEntry from './VaultStrategyEntry'

import useCreditAvailable from '../../../hooks/strategy/useCreditAvailable'
import useDebtOutstanding from '../../../hooks/strategy/useDebtOutstanding'

import { StructData } from '../../../types/aptos'

interface Props {
    strategyWitness: StructData,
    baseCoinSymbol: string,
    decimals: number,
    baseCoinStruct: StructData,
    vaultStrategyModule: string
}

const Actions: React.FC<Props> = ({ strategyWitness, baseCoinSymbol, decimals, baseCoinStruct, vaultStrategyModule}) => {

    const creditAvailable = useCreditAvailable(baseCoinStruct, strategyWitness, decimals);
    const debtOutstanding = useDebtOutstanding(baseCoinStruct, strategyWitness, decimals);

    return (
        <VStack
            alignItems="flex-start"
            w="100%"
            spacing={4}
        >
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
                vaultStrategyModule={vaultStrategyModule}
                creditAvailable={creditAvailable}
                debtOutstanding={debtOutstanding}
            />
        </VStack>
    )
}

export default Actions