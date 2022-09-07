import { useEffect, useState } from 'react';
import { useAptos } from '../contexts/AptosContext';

import { VaultPreview } from "../types/vaults";

import { getVaults } from '../services/vaults';
import { getVaultPreview } from '../data/vaultsData';
import useManagerResource from './useManagerResource';

interface ManagerResource {
    vaults: {handle : string},
    next_vault_id: string;
}

const useVaults = () => {

    const { client } = useAptos();

    const { managerResource } = useManagerResource();

    const [vaults, setVaults] = useState<VaultPreview[]>([]);

    const [fetched, setFetched] = useState<boolean>(false);

    useEffect(() => {
        const getVaultsData = async () => {
            if(managerResource){
                const vaults = await getVaults(client, managerResource)
    
                setFetched(true);
    
                setVaults(vaults.map((vault) => ({
                    ...getVaultPreview(vault.base_coin),
                    apy: 10.5,
                    totalAssets: 100000,
                    id: vault.vault_address
                    
                })));
            }
        }
        if(!fetched && managerResource){
            getVaultsData();
        }
    }, [fetched, managerResource]);

    return {
        vaults
    };
}

export default useVaults;