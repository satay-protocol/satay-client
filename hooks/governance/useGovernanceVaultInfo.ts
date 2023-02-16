import { useState, useEffect } from "react";

import { useAptos } from "../../contexts/AptosContext";

import { fetchGovernanceVaultInfo } from "../../services/governance";
import { StructData } from "../../types/aptos";

import { GovernanceVaultInfo } from "../../types/vaults";

const useGovernanceVaultInfo = (baseCoinStruct: StructData) => {

    const { client } = useAptos();

    const [governanceVaultInfo, setGovernanceVaultInfo] = useState<GovernanceVaultInfo | null>(null);

    useEffect(() => {
        const getGovernanceVaultInfo = async () => {
            const governanceVaultInfo = await fetchGovernanceVaultInfo(client, baseCoinStruct);
            setGovernanceVaultInfo(governanceVaultInfo);
        };
        getGovernanceVaultInfo();
    }, [client, baseCoinStruct]);

    return governanceVaultInfo;

}

export default useGovernanceVaultInfo;