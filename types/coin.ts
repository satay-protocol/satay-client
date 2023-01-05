import { StructData } from "./aptos";

export interface Coin {
    name: string;
    symbol: string;
    protocol: string;
    coinStruct: StructData
}