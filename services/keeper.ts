import { satay } from "../data/moduleAddresses";
import { StructData } from "../types/aptos";
import { SupportedNetwork } from "../types/network";
import { KeeperInfo } from "../types/strategy";
import { structToString } from "./aptosUtils";
import { callGetFunction } from "./simulation";
import { fetchStrategiesForVaultAddress } from "./strategies";

import { fetchAllVaultIds, fetchVaultAddressForId } from "./vaults";

export const fetchStrategiesKeptByAccount = async (address: string, network: SupportedNetwork): Promise<KeeperInfo[]> => {
    let vaultIds = await fetchAllVaultIds(network);

    let vaultAddresses = await Promise.all(vaultIds.map(async (vaultId) => (
        fetchVaultAddressForId(vaultId, network)
    )))

    let vaultStrategies = await Promise.all(vaultAddresses.map(async (vaultAddress) => (
        fetchStrategiesForVaultAddress(vaultAddress, network)
    )))

    let keepers = await Promise.all(vaultStrategies.map(async (strategies, index) => (
        Promise.all(strategies.map(async (strategy) => (
            fetchKeeperForStrategy(strategy.strategyWitness, vaultAddresses[index], network)
        )))
    )))

    return vaultStrategies.map((strategies, index) => (
        strategies
            .filter((_, i) => (
                keepers[index][i] === address
            ))
            .map((strategy) => ({
                vaultAddress: vaultAddresses[index],
                vaultId: vaultIds[index],
                ...strategy
            }))
    )).flat()
}

export const fetchKeeperForStrategy = async (strategyWitness: StructData, vaultAddress: string, network: SupportedNetwork): Promise<string> => {
    let keeperResult = await callGetFunction({
        func: `${satay}::strategy_config::get_keeper_address`,
        args: [vaultAddress],
        type_args: [structToString(strategyWitness)],
        ledger_version: 0,
        network: network,
    });
    return "0x" + (keeperResult.details.return_values[0] as string);
}