import { useWallet } from '@manahippo/aptos-wallet-adapter';
import { useEffect, useState } from 'react';

import { useAptos } from '../contexts/AptosContext';

import { getCoinBalance } from '../services/aptosUtils';
import { toAptos } from '../services/utils';


const useCoinBalance = (coinAddress : string) => {

    const { client } = useAptos();
    const { account } = useWallet();

    const [balance, setBalance] = useState(0);

    useEffect(() => {
        const getBalance = async (address : string) => {
            const coinBalance = await getCoinBalance(client, coinAddress, address);
            setBalance(toAptos(coinBalance));
        }
        if(account?.address){
            getBalance(account.address.toString());
        }
    }, [coinAddress])

    return balance;
}

export default useCoinBalance