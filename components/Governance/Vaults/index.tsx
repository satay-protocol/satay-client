import React from 'react'

import { Text, VStack } from '@chakra-ui/react'

import Card from '../../utilities/Card'
import Vault from './Vault'

import useActiveVaultIds from '../../../hooks/utility/useActiveVaultIds'

const Vaults = () => {

    const vaultIds = useActiveVaultIds();

    return (
        <Card
            gap={4}
        >
            <Text
                fontSize="3xl"
                fontWeight="extrabold"
            >
                Vaults
            </Text>
            <VStack
                alignItems="flex-start"
            >
                {
                    vaultIds.map((vaultId) => {
                        return (
                            <Vault
                                key={vaultId}
                                vaultId={vaultId}
                            />
                        )
                    })
                }
            </VStack>
        </Card>
    )
}

export default Vaults