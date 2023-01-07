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

export interface Strategy extends StrategyInfo {
    strategyCoinType: string;
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