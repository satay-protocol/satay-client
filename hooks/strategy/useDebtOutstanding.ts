import { useState, useEffect } from 'react';

import { useAptos } from '../../contexts/AptosContext';

import { fetchDebtOutstanding } from '../../services/strategies';

import { StructData } from '../../types/aptos';

const useDebtOutstanding = (strategyWitness: StructData, vaultId: string, baseCoinType: StructData, decimals: number) => {

    const { network } = useAptos();
    
    const [debtOutstanding, setDebtOutstanding] = useState(0);

    useEffect(() => {
        const loadDebtOutstanding = async () => {
            const debtOutstanding = await fetchDebtOutstanding(strategyWitness, vaultId, baseCoinType, decimals, network);
            setDebtOutstanding(debtOutstanding);
        }
        loadDebtOutstanding();
    }, [strategyWitness, vaultId, baseCoinType, decimals])

    return debtOutstanding;
}

export default useDebtOutstanding