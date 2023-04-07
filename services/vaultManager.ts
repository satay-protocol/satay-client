import { fetchIsVaultFrozen, fetchVaultFees, fetchVaultInfo, fetchVaultManager } from "./vaults";

import { SupportedNetwork } from "../types/network";
import { VaultManagerVaultInfo } from "../types/vaults";
import { getVaults } from "../data/vaults";
import { AptosClient } from "aptos";
import { Coin } from "../types/coin";
import { StructData } from "../types/aptos";
import {getAptosClient} from "./aptosClients";

export const fetchVaultsManagedByAccount = async (network: SupportedNetwork, address: string): Promise<Coin[]> => {
    const client = getAptosClient(network);
    const activeVaults = getVaults(network);
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