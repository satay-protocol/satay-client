import { useState, useEffect } from 'react'

import { useAptos } from '../../contexts/AptosContext';

import { fetchStrategiesKeptByAccount } from '../../services/keeper';

import { KeeperInfo } from '../../types/strategy'

const useStrategiesKeptByUser = (userAddress: string) => {

    const { network } = useAptos();

    const [strategiesKeptByUser, setStrategiesKeptByUser] = useState<KeeperInfo[]>([]);
    const [fetched, setFetched] = useState(false);

    useEffect(() => {
        const loadStrategiesKeptByUser = async () => {
            const strategiesKeptByUser = await fetchStrategiesKeptByAccount(network, userAddress);
            setStrategiesKeptByUser(strategiesKeptByUser);
            setFetched(true);
        }
        loadStrategiesKeptByUser();
    }, [userAddress, network]);

    return {
        strategiesKeptByUser,
        fetched
    };
}

export default useStrategiesKeptByUser