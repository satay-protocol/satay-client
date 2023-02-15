import { useState, useEffect } from 'react';

import { useAptos } from '../../contexts/AptosContext';

import { fetchDebtOutstanding } from '../../services/strategies';

import { StructData } from '../../types/aptos';

const useDebtOutstanding = (baseCoinStruct: StructData, strategyWitness: StructData, decimals: number) => {

    const { client } = useAptos();
    
    const [debtOutstanding, setDebtOutstanding] = useState(0);

    useEffect(() => {
        const loadDebtOutstanding = async () => {
            const debtOutstanding = await fetchDebtOutstanding(client, baseCoinStruct, strategyWitness, decimals);
            setDebtOutstanding(debtOutstanding);
        }
        loadDebtOutstanding();
    }, [strategyWitness, baseCoinStruct, decimals])

    return debtOutstanding;
}

export default useDebtOutstanding