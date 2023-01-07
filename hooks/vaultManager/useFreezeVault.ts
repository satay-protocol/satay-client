import { useState } from "react";

import useWallet from "../utility/useWallet";

import { satay } from "../../data/moduleAddresses";

const useFreezeVault = (vaultId: string, isFrozen: boolean) => {

        const { submitTransaction } = useWallet();
    
        const [frozen, setFrozen] = useState<boolean>(isFrozen);
    
        const freezeVault = async () => {
            await submitTransaction({
                type: 'entry_function_payload',
                function: `${satay}::satay::freeze_vault`,
                arguments: [vaultId],
                type_arguments: []
            }, {
                title: "Vault Frozen!",
                description: `You have frozen vault ${vaultId}`
            })
        }

        const unfreezeVault = async () => {
            await submitTransaction({
                type: 'entry_function_payload',
                function: `${satay}::satay::unfreeze_vault`,
                arguments: [vaultId],
                type_arguments: []
            }, {
                title: "Vault Unfrozen!",
                description: `You have unfrozen vault ${vaultId}`
            })
        }
    
        return {
            frozen,
            freezeVault,
            unfreezeVault
        }
}

export default useFreezeVault;