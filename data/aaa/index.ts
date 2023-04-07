import liquidStakingBlocks from "./liquidStaking";

import {NewBlock} from "../../types/block";

const blocks: NewBlock[] = liquidStakingBlocks

export const getBlock = (module_name: string) => blocks.find(block => block.module.module_name === module_name);

export default blocks;