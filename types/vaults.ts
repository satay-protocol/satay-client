export interface VaultPreview {
    asset: string;
    logo: string;
    apy: number | null;
    totalAssets: number;
    id: string;
}

export interface Vault extends VaultPreview {
    about: string;
    strategies: Strategy[];
}

export interface Strategy {
    title: string;
    description: string;
}