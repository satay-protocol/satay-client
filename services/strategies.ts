import { getAptosClient } from "./aptosClients";
import { getStructFromType, structToString } from "./aptosUtils";

import { getStrategy } from "../data/strategies";
import { satay } from "../data/moduleAddresses";

import { SupportedNetwork } from "../types/network";
import { Strategy, VaultStrategy, VaultStrategyData } from "../types/strategy";
import { StructData } from "../types/aptos";
import { AptosClient } from "aptos";


export const fetchStrategiesForVaultAddress = async (client: AptosClient, vaultAddress: string) : Promise<Strategy[]> => {
    const resources = await client.getAccountResources(vaultAddress);
    const strategies = resources
        .filter(resource => resource.type.includes("VaultStrategy"))
        .map(resource => getStrategy(
            getStructFromType(resource.type.slice(resource.type.indexOf("VaultStrategy<") + 14, -1)),
            resource.data as VaultStrategyData
        ))
    return strategies;
}

export const fetchKeeperForStrategy = async (client: AptosClient, baseCoinStruct, strategyWitness: StructData) : Promise<string> => (
    client.view({
        function: `${satay}::satay::get_keeper_address`,
        type_arguments: [structToString(baseCoinStruct), structToString(strategyWitness)],
        arguments: [],
    }).then((res) => res[0] as string).catch(() => "")
)

export const fetchVaultStrategy = async (strategyWitness: StructData, vaultAddress: string, decimals: number, network: SupportedNetwork) : Promise<VaultStrategy> => {
    let client = getAptosClient(network);
    let vaultStrategyData = (await client.getAccountResource(vaultAddress, `${satay}::vault::VaultStrategy<${structToString(strategyWitness)}>`)).data as VaultStrategyData;
    return {
        totalDebt: parseInt(vaultStrategyData.total_debt) / 10 ** decimals,
        totalGain: parseInt(vaultStrategyData.total_gain) / 10 ** decimals,
        totalLoss: parseInt(vaultStrategyData.total_loss) / 10 ** decimals,
        debtRatio: parseInt(vaultStrategyData.debt_ratio) / 100,
    }
}

export const fetchCreditAvailable = async (
    client: AptosClient,
    baseCoinStruct: StructData,
    strategyWitness: StructData, 
    decimals: number
) : Promise<number> => (
    client.view({
        function: `${satay}::satay::get_credit_available`,
        type_arguments: [structToString(baseCoinStruct), structToString(strategyWitness)],
        arguments: [],
    }).then((res) => (res[0] as number) / 10 ** decimals).catch(() => 0)
)

export const fetchDebtOutstanding = async (
    client: AptosClient,
    baseCoinStruct: StructData,
    strategyWitness: StructData, 
    decimals: number
) : Promise<number> => (
    client.view({
        function: `${satay}::satay::get_debt_out_standing`,
        type_arguments: [structToString(baseCoinStruct), structToString(strategyWitness)],
        arguments: [],
    }).then((res) => (res[0] as number) / 10 ** decimals).catch(() => 0)
)
