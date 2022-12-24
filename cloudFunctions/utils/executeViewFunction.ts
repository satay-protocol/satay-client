const SUPPORTED_NETWORKS = [
    'testnet',
    'mainnet',
    'devnet'
] as const;

export type SupportedNetwork = typeof SUPPORTED_NETWORKS[number];

interface CallFunctionBody {
    func: string,
    type_args: string[],
    args: string[],
    ledger_version: number,
    network: SupportedNetwork,
    options?: {
      with_logs: boolean
    }
}

interface ReturnType {
    details: {
        return_values: any[],
        logs: string
    }
    error: boolean
}

export const callGetFunction = async (payload: CallFunctionBody) => {
    const response = await fetch('https://composer.sentio.xyz/api/call_function', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    })
    const returnData = await response.json()
    return returnData as ReturnType;
}