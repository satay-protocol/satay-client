import useWallet from "../useWallet";
import { satay } from "../../data/moduleAddresses";

const useInitializeManager = () => {

    const { address, submitTransaction } = useWallet();

    const initialize = async () => {
        if(address){
            await submitTransaction({
                type: 'entry_function_payload',
                function: `${satay}::satay::initialize`,
                arguments: [],
                type_arguments: []
            }, {
                title: "Vault Manager Initialized!",
                description: `You have initialized your ManagerAccount`
            })
        }
    }

    return {
        initialize
    }
}

export default useInitializeManager;