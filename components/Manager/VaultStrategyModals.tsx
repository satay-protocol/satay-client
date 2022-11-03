import React from 'react'

import ApplyStrategy from '../modals/ApplyStrategy'
import LiquidateStrategy from '../modals/LiquidateStrategy'

import useVaultStrategy from '../../hooks/manager/useVaultStrategy';

import { Strategy, Vault } from '../../types/vaults';

interface Props {
    isApplyStrategyOpen: boolean;
    onApplyStrategyClose: () => void;
    isLiquidateStrategyOpen: boolean;
    onLiquidateStrategyClose: () => void;
    vault: Vault;
    activeStrategy: Strategy;
}

const VaultStrategyModals : React.FC<Props> = ({
    isApplyStrategyOpen,
    onApplyStrategyClose,
    isLiquidateStrategyOpen,
    onLiquidateStrategyClose,
    vault,
    activeStrategy
}) => {

    const { applyStrategy, liquidateStrategy } = useVaultStrategy(vault.vaultId, activeStrategy.strategyModule);

    return (
        <>
            <ApplyStrategy 
                isOpen={isApplyStrategyOpen}
                onClose={onApplyStrategyClose}
                baseCoin={vault.coinType}
                vaultAddress={vault.vaultAddress}
                applyStrategy={applyStrategy}
            />
            <LiquidateStrategy
                isOpen={isLiquidateStrategyOpen}
                onClose={onLiquidateStrategyClose}
                strategyCoin={activeStrategy.strategy_coin_type}
                vaultAddress={vault.vaultAddress}
                liquidateStrategy={liquidateStrategy}
            />
        </>
    )
}

export default VaultStrategyModals