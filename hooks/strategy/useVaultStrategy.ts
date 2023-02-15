import { useState, useEffect } from "react";

import { useAptos } from "../../contexts/AptosContext";

import { fetchVaultStrategy } from "../../services/strategies";

import { StructData } from "../../types/aptos";
import { VaultStrategy } from "../../types/strategy";

const useVaultStrategy = (baseCoinStruct: StructData, strategyWitness: StructData, vaultAddress: string, decimals: number) => {

    let { client } = useAptos();

    const [strategyInfo, setStrategyInfo] = useState<VaultStrategy | null>(null);

    useEffect(() => {
        const loadVaultStrategy = async () => {
            const strategy = await fetchVaultStrategy(client, baseCoinStruct, strategyWitness, vaultAddress, decimals);
            setStrategyInfo(strategy);
        }
        loadVaultStrategy();
    }, [strategyWitness, vaultAddress, baseCoinStruct]);

    return strategyInfo;
}

export default useVaultStrategy;