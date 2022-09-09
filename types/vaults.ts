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
    strategies: Strategy[];
}

export interface Strategy {
    title: string;
    description: string;
}

export interface Holding {
    coin: string;
    value: number;
}