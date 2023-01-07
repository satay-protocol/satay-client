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
            const networkSlug = getNetworkSlug(network?.name);
            if(!networkSlug) return;
            const vaultInfo = await fetchVaultInfo(vaultId, networkSlug);
            setVaultInfo(vaultInfo);
        };
        getVaultInfo();
    }, [vaultId]);

    return vaultInfo;
}

export default useVaultInfo;