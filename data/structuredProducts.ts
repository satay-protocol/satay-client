import { dittoFarming as dittoFarmingAddress } from "./moduleAddresses";

import { dittoFarming, dittoStakeAptos, dittoStakeAptosAndLp, dittoStakedAptosLp, repeatStakeTortugaAptos, stakeAptStaptLP, tortugaCollateralAptos, tortugaStakeAptos } from "./blocks";
import { StructuredProduct } from "../types/structuredProduct";

const dittoStakingInfo = {
    name: "Ditto Staking + LP Farming",
    moduleAddress: `${dittoFarmingAddress}::ditto_farming`,
    description: "Stake APT on Ditto for stAPT to earn APT emission rewards. Add liquidity to stAPT/APT pool on Liquidswap for LP<APT, stAPT> to earn trading fees. Stake LP tokens on Ditto Rewards to earn DTO emissions.",
    coinStruct: "0x1::aptos_coin::AptosCoin",
    coinSymbol: "APT",
    coinSlug: "aptos",
    protocols: ["ditto", "pontem"],
}

const dittoStakingMainnet : StructuredProduct = {
    ...dittoStakingInfo,
    blocks: [
        dittoStakeAptos,
        dittoStakedAptosLp,
        stakeAptStaptLP,
    ],
    block: dittoFarming
}

const dittoStakingTestnet : StructuredProduct = {
    ...dittoStakingInfo,
    blocks: [
        dittoStakeAptos,
        dittoStakedAptosLp
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
    blocks: [tortugaStakeAptos, tortugaCollateralAptos, repeatStakeTortugaAptos],
    block: tortugaStakeAptos
}


const devnetStructuredProducts: StructuredProduct[] = []

const testnetStructuredProducts: StructuredProduct[] = [
    dittoStakingTestnet,
    // tortugaLeverage
]

const mainnetStructuredProducts: StructuredProduct[] = [
    dittoStakingMainnet
]

const structuredProducts: {[key: string]: StructuredProduct[]} = {
    'mainnet': mainnetStructuredProducts,
    'testnet': testnetStructuredProducts,
    'devnet': devnetStructuredProducts,
}

export const getStructuredProducts = (chainName = 'testnet') => structuredProducts[chainName] || [];

export const getStructuredProduct = (product_name: string, chainName = 'testnet') => {
    return getStructuredProducts(chainName).find((product) => product.moduleAddress.includes(product_name));
}