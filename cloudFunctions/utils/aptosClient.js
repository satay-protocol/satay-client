"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAptosClient = void 0;
const aptos_1 = require("aptos");
const SUPPORTED_NETWORKS = [
    'testnet',
    'mainnet',
    'devnet'
];
const rpcUrls = {
    "devnet": 'https://fullnode.devnet.aptoslabs.com/v1',
    "testnet": 'https://fullnode.testnet.aptoslabs.com/v1',
    "mainnet": 'https://fullnode.mainnet.aptoslabs.com/v1',
};
const getAptosClient = (network) => new aptos_1.AptosClient(rpcUrls[network]);
exports.getAptosClient = getAptosClient;
