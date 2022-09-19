import { AptosAccount, TxnBuilderTypes } from "aptos";
import { TransactionPayload } from "aptos/dist/generated";
import { useEffect, useState } from "react";
import { useAptos } from "../contexts/AptosContext";
import { vaultManager } from "../data/vaultManager";
import { getVaultFromTable } from "../services/vaults";

import { Vault } from "../types/vaults";
import useAccount from "./useAccount";

import useManagerResource from "./manager/useManagerResource";

const useVault = (managerAddress : string, vaultId : string) => {

    const { client } = useAptos();

    const { account, signAndSubmitTransaction } = useAccount();

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
            const payload : TransactionPayload = {
                type: 'entry_function_payload',
                function: `${vaultManager}::satay::deposit`,
                arguments: [
                    vault.managerAddress,
                    vault.vaultId,
                    amount.toString()
                ],
                type_arguments: [vault.coinType]
            }
            const tx = await signAndSubmitTransaction(payload)
            await client.waitForTransaction(tx.hash);
        }
    }

    const withdraw = async (amount : number) => {
        if(vault && account?.address){
            const payload : TransactionPayload = {
                type: 'entry_function_payload',
                function: `${vaultManager}::satay::withdraw`,
                arguments: [
                    vault.managerAddress,
                    vault.vaultId,
                    amount.toString()
                ],
                type_arguments: [vault.coinType]
            }
            const tx = await signAndSubmitTransaction(payload)
            await client.waitForTransaction(tx.hash);
        }
    }

    return {
        vault,
        deposit,
        withdraw
    }
}

export default useVault;