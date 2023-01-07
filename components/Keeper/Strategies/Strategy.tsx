import React from 'react'

import { HStack, Text, VStack } from '@chakra-ui/react'

import AccentedBox from '../../utilities/AccentedBox'

import { KeeperInfo } from '../../../types/strategy'
import HarvestTend from './HarvestTend'
import { structToModule } from '../../../services/aptosUtils'
import VaultStrategyData from './VaultStrategyData'
import useCoinInfo from '../../../hooks/coin/useCoinInfo'
import Actions from './Actions'
import ProtocolList from '../../utilities/ProtocolList'

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
                            fontSize="xl"
                            fontWeight="bold"
                        >
                            {keeperInfo.name}
                        </Text>
                        <ProtocolList 
                            protocols={keeperInfo.protocols}
                            iconSize={'32px'}
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
                                vaultId={keeperInfo.vaultId}
                                strategyWitness={keeperInfo.strategyWitness}
                                baseCoinSymbol={keeperInfo.baseCoin.symbol}
                                decimals={decimals}
                                baseCoinType={keeperInfo.baseCoin.coinStruct}
                            />
                        </>
                    )
                }
                
            </VStack>
        </AccentedBox>
    )
}

export default Strategy