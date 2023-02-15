import { AptosClient } from "aptos"

export const getDecimals = async (client: AptosClient, coinStructAddress: string) => {
    return client.getAccountResource(coinStructAddress.split("::")[0], `0x1::coin::CoinInfo<${coinStructAddress}>`)
        // @ts-ignore
        .then(res => (res.data).decimals)
        .catch(_ => 0)
}