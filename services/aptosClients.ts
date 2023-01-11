import { AptosClient } from "aptos";

import { SupportedNetwork } from "../types/network";

type RpcUrls = {
    [key in SupportedNetwork]: string;
};

const rpcUrls: RpcUrls = {
    // "devnet": 'https://fullnode.devnet.aptoslabs.com/v1',
    "testnet": 'https://fullnode.testnet.aptoslabs.com/v1',
    // "mainnet": 'https://fullnode.mainnet.aptoslabs.com/v1',
} as const

export const getAptosClient = (network: SupportedNetwork) => new AptosClient(rpcUrls[network]);