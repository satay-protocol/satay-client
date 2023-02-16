import React from 'react'

import { SimpleGrid, Text, VStack } from '@chakra-ui/react'

import VaultStrategyEntry from './VaultStrategyEntry'

import useVaultStrategy from '../../../hooks/strategy/useVaultStrategy'

import { StructData } from '../../../types/aptos'
import { Coin } from '../../../types/coin'

interface Props {
  strategyWitness: StructData,
  vaultAddress: string,
  decimals: number,
  baseCoin: Coin
}

const VaultStrategyData: React.FC<Props> = ({ strategyWitness, vaultAddress, decimals, baseCoin }) => {

  const vaultStrategy = useVaultStrategy(baseCoin.coinStruct, strategyWitness, vaultAddress, decimals);

    if(!vaultStrategy) return null;
    return (
      <VStack
        alignItems="flex-start"
        w="100%"
      >
        <Text
          fontSize="lg"
          fontWeight="semibold"
        >
          Vault Strategy Metrics
        </Text>
        <SimpleGrid
          columns={2}
          gap={4}
          w="100%"
        >
          <VaultStrategyEntry 
            title='Debt Ratio'
            value={`${vaultStrategy.debtRatio}%`}
          />
          <VaultStrategyEntry
            title='Total Debt'
            value={`${vaultStrategy.totalDebt} ${baseCoin.symbol}`}
          />
          <VaultStrategyEntry
            title='Total Gain'
            value={`${vaultStrategy.totalGain} ${baseCoin.symbol}`}
          />
          <VaultStrategyEntry
            title='Total Loss'
            value={`${vaultStrategy.totalLoss} ${baseCoin.symbol}`}
          />
        </SimpleGrid>
      </VStack>
      
    )
}

export default VaultStrategyData