import { useState, useEffect } from "react";

import { useAptos } from "../../contexts/AptosContext";

import { fetchVaultManagerVaultInfo } from "../../services/vaultManager";

import { VaultManagerVaultInfo } from "../../types/vaults";
import { StructData } from "../../types/aptos";

const useVaultManagerVaultInfo = (baseCoinStruct: StructData) => {
    
    const { client } = useAptos();

    const [vaultManagerVaultInfo, setVaultManagerVaultInfo] = useState<VaultManagerVaultInfo | null>(null);

    useEffect(() => {
        const getVaultManagerVaultInfo = async () => {
            const vaultManagerVaultInfo = await fetchVaultManagerVaultInfo(client, baseCoinStruct);
            setVaultManagerVaultInfo(vaultManagerVaultInfo);
        };
        getVaultManagerVaultInfo();
    }, [client, baseCoinStruct]);

    return vaultManagerVaultInfo;
}

export default useVaultManagerVaultInfo;
