import { useEffect, useState } from 'react';
import { useAptos } from '../contexts/AptosContext';

import { Vault } from "../types/vaults";

import { getVaults } from '../services/vaults';

import useManagerResource from './manager/useManagerResource';

const useVaults = (managerAddress : string) => {

    const { client } = useAptos();

    const { managerResource } = useManagerResource(managerAddress);

    const [vaults, setVaults] = useState<Vault[]>([]);
    const [fetching, setFetching] = useState<boolean>(false);
    const [fetched, setFetched] = useState<boolean>(false);

    useEffect(() => {
        const getVaultsData = async () => {
            if(managerResource){
                setFetching(true);
                const vaults = await getVaults(client, managerResource);
                setVaults(vaults.filter(v => v !== null).map(v => v as Vault));
                setFetched(true);
                setFetching(false);
            }
        }
        if(!fetching && vaults.length == 0 && !fetched && managerResource){
            getVaultsData();
        }
    }, [fetched, managerResource]);

    return {
        vaults,
        fetched
    };
}

export default useVaults;