import React from 'react'

import {
    VStack,
    Skeleton
} from '@chakra-ui/react'

import VaultCard from './VaultCard'

import { activeVaults } from '../../data/vaults'
import { structToString } from '../../services/aptosUtils'

const VaultsList = () => {

    return (
        <VStack
            width='100%'
        >
            <Skeleton
                isLoaded={activeVaults.length > 0}
                w='100%'
            >
                {
                    activeVaults.map(baseCoin => (
                        <VaultCard
                            key={structToString(baseCoin.coinStruct)}
                            baseCoinStruct={baseCoin.coinStruct}
                        />
                    ))
                }
            </Skeleton>
        </VStack>
    )
}

export default VaultsList