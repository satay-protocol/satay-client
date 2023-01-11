import { AptosClient } from "aptos";

export const SUPPORTED_NETWORKS = [
    'testnet',
    'mainnet',
    'devnet'
] as const;

export type SupportedNetwork = typeof SUPPORTED_NETWORKS[number];

type RpcUrls = {
    [key in typeof SUPPORTED_NETWORKS[number]]: string;
};

const rpcUrls: RpcUrls = {
    "devnet": 'https://fullnode.devnet.aptoslabs.com/v1',
    "testnet": 'https://fullnode.testnet.aptoslabs.com/v1',
    "mainnet": 'https://fullnode.mainnet.aptoslabs.com/v1',
} as const;

export const DEFAULT_NETWORK: SupportedNetwork = 'testnet'

export const getAptosClient = (network: SupportedNetwork) => new AptosClient(rpcUrls[network]);