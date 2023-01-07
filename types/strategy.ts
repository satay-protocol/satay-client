import { StructData } from "./aptos";
import { Coin } from "./coin";

export interface StrategyInfo {
    strategyWitness: StructData;
    baseCoin: Coin;
    name: string;
    description: string;
    protocols: string[];
    productName: string;
}

export interface VaultStrategy {
    strategyCoinType: string;
    debtRatio: number;
    totalDebt: number;
    totalGain: number;
    totalLoss: number;
}

export interface Strategy extends StrategyInfo, VaultStrategy {}

export interface KeeperInfo extends StrategyInfo {
    vaultAddress: string;
    vaultId: string;
}

export interface VaultStrategyData {
    strategy_coin_type: StructData;
    debt_ratio: string;
    total_debt: string;
    total_gain: string;
    total_loss: string;
}
