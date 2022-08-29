import React from 'react'

import {
    VStack
} from '@chakra-ui/react'

import HeaderRow from './HeaderRow'
import VaultPreview from './VaultPreview'

import useVaults from '../../hooks/useVaults'

const VaultsList = () => {

    const { vaults } = useVaults();

    return (
        <VStack
            width='100%'
        >
            <HeaderRow />
            {
                vaults.map(vault => (
                    <VaultPreview
                        key={vault.id}
                        vault={vault}
                    />
                ))
            }
        </VStack>
    )
}

export default VaultsList