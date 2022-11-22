import { useEffect, useState } from 'react';

import { useAptos } from '../contexts/AptosContext';

import { getCoinBalance } from '../services/aptosUtils';

import { StructData } from '../types/aptos';

const useCoinBalance = (accountAddress: string, coinStruct: StructData, coinStoreAddress = '0x1::coin') => {

    const { client } = useAptos();

    const [balance, setBalance] = useState(0);

    const getBalance = async () => {
        const coinBalance = await getCoinBalance(client, coinStruct, accountAddress, coinStoreAddress);
        if(coinBalance !== balance) {
            setBalance(coinBalance);
        }
    }

    useEffect(() => {
        getBalance();
    }, [coinStruct, client])

    return balance;
}

export default useCoinBalance