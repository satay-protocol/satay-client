import React from 'react'

import { Skeleton, Text } from '@chakra-ui/react'

import Card from '../utilities/Card'
import Vaults from './Vaults'

import useVaultsManagedByUser from '../../hooks/vaultManager/useVaultsManagedByUser'

interface Props {
    connectedAddress: string
}

const VaultManagerComponent: React.FC<Props> = ({ connectedAddress }) => {

    const { vaultBaseCoins, fetched } = useVaultsManagedByUser(connectedAddress)

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
            <Skeleton
                isLoaded={fetched}
            >
                <Vaults
                    vaultBaseCoins={vaultBaseCoins}
                />
            </Skeleton>
        </Card>
    )
}

export default VaultManagerComponent