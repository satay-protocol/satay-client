import { useState, useEffect } from "react";

import { useWallet } from "@manahippo/aptos-wallet-adapter";
import { useAptos } from "../../contexts/AptosContext"


const useInitializeStrategy = (strategyAddress : string, vaultId : string, vaultAddress: string) => {

    const { account, signAndSubmitTransaction } = useWallet();

    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        
    }, [strategyAddress, vaultId]);

    const initialize = async () => {
        await signAndSubmitTransaction({
            type: 'entry_function_payload',
            function: `${strategyAddress}::initialize`,
            arguments: [account?.address, vaultId],
            type_arguments: []
        })
    }

    return {
        initialize
    }
}

export default useInitializeStrategy;