import React from 'react'

import {
    VStack,
    Skeleton,
    Text
} from '@chakra-ui/react'

import VaultCard from './VaultCard'

import { getVaults } from '../../data/vaults'
import { structToString } from '../../services/aptosUtils'
import {useAptos} from "../../contexts/AptosContext";
import Card from "../utilities/Card";

const VaultsList = () => {

    const { network } = useAptos();

    const activeVaults = getVaults(network)

    if(activeVaults.length === 0) {
        return (
            <Card>
                <Text
                    fontSize='xl'
                    fontWeight='bold'
                >
                    Vaults are only available on this network
                </Text>
                <Text>
                    Switch the network on your wallet to testnet to access vaults.
                </Text>
            </Card>
        )
    }

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