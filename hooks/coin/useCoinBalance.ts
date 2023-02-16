import { useEffect, useState } from 'react';

import { useAptos } from '../../contexts/AptosContext';

import { getCoinBalance } from '../../services/coin';

import { StructData } from '../../types/aptos';

const useCoinBalance = (accountAddress: string, coinStruct: StructData) => {

    const { client } = useAptos();

    const [balance, setBalance] = useState(0);

    const getBalance = async () => {
        const coinBalance = await getCoinBalance(client, coinStruct, accountAddress);
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