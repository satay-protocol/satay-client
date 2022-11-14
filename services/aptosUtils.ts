import { AptosClient } from "aptos";

import { CoinStoreResource } from "../types/aptos";
import { CoinData } from "../types/vaults";


export const getCoinBalance = async (client : AptosClient, coinAddress : string, address : string, coinStoreAddress = '0x1::coin') => {
    let coin : number = await client.getAccountResource(address, `${coinStoreAddress}::CoinStore<${coinAddress}>`)
        .then(res => parseInt((res.data as CoinStoreResource).coin.value))
        .catch((err) => 0)
    return coin;
}

export const getCoinBalances = async (client : AptosClient, address: string) : Promise<CoinData[]> => {
    let resources = await client.getAccountResources(address);
    return resources
        .filter(r => r.type.includes('CoinStore') && parseInt((r.data as CoinStoreResource).coin.value) > 0)
        .map((r) => ({
            coin: getCoinType(r.type.slice(r.type.indexOf('CoinStore<') + 10, -1)),
            value: parseInt((r.data as CoinStoreResource).coin.value)
        }))
}

export const getCoinType = (resourceType: string) => (
    resourceType
        .split("::")
        .filter((_, index) => index !== 0 && index % 2 === 0)
        .map((t) => (
            t.indexOf('<') > -1
                ? t.slice(0, t.indexOf('<') + 1)
                : t.indexOf('>') > -1
                    ? t.slice(t.indexOf("::") + 1)
                    : t.indexOf(",") > -1
                        ? t.slice(0, t.indexOf(",") + 2)
                        : t
        ))
        .join("")
)

const supportedNetworks = ['testnet', 'devnet'];

export const getNetworkSlug = (networkName: string | null) => {
    if (!networkName) return "";
    for(const network of supportedNetworks) {
        if (networkName.toLowerCase().includes(network)) {
            return network;
        }
    }
    return '';
}
