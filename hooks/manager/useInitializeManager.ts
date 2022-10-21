import { useWallet } from "@manahippo/aptos-wallet-adapter";
import { vaultManager } from "../../data/vaultManager";

const useInitializeManager = () => {

    const { account, signAndSubmitTransaction } = useWallet();

    const initialize = async () => {
        if(account){
            await signAndSubmitTransaction({
                type: 'entry_function_payload',
                function: `${vaultManager}::satay::initialize`,
                arguments: [],
                type_arguments: []
            }, {
                max_gas_amount: '5000',
                gas_unit_price: '1000',
            })
        }
    }

    return {
        initialize
    }
}

export default useInitializeManager;