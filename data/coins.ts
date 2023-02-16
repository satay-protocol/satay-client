import { APT } from "./coinStructs";

import { Coin } from "../types/coin";

export const APTOS = {
    name: "Aptos",
    symbol: "APT",
    protocol: "aptos",
    coinStruct: APT
}

export const coins: Coin[] = [
    APTOS
]

export const getCoin = (symbol: string) : Coin | undefined => coins.find(coin => coin.symbol === symbol);