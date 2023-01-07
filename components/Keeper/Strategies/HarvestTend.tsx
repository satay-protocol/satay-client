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
        <HStack>
            <Button
                onClick={tend}
                colorScheme="brand"
                variant="outline"
                disabled={debtOutstanding > 0}
            >
                Tend
            </Button>
            <Button
                onClick={harvest}
                colorScheme="brand"
                disabled={creditAvailable === 0 && debtOutstanding === 0}
            >
                Harvest
            </Button>
        </HStack>
    )
}

export default HarvestTend