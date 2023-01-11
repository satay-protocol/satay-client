import { AptosClient } from "aptos";

import { getStrategy } from "../data/strategies";
import { satay } from "../data/moduleAddresses";

import { VaultInfo, VaultFees } from "../types/vaults";
import { Strategy, VaultStrategyData } from "../types/strategy";

import { getStructFromType } from "./aptosUtils";
import { callGetFunction } from "./simulation";
import { SupportedNetwork } from "../types/network";
import { coins } from "../data/coins";

export const getTVL = async (vaultId: string): Promise<number> => {
    const TVL: number = await fetch(`/api/total_assets/${vaultId}`)
        .then(res => res.json())
        .then(data => data.totalAssets)
    return TVL;
}

export const getStrategiesForVault = async (client : AptosClient, vaultAddress : string) : Promise<Strategy[]> => {
    const resources = await client.getAccountResources(vaultAddress);
    const strategies = resources
        .filter(resource => resource.type.includes("VaultStrategy"))
        .map(resource => getStrategy(
            getStructFromType(resource.type.slice(resource.type.indexOf("VaultStrategy<") + 14, -1)),
            resource.data as VaultStrategyData
        ))
    return strategies;
}

export const fetchAllVaultIds = async (network: SupportedNetwork): Promise<string[]> => {
    console.log(network);
    const nextVaultIdResult = await callGetFunction({
        func: `${satay}::satay::get_next_vault_id`,
        type_args: [],
        args: [],
        ledger_version: 0,
        network,
    })
    const nextVaultId = nextVaultIdResult.details.return_values[0] as number;
    return Array.from({length: nextVaultId}, (_, i) => i).map(i => i.toString());
}

export const fetchVaultAddressForId = async (vaultId: string, network: SupportedNetwork): Promise<string> => {
    let vaultAddressResult = await callGetFunction({
        func: `${satay}::satay::get_vault_address_by_id`,
        type_args: [],
        args: [vaultId],
        ledger_version: 0,
        network,
    })
    return "0x" + (vaultAddressResult.details.return_values[0] as string);
}

export const fetchVaultManagerForAddress = async (vaultAddress: string, network: SupportedNetwork): Promise<string> => {
    let managerAddressResult = await callGetFunction({
        func: `${satay}::vault_config::get_vault_manager_address`,
        type_args: [],
        args: [vaultAddress],
        ledger_version: 0,
        network,
    })
    return "0x" + (managerAddressResult.details.return_values[0] as string);
}

export const fetchVaultManagerForId = async (vaultId: string, network: SupportedNetwork): Promise<string> => {
    const vaultAddress = await fetchVaultAddressForId(vaultId, network);
    return fetchVaultManagerForAddress(vaultAddress, network);
}

export const fetchVaultInfo = async (vaultId: string, network: SupportedNetwork): Promise<VaultInfo> => {
    const vaultAddress = await fetchVaultAddressForId(vaultId, network);
    return {
        vaultId,
        vaultAddress,
        baseCoin: coins[0]
    }
}

export const fetchVaultFees = async (vaultId: string, network: SupportedNetwork): Promise<VaultFees> => {
    let feesResult = await callGetFunction({
        func: `${satay}::satay::get_vault_fees`,
        type_args: [],
        args: [vaultId],
        ledger_version: 0,
        network,
    })
    return {
        managementFee: (feesResult.details.return_values[0] as number),
        performanceFee: (feesResult.details.return_values[1] as number),
    }
}

export const fetchIsVaultFrozen = async (vaultId: string, network: SupportedNetwork): Promise<boolean> => {
    let isFrozenResult = await callGetFunction({
        func: `${satay}::satay::is_vault_frozen`,
        type_args: [],
        args: [vaultId],
        ledger_version: 0,
        network,
    })
    return isFrozenResult.details.return_values[0] as boolean;
}