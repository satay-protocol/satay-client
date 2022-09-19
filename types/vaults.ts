export interface Vault {
    asset: string;
    logo: string;
    totalDeposits: number;
    vaultId: string;
    managerAddress: string;
    vaultAddress: string;
    about: string;
    coinType: string;
    strategy: Strategy | null;
    strategyString: string;
}

export interface Strategy {
    strategyId: string,
    baseCoin: string;
    title: string;
    description: string;
}

export interface Holding {
    coin: string;
    value: number;
}

export interface CoinData {
    coin: string;
    value: number;
}