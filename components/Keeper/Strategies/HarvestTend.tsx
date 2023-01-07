import React from 'react'

import { Button, HStack } from '@chakra-ui/react'

import useVaultStrategy from '../../../hooks/keeper/useHarvestTend'
import { StructData } from '../../../types/aptos'

interface Props {
    vaultId: string,
    strategyWitness: StructData,
    creditAvailable: number,
    debtOutstanding: number,
}

const HarvestTend : React.FC<Props> = ({ vaultId, strategyWitness, creditAvailable, debtOutstanding }) => {

    const { harvest, tend } = useVaultStrategy(vaultId, strategyWitness);

    return (
        <HStack
            w="100%"
            justifyContent="space-around"
        >
            <Button
                onClick={harvest}
                colorScheme="brand"
                disabled={creditAvailable === 0 && debtOutstanding === 0}
                flex={1}
                // variant="outline"
            >
                Harvest
            </Button>
            <Button
                onClick={tend}
                colorScheme="brand"
                disabled={debtOutstanding > 0}
                flex={1}
            >
                Tend
            </Button>
        </HStack>
    )
}

export default HarvestTend