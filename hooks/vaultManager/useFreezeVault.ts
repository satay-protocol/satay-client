import useWallet from "../utility/useWallet";

import { satay } from "../../data/moduleAddresses";

import { StructData } from "../../types/aptos";
import { structToString } from "../../services/aptosUtils";

const useFreezeVault = (baseCoinStruct: StructData) => {

        const { submitTransaction } = useWallet();
        
        const freezeVault = async () => {
            await submitTransaction({
                type: 'entry_function_payload',
                function: `${satay}::satay::freeze_vault`,
                arguments: [],
                type_arguments: [structToString(baseCoinStruct)]
            }, {
                title: "Vault Frozen!",
                description: `You have frozen the vault`
            })
        }

        const unfreezeVault = async () => {
            await submitTransaction({
                type: 'entry_function_payload',
                function: `${satay}::satay::unfreeze_vault`,
                arguments: [],
                type_arguments: [structToString(baseCoinStruct)]
            }, {
                title: "Vault Unfrozen!",
                description: `You have unfrozen the vault`
            })
        }
    
        return {
            freezeVault,
            unfreezeVault
        }
}

export default useFreezeVault;