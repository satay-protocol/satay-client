import { useState, useEffect } from "react";

import { useWallet } from "@manahippo/aptos-wallet-adapter";

import { getNetworkSlug } from "../../services/network";
import { fetchVaultManagerVaultInfo } from "../../services/vaultManager";

import { VaultManagerVaultInfo } from "../../types/vaults";

const useVaultManagerVaultInfo = (vaultId: string) => {
    
    const { network } = useWallet();

    const [vaultManagerVaultInfo, setVaultManagerVaultInfo] = useState<VaultManagerVaultInfo | null>(null);

    useEffect(() => {
        const getVaultManagerVaultInfo = async () => {
            const vaultManagerVaultInfo = await fetchVaultManagerVaultInfo(vaultId, getNetworkSlug(network.name));
            setVaultManagerVaultInfo(vaultManagerVaultInfo);
        };
        getVaultManagerVaultInfo();
    }, [vaultId]);

    return vaultManagerVaultInfo;
}

export default useVaultManagerVaultInfo;
