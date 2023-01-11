import { useState, useEffect } from 'react';

import { useAptos } from '../../contexts/AptosContext';

import { fetchCreditAvailable } from '../../services/strategies';

import { StructData } from '../../types/aptos';

const useCreditAvailable = (strategyWitness: StructData, vaultId: string, baseCoinType: StructData, decimals: number) => {

    const { network } = useAptos();
    
    const [creditAvailable, setCreditAvailable] = useState(0);

    useEffect(() => {
        const loadCreditAvailable = async () => {
            const creditAvailable = await fetchCreditAvailable(strategyWitness, vaultId, baseCoinType, decimals, network);
            setCreditAvailable(creditAvailable);
        }
        loadCreditAvailable();
    }, [strategyWitness, vaultId, baseCoinType, decimals])

    return creditAvailable;
}

export default useCreditAvailable