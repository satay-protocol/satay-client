import { dittoStakingAddress } from "./protocolAddresses";

import { StructData } from "../types/aptos";

export const APT : StructData = {
    struct_name: "AptosCoin",
    account_address: "0x1",
    module_name: "aptos_coin"
}

export const stAPT : StructData = {
    struct_name: "StakedAptos",
    account_address: dittoStakingAddress,
    module_name: "staked_coin"
}