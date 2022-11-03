import { useWallet } from "@manahippo/aptos-wallet-adapter";
import { Coin } from "../../data/coins";
import { vaultManager } from "../../data/vaultManager";

const useCreateVault = () => {

    const { account, signAndSubmitTransaction } = useWallet();

    const createVault = async (vaultName: string, coin : Coin) => {
        if(account){
            await signAndSubmitTransaction({
                type: 'entry_function_payload',
                function: `${vaultManager}::satay::new_vault`,
                arguments: [vaultName, "2000", "5000"],
                type_arguments: [coin.type]
            }, {
                max_gas_amount: '5000',
                gas_unit_price: '1000',
            })

        }
    }

    return {
        createVault
    }
}

export default useCreateVault;