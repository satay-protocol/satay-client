import React from 'react'

import { Text } from '@chakra-ui/react'

import Card from '../utilities/Card'

import useVaults from '../../hooks/useVaults'
import Vault from './Vault'


interface Props {
    managerAddress: string
}

const Vaults : React.FC<Props> = ({ managerAddress }) => {

    const { vaults } = useVaults(managerAddress);


    return (
        <Card>
            <Text
                fontSize="xl"
                fontWeight="bold"
            >
                Your Vaults
            </Text>
            {
                vaults.map((vault) => {
                    return (
                        <Vault
                            key={vault.vaultAddress}
                            vault={vault}
                            managerAddress={managerAddress}
                        />
                    )
                })
            }
        </Card>
    )
}

export default Vaults