import { dittoStakingAddress, layerZeroAddress, liquidswapCurvesAddress, liquidswapLPAddress } from "./protocolAddresses";

import { StructData } from "../types/aptos";
import { structToString } from "../services/aptosUtils";
import { dittoFarming, satay, satayCoins } from "./moduleAddresses";

export const APT: StructData = {
    struct_name: "AptosCoin",
    account_address: "0x1",
    module_name: "aptos_coin"
}

export const stAPT : StructData = {
    struct_name: "StakedAptos",
    account_address: dittoStakingAddress,
    module_name: "staked_coin"
}

export const tAPT: StructData = {
    struct_name: "StakedAptosCoin",
    account_address: "0x84d7aeef42d38a5ffc3ccef853e1b82e4958659d16a7de736a29c55fbbeb0114",
    module_name: "staked_aptos_coin"
}

export const USDC: StructData = {
    struct_name: "USDC",
    account_address: layerZeroAddress,
    module_name: 'asset'
}

export const SatayLendCoin: StructData = {
    struct_name: "SatayUSDCLend",
    account_address: satay,
    module_name: 'borrow_lend_optimize'
}

const stablePool : StructData = {
    struct_name: "Stable",
    account_address: liquidswapCurvesAddress,
    module_name: "curves"
}

const uncorrelatedPool : StructData = {
    struct_name: "Uncorrelated",
    account_address: liquidswapCurvesAddress,
    module_name: "curves"
}

const poolTypes = [
    "Stable",
    "Uncorrelated"
] as const
type PoolType = typeof poolTypes[number]


const pools : {[key : string] : StructData} = {
    Stable: stablePool,
    Uncorrelated: uncorrelatedPool
}

export const LP = (coin1: StructData, coin2: StructData, poolType: PoolType) : StructData => ({
    struct_name: `LP<${structToString(coin1)}, ${structToString(coin2)}, ${structToString(pools[poolType])}>`,
    account_address: liquidswapLPAddress,
    module_name: "lp_coin"
})

export const vaultCoin = (coin: StructData) : StructData => ({
    struct_name: `VaultCoin<${structToString(coin)}>`,
    account_address: satayCoins,
    module_name: "vault_coin"
})

export const dittoFarmingCoin : StructData = {
    struct_name: "DittoFarmingCoin",
    account_address: dittoFarming,
    module_name: "ditto_farming"
}