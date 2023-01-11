import { AptosClient } from "aptos";

import { CoinInfoStruct, CoinStoreResource, StructData } from "../types/aptos";
import { CoinData } from "../types/vaults";
import { SUPPORTED_NETWORKS } from "./aptosClients";
import { structToString } from "./vaults";


export const getCoinBalance = async (client : AptosClient, coinStruct: StructData, address : string, coinStoreAddress = '0x1::coin') => {
    let coin : number = await client.getAccountResource(address, `${coinStoreAddress}::CoinStore<${structToString(coinStruct)}>`)
        .then(res => parseInt((res.data as CoinStoreResource).coin.value))
        .then(async balanceInt => {
            const coinInfo = await getCoinInfo(client, coinStruct);
            const decimals = coinInfo.decimals;
            return balanceInt / Math.pow(10, decimals);
        })
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

export const getCoinInfo = async (client : AptosClient, coinStruct : StructData) => {
    return client.getAccountResource(coinStruct.account_address, `0x1::coin::CoinInfo<${structToString(coinStruct)}>`)
        .then(res => res.data as CoinInfoStruct)
        .catch((err) => {return {decimals: 0, name: '', symbol: ''}})
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


export const getNetworkSlug = (networkName: string | null) => {
    if (!networkName) return undefined;
    for(const network of SUPPORTED_NETWORKS) {
        if (networkName.toLowerCase().includes(network)) {
            return network;
        }
    }
    return undefined;
}

export const getStructFromType = (type: string) : StructData => {
    const account_address = type.slice(0, type.indexOf('::'));
    type = type.slice(type.indexOf('::') + 2);
    const module_name = type.slice(0, type.indexOf('::'));
    type = type.slice(type.indexOf('::') + 2);
    const struct_name = type.slice(0);
    return {
        struct_name,
        account_address,
        module_name
    }
}
