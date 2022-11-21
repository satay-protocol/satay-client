import { APT, dittoFarmingCoin, LP, stAPT, vaultCoin } from "../data/coinStructs";
import { StructData } from "./aptos";

export interface Block {
    inputCoinType: StructData,
    outputCoinType: StructData,
    inputCoinSymbol: string,
    outputCoinSymbol: string,
    description: string,
    inputProtocol: string,
    outputProtocol: string,
}

export const dittoStakeAptos : Block = {
    inputCoinType: APT,
    outputCoinType: stAPT,
    inputCoinSymbol: "APT",
    outputCoinSymbol: "stAPT",
    description: "Stake APT on Ditto for stAPT to earn APT emission rewards",
    inputProtocol: "aptos",
    outputProtocol: "ditto",
}

export const dittoStakeAptosLp: Block = {
    inputCoinType: stAPT,
    outputCoinType: LP(APT, stAPT, "Stable"),
    inputCoinSymbol: "stAPT",
    outputCoinSymbol: "LP<APT, stAPT>",
    description: "Add liquidity to stAPT/APT pool on Liquidswap for LP<APT, stAPT> to earn trading fees",
    inputProtocol: "ditto",
    outputProtocol: "pontem",
}

export const dittoStakeAptosAndLp: Block = {
    inputCoinType: APT,
    outputCoinType: dittoFarmingCoin,
    inputCoinSymbol: "APT",
    outputCoinSymbol: "LP<APT, stAPT> + DTO",
    description: "Stake APT on Ditto for stAPT to earn emission rewards. Add liquidity to stAPT/APT pool on Liquidswap for LP<APT, stAPT> to earn trading fees",
    inputProtocol: "aptos",
    outputProtocol: "pontem",
}

export const tortugaStakeAptos: Block = {
    inputCoinType: APT,
    outputCoinType: stAPT,
    inputCoinSymbol: "APT",
    outputCoinSymbol: "tAPT",
    description: "Stake APT on Tortuga for tAPT",
    inputProtocol: "aptos",
    outputProtocol: "tortuga",
}

export const satayStakeCoin = (inputCoin: StructData, inputCoinSymbol: string, inputCoinProtocol: string) : Block => ({
    inputCoinType: inputCoin,
    outputCoinType: vaultCoin(inputCoin),
    inputCoinSymbol: inputCoinSymbol,
    outputCoinSymbol: `s${inputCoinSymbol}`,
    description: `Stake ${inputCoinSymbol} on Satay for s${inputCoinSymbol} to earn yield`,
    inputProtocol: inputCoinProtocol,
    outputProtocol: "satay",
})