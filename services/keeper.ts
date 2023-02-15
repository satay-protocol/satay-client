import { AptosClient } from "aptos";

import { structToString } from "./aptosUtils";
import { fetchStrategiesForVaultAddress } from "./strategies";
import { fetchVaultAddress } from "./vaults";

import { satay } from "../data/moduleAddresses";
import { activeVaults } from "../data/vaults";

import { StructData } from "../types/aptos";
import { KeeperInfo } from "../types/strategy";
import { VaultInfo } from "../types/vaults";



export const fetchStrategiesKeptByAccount = async (client: AptosClient, address: string): Promise<KeeperInfo[]> => {

    let vaults: VaultInfo[] = await Promise.all(activeVaults.map(async (baseCoin) => ({
        vaultAddress: await fetchVaultAddress(client, baseCoin.coinStruct),
        baseCoin
    })))

    let vaultStrategies = await Promise.all(vaults.map(async ({ vaultAddress }) => (
        fetchStrategiesForVaultAddress(client, vaultAddress)
    )))

    let keepers = await Promise.all(vaultStrategies.map(async (strategies, index) => (
        Promise.all(strategies.map(async (strategy) => (
            fetchKeeperForStrategy(client, vaults[index].baseCoin.coinStruct, strategy.strategyWitness)
        )))
    )))

    return vaultStrategies.map((strategies, index) => (
        strategies
            .filter((_, i) => (
                keepers[index][i] === address
            ))
            .map((strategy) => ({
                vaultAddress: vaults[index].vaultAddress,
                ...strategy
            }))
    )).flat()
}

export const fetchKeeperForStrategy = async (client: AptosClient, baseCoinStruct: StructData, strategyWitness: StructData): Promise<string> => (
    client.view({
        function: `${satay}::satay::get_keeper_address`,
        type_arguments: [structToString(baseCoinStruct), structToString(strategyWitness)],
        arguments: [],
    }).then((res) => res[0] as string).catch(() => "")
)