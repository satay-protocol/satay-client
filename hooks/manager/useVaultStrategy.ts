import { useToast } from "@chakra-ui/react";
import { useWallet } from "@manahippo/aptos-wallet-adapter"
import { fromAptos } from "../../services/utils";

const useVaultStrategy = (vaultId: string, strategyModule: string) => {

    const toast = useToast();

    const { signAndSubmitTransaction } = useWallet();

    const applyStrategy = async (amount : number) => {
        await signAndSubmitTransaction({
            type: 'entry_function_payload',
            function: `${strategyModule}::apply_position`,
            arguments: [vaultId, fromAptos(amount).toString()],
            type_arguments: []
        }, {
            max_gas_amount: '5000',
            gas_unit_price: '1000',
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
            function: `${strategyModule}::liquidate_position`,
            arguments: [vaultId, fromAptos(amount).toString()],
            type_arguments: []
        }, {
            max_gas_amount: '5000',
            gas_unit_price: '1000',
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
        applyStrategy,
        liquidateStrategy
    }
}

export default useVaultStrategy