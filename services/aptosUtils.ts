import { AptosClient } from "aptos";

interface CoinStoreResource {
    coin: {
        value: string
    }
}

export const getCoinBalance = async (client : AptosClient, coinAddress : string, address : string) => {
    console.log(`0x1::coin::CoinStore<${coinAddress}>`);
    let coin : number = await client.getAccountResource(address, `0x1::coin::CoinStore<${coinAddress}>`)
        .then(res => parseInt((res.data as CoinStoreResource).coin.value))
        .catch((err) => 0)
    return coin;
}