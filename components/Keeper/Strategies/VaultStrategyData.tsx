import React from 'react'

import { SimpleGrid, Text, VStack } from '@chakra-ui/react'

import VaultStrategyEntry from './VaultStrategyEntry'

import useVaultStrategy from '../../../hooks/strategy/useVaultStrategy'

import { StructData } from '../../../types/aptos'

interface Props {
  strategyWitness: StructData,
  vaultAddress: string,
  decimals: number,
  baseCoinSymbol: string,
}

const VaultStrategyData: React.FC<Props> = ({ strategyWitness, vaultAddress, decimals, baseCoinSymbol }) => {

  const vaultStrategy = useVaultStrategy(strategyWitness, vaultAddress, decimals);

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
            value={`${vaultStrategy.totalDebt} ${baseCoinSymbol}`}
          />
          <VaultStrategyEntry
            title='Total Gain'
            value={`${vaultStrategy.totalGain} ${baseCoinSymbol}`}
          />
          <VaultStrategyEntry
            title='Total Loss'
            value={`${vaultStrategy.totalLoss} ${baseCoinSymbol}`}
          />
        </SimpleGrid>
      </VStack>
      
    )
}

export default VaultStrategyData