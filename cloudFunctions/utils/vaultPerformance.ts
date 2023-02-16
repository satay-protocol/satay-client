import { satay } from "../consts/moduleAddresses"
import { getDecimals } from "./coinDecimals";
import { callGetFunction } from "./executeViewFunction"

import { AptosClient } from "aptos";

export const getTVL = async (client: AptosClient, baseCoinAddress: string) => {
    const [tvl, decimals] = await Promise.all([
        getTVLRaw(client, baseCoinAddress),
        getDecimals(client, baseCoinAddress)
    ])
    return tvl / 10 ** decimals;
}

const getTVLRaw = async (client: AptosClient, baseCoinAddress: string) => {
    const tvlResonse = await callGetFunction({
        func: `${satay}::satay::get_vault_total_asset`,
        args: [satay],
        ledger_version: 0,
        network: 'testnet',
        type_args: [baseCoinAddress]
    })
    const tvl: number = tvlResonse.details.return_values[0];
    return tvl;
}