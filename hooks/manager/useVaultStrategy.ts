import { useToast } from "@chakra-ui/react";
import { useWallet } from "@manahippo/aptos-wallet-adapter"
import { useAptos } from "../../contexts/AptosContext";
import { fromAptos } from "../../services/utils";

const useVaultStrategy = (managerAddress : string, vaultId: string, strategyString: string) => {

    const toast = useToast();

    const { signAndSubmitTransaction } = useWallet();

    const approveStrategy = async (strategyType : string) => {
        await signAndSubmitTransaction({
            type: 'entry_function_payload',
            function: `${managerAddress}::satay::approve_strategy`,
            arguments: [vaultId],
            type_arguments: [strategyType]
        })
            .then(() => {
                toast({
                    title: "Strategy Approved!",
                    description: "The strategy has been approved",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                })
            })
            .catch(() => {
                toast({
                    title: "Strategy Approval Failed",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                })
            })
    }

    const applyStrategy = async (amount : number) => {
        await signAndSubmitTransaction({
            type: 'entry_function_payload',
            function: `${strategyString.slice(0, strategyString.lastIndexOf("::"))}::apply_strategy`,
            arguments: [vaultId, fromAptos(amount).toString()],
            type_arguments: []
        })
            .then(() => {
                toast({
                    title: "Strategy Applied!",
                    description: `The strategy has been applied to ${amount} coins`,
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                })
            })
            .catch(() => {
                toast({
                    title: "Strategy Failed",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                })
            })

    }

    const liquidateStrategy = async (amount : number) => {
        await signAndSubmitTransaction({
            type: 'entry_function_payload',
            function: `${strategyString.slice(0, strategyString.lastIndexOf("::"))}::liquidate_strategy`,
            arguments: [vaultId, fromAptos(amount).toString()],
            type_arguments: []
        })
            .then(() => {
                toast({
                    title: "Strategy Liquidated!",
                    description: `${amount} strategy position tokens have been liquidated`,
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                })
            })
            .catch(() => {
                toast({
                    title: "Strategy Liquidation Failed",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                })
            })
    }

    return {
        approveStrategy,
        applyStrategy,
        liquidateStrategy
    }
}

export default useVaultStrategy