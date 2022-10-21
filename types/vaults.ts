export interface Vault {
    symbol: string;
    asset: string;
    logo: string;
    totalDeposits: number;
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
}

export interface Strategy extends StrategyInfo {
    position_coin_type: string;
}

export interface Holding {
    coin: string;
    value: number;
}

export interface CoinData {
    coin: string;
    value: number;
}