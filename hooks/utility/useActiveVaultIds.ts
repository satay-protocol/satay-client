import { useState, useEffect } from "react"

import { useWallet } from "@manahippo/aptos-wallet-adapter";

import { fetchAllVaultIds } from "../../services/vaults";
import { getNetworkSlug } from "../../services/network";

const useActiveVaultIds = () => {

    const { network } = useWallet();

    const [vaultIds, setVaultIds] = useState<string[]>([]);

    useEffect(() => {
        const getVaultIds = async () => {
            let vaultIds = await fetchAllVaultIds(getNetworkSlug(network.name));
            setVaultIds(vaultIds);
        }
        getVaultIds();
    }, [])

    return vaultIds;
}

export default useActiveVaultIds