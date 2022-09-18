import { useEffect, useState } from 'react';

import { useAptos } from '../contexts/AptosContext';

import { getCoinBalance } from '../services/aptosUtils';
import { toAptos } from '../services/utils';


const useCoinBalance = (accountAddress: string, coinAddress : string, coinStoreAddress = '0x1::coin') => {

    const { client } = useAptos();

    const [balance, setBalance] = useState(0);

    useEffect(() => {
        const getBalance = async () => {
            const coinBalance = await getCoinBalance(client, coinAddress, accountAddress, coinStoreAddress);
            setBalance(toAptos(coinBalance));
        }
        getBalance();
    }, [coinAddress])

    return balance;
}

export default useCoinBalance