import { dittoFarming as dittoFarmingAddress } from "../moduleAddresses";

import { dittoStakeAptos} from "../blocks";

import { StructuredProduct } from "../../types/structuredProduct"

export const dittoStaking: StructuredProduct = {
    name: "Ditto Liquid Staking",
    moduleAddress: `${dittoFarmingAddress}::ditto_farming`,
    description: "Stake APT on Ditto for stAPT to earn APT emission rewards.",
    protocols: ["ditto"],
    blocks: [
        dittoStakeAptos,
    ],
    block: dittoStakeAptos
}