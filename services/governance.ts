import { AptosClient } from "aptos";

import { fetchVaultInfo, fetchVaultManager } from "./vaults";

import { satay } from "../data/moduleAddresses";

import { GovernanceVaultInfo } from "../types/vaults";
import { StructData } from "../types/aptos";


export const fetchGovernanceAddress = async (client: AptosClient) => {
    return client.view({
        function: `${satay}::global_config::get_governance_address`,
        type_arguments: [],
        arguments: []
    }).then(res => res[0] as string).catch(_ => "")
}


export const fetchGovernanceVaultInfo = async (client: AptosClient, baseCoinStruct: StructData): Promise<GovernanceVaultInfo> => {
    const vaultInfo = await fetchVaultInfo(client, baseCoinStruct);
    const managerAddress = await fetchVaultManager(client, baseCoinStruct);
    return {
        ...vaultInfo,
        managerAddress,
    };
}