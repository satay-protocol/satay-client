import { useWallet } from '@manahippo/aptos-wallet-adapter';
import { useState, useEffect } from 'react'
import { fetchStrategiesKeptByAccount } from '../../services/keeper';
import { getNetworkSlug } from '../../services/network';
import { KeeperInfo } from '../../types/strategy'

const useStrategiesKeptByUser = (userAddress: string) => {

    const { network } = useWallet();

    const [strategiesKeptByUser, setStrategiesKeptByUser] = useState<KeeperInfo[]>([]);

    useEffect(() => {
        const loadStrategiesKeptByUser = async () => {
            const strategiesKeptByUser = await fetchStrategiesKeptByAccount(userAddress, getNetworkSlug(network.name));
            setStrategiesKeptByUser(strategiesKeptByUser);
        }
        loadStrategiesKeptByUser();
    }, [userAddress]);

    return strategiesKeptByUser;
}

export default useStrategiesKeptByUser