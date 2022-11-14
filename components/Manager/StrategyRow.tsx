import React from 'react'

import {
    HStack,
    Text
} from '@chakra-ui/react'

import DebtRatioSlider from './DebtRatioSlider';
import HarvestButton from './HarvestButton';
import { Strategy } from '../../types/vaults';
import { structToModule, structToString } from '../../services/vaults';

interface Props {
    strategy: Strategy,
    vaultId: string,
}

const StrategyRow : React.FC<Props> = ({ strategy, vaultId}) => {

    const strategyModule = structToModule(strategy.strategyWitness);

    return (
        <HStack
            key={structToString(strategy.strategyWitness)}
            spacing={4}
        >
            <Text
                mr='auto'
            >
                {strategy.title}
            </Text>
            <DebtRatioSlider 
                strategyModule={strategyModule}
                vaultId={vaultId}
                currentDebtRatio={strategy.debtRatio}
            />
            <HarvestButton 
                vaultId={vaultId}
                strategyModule={strategyModule}
            />
        </HStack>
    )
}

export default StrategyRow