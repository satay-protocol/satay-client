import { Strategy, StrategyInfo } from "../types/vaults";


export const strategies : StrategyInfo[] = [
    {
        strategyModule: "0xc09622c20bdd49b2b83b7e05c264a62cfedeb45eaf5c629d0f0174917d801aef::aptos_usdt_strategy",
        strategyWitness: "AptosUsdcLpStrategy",
        baseCoin: "0x1::aptos_coin::AptosCoin",
        title: "Aptos/USDT Liquidity Provision",
        description: "Swap 50% of pooled Aptos to USDT and add liquidity to the Aptos/USDT Liquidswap pool. Yield earned from trading fees."
    }
]

export const getStrategy = (strategyModule : string, position_coin_type : string) : Strategy => ({
    ...strategies.find((strategy) => strategy.strategyModule === strategyModule) || null,
    position_coin_type
});