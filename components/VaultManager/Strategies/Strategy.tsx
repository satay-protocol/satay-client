import React from 'react'

import { Divider, HStack, Text, VStack } from '@chakra-ui/react'

import DebtRatioSlider from './DebtRatioSlider'

import { structToModule } from '../../../services/aptosUtils'

import { Strategy } from '../../../types/strategy'
import KeeperComponent from './KeeperComponent'

interface Props {
    vaultId: string,
    vaultAddress: string,
    strategy: Strategy
}

const Strategy: React.FC<Props> = ({ strategy, vaultAddress, vaultId }) => {

  const strategyModule = structToModule(strategy.strategyWitness);

  return (
    <VStack
      w='100%'
      spacing={4}
    >
      <HStack
        key={strategyModule}
        spacing={4}
        w='100%'
      >
        <Text
          fontWeight='semibold'
        >
            {strategy.name}
        </Text>
        <DebtRatioSlider 
            strategyModule={strategyModule}
            vaultId={vaultId}
            currentDebtRatio={strategy.debtRatio}
        />
      </HStack>
      <KeeperComponent 
        strategyWitess={strategy.strategyWitness}
        vaultAddress={vaultAddress}
      />
      <Divider />
    </VStack>
  )
}

export default Strategy