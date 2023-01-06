import { useWallet } from "@manahippo/aptos-wallet-adapter";
import { useState, useEffect } from "react";
import { fetchGovernanceVaultInfo } from "../../services/governance";
import { getNetworkSlug } from "../../services/network";

import { GovernanceVaultInfo } from "../../types/vaults";

const useGovernanceVaultInfo = (vaultId: string) => {

    const { network } = useWallet();

    const [governanceVaultInfo, setGovernanceVaultInfo] = useState<GovernanceVaultInfo | null>(null);

    useEffect(() => {
        const getGovernanceVaultInfo = async () => {
            const governanceVaultInfo = await fetchGovernanceVaultInfo(vaultId, getNetworkSlug(network.name));
            setGovernanceVaultInfo(governanceVaultInfo);
        };
        getGovernanceVaultInfo();
    });

    return governanceVaultInfo;

}

export default useGovernanceVaultInfo;