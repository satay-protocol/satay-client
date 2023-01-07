import { AptosClient } from "aptos";

import { getStrategy } from "../data/strategies";
import { satay } from "../data/moduleAddresses";
import { getVaultInfo } from "../data/vaultsData";

import { Vault, VaultInfo as NewVaultInfo, VaultFees } from "../types/vaults";
import { Strategy, VaultStrategyData } from "../types/strategy";
import { VaultInfo, ManagerResource, VaultData, StructData } from "../types/aptos";

import { getStructFromType } from "./aptosUtils";
import { callGetFunction } from "./simulation";
import { SupportedNetwork } from "../types/network";
import { coins } from "../data/coins";


export const getVaultFromTable = async (client : AptosClient, managerResource : ManagerResource, vaultId : string) : Promise<Vault | null> => {
    const vaultInfo = await client.getTableItem(managerResource.vaults.handle, {
        key_type: "u64",
        value_type: `${satay}::satay::VaultInfo`,
        key: vaultId
    })
        .then((res) => (res as VaultInfo))
        .catch(e => null);
    if(vaultInfo){
        const vaultAddress = vaultInfo.vault_cap.vec[0].vault_addr
        const {data : vault} = await client.getAccountResource(vaultAddress, `${satay}::vault::Vault`);
        const vaultData = vault as VaultData;
        const baseCoin = {
            struct_name: Buffer.from(vaultData.base_coin_type.struct_name.slice(2), 'hex').toString(),
            module_name: Buffer.from(vaultData.base_coin_type.module_name.slice(2), 'hex').toString(),
            account_address: vaultData.base_coin_type.account_address
        }
        return {
            ...getVaultInfo(Buffer.from(vaultData.base_coin_type.struct_name.slice(2), 'hex').toString()),
            baseCoin,
            tvl: await getTVL(vaultId),
            managerAddress: managerResource.vaultManager,
            vaultId,
            vaultAddress: vaultInfo.vault_cap.vec[0].vault_addr,
            strategies: await getStrategiesForVault(client, vaultInfo.vault_cap.vec[0].vault_addr),
        }
    } else {
        return null;
    }
}

export const getVaultFromAddress = async (client : AptosClient, vaultAddress : string) => {
    const {data : vault} = await client.getAccountResource(vaultAddress, `${satay}::vault::Vault`);
    const vaultData = vault as VaultData;
    return {
        vault_address: vaultAddress,
        base_coin: Buffer.from(vaultData.base_coin_type.struct_name.slice(2), 'hex').toString()
    }
}

export const getVaults = async (client : AptosClient, managerResource : ManagerResource) : Promise<Array<Vault | null>> => {
    return Promise.all(Array.from({length: parseInt(managerResource.next_vault_id)}, (_, i) => i).map(async (_, id) => {
        return getVaultFromTable(client, managerResource, id.toString())
    }))
}

export const getTypeString = (struct : StructData) => {
    return struct.account_address + "::"
        + Buffer.from(struct.module_name.slice(2), 'hex').toString() + "::"
        + Buffer.from(struct.struct_name.slice(2), 'hex').toString();
}


export const structToModule = (struct : StructData) => {
    return struct.account_address + "::" + struct.module_name;
}

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

export const fetchVaultInfo = async (vaultId: string, network: SupportedNetwork): Promise<NewVaultInfo> => {
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