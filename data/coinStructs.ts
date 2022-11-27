import { dittoStakingAddress, liquidswapCurvesAddress, liquidswapLPAddress } from "./protocolAddresses";

import { StructData } from "../types/aptos";
import { structToString } from "../services/vaults";
import { dittoFarming, satay } from "./moduleAddresses";

const convertStringToHex = (str: string) => {
    var arr = [];
    for (var i = 0; i < str.length; i++) {
        arr[i] = (str.charCodeAt(i).toString(16)).slice(-4);
    }
    return "0x" + arr.join("");
}

export const APT : StructData = {
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
    struct_name: "TortugaAptos",
    account_address: satay,
    module_name: "tortuga_coin"
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
    account_address: satay,
    module_name: "vault"
})

export const dittoFarmingCoin : StructData = {
    struct_name: "DittoFarmingCoin",
    account_address: dittoFarming,
    module_name: "ditto_farming"
}