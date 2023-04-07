import useTortugaBlocks from "../../hooks/blocks/useTortugaBlocks";

import {APTOS, DITTO_STAKED_APTOS, TORTUGA_STAKED_APTOS} from "../coins";
import {dittoBlocksModule, tortugaBlocksModule} from "../modules";

import { NewBlock } from "../../types/block";
import useDittoBlocks from "../../hooks/blocks/useDittoBlocks";

export const tortugaStakeAptos: NewBlock = {
    inputCoin: APTOS,
    outputCoin: TORTUGA_STAKED_APTOS,
    title: "Stake APT on Tortuga",
    description: "Stake APT on Tortuga for tAPT to earn APT emission rewards",
    apy: "7",
    blockHook: useTortugaBlocks,
    module: tortugaBlocksModule,
    protocols: ["tortuga", "hippo"],
}

export const dittoStakeAptos: NewBlock = {
    inputCoin: APTOS,
    outputCoin: DITTO_STAKED_APTOS,
    title: "Stake APT on Ditto",
    description: "Stake APT on Ditto for stAPT to earn APT emission rewards",
    apy: "7",
    blockHook: useDittoBlocks,
    module: dittoBlocksModule,
    protocols: ["ditto", "hippo"],
}

const liquidStakingBlocks: NewBlock[] = [
    tortugaStakeAptos,
    dittoStakeAptos
]

export default liquidStakingBlocks;