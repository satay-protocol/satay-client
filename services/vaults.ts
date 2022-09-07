import { AptosClient } from "aptos";
import { vaultManager } from "../data/vaultManager";
import { ManagerResource } from "../hooks/useManagerResource";

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

export const getVaultFromTable = async (client : AptosClient, vaultsHandle : string, vaultId : string) => {
    const vaultInfo : VaultInfo = await client.getTableItem(vaultsHandle, {
        key_type: "u64",
        value_type: `${vaultManager}::satay::VaultInfo`,
        key: vaultId
    })
    const {data : vault} = await client.getAccountResource(vaultInfo.vault_cap.vec[0].vault_addr, `${vaultManager}::vault::Vault`);
    const vaultData = vault as VaultData;
    return {
        vault_address: vaultInfo.vault_cap.vec[0].vault_addr,
        base_coin: Buffer.from(vaultData.base_coin_type.struct_name.slice(2), 'hex').toString()
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

export const getVaults = async (client : AptosClient, managerResource : ManagerResource) => {
    return Promise.all(Array.from({length: parseInt(managerResource.next_vault_id)}, (_, i) => i).map(async (_, id) => {
        return getVaultFromTable(client, managerResource.vaults.handle, id.toString())
    }))
}