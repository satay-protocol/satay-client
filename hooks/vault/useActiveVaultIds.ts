import { useState, useEffect } from "react"

import { useWallet } from "@manahippo/aptos-wallet-adapter";

import { fetchAllVaultIds } from "../../services/vaults";
import { getNetworkSlug } from "../../services/network";

const useActiveVaultIds = () => {

    const { network } = useWallet();

    const [vaultIds, setVaultIds] = useState<string[]>([]);

    useEffect(() => {
        const getVaultIds = async () => {
            const networkSlug = getNetworkSlug(network?.name);
            if(!networkSlug) return;
            let vaultIds = await fetchAllVaultIds(networkSlug);
            setVaultIds(vaultIds);
        }
        getVaultIds();
    }, [network])

    return vaultIds;
}

export default useActiveVaultIds