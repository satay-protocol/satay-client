import { useEffect, useState } from "react";
import { useAptos } from "../contexts/AptosContext";
import { vaultManager } from "../data/vaultManager";
import { getVaultFromTable } from "../services/vaults";

import { Vault } from "../types/vaults";

import useManagerResource from "./manager/useManagerResource";
import { useToast } from "@chakra-ui/react";
import { toAptos } from "../services/utils";
import { useWallet } from "@manahippo/aptos-wallet-adapter";

const useVault = (managerAddress : string, vaultId : string) => {

    const { client, updateClient } = useAptos();

    const { account, signAndSubmitTransaction } = useWallet();

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
            const res = await signAndSubmitTransaction({
                type: 'entry_function_payload',
                function: `${vaultManager}::satay::deposit`,
                arguments: [
                    vault.managerAddress,
                    vault.vaultId,
                    amount.toString()
                ],
                type_arguments: [vault.coinType]
            }, {
                max_gas_amount: '5000',
                gas_unit_price: '1000',
            })
                .then(({ hash }) => {
                    client.waitForTransaction(hash).then(() => {
                        toast({
                            title: "Deposit Succeeded!",
                            description: `You have deposited ${toAptos(amount)} coins`,
                            status: "success",
                            duration: 5000,
                            isClosable: true,
                        })
                        updateClient();
                    })
                })
                .catch((err) => {
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
            }, {
                max_gas_amount: '5000',
                gas_unit_price: '1000',
            })
                .then(({ hash }) => {
                    client.waitForTransaction(hash).then(() => {
                        toast({
                            title: "Withdraw Succeeded!",
                            description: `You have burned ${toAptos(amount)} vault coins`,
                            status: "success",
                            duration: 5000,
                            isClosable: true,
                        })
                        updateClient();
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