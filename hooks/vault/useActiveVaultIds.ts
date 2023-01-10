import { useState, useEffect } from "react"

import { useAptos } from "../../contexts/AptosContext";

import { fetchAllVaultIds } from "../../services/vaults";

const useActiveVaultIds = () => {

    const { network } = useAptos();

    const [vaultIds, setVaultIds] = useState<string[]>([]);

    useEffect(() => {
        const getVaultIds = async () => {
            let vaultIds = await fetchAllVaultIds(network);
            setVaultIds(vaultIds);
        }
        getVaultIds();
    }, [network])

    return vaultIds;
}

export default useActiveVaultIds