import useWallet from "../useWallet";
import { fromAptos } from "../../services/utils";

const useVaultStrategy = (vaultId: string, strategyModule: string) => {

    const { submitTransaction } = useWallet();

    const applyStrategy = async (amount : number) => {
        await submitTransaction({
            type: 'entry_function_payload',
            function: `${strategyModule}::harvest`,
            arguments: [vaultId],
            type_arguments: []
        }, {
            title: "Strategy Applied!",
            description: `You have applied the strategy to ${fromAptos(amount)} coins`
        })

    }

    const liquidateStrategy = async (amount : number) => {
        await submitTransaction({
            type: 'entry_function_payload',
            function: `${strategyModule}::liquidate_position`,
            arguments: [vaultId, fromAptos(amount).toString()],
            type_arguments: []
        }, {
            title: "Strategy Liquidated!",
            description: `You have liquidated the strategy for ${fromAptos(amount)} coins`
        })
    }

    return {
        applyStrategy,
        liquidateStrategy
    }
}

export default useVaultStrategy