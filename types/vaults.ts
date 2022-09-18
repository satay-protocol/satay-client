export interface VaultPreview {
    asset: string;
    logo: string;
    apy: number | null;
    totalAssets: number;
    vaultId: string;
    managerAddress: string;
    vaultAddress: string;
}

export interface Vault extends VaultPreview {
    about: string;
    strategy: Strategy | null;
    coinType: string;
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