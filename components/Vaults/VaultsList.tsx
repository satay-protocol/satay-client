import React from 'react'

import {
    VStack,
    Text
} from '@chakra-ui/react'

import HeaderRow from './HeaderRow'
import VaultPreview from './VaultPreview'

import useVaults from '../../hooks/useVaults'

import { vaultManager } from '../../data/vaultManager'
import VaultCard from './VaultCard'

const VaultsList = () => {

    const { vaults } = useVaults(vaultManager);

    return (
        <VStack
            width='100%'
        >
            {
                vaults.length > 0 ? (
                    vaults.map(vault => (
                        <VaultCard
                            key={`${vault.managerAddress}-${vault.vaultId}`}
                            vault={vault}
                        />
                    ))
                ) : (
                    <Text>
                        No Vaults
                    </Text>
                )
                
            }
        </VStack>
    )
}

export default VaultsList