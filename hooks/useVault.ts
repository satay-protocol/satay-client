import { AptosAccount, TxnBuilderTypes } from "aptos";
import { TransactionPayload } from "aptos/dist/generated";
import { useEffect, useState } from "react";
import { useAptos } from "../contexts/AptosContext";
import { vaultManager } from "../data/vaultManager";
import { getVaultCoins, getVaultFromTable } from "../services/vaults";

import { Vault } from "../types/vaults";
import useAccount from "./useAccount";

import useManagerResource from "./manager/useManagerResource";

const useVault = (managerAddress : string, vaultId : string) => {

    const { client } = useAptos();

    const { account, signAndSubmitTransaction } = useAccount();

    const { managerResource, complete: managerResourceComplete } = useManagerResource(managerAddress);

    const [vault, setVault] = useState<Vault | null>(null);
    const [complete, setComplete] = useState<boolean>(false);

    useEffect(() => {
        const getVaultData = async () => {
            if(managerResource && vaultId){
                const vault = await getVaultFromTable(client, managerResource, vaultId);
                if(vault){
                    getVaultCoins(client, vault.vaultAddress);
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
                function: `0xc09622c20bdd49b2b83b7e05c264a62cfedeb45eaf5c629d0f0174917d801aef::satay::deposit`,
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
                function: `0xc09622c20bdd49b2b83b7e05c264a62cfedeb45eaf5c629d0f0174917d801aef::satay::withdraw`,
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