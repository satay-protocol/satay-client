import { 
    APT, 
    dittoFarmingCoin, 
    LP, 
    stAPT, 
    tAPT, 
    vaultCoin ,
    USDC,
    SatayLendCoin
} from "../data/coinStructs";

import { Block } from '../types/block';
import { Coin } from "../types/coin";
import { APTOS } from "./coins";

export const dittoStakeAptos : Block = {
    inputCoinType: APT,
    outputCoinType: stAPT,
    inputCoinSymbol: "APT",
    outputCoinSymbol: "stAPT",
    description: "Stake APT on Ditto for stAPT to earn APT emission rewards",
    inputProtocol: "aptos",
    outputProtocol: "ditto",
    title: "Ditto Stake Aptos"
}

export const dittoStakedAptosLp: Block = {
    inputCoinType: stAPT,
    outputCoinType: LP(APT, stAPT, "Stable"),
    inputCoinSymbol: "stAPT",
    outputCoinSymbol: "LP<APT, stAPT>",
    description: "Add liquidity to stAPT/APT pool on Liquidswap for LP<APT, stAPT> to earn trading fees",
    inputProtocol: "ditto",
    outputProtocol: "pontem",
    title: "APT/stAPT LP"
}

export const dittoStakeAptosAndLp: Block = {
    inputCoinType: APT,
    outputCoinType: dittoFarmingCoin,
    inputCoinSymbol: "APT",
    outputCoinSymbol: "LP<APT, stAPT> + DTO",
    description: "Stake APT on Ditto for stAPT to earn emission rewards. Add liquidity to stAPT/APT pool on Liquidswap for LP<APT, stAPT> to earn trading fees",
    inputProtocol: "aptos",
    outputProtocol: "pontem",
    title: "Ditto Stake Aptos and LP"
}

export const dittoFarming: Block = {
    inputCoinType: APT,
    outputCoinType: dittoFarmingCoin,
    inputCoinSymbol: "APT",
    outputCoinSymbol: "DFC",
    description: "Stake APT on Ditto for stAPT to earn APT emission rewards. Add liquidity to stAPT/APT pool on Liquidswap for LP<APT, stAPT> to earn trading fees. Stake LP tokens on Ditto Rewards to earn DTO emissions.",
    inputProtocol: "aptos",
    outputProtocol: "ditto",
    title: "Ditto Farming"
}

export const stakeAptStaptLP: Block = {
    inputCoinType: LP(APT, stAPT, "Stable"),
    outputCoinType: dittoFarmingCoin,
    inputCoinSymbol: "LP<APT, stAPT>",
    outputCoinSymbol: "DFC",
    description: "Stake LP tokens on Ditto Rewards to earn DTO emissions.",
    inputProtocol: "pontem",
    outputProtocol: "ditto",
    title: "Stake stAPT/APT LP"
}

export const tortugaStakeAptos: Block = {
    inputCoinType: APT,
    outputCoinType: stAPT,
    inputCoinSymbol: "APT",
    outputCoinSymbol: "tAPT",
    description: "Stake APT on Tortuga for tAPT",
    inputProtocol: "aptos",
    outputProtocol: "tortuga",
    title: "Stake APT for tAPT"
}

export const tortugaCollateralAptos: Block = {
    inputCoinType: tAPT,
    outputCoinType: APT,
    inputCoinSymbol: "tAPT",
    outputCoinSymbol: "APT",
    description: "Deposit tAPT as collateral to borrow APT on Aries.",
    inputProtocol: "tortuga",
    outputProtocol: "aries",
    title: "Collateralize tAPT"
}

export const repeatStakeTortugaAptos: Block = {
    inputCoinType: APT,
    outputCoinType: tAPT,
    inputCoinSymbol: "APT",
    outputCoinSymbol: "tAPT",
    description: "Repeat 2x to gain 2.8x leverage - 65% LTV on Aries",
    inputProtocol: "aries",
    outputProtocol: "tortuga",
    title: "Repeat Stake tAPT"
}

export const satayStakeCoin = (coin: Coin) : Block => ({
    inputCoinType: coin.coinStruct,
    outputCoinType: vaultCoin(coin.coinStruct),
    inputCoinSymbol: coin.symbol,
    outputCoinSymbol: `s${coin.symbol}`,
    description: `Stake ${coin.symbol} on Satay for s${coin.symbol} to earn yield`,
    inputProtocol: coin.protocol,
    outputProtocol: "satay",
    title: `Stake ${coin.symbol} on Satay`
})

export const lendCointoAries = (coin: Coin) : Block => ({
    inputCoinType: coin.coinStruct,
    outputCoinType: SatayLendCoin,
    inputCoinSymbol: coin.symbol,
    outputCoinSymbol: 'SLC',
    description: `Lend ${coin.symbol} to Aries to earn interest`,
    inputProtocol: coin.protocol,
    outputProtocol: "aries",
    title: `Lend ${coin.symbol} to Aries`
})

export const lendCointoAptin = (coin: Coin) : Block => ({
    inputCoinType: coin.coinStruct,
    outputCoinType: SatayLendCoin,
    inputCoinSymbol: coin.symbol,
    outputCoinSymbol: 'SLC',
    description: `Lend ${coin.symbol} to Aptin to earn interest`,
    inputProtocol: coin.protocol,
    outputProtocol: "aptin",
    title: `Lend ${coin.symbol} to Aptin`
})

export const lendCointoAbel = (coin: Coin) : Block => ({
    inputCoinType: coin.coinStruct,
    outputCoinType: SatayLendCoin,
    inputCoinSymbol: coin.symbol,
    outputCoinSymbol: 'SLC',
    description: `Lend ${coin.symbol} to Abel to earn interest`,
    inputProtocol: coin.protocol,
    outputProtocol: "abel",
    title: `Lend ${coin.symbol} to Abel`
})

export const lendUSDCToAries: Block = {
    inputCoinType: USDC,
    outputCoinType: SatayLendCoin,
    inputCoinSymbol: 'USDC',
    outputCoinSymbol: 'SLC',
    description: 'Lend USDC to Aries to earn interest',
    inputProtocol: 'usdc',
    outputProtocol: 'aries',
    title: 'Lend USDC to Aries'
}

export const lendUSDCToAptin: Block = {
    inputCoinType: USDC,
    outputCoinType: SatayLendCoin,
    inputCoinSymbol: 'USDC',
    outputCoinSymbol: 'SLC',
    description: 'Lend USDC to Aptin to earn interest',
    inputProtocol: 'usdc',
    outputProtocol: 'aptin',
    title: 'Lend USDC to Aptin'
}

export const lendUSDCToAbel: Block = {
    inputCoinType: USDC,
    outputCoinType: SatayLendCoin,
    inputCoinSymbol: 'USDC',
    outputCoinSymbol: 'SLC',
    description: 'Lend USDC to Abel to earn interest',
    inputProtocol: 'usdc',
    outputProtocol: 'abel',
    title: 'Lend USDC to Abel'
}

export const lendUSDCThroughSatay: Block = {
    inputCoinType: USDC,
    outputCoinType: SatayLendCoin,
    inputCoinSymbol: 'USDC',
    outputCoinSymbol: 'SLC',
    description: 'Optimize allocation of USDC to highest-earning borrow/lend market',
    inputProtocol: 'usdc',
    outputProtocol: 'satay',
    title: 'Lend USDC through Satay'
}

export const liquidStaking: Block[] = [
    dittoStakeAptos,
    tortugaStakeAptos
]

export const borrowLend = [
    lendCointoAries(APTOS),
    lendCointoAptin(APTOS),
    lendCointoAbel(APTOS),
]