import { DEFAULT_NETWORK, SupportedNetwork } from "./aptosClients"

import { satay } from "../data/moduleAddresses"

import { callGetFunction } from "./simulation"

export const getTVL = async (vaultId: string, network: SupportedNetwork = DEFAULT_NETWORK) => {
    const response = await callGetFunction({
        func: `${satay}::satay::get_vault_total_asset`,
        args: [satay, vaultId],
        ledger_version: 0,
        network,
        type_args: ['0x1::aptos_coin::AptosCoin']
    })
    return response.details.return_values[0] as number
}