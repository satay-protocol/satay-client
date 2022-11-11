import React from 'react'

import { Button } from '@chakra-ui/react'

import useVaultStrategy from '../../hooks/manager/useVaultStrategy'

interface Props {
    vaultId: string,
    strategyModule: string
}

const HarvestButton : React.FC<Props> = ({ vaultId, strategyModule }) => {

    const { harvest } = useVaultStrategy(vaultId, strategyModule);

    return (
        <Button
            onClick={harvest}
        >
            Harvest
        </Button>
    )
}

export default HarvestButton