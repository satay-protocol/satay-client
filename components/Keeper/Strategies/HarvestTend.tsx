import React from 'react'

import { Button, HStack } from '@chakra-ui/react'

import useVaultStrategy from '../../../hooks/keeper/useHarvestTend'

import { StructData } from '../../../types/aptos'

interface Props {
    vaultStrategyModule: string,
    creditAvailable: number,
    debtOutstanding: number,
}

const HarvestTend : React.FC<Props> = ({ vaultStrategyModule, creditAvailable, debtOutstanding }) => {

    const { harvest, tend } = useVaultStrategy(vaultStrategyModule);

    const tendDisabled = debtOutstanding > 0;

    return (
        <HStack
            w="100%"
            justifyContent="space-around"
        >
            <Button
                onClick={harvest}
                colorScheme="brand"
                flex={1}
                variant="solid"
            >
                Harvest
            </Button>
            <Button
                onClick={tend}
                colorScheme="brand"
                disabled={tendDisabled}
                variant={tendDisabled ? "outline" : "solid"}
                flex={1}
            >
                Tend
            </Button>
        </HStack>
    )
}

export default HarvestTend