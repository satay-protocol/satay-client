import { APTOS } from "./coins";

import { Coin } from "../types/coin";
import {SupportedNetwork} from "../types/network";

const testnetVaults: Coin[] = [
    APTOS
]

type NetworkVaults = {
    [key in SupportedNetwork]: Coin[];
}

const vaults: NetworkVaults = {
    "testnet": testnetVaults,
    "mainnet": [],
}

export const getVaults = (network: SupportedNetwork) => vaults[network];