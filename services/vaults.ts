import { AptosClient } from "aptos";
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
    user_positions: {
        handle: string
    }
}

export const getVaultFromTable = async (client : AptosClient, managerResource : ManagerResource, vaultId : string) : Promise<Vault | null> => {
    const vaultInfo : VaultInfo = await client.getTableItem(managerResource.vaults.handle, {
        key_type: "u64",
        value_type: `${vaultManager}::satay::VaultInfo`,
        key: vaultId
    }).catch(e => console.log(e.message));
    if(vaultInfo){
        const {data : vault} = await client.getAccountResource(vaultInfo.vault_cap.vec[0].vault_addr, `${vaultManager}::vault::Vault`);
        const vaultData = vault as VaultData;
        const coinType = getTypeString(vaultData.base_coin_type);
        return {
            ...getVaultInfo(Buffer.from(vaultData.base_coin_type.struct_name.slice(2), 'hex').toString()),
            coinType: getTypeString(vaultData.base_coin_type),
            totalDeposits: await getTotalDeposits(client, coinType),
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

const getTotalDeposits = async (client : AptosClient, baseCoin : string) => {
    return client.getAccountResource(vaultManager, `0x1::coin::CoinStore<${vaultManager}::vault::VaultCoin<${baseCoin}>>`)
        .then(res => toAptos(parseInt((res.data as CoinStoreResource).coin.value)))
        .catch(err => 0)
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