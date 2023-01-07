import React from 'react'

import { Button, HStack } from '@chakra-ui/react'

import useVaultStrategy from '../../../hooks/vaultManager/useVaultStrategy'

interface Props {
    vaultId: string,
    strategyModule: string
}

const HarvestTend : React.FC<Props> = ({ vaultId, strategyModule }) => {

    const { harvest, tend } = useVaultStrategy(vaultId, strategyModule);

    return (
        <HStack>
            <Button
                onClick={tend}
                colorScheme="brand"
                variant="outline"
            >
                Tend
            </Button>
            <Button
                onClick={harvest}
                colorScheme="brand"
            >
                Harvest
            </Button>
        </HStack>
    )
}

export default HarvestTend