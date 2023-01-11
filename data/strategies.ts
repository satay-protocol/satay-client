import { satay } from "./moduleAddresses";

import { structToString } from "../services/aptosUtils";

import { StructData } from "../types/aptos";
import { Strategy, VaultStrategyData, StrategyInfo } from "../types/strategy";
import { coins } from "./coins";

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
        baseCoin: coins[0],
        name: "Ditto Staking + LP Strategy",
        description: "Stake APT on Ditto for stAPT to earn APT emission rewards. Add liquidity to stAPT/APT pool on Liquidswap for LP<APT, stAPT> to earn trading fees. Stake LP tokens on Ditto Rewards to earn DTO emissions.",
        protocols: ["ditto", "pontem"],
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

export const getStrategyInfo = (strategyWitness: StructData): StrategyInfo => (
    strategies.find((strategy) => structToString(strategyWitness) === structToString(strategy.strategyWitness)) || null
);

export const getStrategy = (strategyWitness: StructData, vaultStrategyData: VaultStrategyData): Strategy => ({
    ...getStrategyInfo(strategyWitness) || null,
    totalDebt: parseInt(vaultStrategyData.total_debt),
    totalGain: parseInt(vaultStrategyData.total_gain),
    totalLoss:parseInt(vaultStrategyData.total_loss),
    debtRatio: parseInt(vaultStrategyData.debt_ratio),
    strategyCoinType: structToString(vaultStrategyData.strategy_coin_type),
});