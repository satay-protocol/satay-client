import React from 'react'

import {
    VStack,
    Text,
    CircularProgress
} from '@chakra-ui/react'

import useVaults from '../../hooks/useVaults'

import { satay } from '../../data/moduleAddresses'
import VaultCard from './VaultCard'
import Card from '../utilities/Card'

const VaultsList = () => {

    const { vaults, fetched } = useVaults(satay);

    return (
        <VStack
            width='100%'
        >
            {
                fetched ? (
                    vaults.length > 0 ? (
                        vaults.map(vault => (
                            <VaultCard
                                key={`${vault.managerAddress}-${vault.vaultId}`}
                                vault={vault}
                            />
                        ))
                    ) : (
                        <Card>
                            <Text>
                                No Vaults
                            </Text>
                        </Card>
                    )
                ) : (
                    <Card
                        alignItems='center'
                    >
                        <CircularProgress 
                            color='brand.500'
                            isIndeterminate
                        />
                    </Card>
                )
            }
        </VStack>
    )
}

export default VaultsList