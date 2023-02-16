import { structToString } from "../services/aptosUtils";

import { satay } from "./moduleAddresses";
import { APTOS } from "./coins";

import { StructData } from "../types/aptos";
import { Strategy, VaultStrategyData, StrategyInfo } from "../types/strategy";

const dittoStrategyWitness: StructData = {
    struct_name: "DittoStrategy",
    account_address: satay,
    module_name: "ditto_farming_strategy"
}

const tortugaStrategyWitness: StructData = {
    struct_name: "SimpleTortugaStrategy",
    account_address: satay,
    module_name: "simple_tortuga_strategy"
}

const dittoStakeStrategyWitness: StructData = {
    struct_name: "SimpleDittoStrategy",
    account_address: satay,
    module_name: "simple_ditto_strategy"
}


export const strategies : StrategyInfo[] = [
    // {
    //     strategyWitness: dittoStrategyWitness,
    //     vaultStrategyModule
    //     baseCoin: coins[0],
    //     name: "Ditto Staking + LP Strategy",
    //     description: "Stake APT on Ditto for stAPT to earn APT emission rewards. Add liquidity to stAPT/APT pool on Liquidswap for LP<APT, stAPT> to earn trading fees. Stake LP tokens on Ditto Rewards to earn DTO emissions.",
    //     protocols: ["ditto", "pontem"],
    //     productName: "ditto_farming"
    // },
    {
        strategyWitness: tortugaStrategyWitness,
        vaultStrategyModule: `${satay}::simple_tortuga_vault_strategy`,
        baseCoin: APTOS,
        name: "Tortuga Staking Strategy",
        description: "Stake APT on Tortuga for tAPT to earn APT emission rewards. Instantly unstake at best rate via Hippo Aggregator.",
        protocols: ["tortuga", "hippo"],
        productName: "tortuga_farming"
    },
    {
        strategyWitness: dittoStakeStrategyWitness,
        vaultStrategyModule: `${satay}::simple_ditto_vault_strategy`,
        baseCoin: APTOS,
        name: "Ditto Staking Strategy",
        description: "Stake APT on Tortuga for stAPT to earn APT emission rewards. Instantly unstake at best rate via Hippo Aggregator.",
        protocols: ["ditto", "hippo"],
        productName: "ditto_farming"
    }
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
});