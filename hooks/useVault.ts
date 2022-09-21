import { TransactionPayload } from "aptos/dist/generated";
import { useEffect, useState } from "react";
import { useAptos } from "../contexts/AptosContext";
import { vaultManager } from "../data/vaultManager";
import { getVaultFromTable } from "../services/vaults";

import { Vault } from "../types/vaults";
import useAccount from "./useAccount";

import useManagerResource from "./manager/useManagerResource";
import { useToast } from "@chakra-ui/react";
import { toAptos } from "../services/utils";

const useVault = (managerAddress : string, vaultId : string) => {

    const { client } = useAptos();

    const { account, signAndSubmitTransaction } = useAccount();

    const { managerResource } = useManagerResource(managerAddress);

    const toast = useToast();

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
            await signAndSubmitTransaction({
                type: 'entry_function_payload',
                function: `${vaultManager}::satay::deposit`,
                arguments: [
                    vault.managerAddress,
                    vault.vaultId,
                    amount.toString()
                ],
                type_arguments: [vault.coinType]
            })
                .then(() => {
                    toast({
                        title: "Deposit Succeeded!",
                        description: `You have deposited ${toAptos(amount)} coins`,
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                    })
                })
                .catch(() => {
                    toast({
                        title: "Deposit Failed",
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                    })
                })
        }
    }

    const withdraw = async (amount : number) => {
        if(vault && account?.address){
            await signAndSubmitTransaction({
                type: 'entry_function_payload',
                function: `${vaultManager}::satay::withdraw`,
                arguments: [
                    vault.managerAddress,
                    vault.vaultId,
                    amount.toString()
                ],
                type_arguments: [vault.coinType]
            })
                .then(() => {
                    toast({
                        title: "Withdraw Succeeded!",
                        description: `You have burned ${toAptos(amount)} vault coins`,
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                    })
                })
                .catch(() => {
                    toast({
                        title: "Withdraw Failed",
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                    })
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