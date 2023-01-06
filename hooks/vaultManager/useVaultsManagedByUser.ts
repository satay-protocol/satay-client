import { useWallet } from '@manahippo/aptos-wallet-adapter'
import { useState, useEffect } from 'react'
import { getNetworkSlug } from '../../services/network';
import { fetchVaultsManagedByAccount } from '../../services/vaultManager'


const useVaultsManagedByUser = (userAddress: string) => {

    const { network } = useWallet();

    const [vaultIdsManagedByUser, setVaultIdsManagedByUser] = useState<string[]>([])

    useEffect(() => {
        const getVaultsManagedByUser = async () => {
            const vaultIds = await fetchVaultsManagedByAccount(userAddress, getNetworkSlug(network.name))
            setVaultIdsManagedByUser(vaultIds)
        }
        getVaultsManagedByUser()
    }, [userAddress])

    return vaultIdsManagedByUser
}

export default useVaultsManagedByUser