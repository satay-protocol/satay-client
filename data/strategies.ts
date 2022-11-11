import { getTypeString } from "../services/vaults";
import { Strategy, StrategyInfo, VaultStrategyData } from "../types/vaults";


export const strategies : StrategyInfo[] = [
    {
        strategyModule: "0xc09622c20bdd49b2b83b7e05c264a62cfedeb45eaf5c629d0f0174917d801aef::aptos_usdt_strategy",
        strategyWitness: "AptosUsdcLpStrategy",
        baseCoin: "0x1::aptos_coin::AptosCoin",
        title: "Aptos/USDT Liquidity Provision",
        description: "Swap 50% of pooled Aptos to USDT and add liquidity to the Aptos/USDT Liquidswap pool. Yield earned from trading fees.",
        protocolsUsed: ["pontem"]
    },
    {
        strategyModule: "0xe3eaddfcc4d7436d26fef92ee39685ef176e3513dc736d116129ce055c07afac::leveraged_ditto_strategy",
        strategyWitness: "LeveragedDittoStrategy",
        baseCoin: "0x1::aptos_coin::AptosCoin",
        title: "Leveraged Ditto Staking Strategy",
        description: "Stake APT for stAPT, deposit stAPT into lending pool, repeat.",
        protocolsUsed: ["ditto", "aries"]
    }
]

export const getStrategy = (strategyModule : string, vaultStrategyData: VaultStrategyData) : Strategy => ({
    ...strategies.find((strategy) => strategy.strategyModule === strategyModule) || null,
    totalDebt: vaultStrategyData.total_debt,
    totalGain: vaultStrategyData.total_gain,
    totalLoss: vaultStrategyData.total_loss,
    debtRatio: vaultStrategyData.debt_ratio,
    strategyCoinType: getTypeString(vaultStrategyData.base_coin_type),
});