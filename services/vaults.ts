import { AptosClient } from "aptos";

import { vaultManager } from "../data/vaultManager";
import { getVaultInfo, getVaultPreview } from "../data/vaultsData";


import { ManagerResource } from "../hooks/useManagerResource";
import { Vault, VaultPreview } from "../types/vaults";

interface VaultCapability {
    vault_addr: string
}

interface VaultInfo {
    vault_cap: {
        vec: VaultCapability[]
    }
}

interface VaultData {
    base_coin_type: {
        struct_name: string
    };
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
        return {
            ...getVaultInfo(Buffer.from(vaultData.base_coin_type.struct_name.slice(2), 'hex').toString()),
            apy: 10.5,
            totalAssets: 100000,
            managerAddress: managerResource.vaultManager,
            vaultId,
            vaultAddress: vaultInfo.vault_cap.vec[0].vault_addr
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

interface CoinStore {
    coin: {
        value: string
    }
}

export const getVaultCoins = async (client : AptosClient, vaultAddress: string) => {
    let resources = await client.getAccountResources(vaultAddress);
    let coins = resources
        .filter(r => r.type.includes('CoinStore'))
        .map((r) => ({
            coin: r.type.slice(r.type.lastIndexOf("::") + 2, -1),
            value: parseInt((r.data as CoinStore).coin.value)
        }))
    console.log(coins);
    // const vaultData = vault as VaultData;
    // return vaultData.user_positions.handle;
}