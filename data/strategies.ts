import { Strategy } from "../types/vaults";


export const strategies : Strategy[] = [
    {
        strategyId: "0xc09622c20bdd49b2b83b7e05c264a62cfedeb45eaf5c629d0f0174917d801aef::aptos_usdt_strategy::AptosUsdcLpStrategy",
        baseCoin: "0x1::aptos_coin::AptosCoin",
        title: "Aptos/USDT Liquidity Provision",
        description: "Swap 50% of pooled Aptos to USDT and add liquidity to the Aptos/USDT Liquidswap pool. Yield earned from trading fees."
    }
]

export const getStrategy = (strategyId : string) => strategies.find((strategy) => strategy.strategyId === strategyId) || null;