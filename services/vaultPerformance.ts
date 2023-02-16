import { structToString } from "./aptosUtils"

import { satay } from "../data/moduleAddresses"

import { AptosClient } from "aptos"
import { StructData } from "../types/aptos"

export const getTVL = async (client: AptosClient, baseCoinStruct: StructData) => (
    client.view({
        function: `${satay}::satay::get_total_assets`,
        type_arguments: [structToString(baseCoinStruct)],
        arguments: [],
    }).then((res) => res[0] as number).catch(() => 0)
)