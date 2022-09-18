import { useWallet } from "@manahippo/aptos-wallet-adapter"
import { fromAptos } from "../../services/utils";

const useVaultStrategy = (managerAddress : string, vaultId: string, strategyString: string) => {

    const { signAndSubmitTransaction } = useWallet();

    const approveStrategy = async (strategyType : string) => {
        await signAndSubmitTransaction({
            type: 'entry_function_payload',
            function: `${managerAddress}::satay::approve_strategy`,
            arguments: [vaultId],
            type_arguments: [strategyType]
        })
    }

    const applyStrategy = async (amount : number) => {
        await signAndSubmitTransaction({
            type: 'entry_function_payload',
            function: `${strategyString.slice(0, strategyString.lastIndexOf("::"))}::apply_strategy`,
            arguments: [vaultId, fromAptos(amount).toString()],
            type_arguments: []
        })
    }

    const liquidateStrategy = async (amount : number) => {
        await signAndSubmitTransaction({
            type: 'entry_function_payload',
            function: `${strategyString.slice(0, strategyString.lastIndexOf("::"))}::liquidate_strategy`,
            arguments: [vaultId, fromAptos(amount).toString()],
            type_arguments: []
        })
    }

    return {
        approveStrategy,
        applyStrategy,
        liquidateStrategy
    }
}

export default useVaultStrategy