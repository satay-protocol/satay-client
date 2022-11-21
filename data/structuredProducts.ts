import { dittoFarming } from "./moduleAddresses";

import { dittoStakeAptos, dittoStakeAptosAndLp, dittoStakeAptosLp, tortugaStakeAptos } from "../types/block";
import { StructuredProduct } from "../types/structuredProduct";

const dittoStaking : StructuredProduct = {
    moduleAddress: `${dittoFarming}::ditto_farming`,
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
]

const testnetStructuredProducts: StructuredProduct[] = [
    dittoStaking,
]

const mainnetStructuredProducts: StructuredProduct[] = [
    dittoStaking
]

const structuredProducts: {[key: string]: StructuredProduct[]} = {
    'mainnet': mainnetStructuredProducts,
    'testnet': testnetStructuredProducts,
    'devnet': devnetStructuredProducts,
}

export const getStructuredProducts = (chainName = 'devnet') => structuredProducts[chainName] || [];

export const getStructuredProduct = (product_name: string, chainName = 'devnet') => {
    return getStructuredProducts(chainName).find((product) => product.moduleAddress.includes(product_name));
}