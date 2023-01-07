import { getAptosClient } from "./aptosClients";
import { getStructFromType, structToString } from "./aptosUtils";
import { fetchVaultAddressForId } from "./vaults";

import { getStrategy } from "../data/strategies";

import { SupportedNetwork } from "../types/network";
import { Strategy, VaultStrategyData } from "../types/strategy";
import { StructData } from "../types/aptos";
import { callGetFunction } from "./simulation";
import { satay } from "../data/moduleAddresses";


export const fetchStrategiesForVaultAddress = async (vaultAddress: string, network: SupportedNetwork) : Promise<Strategy[]> => {
    let client = getAptosClient(network);
    const resources = await client.getAccountResources(vaultAddress);
    const strategies = resources
        .filter(resource => resource.type.includes("VaultStrategy"))
        .map(resource => getStrategy(
            getStructFromType(resource.type.slice(resource.type.indexOf("VaultStrategy<") + 14, -1)),
            resource.data as VaultStrategyData
        ))
    return strategies;
}

export const fetchStrategiesForVaultId = async (vaultId: string, network: SupportedNetwork) : Promise<Strategy[]> => {
    const vaultAddress = await fetchVaultAddressForId(vaultId, network);
    return fetchStrategiesForVaultAddress(vaultAddress, network);
}

export const fetchKeeperForStrategy = async (strategyWitness: StructData, vaultAddress: string, network: SupportedNetwork) : Promise<string> => {
    let keeperResult = await callGetFunction({
        func: `${satay}::strategy_config::get_keeper_address`,
        type_args: [structToString(strategyWitness)],
        args: [vaultAddress],
        ledger_version: 0,
        network,
    })
    return "0x" + (keeperResult.details.return_values[0] as string);
}
