import { useState, useEffect } from 'react'

import { useAptos } from '../../contexts/AptosContext';

import { fetchVaultsManagedByAccount } from '../../services/vaultManager'
import { Coin } from '../../types/coin';


const useVaultsManagedByUser = (userAddress: string) => {

    const { network } = useAptos();

    const [vaultBaseCoins, setVaultBaseCoins] = useState<Coin[]>([]);
    const [fetched, setFetched] = useState<boolean>(false);

    useEffect(() => {
        const getVaultsManagedByUser = async () => {
            const vaultsManagedByAccount = await fetchVaultsManagedByAccount(network, userAddress)
            setVaultBaseCoins(vaultsManagedByAccount);
            setFetched(true);
        }
        getVaultsManagedByUser()
    }, [userAddress, network])

    return {
        vaultBaseCoins,
        fetched
    }
}

export default useVaultsManagedByUser