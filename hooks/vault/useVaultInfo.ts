import { useState, useEffect } from "react";

import { useAptos } from "../../contexts/AptosContext";

import { fetchVaultInfo } from "../../services/vaults";

import { VaultInfo } from "../../types/vaults";

const useVaultInfo = (vaultId: string) => {

    const { network } = useAptos();

    const [vaultInfo, setVaultInfo] = useState<VaultInfo | null>(null);

    useEffect(() => {
        const getVaultInfo = async () => {
            const vaultInfo = await fetchVaultInfo(vaultId, network);
            setVaultInfo(vaultInfo);
        };
        getVaultInfo();
    }, [vaultId]);

    return vaultInfo;
}

export default useVaultInfo;