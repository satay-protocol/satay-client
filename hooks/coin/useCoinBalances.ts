import { useState, useEffect } from 'react';

import { useAptos } from "../../contexts/AptosContext";

import { getCoinBalances } from '../../services/coin';
import { CoinData } from '../../types/vaults';

const useCoinBalances = (address : string) => {

    const { client } = useAptos();

    const [balances, setBalances] = useState<CoinData[]>([]);
    
    useEffect(() => {
        const getBalances = async () => {
            const balances = await getCoinBalances(client, address);
            setBalances(balances);
        }
        getBalances();
    }, [address, client]);

    return balances;
}

export default useCoinBalances;