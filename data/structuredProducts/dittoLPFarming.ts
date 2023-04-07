import { dittoFarming as dittoFarmingAddress } from "../moduleAddresses";

import { dittoFarming, dittoStakeAptos, dittoStakeAptosAndLp, dittoStakedAptosLp, stakeAptStaptLP } from "../blocks";

import { StructuredProduct } from "../../types/structuredProduct"

const dittoStakingInfo = {
    name: "Ditto Staking + LP Farming",
    module: {
        account_address: dittoFarmingAddress,
        module_name: "ditto_farming",
    },
    description: "Stake APT on Ditto for stAPT to earn APT emission rewards. Add liquidity to stAPT/APT pool on Liquidswap for LP<APT, stAPT> to earn trading fees. Stake LP tokens on Ditto Rewards to earn DTO emissions.",
    protocols: ["ditto", "pontem"],
    depositBox: null,
}

export const dittoStakingMainnet: StructuredProduct = {
    ...dittoStakingInfo,
    blocks: [
        dittoStakeAptos,
        dittoStakedAptosLp,
        stakeAptStaptLP,
    ],
    block: dittoFarming,
    inDevelopment: true,
}

export const dittoStakingTestnet: StructuredProduct = {
    ...dittoStakingInfo,
    blocks: [
        dittoStakeAptos,
        dittoStakedAptosLp
    ],
    block: dittoStakeAptosAndLp
}