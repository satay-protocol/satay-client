import { useState, useEffect } from 'react'

import { useAptos } from '../../contexts/AptosContext';

import { fetchStrategiesKeptByAccount } from '../../services/keeper';

import { KeeperInfo } from '../../types/strategy'

const useStrategiesKeptByUser = (userAddress: string) => {

    const { network } = useAptos();

    const [strategiesKeptByUser, setStrategiesKeptByUser] = useState<KeeperInfo[]>([]);

    useEffect(() => {
        const loadStrategiesKeptByUser = async () => {
            const strategiesKeptByUser = await fetchStrategiesKeptByAccount(userAddress, network);
            setStrategiesKeptByUser(strategiesKeptByUser);
        }
        loadStrategiesKeptByUser();
    }, [userAddress]);

    return strategiesKeptByUser;
}

export default useStrategiesKeptByUser