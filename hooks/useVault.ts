import { useEffect, useState } from "react";
import { useAptos } from "../contexts/AptosContext";
import { getVaultInfo } from "../data/vaultsData";
import { getVaultFromAddress } from "../services/vaults";

import { Vault } from "../types/vaults";

import useManagerResource from "./useManagerResource";

const useVault = (vaultId : string) => {

    const { client } = useAptos();

    const { managerResource, complete: managerResourceComplete } = useManagerResource();

    const [vault, setVault] = useState<Vault | null>(null);
    const [complete, setComplete] = useState<boolean>(false);

    useEffect(() => {
        const getVaultData = async () => {
            const vaultData = await getVaultFromAddress(client, vaultId);
            const vault : Vault = {
                ...getVaultInfo(vaultData.base_coin),
                apy: 10.5,
                totalAssets: 100_000,
                id: '000'
            }
            setVault(vault);
        }
        if(!vault && !complete && managerResourceComplete){
            getVaultData();
        }
    }, [vaultId, managerResourceComplete, vault, complete]);

    const deposit = async (amount : number) => {

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