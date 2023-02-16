import { useState, useEffect } from 'react';

import { useAptos } from '../../contexts/AptosContext';

import { fetchCreditAvailable } from '../../services/strategies';

import { StructData } from '../../types/aptos';

const useCreditAvailable = (baseCoinStruct: StructData, strategyWitness: StructData, decimals: number) => {

    const { client } = useAptos();
    
    const [creditAvailable, setCreditAvailable] = useState(0);

    useEffect(() => {
        const loadCreditAvailable = async () => {
            const creditAvailable = await fetchCreditAvailable(client, baseCoinStruct, strategyWitness, decimals);
            setCreditAvailable(creditAvailable);
        }
        loadCreditAvailable();
    }, [strategyWitness, baseCoinStruct, decimals])

    return creditAvailable;
}

export default useCreditAvailable