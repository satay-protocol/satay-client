import useWallet from "../useWallet";

import { Coin } from "../../data/coins";
import { satay } from "../../data/moduleAddresses";

const useCreateVault = () => {

    const { address, submitTransaction } = useWallet();

    const createVault = async (vaultName: string, coin : Coin) => {
        if(address){
            await submitTransaction({
                type: 'entry_function_payload',
                function: `${satay}::satay::new_vault`,
                arguments: [vaultName, "2000", "5000"],
                type_arguments: [coin.type]
            }, {
                title: "Vault Created!",
                description: `You have created a new vault for ${coin.name}`
            })

        }
    }

    return {
        createVault
    }
}

export default useCreateVault;