import React from 'react'

import { HStack, Text, VStack } from '@chakra-ui/react'

import DebtRatioSlider from './DebtRatioSlider'
import KeeperComponent from './KeeperComponent'

import { structToModule } from '../../../services/aptosUtils'

import { Strategy } from '../../../types/strategy'
import { Coin } from '../../../types/coin'

interface Props {
    vaultAddress: string,
    strategy: Strategy,
    baseCoin: Coin
}

const Strategy: React.FC<Props> = ({ strategy, vaultAddress, baseCoin }) => {

  const strategyModule = structToModule(strategy.strategyWitness);

  return (
    <VStack
      w='100%'
      rounded='lg'
      borderWidth={1}
      p={4}
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
            currentDebtRatio={strategy.debtRatio}
            baseCoin={baseCoin}
        />
      </HStack>
      <KeeperComponent 
        strategyWitess={strategy.strategyWitness}
        baseCoin={baseCoin}
      />
    </VStack>
  )
}

export default Strategy