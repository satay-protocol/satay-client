import { fetchAllVaultIds, fetchIsVaultFrozen, fetchVaultFees, fetchVaultInfo, fetchVaultManagerForId } from "./vaults";

import { SupportedNetwork } from "../types/network";
import { VaultManagerVaultInfo } from "../types/vaults";

export const fetchVaultsManagedByAccount = async (address: string, network: SupportedNetwork): Promise<string[]> => {
    let vaultIds = await fetchAllVaultIds(network);

    let vaultManagers = await Promise.all(vaultIds.map(async (vaultId) => (
        fetchVaultManagerForId(vaultId, network)
    )))

    return vaultIds.filter((_, i) => vaultManagers[i] === address);
}

export const fetchVaultManagerVaultInfo = async (vaultId: string, network: SupportedNetwork): Promise<VaultManagerVaultInfo> => {
    const [vaultInfo, isFrozen, fees] = await Promise.all([
        fetchVaultInfo(vaultId, network),
        fetchIsVaultFrozen(vaultId, network),
        fetchVaultFees(vaultId, network)
    ]);
    return {
        ...vaultInfo,
        isFrozen,
        fees,
    }
}