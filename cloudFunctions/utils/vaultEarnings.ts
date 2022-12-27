import { getAptosClient, SupportedNetwork } from "./aptosClient"
import { getDecimals } from "./coinDecimals";

interface VaultStrategyData {
    total_loss: string;
    total_gain: string;
}

export const getVaultEarningsRaw = async (vaultAddress: string, network: SupportedNetwork) => {
    const client = getAptosClient(network);
    const resources = await client.getAccountResources(vaultAddress);
    const earnings = resources
        .filter(resource => resource.type.includes("VaultStrategy"))
        .map(vaultStrategy => vaultStrategy.data as VaultStrategyData)
        .map(strategyData => parseInt(strategyData.total_gain) - parseInt(strategyData.total_loss))
        .reduce((acc, earnings) => acc + earnings, 0)
    return earnings;
}

export const getVaultEarnings = async (vaultAddress: string, baseCoinAddress: string, network: SupportedNetwork = 'testnet') => {
    const earnings = await getVaultEarningsRaw(vaultAddress, network);
    const decimals = await getDecimals(baseCoinAddress, network);
    return earnings / Math.pow(10, decimals);
}