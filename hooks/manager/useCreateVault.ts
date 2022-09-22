import { Coin } from "../../data/coins";
import { vaultManager } from "../../data/vaultManager";
import useAccount from "../useAccount";

const useCreateVault = () => {

    const { account, signAndSubmitTransaction } = useAccount();

    const createVault = async (vaultName: string, coin : Coin) => {
        if(account){
            await signAndSubmitTransaction({
                type: 'entry_function_payload',
                function: `${vaultManager}::satay::new_vault`,
                arguments: [vaultName],
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