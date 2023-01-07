import { useState, useEffect } from "react";

import { useAptos } from "../../contexts/AptosContext";

import { fetchGovernanceVaultInfo } from "../../services/governance";

import { GovernanceVaultInfo } from "../../types/vaults";

const useGovernanceVaultInfo = (vaultId: string) => {

    const { network } = useAptos();

    const [governanceVaultInfo, setGovernanceVaultInfo] = useState<GovernanceVaultInfo | null>(null);

    useEffect(() => {
        const getGovernanceVaultInfo = async () => {
            const governanceVaultInfo = await fetchGovernanceVaultInfo(vaultId, network);
            setGovernanceVaultInfo(governanceVaultInfo);
        };
        getGovernanceVaultInfo();
    }, [network, vaultId]);

    return governanceVaultInfo;

}

export default useGovernanceVaultInfo;