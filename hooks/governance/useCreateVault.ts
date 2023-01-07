import useWallet from "../utility/useWallet";

import { satay } from "../../data/moduleAddresses";

import { Coin } from "../../types/coin";
import { structToString } from "../../services/aptosUtils";

const useCreateVault = () => {

    const { address, submitTransaction } = useWallet();

    const createVault = async (coin: Coin, managementFee: string, performanceFee: string) => {
        if(address){
            await submitTransaction({
                type: 'entry_function_payload',
                function: `${satay}::satay::new_vault`,
                arguments: [managementFee, performanceFee],
                type_arguments: [structToString(coin.coinStruct)]
            }, {
                title: "Vault Created!",
                description: `You have created a new vault for ${coin.name}`
            })

        }
    }

    return createVault;
}

export default useCreateVault;