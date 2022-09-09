import { AptosAccount, TxnBuilderTypes } from "aptos";
import { TransactionPayload } from "aptos/dist/generated";
import { useEffect, useState } from "react";
import { useAptos } from "../contexts/AptosContext";
import { vaultManager } from "../data/vaultManager";
import { getVaultCoins, getVaultFromTable } from "../services/vaults";

import { Vault } from "../types/vaults";
import useAccount from "./useAccount";

import useManagerResource from "./useManagerResource";

const useVault = (vaultId : string) => {

    const { client } = useAptos();

    const { account, signAndSubmitTransaction } = useAccount();

    const { managerResource, complete: managerResourceComplete } = useManagerResource();

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
                type_arguments: ["0x43417434fd869edee76cca2a4d2301e528a1551b1d719b75c350c3c97d15b8b9::coins::USDT"]
            }
            await signAndSubmitTransaction(payload);
        }
    }

    const withdraw = async (amount : number) => {

    }

    return {
        vault,
        deposit,
        withdraw
    }
}

export default useVault;