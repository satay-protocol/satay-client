import { useState, useEffect } from "react";

import { useAptos } from "../../contexts/AptosContext";

import { fetchVaultInfo } from "../../services/vaults";
import { StructData } from "../../types/aptos";

import { VaultInfo } from "../../types/vaults";

const useVaultInfo = (baseCoinStruct: StructData) => {

    const { client } = useAptos();

    const [vaultInfo, setVaultInfo] = useState<VaultInfo | null>(null);

    useEffect(() => {
        const getVaultInfo = async () => {
            const vaultInfo = await fetchVaultInfo(client, baseCoinStruct);
            setVaultInfo(vaultInfo);
        };
        getVaultInfo();
    }, [baseCoinStruct]);

    return vaultInfo;
}

export default useVaultInfo;