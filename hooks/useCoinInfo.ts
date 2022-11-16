import React from 'react'

import { useAptos } from '../contexts/AptosContext';

import { getCoinInfo } from '../services/aptosUtils';

import { StructData } from '../types/aptos'

const useCoinInfo = (coinStruct: StructData) => {

    const { client } = useAptos();
  
    const [decimals, setDecimals] = React.useState<number>(0);
    const [name, setName] = React.useState<string>('');
    const [symbol, setSymbol] = React.useState<string>('');
    const [fetching, setFetching] = React.useState<boolean>(false);

    React.useEffect(() => {
        if(!fetching && name === '' && symbol === '' && decimals === 0) {
            setFetching(true);
            getCoinInfo(client, coinStruct)
                .then((res) => {
                    setDecimals(res.decimals);
                    setName(res.name);
                    setSymbol(res.symbol);
                    setFetching(false);
                })
                .catch((err) => {
                    setFetching(false);
                })
        }
    }, [client, coinStruct])

    return { decimals, name, symbol };
}

export default useCoinInfo