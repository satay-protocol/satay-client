import { fetchIsVaultFrozen, fetchVaultFees, fetchVaultInfo, fetchVaultManager } from "./vaults";

import { SupportedNetwork } from "../types/network";
import { VaultManagerVaultInfo } from "../types/vaults";
import { activeVaults } from "../data/vaults";
import { AptosClient } from "aptos";
import { Coin } from "../types/coin";
import { StructData } from "../types/aptos";

export const fetchVaultsManagedByAccount = async (client: AptosClient, address: string): Promise<Coin[]> => {
    let vaultManagers = await Promise.all(activeVaults.map(async (baseCoin) => (
        fetchVaultManager(client, baseCoin.coinStruct)
    )))
    return activeVaults.filter((_, i) => vaultManagers[i] === address);
}

export const fetchVaultManagerVaultInfo = async (client: AptosClient, baseCoinStruct: StructData): Promise<VaultManagerVaultInfo> => {
    const [vaultInfo, isFrozen, fees] = await Promise.all([
        fetchVaultInfo(client, baseCoinStruct),
        fetchIsVaultFrozen(client, baseCoinStruct),
        fetchVaultFees(client, baseCoinStruct)
    ]);
    return {
        ...vaultInfo,
        isFrozen,
        fees,
    }
}