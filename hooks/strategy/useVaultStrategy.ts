import { useWallet } from "@manahippo/aptos-wallet-adapter";
import { useState, useEffect } from "react";
import { getNetworkSlug } from "../../services/network";
import { fetchVaultStrategy } from "../../services/strategies";
import { StructData } from "../../types/aptos";
import { VaultStrategy } from "../../types/strategy";

const useVaultStrategy = (strategyWitness: StructData, vaultAddress: string, decimals: number) => {

    let { network } = useWallet();

    const [strategyInfo, setStrategyInfo] = useState<VaultStrategy | null>(null);

    useEffect(() => {
        const loadVaultStrategy = async () => {
            const strategy = await fetchVaultStrategy(strategyWitness, vaultAddress, decimals, getNetworkSlug(network.name));
            setStrategyInfo(strategy);
        }
        loadVaultStrategy();
    }, [strategyWitness, vaultAddress, network]);

    return strategyInfo;
}

export default useVaultStrategy;