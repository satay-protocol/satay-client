import { useState, useEffect } from 'react'

import { useAptos } from '../../contexts/AptosContext';

import { fetchVaultsManagedByAccount } from '../../services/vaultManager'


const useVaultsManagedByUser = (userAddress: string) => {

    const { network } = useAptos();

    const [vaultIdsManagedByUser, setVaultIdsManagedByUser] = useState<string[]>([])

    useEffect(() => {
        const getVaultsManagedByUser = async () => {
            const vaultIds = await fetchVaultsManagedByAccount(userAddress, network)
            setVaultIdsManagedByUser(vaultIds)
        }
        getVaultsManagedByUser()
    }, [userAddress])

    return vaultIdsManagedByUser
}

export default useVaultsManagedByUser