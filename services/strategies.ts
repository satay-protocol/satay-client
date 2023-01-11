import { getAptosClient } from "./aptosClients";
import { getStructFromType, structToString } from "./aptosUtils";
import { fetchVaultAddressForId } from "./vaults";

import { getStrategy } from "../data/strategies";

import { SupportedNetwork } from "../types/network";
import { Strategy, VaultStrategy, VaultStrategyData } from "../types/strategy";
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

export const fetchVaultStrategy = async (strategyWitness: StructData, vaultAddress: string, decimals: number, network: SupportedNetwork) : Promise<VaultStrategy> => {
    let client = getAptosClient(network);
    let vaultStrategyData = (await client.getAccountResource(vaultAddress, `${satay}::vault::VaultStrategy<${structToString(strategyWitness)}>`)).data as VaultStrategyData;
    return {
        strategyCoinType: structToString(strategyWitness),
        totalDebt: parseInt(vaultStrategyData.total_debt) / 10 ** decimals,
        totalGain: parseInt(vaultStrategyData.total_gain) / 10 ** decimals,
        totalLoss: parseInt(vaultStrategyData.total_loss) / 10 ** decimals,
        debtRatio: parseInt(vaultStrategyData.debt_ratio) / 100,
    }
}

export const fetchCreditAvailable = async (
    strategyWitness: StructData, 
    vaultId: string,
    baseCoinType: StructData,
    decimals: number, 
    network: SupportedNetwork
) : Promise<number> => {
    let creditAvailableResult = await callGetFunction({
        func: `${satay}::satay::get_credit_available`,
        type_args: [structToString(strategyWitness), structToString(baseCoinType)],
        args: [vaultId],
        ledger_version: 0,
        network,
    })
    return (creditAvailableResult.details.return_values[0] as number) / 10 ** decimals;
}

export const fetchDebtOutstanding = async (
    strategyWitness: StructData,
    vaultId: string,
    baseCoinType: StructData,
    decimals: number,
    network: SupportedNetwork
) : Promise<number> => {
    let debtOutstandingResult = await callGetFunction({
        func: `${satay}::satay::get_debt_out_standing`,
        type_args: [structToString(strategyWitness), structToString(baseCoinType)],
        args: [vaultId],
        ledger_version: 0,
        network,
    })
    return (debtOutstandingResult.details.return_values[0] as number) / 10 ** decimals;
}
