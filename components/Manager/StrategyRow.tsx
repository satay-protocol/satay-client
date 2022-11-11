import React from 'react'

import {
    HStack,
    Text
} from '@chakra-ui/react'

import DebtRatioSlider from './DebtRatioSlider';
import HarvestButton from './HarvestButton';
import { Strategy } from '../../types/vaults';

interface Props {
    strategy: Strategy,
    vaultId: string,
}

const StrategyRow : React.FC<Props> = ({ strategy, vaultId}) => {
  return (
    <HStack
        key={strategy.strategyModule}
        spacing={4}
    >
        <Text
            mr='auto'
        >
            {strategy.title}
        </Text>
        <DebtRatioSlider 
            strategyModule={strategy.strategyModule}
            vaultId={vaultId}
            currentDebtRatio={strategy.debtRatio}
        />
        <HarvestButton 
            vaultId={vaultId}
            strategyModule={strategy.strategyModule}
        />
    </HStack>
  )
}

export default StrategyRow