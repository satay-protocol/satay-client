import {Module, StructData} from "./aptos";
import {Coin} from "./coin";

export interface Block {
    inputCoinType: StructData,
    outputCoinType: StructData,
    inputCoinSymbol: string,
    outputCoinSymbol: string,
    description: string,
    inputProtocol: string,
    outputProtocol: string,
    title: string,
    apy: string,
}

export interface NewBlock {
    inputCoin: Coin,
    outputCoin: Coin,
    title: string,
    description: string,
    apy: string,
    blockHook: BlockHook,
    module: Module,
    protocols: string[],
}

export type BlockHook = () => {
    deposit: (amount: number) => Promise<void>,
    withdraw: (amount: number) => Promise<void>,
}