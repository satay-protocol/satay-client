import React from 'react'

import {
    VStack,
    Skeleton
} from '@chakra-ui/react'

import VaultCard from './VaultCard'

import useActiveVaultIds from '../../hooks/vault/useActiveVaultIds'

const VaultsList = () => {

    const vaultIds = useActiveVaultIds();

    return (
        <VStack
            width='100%'
        >
            <Skeleton
                isLoaded={vaultIds.length > 0}
            >
                {
                    vaultIds.map(vaultId => (
                        <VaultCard
                            key={vaultId}
                            vaultId={vaultId}
                        />
                    ))
                }
            </Skeleton>
        </VStack>
    )
}

export default VaultsList