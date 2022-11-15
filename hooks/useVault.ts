import { useEffect, useState } from "react";
import { useAptos } from "../contexts/AptosContext";
import { vaultManager } from "../data/vaultManager";
import { structToString, getVaultFromTable } from "../services/vaults";

import { Vault } from "../types/vaults";

import useManagerResource from "./manager/useManagerResource";

import { toAptos } from "../services/utils";
import useWallet from "./useWallet";

const useVault = (managerAddress : string, vaultId : string) => {

    const { client } = useAptos();

    const { account, submitTransaction } = useWallet();

    const { managerResource } = useManagerResource(managerAddress);

    const [vault, setVault] = useState<Vault | null>(null);
    const [complete, setComplete] = useState<boolean>(false);

    useEffect(() => {
        const getVaultData = async () => {
            if(managerResource && vaultId){
                const vault = await getVaultFromTable(client, managerResource, vaultId);
                if(vault){
                    setVault(vault);
                    setComplete(true);
                }
            }
        }
        if(!vault && !complete && managerResource){
            getVaultData();
        }
    }, [vaultId, managerResource, vault, complete]);

    const deposit = async (amount : number) => {
        if(vault && account?.address){
            await submitTransaction({
                type: 'entry_function_payload',
                function: `${vaultManager}::satay::deposit`,
                arguments: [
                    vault.managerAddress,
                    vault.vaultId,
                    amount.toString()
                ],
                type_arguments: [structToString(vault.baseCoin)]
            }, {
                title: "Deposit Succeeded!",
                description: `You have deposited ${toAptos(amount)} coins`
            })
        }
    }

    const withdraw = async (amount : number) => {
        if(vault && account?.address){
            await submitTransaction({
                type: 'entry_function_payload',
                function: `${vaultManager}::satay::withdraw`,
                arguments: [
                    vault.managerAddress,
                    vault.vaultId,
                    amount.toString()
                ],
                type_arguments: [structToString(vault.baseCoin)]
            }, {
                title: "Withdraw Succeeded!",
                description: `You have burned ${toAptos(amount)} vault coins`,
            })
        }
    }

    return {
        vault,
        deposit,
        withdraw
    }
}

export default useVault;