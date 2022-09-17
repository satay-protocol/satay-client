import { useWallet } from "@manahippo/aptos-wallet-adapter"

const useVaultStrategy = (managerAddress : string, vaultId: string) => {

    const { signAndSubmitTransaction } = useWallet();

    const approveStrategy = async (strategyType : string) => {
        await signAndSubmitTransaction({
            type: 'entry_function_payload',
            function: `${managerAddress}::satay::approve_strategy`,
            arguments: [vaultId],
            type_arguments: [strategyType]
        })
    }

    const applyStrategy = async () => {
        
    }

    const liquidateStrategy = async () => {

    }

    return {
        approveStrategy,
        applyStrategy,
        liquidateStrategy
    }
}

export default useVaultStrategy