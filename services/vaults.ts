import { AptosClient } from "aptos";

import { getStrategy } from "../data/strategies";
import { satay } from "../data/moduleAddresses";
import { coins } from "../data/coins";

import { VaultInfo, VaultFees } from "../types/vaults";
import { Strategy, VaultStrategyData } from "../types/strategy";
import { StructData } from "../types/aptos";


import { getStructFromType, structToString } from "./aptosUtils";



export const getTVL = async (vaultId: string): Promise<number> => {
    const TVL: number = await fetch(`/api/total_assets/${vaultId}`)
        .then(res => res.json())
        .then(data => data.totalAssets)
    return TVL;
}

export const getStrategiesForVault = async (client: AptosClient, vaultAddress: string): Promise<Strategy[]> => {
    const resources = await client.getAccountResources(vaultAddress);
    const strategies = resources
        .filter(resource => resource.type.includes("VaultStrategy"))
        .map(resource => getStrategy(
            getStructFromType(resource.type.slice(resource.type.indexOf("VaultStrategy<") + 14, -1)),
            resource.data as VaultStrategyData
        ))
    return strategies;
}

export const fetchVaultAddress = async (client: AptosClient, baseCoinStruct: StructData): Promise<string> => (
    client.view({
        function: `${satay}::satay::get_vault_address`,
        type_arguments: [structToString(baseCoinStruct)],
        arguments: []
    }).then(res => res[0] as string).catch(_ => "")
)


export const fetchVaultManager = async (client: AptosClient, baseCoinStruct: StructData): Promise<string> => (
    client.view({
        function: `${satay}::satay::get_vault_manager_address`,
        type_arguments: [structToString(baseCoinStruct)],
        arguments: []
    }).then(res => res[0] as string).catch(_ => "")
)

export const fetchVaultInfo = async (client: AptosClient, baseCoinStruct: StructData): Promise<VaultInfo> => {
    const vaultAddress = await fetchVaultAddress(client, baseCoinStruct);
    return {
        vaultAddress,
        baseCoin: coins[0]
    }
}

export const fetchVaultFees = async (client: AptosClient, baseCoinStruct: StructData): Promise<VaultFees> => (
    client.view({
        function: `${satay}::satay::get_vault_fees`,
        type_arguments: [structToString(baseCoinStruct)],
        arguments: []
    }).then(res => ({
        managementFee: parseInt(res[0] as string),
        performanceFee: parseInt(res[1] as string)
    })).catch(_ => ({
        managementFee: 0,
        performanceFee: 0
    }))
)

export const fetchIsVaultFrozen = async (client: AptosClient, baseCoinStruct: StructData): Promise<boolean> => (
    client.view({
        function: `${satay}::satay::is_vault_frozen`,
        type_arguments: [structToString(baseCoinStruct)],
        arguments: []
    }).then(res => res[0] as boolean).catch(_ => false)
)