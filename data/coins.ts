import {APT, stAPT, tAPT} from "./coinStructs";

import { Coin } from "../types/coin";

export const APTOS: Coin = {
    name: "Aptos",
    symbol: "APT",
    protocol: "aptos",
    coinStruct: APT
}

export const TORTUGA_STAKED_APTOS: Coin = {
    name: "Tortuga Staked Aptos",
    symbol: "tAPT",
    protocol: "tortuga",
    coinStruct: tAPT
}

export const DITTO_STAKED_APTOS: Coin = {
    name: "Ditto Staked Aptos",
    symbol: "stAPT",
    protocol: "ditto",
    coinStruct: stAPT
}

export const coins: Coin[] = [
    APTOS,
    TORTUGA_STAKED_APTOS
]

export const getCoin = (symbol: string) : Coin | undefined => coins.find(coin => coin.symbol === symbol);