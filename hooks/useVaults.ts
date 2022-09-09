import { useEffect, useState } from 'react';
import { useAptos } from '../contexts/AptosContext';

import { VaultPreview } from "../types/vaults";

import { getVaults } from '../services/vaults';

import useManagerResource from './useManagerResource';

const useVaults = () => {

    const { client } = useAptos();

    const { managerResource } = useManagerResource();

    const [vaults, setVaults] = useState<VaultPreview[]>([]);

    const [fetched, setFetched] = useState<boolean>(false);

    useEffect(() => {
        const getVaultsData = async () => {
            if(managerResource){
                const vaults = await getVaults(client, managerResource);
                setVaults(vaults.filter(v => v !== null).map(v => v as VaultPreview));
                setFetched(true);
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