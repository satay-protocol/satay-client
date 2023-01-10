import { useState, useEffect } from 'react'

import { useAptos } from '../../contexts/AptosContext';

import { fetchVaultsManagedByAccount } from '../../services/vaultManager'


const useVaultsManagedByUser = (userAddress: string) => {

    const { network } = useAptos();

    const [vaultIds, setVaultIds] = useState<string[]>([]);
    const [fetched, setFetched] = useState<boolean>(false);

    useEffect(() => {
        const getVaultsManagedByUser = async () => {
            const vaultIdsManagedByAccount = await fetchVaultsManagedByAccount(userAddress, network)
            setVaultIds(vaultIdsManagedByAccount);
            setFetched(true);
        }
        getVaultsManagedByUser()
    }, [userAddress])

    return {
        vaultIds,
        fetched
    }
}

export default useVaultsManagedByUser