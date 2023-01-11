import { useState, useEffect } from "react";

import { useAptos } from "../../contexts/AptosContext";

import { fetchVaultStrategy } from "../../services/strategies";

import { StructData } from "../../types/aptos";
import { VaultStrategy } from "../../types/strategy";

const useVaultStrategy = (strategyWitness: StructData, vaultAddress: string, decimals: number) => {

    let { network } = useAptos();

    const [strategyInfo, setStrategyInfo] = useState<VaultStrategy | null>(null);

    useEffect(() => {
        const loadVaultStrategy = async () => {
            const strategy = await fetchVaultStrategy(strategyWitness, vaultAddress, decimals, network);
            setStrategyInfo(strategy);
        }
        loadVaultStrategy();
    }, [strategyWitness, vaultAddress, network]);

    return strategyInfo;
}

export default useVaultStrategy;