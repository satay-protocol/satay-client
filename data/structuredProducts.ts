import { Struct } from "@solana/web3.js";
import { dittoStakeAptos, dittoStakeAptosAndLp, dittoStakeAptosLp, tortugaStakeAptos } from "../types/block";
import { StructuredProduct } from "../types/structuredProduct";
import { vaultManager } from "./vaultManager";

const dittoStaking : StructuredProduct = {
    moduleAddress: "0xe3eaddfcc4d7436d26fef92ee39685ef176e3513dc736d116129ce055c07afac::ditto_rewards_product",
    name: "Ditto Staking + LP Farming",
    description: "Stake APT on Ditto for stAPT to earn APT emission rewards. Add liquidity to stAPT/APT pool on Liquidswap for LP<APT, stAPT> to earn trading fees. Stake LP tokens on Ditto Rewards to earn DTO emissions.",
    coinStruct: "0x1::aptos_coin::AptosCoin",
    coinSymbol: "APT",
    coinSlug: "aptos",
    protocols: ["ditto", "pontem"],
    blocks: [
        dittoStakeAptos,
        dittoStakeAptosLp
    ],
    block: dittoStakeAptosAndLp
}

const tortugaLeverage : StructuredProduct = {
    moduleAddress: "0x0000",
    name: "Leveraged Liquid Staking",
    description: "Stake APT on Tortuga for tAPT. Deposit tAPT into Aries Markets as collateral. Borrow APT and repeat.",
    coinStruct: "0x1::aptos_coin::AptosCoin",
    coinSymbol: "APT",
    coinSlug: "aptos",
    protocols: ["tortuga", "aries"],
    blocks: [tortugaStakeAptos],
    block: tortugaStakeAptos
}


const devnetStructuredProducts: StructuredProduct[] = [
    dittoStaking,
    tortugaLeverage
]

const testnetStructuredProducts: StructuredProduct[] = [
    dittoStaking,
]

const structuredProducts: {[key: string]: StructuredProduct[]} = {
    '2': testnetStructuredProducts,
    '36': devnetStructuredProducts,
}

export const getStructuredProducts = (chainId = '36') => structuredProducts[chainId] || [];

export const getStructuredProduct = (product_name: string, chainId = '36') => {
    return getStructuredProducts(chainId).find((product) => `${vaultManager}::${product_name}` === product.moduleAddress);
}