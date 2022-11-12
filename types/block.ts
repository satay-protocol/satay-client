import { APT, stAPT } from "../data/coinStructs";
import { dittoStakingAddress } from "../data/protocolAddresses";
import { StructData } from "./aptos";

export interface Block {
    inputCoinType: StructData,
    outputCoinType: StructData,
    description: string,
    inputProtocol: string,
    outputProtocol: string,
}

export const dittoStakeAptos : Block = {
    inputCoinType: APT,
    outputCoinType: stAPT,
    description: "Stake APT on Ditto for stAPT to earn APT emission rewards",
    inputProtocol: "aptos",
    outputProtocol: "ditto",
}

export const dittoStakeAptosLp: Block = {
    inputCoinType: stAPT,
    outputCoinType: APT,
    description: "Add liquidity to stAPT/APT pool on Liquidswap for LP<APT, stAPT> to earn trading fees",
    inputProtocol: "ditto",
    outputProtocol: "pontem",
}