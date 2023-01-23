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