import { fetchVaultInfo, fetchVaultManagerForAddress } from "./vaults";

import { SupportedNetwork } from "../types/network";
import { GovernanceVaultInfo } from "../types/vaults";

export const fetchGovernanceVaultInfo = async (vaultId: string, network: SupportedNetwork): Promise<GovernanceVaultInfo> => {
    const vaultInfo = await fetchVaultInfo(vaultId, network);
    const managerAddress = await fetchVaultManagerForAddress(vaultInfo.vaultAddress, network);
    return {
        ...vaultInfo,
        managerAddress,
    };
}