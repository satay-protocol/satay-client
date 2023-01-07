import { useWallet } from "@manahippo/aptos-wallet-adapter";
import { useState, useEffect } from "react";
import { getNetworkSlug } from "../../services/network";
import { fetchVaultInfo } from "../../services/vaults";

import { VaultInfo } from "../../types/vaults";

const useVaultInfo = (vaultId: string) => {

    const { network } = useWallet();

    const [vaultInfo, setVaultInfo] = useState<VaultInfo | null>(null);

    useEffect(() => {
        const getVaultInfo = async () => {
            const vaultInfo = await fetchVaultInfo(vaultId, getNetworkSlug(network.name));
            setVaultInfo(vaultInfo);
        };
        getVaultInfo();
    }, [vaultId]);

    return vaultInfo;
}

export default useVaultInfo;