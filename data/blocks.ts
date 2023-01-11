import { 
    APT, 
    dittoFarmingCoin, 
    LP, 
    stAPT, 
    tAPT, 
    vaultCoin 
} from "../data/coinStructs";

import { Block } from '../types/block';
import { StructData } from "../types/aptos";
import { Coin } from "../types/coin";

export const dittoStakeAptos : Block = {
    inputCoinType: APT,
    outputCoinType: stAPT,
    inputCoinSymbol: "APT",
    outputCoinSymbol: "stAPT",
    description: "Stake APT on Ditto for stAPT to earn APT emission rewards",
    inputProtocol: "aptos",
    outputProtocol: "ditto",
}

export const dittoStakedAptosLp: Block = {
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

export const dittoFarming: Block = {
    inputCoinType: APT,
    outputCoinType: dittoFarmingCoin,
    inputCoinSymbol: "APT",
    outputCoinSymbol: "DFC",
    description: "Stake APT on Ditto for stAPT to earn APT emission rewards. Add liquidity to stAPT/APT pool on Liquidswap for LP<APT, stAPT> to earn trading fees. Stake LP tokens on Ditto Rewards to earn DTO emissions.",
    inputProtocol: "aptos",
    outputProtocol: "ditto",
}

export const stakeAptStaptLP: Block = {
    inputCoinType: LP(APT, stAPT, "Stable"),
    outputCoinType: dittoFarmingCoin,
    inputCoinSymbol: "LP<APT, stAPT>",
    outputCoinSymbol: "DFC",
    description: "Stake LP tokens on Ditto Rewards to earn DTO emissions.",
    inputProtocol: "pontem",
    outputProtocol: "ditto",
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

export const tortugaCollateralAptos: Block = {
    inputCoinType: tAPT,
    outputCoinType: APT,
    inputCoinSymbol: "tAPT",
    outputCoinSymbol: "APT",
    description: "Deposit tAPT as collateral to borrow APT on Aries.",
    inputProtocol: "tortuga",
    outputProtocol: "aries",
}

export const repeatStakeTortugaAptos: Block = {
    inputCoinType: APT,
    outputCoinType: tAPT,
    inputCoinSymbol: "APT",
    outputCoinSymbol: "tAPT",
    description: "Repeat 2x to gain 2.8x leverage - 65% LTV on Aries",
    inputProtocol: "aries",
    outputProtocol: "tortuga",
}

export const satayStakeCoin = (coin: Coin) : Block => ({
    inputCoinType: coin.coinStruct,
    outputCoinType: vaultCoin(coin.coinStruct),
    inputCoinSymbol: coin.symbol,
    outputCoinSymbol: `s${coin.symbol}`,
    description: `Stake ${coin.symbol} on Satay for s${coin.symbol} to earn yield`,
    inputProtocol: coin.protocol,
    outputProtocol: "satay",
})