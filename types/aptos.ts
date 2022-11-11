export interface StructData {
    struct_name: string,
    account_address: string;
    module_name: string;
}

interface VaultCapability {
    vault_addr: string
}

export interface VaultInfo {
    vault_cap: {
        vec: VaultCapability[]
    },
    strategy_type: {
        vec: StructData[]
    }
}

export interface VaultData {
    base_coin_type: StructData,
    total_debt: string
}

export interface ManagerResource {
    vaults: {handle : string},
    next_vault_id: string;
    vaultManager: string
}

export interface CoinStoreResource {
    coin: {
        value: string
    }
}


