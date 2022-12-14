import { APT } from "./coinStructs";
import { satay } from "./moduleAddresses";

import { getTypeString, structToString } from "../services/vaults";

import { StructData } from "../types/aptos";
import { Strategy, StrategyInfo, VaultStrategyData } from "../types/vaults";

const dittoStrategyWitness: StructData = {
    struct_name: "DittoStrategy",
    account_address: satay,
    module_name: "ditto_farming_strategy"
}

const tortugaStrategyWitness: StructData = {
    struct_name: "TortugaStrategy",
    account_address: "0xe3eaddfcc4d7436d26fef92ee39685ef176e3513dc736d116129ce055c07afac",
    module_name: "tortuga_staking_strategy"
}


export const strategies : StrategyInfo[] = [
    {
        strategyWitness: dittoStrategyWitness,
        baseCoin: APT,
        title: "Ditto Staking + LP Strategy",
        description: "Stake APT on Ditto for stAPT to earn APT emission rewards. Add liquidity to stAPT/APT pool on Liquidswap for LP<APT, stAPT> to earn trading fees. Stake LP tokens on Ditto Rewards to earn DTO emissions.",
        protocolsUsed: ["ditto", "pontem"],
        productName: "ditto_farming"
    },
    // {
    //     strategyWitness: tortugaStrategyWitness,
    //     baseCoin: APT,
    //     title: "Tortuga Staking Strategy",
    //     description: "Stake APT on Tortuga for tAPT to earn APT emission rewards. Instantly unstake at best rate via Hippo Aggregator.",
    //     protocolsUsed: ["tortuga", "hippo"],
    // }
]

export const getStrategy = (strategyWitness: StructData, vaultStrategyData: VaultStrategyData) : Strategy => ({
    ...strategies.find((strategy) => structToString(strategyWitness) === structToString(strategy.strategyWitness)) || null,
    totalDebt: vaultStrategyData.total_debt,
    totalGain: vaultStrategyData.total_gain,
    totalLoss: vaultStrategyData.total_loss,
    debtRatio: vaultStrategyData.debt_ratio,
    strategyCoinType: getTypeString(vaultStrategyData.strategy_coin_type),
});

// input as airport name
// process input file
// - for each line
//  - check if airport is same
//  - if same
//   - make sure there is 4 data points
