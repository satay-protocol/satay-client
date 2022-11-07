import { StructuredProduct } from "../types/structuredProduct";

export const structuredProducts: StructuredProduct[] = [
    {
        moduleAddress: "0x0000000000000000000000000000000000000000",
        name: "Ditto Staking + LP Farming",
        description: "Stake APT on Ditto for stAPT to earn APT emission rewards. Add liquidity to stAPT/APT pool on Liquidswap for LP<APT, stAPT> to earn trading fees. Stake LP tokens on Ditto Rewards to earn DTO emissions.",
        coinStruct: "0x1::aptos_coin::AptosCoin",
        coinSymbol: "APT",
        protocols: ["ditto", "pontem"],
    },
    {
        moduleAddress: "0x0000",
        name: "Leveraged Liquid Staking",
        description: "Stake APT on Tortuga for tAPT. Deposit tAPT into Aries Markets as collateral. Borrow APT and repeat.",
        coinStruct: "0x1::aptos_coin::AptosCoin",
        coinSymbol: "APT",
        protocols: ["tortuga", "aries"],
    }
]