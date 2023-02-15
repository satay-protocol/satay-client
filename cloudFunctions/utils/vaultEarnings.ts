import { AptosClient } from "aptos";
import { satayAddress } from "..";
import { getDecimals } from "./coinDecimals";

interface VaultStrategyData {
    total_loss: string;
    total_gain: string;
}

export const getVaultEarningsRaw = async (client: AptosClient, baseCoinAddress: string) => {
    let vaultAddress = await client.view({
        function: `${satayAddress}::satay::get_vault_address`,
        type_arguments: [baseCoinAddress],
        arguments: []
    }).then((res) => res[0] as string);
    const resources = await client.getAccountResources(vaultAddress);
    const earnings = resources
        .filter(resource => resource.type.includes("VaultStrategy"))
        .map(vaultStrategy => vaultStrategy.data as VaultStrategyData)
        .map(strategyData => parseInt(strategyData.total_gain) - parseInt(strategyData.total_loss))
        .reduce((acc, earnings) => acc + earnings, 0)
    return earnings;
}

export const getVaultEarnings = async (client: AptosClient, baseCoinAddress: string) => {
    const earnings = await getVaultEarningsRaw(client, baseCoinAddress);
    const decimals = await getDecimals(client, baseCoinAddress);
    return earnings / Math.pow(10, decimals);
}