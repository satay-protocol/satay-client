import { useState, useEffect } from "react";

import { useAptos } from "../../contexts/AptosContext";

import { fetchVaultManagerVaultInfo } from "../../services/vaultManager";

import { VaultManagerVaultInfo } from "../../types/vaults";

const useVaultManagerVaultInfo = (vaultId: string) => {
    
    const { network } = useAptos();

    const [vaultManagerVaultInfo, setVaultManagerVaultInfo] = useState<VaultManagerVaultInfo | null>(null);

    useEffect(() => {
        const getVaultManagerVaultInfo = async () => {
            const vaultManagerVaultInfo = await fetchVaultManagerVaultInfo(vaultId, network);
            setVaultManagerVaultInfo(vaultManagerVaultInfo);
        };
        getVaultManagerVaultInfo();
    }, [vaultId]);

    return vaultManagerVaultInfo;
}

export default useVaultManagerVaultInfo;
