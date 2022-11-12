import { getTypeString } from "../services/vaults";
import { Strategy, StrategyInfo, VaultStrategyData } from "../types/vaults";


export const strategies : StrategyInfo[] = [
    {
        strategyModule: "0xe3eaddfcc4d7436d26fef92ee39685ef176e3513dc736d116129ce055c07afac::ditto_strategy",
        strategyWitness: "DittoStrategy",
        baseCoin: "0x1::aptos_coin::AptosCoin",
        title: "Ditto Staking + LP Strategy",
        description: "Stake APT on Ditto for stAPT to earn APT emission rewards. Add liquidity to stAPT/APT pool on Liquidswap for LP<APT, stAPT> to earn trading fees. Stake LP tokens on Ditto Rewards to earn DTO emissions.",
        protocolsUsed: ["ditto", "pontem"]
    }
]

export const getStrategy = (strategyModule : string, vaultStrategyData: VaultStrategyData) : Strategy => ({
    ...strategies.find((strategy) => strategy.strategyModule === strategyModule) || null,
    totalDebt: vaultStrategyData.total_debt,
    totalGain: vaultStrategyData.total_gain,
    totalLoss: vaultStrategyData.total_loss,
    debtRatio: vaultStrategyData.debt_ratio,
    strategyCoinType: getTypeString(vaultStrategyData.strategy_coin_type),
});