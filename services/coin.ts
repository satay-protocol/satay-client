import { structToString } from './aptosUtils';

import { CoinData } from '../types/vaults';
import { StructData, CoinStoreResource, CoinInfoStruct } from '../types/aptos';
import { AptosClient } from 'aptos';

export const getCoinBalance = async (client: AptosClient, coinStruct: StructData, address: string) => (
    client.view({
        function: '0x1::coin::balance',
        type_arguments: [structToString(coinStruct)],
        arguments: [address],
    })
        .then(async res => {
            const { decimals } = await getCoinInfo(client, coinStruct);
            return res[0] as number / Math.pow(10, decimals);
        })
        .catch(() => 0)
)

export const getCoinBalances = async (client: AptosClient, address: string) : Promise<CoinData[]> => {
    let resources = await client.getAccountResources(address);
    return resources
        .filter(r => r.type.includes('CoinStore') && parseInt((r.data as CoinStoreResource).coin.value) > 0)
        .map((r) => ({
            coin: getCoinType(r.type.slice(r.type.indexOf('CoinStore<') + 10, -1)),
            value: parseInt((r.data as CoinStoreResource).coin.value)
        }))
}


export const getCoinInfo = async (client: AptosClient, coinStruct : StructData) => {
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
