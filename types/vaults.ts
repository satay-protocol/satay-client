import { StructData } from "./aptos";
import { Coin } from "./coin";
import { Strategy } from "./strategy";

export interface VaultInfo {
    baseCoin: Coin,
    vaultAddress: string,
}

export interface GovernanceVaultInfo extends VaultInfo {
    managerAddress: string;
}

export interface VaultManagerVaultInfo extends VaultInfo {
    fees: VaultFees;
    isFrozen: boolean;
}

export interface VaultFees {
    managementFee: number;
    performanceFee: number;
}
    

export interface Vault {
    symbol: string;
    logo: string;
    tvl: number;
    managerAddress: string;
    vaultAddress: string;
    about: string;
    baseCoin: StructData;
    baseCoinProtocol: string;
    strategies: Strategy[];
}

export interface Holding {
    coin: string;
    value: number;
}

export interface CoinData {
    coin: string;
    value: number;
}