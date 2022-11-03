import useWallet from "../useWallet";

import { Coin } from "../../data/coins";
import { vaultManager } from "../../data/vaultManager";

const useCreateVault = () => {

    const { account, submitTransaction } = useWallet();

    const createVault = async (vaultName: string, coin : Coin) => {
        if(account){
            await submitTransaction({
                type: 'entry_function_payload',
                function: `${vaultManager}::satay::new_vault`,
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