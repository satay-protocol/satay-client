
import { satay } from "../data/moduleAddresses"

import { DEFAULT_NETWORK } from "../contexts/AptosContext"

import { callGetFunction } from "./simulation"

import { SupportedNetwork } from "../types/network"

export const getTVL = async (vaultId: string, network: SupportedNetwork = DEFAULT_NETWORK) => {
    const response = await callGetFunction({
        func: `${satay}::satay::get_total_assets`,
        args: [vaultId],
        ledger_version: 0,
        network,
        type_args: ['0x1::aptos_coin::AptosCoin']
    })
    return response.details.return_values[0] as number
}