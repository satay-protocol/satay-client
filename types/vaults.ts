import { StructData } from "./aptos";

export interface Vault {
    symbol: string;
    logo: string;
    tvl: number;
    vaultId: string;
    managerAddress: string;
    vaultAddress: string;
    about: string;
    baseCoin: StructData;
    baseCoinProtocol: string;
    strategies: Strategy[];
}

export interface StrategyInfo {
    strategyWitness: StructData;
    baseCoin: StructData;
    title: string;
    description: string;
    protocolsUsed: string[];
    productName?: string;
}

export interface Strategy extends StrategyInfo {
    strategyCoinType: string;
    productName?: string;
    debtRatio: number;
    totalDebt: number;
    totalGain: number;
    totalLoss: number;
}

export interface VaultStrategyData {
    strategy_coin_type: StructData;
    debt_ratio: number;
    total_debt: number;
    total_gain: number;
    total_loss: number;
}

export interface Holding {
    coin: string;
    value: number;
}

export interface CoinData {
    coin: string;
    value: number;
}