export interface Vault {
    symbol: string;
    asset: string;
    logo: string;
    tvl: number;
    vaultId: string;
    managerAddress: string;
    vaultAddress: string;
    about: string;
    coinType: string;
    strategies: Strategy[];
}

export interface StrategyInfo {
    strategyModule: string;
    strategyWitness: string;
    baseCoin: string;
    title: string;
    description: string;
    protocolsUsed: string[];
}

export interface Strategy extends StrategyInfo {
    strategy_coin_type: string;
}

export interface Holding {
    coin: string;
    value: number;
}

export interface CoinData {
    coin: string;
    value: number;
}