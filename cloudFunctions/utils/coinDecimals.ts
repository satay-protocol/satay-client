import { callGetFunction, SupportedNetwork } from "./executeViewFunction"

export const getDecimals = async (coinAddress: string, network: SupportedNetwork) => {
    const decimalsResponse = await callGetFunction({
        func: '0x1::coin::decimals',
        type_args: [coinAddress],
        args: [],
        ledger_version: 0,
        network
    })
    const decimals: number = decimalsResponse.details.return_values[0];
    return decimals;
}