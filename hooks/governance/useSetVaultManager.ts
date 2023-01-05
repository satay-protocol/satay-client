import { useState } from "react";

import useWallet from "../useWallet";

import { ellipsize } from "../../services/utils";

import { satay } from "../../data/moduleAddresses";

const useSetVaultManager = (vaultAddress: string) => {

    const { submitTransaction } = useWallet();

    const [newVaultManager, setNewVaultManagerState] = useState<string>("");

    const setNewVaultManager = async (managerAddress: string) => {
        setNewVaultManagerState(managerAddress);
    }

    const submit = () => {
        submitTransaction({
            type: 'entry_function_payload',
            function: `${satay}::vault_config::set_vault_manager`,
            arguments: [
                vaultAddress,
                newVaultManager
            ],
            type_arguments: []
        }, {
            title: "Set Vault Manager Succeeded!",
            description: `You have set the new vault manager to ${ellipsize(newVaultManager)}`
        })
    }

    return {
        newVaultManager,
        setNewVaultManager,
        submit
    };
}

export default useSetVaultManager