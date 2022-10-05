import { useWallet } from "@manahippo/aptos-wallet-adapter";

import { useToast } from "@chakra-ui/react";

const useInitializeStrategy = (strategyModule : string, vaultId : string) => {

    const { signAndSubmitTransaction } = useWallet();

    const toast = useToast();

    const initialize = async () => {
        await signAndSubmitTransaction({
            type: 'entry_function_payload',
            function: `${strategyModule}::initialize`,
            arguments: [vaultId],
            type_arguments: []
        }, {
            max_gas_amount: '5000',
            gas_unit_price: '1000',
        })
            .then(() => {
                toast({
                    title: "Strategy Initialized!",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                })
            })
            .catch(() => {
                toast({
                    title: "Initialization Failed!",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                })
            })
    }

    return {
        initialize
    }
}

export default useInitializeStrategy;