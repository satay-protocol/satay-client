import { StructData } from "./aptos";
export interface Block {
    inputCoinType: StructData,
    outputCoinType: StructData,
    inputCoinSymbol: string,
    outputCoinSymbol: string,
    description: string,
    inputProtocol: string,
    outputProtocol: string,
    title: string,
}