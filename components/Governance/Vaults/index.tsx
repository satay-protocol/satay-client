import React from 'react'

import { Text, VStack } from '@chakra-ui/react'

import Card from '../../utilities/Card'
import Vault from './Vault'

import {useAptos} from "../../../contexts/AptosContext";

import {getVaults} from '../../../data/vaults'

import { structToString } from '../../../services/aptosUtils'

const Vaults = () => {

    const { network } = useAptos();

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
                    getVaults(network).map((baseCoin) => {
                        return (
                            <Vault
                                key={structToString(baseCoin.coinStruct)}
                                baseCoinStruct={baseCoin.coinStruct}
                            />
                        )
                    })
                }
            </VStack>
        </Card>
    )
}

export default Vaults