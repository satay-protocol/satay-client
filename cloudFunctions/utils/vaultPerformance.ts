import { satay } from "../consts/moduleAddresses"
import { getDecimals } from "./coinDecimals";
import { callGetFunction } from "./executeViewFunction"

export const getTVL = async (vaultId: string, baseCoinAddress: string) => {
    const [tvl, decimals] = await Promise.all([
        getTVLRaw(vaultId, baseCoinAddress),
        getDecimals(baseCoinAddress, 'testnet')
    ])
    return tvl / 10 ** decimals;
}

const getTVLRaw = async (vaultId: string, baseCoinAddress: string) => {
    const tvlResonse = await callGetFunction({
        func: `${satay}::satay::get_vault_total_asset`,
        args: [satay, vaultId],
        ledger_version: 0,
        network: 'testnet',
        type_args: [baseCoinAddress]
    })
    const tvl: number = tvlResonse.details.return_values[0];
    return tvl;
}