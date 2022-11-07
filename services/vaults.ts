import { AptosClient } from "aptos";
import { MoveResource } from "aptos/src/generated";
import { Coin } from "../data/coins";
import { getStrategy } from "../data/strategies";

import { vaultManager } from "../data/vaultManager";
import { getVaultInfo } from "../data/vaultsData";


import { ManagerResource } from "../hooks/manager/useManagerResource";
import { Vault, Strategy } from "../types/vaults";
import { CoinStoreResource } from "./aptosUtils";
import { toAptos } from "./utils";

interface StructData {
    struct_name: string,
    account_address: string;
    module_name: string;
}

interface VaultCapability {
    vault_addr: string
}

interface VaultInfo {
    vault_cap: {
        vec: VaultCapability[]
    },
    strategy_type: {
        vec: StructData[]
    }
}

interface VaultData {
    base_coin_type: StructData,
    total_debt: string
}

export const getVaultFromTable = async (client : AptosClient, managerResource : ManagerResource, vaultId : string) : Promise<Vault | null> => {
    const vaultInfo : VaultInfo = await client.getTableItem(managerResource.vaults.handle, {
        key_type: "u64",
        value_type: `${vaultManager}::satay::VaultInfo`,
        key: vaultId
    }).catch(e => console.log(e.message));
    if(vaultInfo){
        const vaultAddress = vaultInfo.vault_cap.vec[0].vault_addr
        const {data : vault} = await client.getAccountResource(vaultAddress, `${vaultManager}::vault::Vault`);
        const vaultData = vault as VaultData;
        console.log(vaultData);
        const coinType = getTypeString(vaultData.base_coin_type);
        return {
            ...getVaultInfo(Buffer.from(vaultData.base_coin_type.struct_name.slice(2), 'hex').toString()),
            coinType,
            tvl: await getTVL(client, vaultAddress, coinType, parseInt(vaultData.total_debt)),
            managerAddress: managerResource.vaultManager,
            vaultId,
            vaultAddress: vaultInfo.vault_cap.vec[0].vault_addr,
            strategies: await getStrategiesForVault(client, vaultInfo.vault_cap.vec[0].vault_addr)
        }
    } else {
        return null;
    }
}

export const getVaultFromAddress = async (client : AptosClient, vaultAddress : string) => {
    const {data : vault} = await client.getAccountResource(vaultAddress, `${vaultManager}::vault::Vault`);
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

export const getTVL = async (client: AptosClient, vaultAddress: string, baseCoin: string, totalDebt: number) => {
    let { data } = await client.getAccountResource(vaultAddress, `${vaultManager}::vault::CoinStore<${baseCoin}>`);
    return totalDebt + toAptos(parseInt((data as CoinStoreResource).coin.value))
}

interface VaultStrategyData {
    base_coin_type: StructData
}

export const getStrategiesForVault = async (client : AptosClient, vaultAddress : string) : Promise<Strategy[]> => {
    const resources = await client.getAccountResources(vaultAddress);
    return resources
        .filter(resource => resource.type.includes("VaultStrategy"))
        .map(resource => getStrategy(
            resource.type.slice(resource.type.indexOf("VaultStrategy<") + 14, resource.type.lastIndexOf("::")),
            getTypeString((resource.data as VaultStrategyData).base_coin_type)
        ))
}