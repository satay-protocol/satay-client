import { dittoFarming as dittoFarmingAddress } from "../moduleAddresses";

import { tortugaStakeAptos} from "../blocks";

import { StructuredProduct } from "../../types/structuredProduct"

export const tortugaStaking: StructuredProduct = {
    name: "Tortuga Liquid Staking",
    moduleAddress: `${dittoFarmingAddress}::ditto_farming`,
    description: "Stake APT on Tortuga for tAPT to earn APT emission rewards.",
    protocols: ["tortuga"],
    blocks: [
        tortugaStakeAptos,
    ],
    block: tortugaStakeAptos
}