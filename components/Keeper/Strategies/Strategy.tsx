import React from 'react'

import { HStack, Text, VStack } from '@chakra-ui/react'

import AccentedBox from '../../utilities/AccentedBox'
import VaultStrategyData from './VaultStrategyData'
import Actions from './Actions'
import ProtocolList from '../../utilities/ProtocolList'

import useCoinInfo from '../../../hooks/coin/useCoinInfo'

import { KeeperInfo } from '../../../types/strategy'

interface Props {
    keeperInfo: KeeperInfo
}

const Strategy: React.FC<Props> = ({ keeperInfo }) => {

    const { decimals } = useCoinInfo(keeperInfo.baseCoin.coinStruct);

    return (
        <AccentedBox
            w="100%"
        >
            <VStack
                alignItems="flex-start"
                spacing={4}
            >
                <HStack
                    justifyContent="space-between"
                    w='100%'
                >
                    <HStack
                        spacing={4}
                    >
                        <Text
                            fontSize="2xl"
                            fontWeight="bold"
                        >
                            {keeperInfo.name}
                        </Text>
                        <ProtocolList 
                            protocols={keeperInfo.protocols}
                            iconSize={'36px'}
                        />
                    </HStack>
                    <Text
                        fontSize="xl"
                        fontWeight="semibold"
                    >
                        {keeperInfo.baseCoin.symbol} Vault
                    </Text>
                </HStack>
                <Text
                    fontSize="sm"
                >
                    {keeperInfo.description}
                </Text>
                {
                    decimals > 0 && (
                        <>
                            <VaultStrategyData
                                strategyWitness={keeperInfo.strategyWitness}
                                vaultAddress={keeperInfo.vaultAddress}
                                decimals={decimals}
                                baseCoinSymbol={keeperInfo.baseCoin.symbol}
                            />
                            <Actions 
                                strategyWitness={keeperInfo.strategyWitness}
                                baseCoinSymbol={keeperInfo.baseCoin.symbol}
                                decimals={decimals}
                                baseCoinStruct={keeperInfo.baseCoin.coinStruct}
                            />
                        </>
                    )
                }
                
            </VStack>
        </AccentedBox>
    )
}

export default Strategy