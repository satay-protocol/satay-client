import { useState, useEffect } from 'react';

import { useWallet } from '@manahippo/aptos-wallet-adapter';

import { StructData } from '../../types/aptos';
import { fetchDebtOutstanding } from '../../services/strategies';
import { getNetworkSlug } from '../../services/network';

const useDebtOutstanding = (strategyWitness: StructData, vaultId: string, baseCoinType: StructData, decimals: number) => {

    const { network } = useWallet();
    
    const [debtOutstanding, setDebtOutstanding] = useState(0);

    useEffect(() => {
        const loadDebtOutstanding = async () => {
            const debtOutstanding = await fetchDebtOutstanding(strategyWitness, vaultId, baseCoinType, decimals, getNetworkSlug(network.name));
            setDebtOutstanding(debtOutstanding);
        }
        loadDebtOutstanding();
    }, [strategyWitness, vaultId, baseCoinType, decimals])

    return debtOutstanding;
}

export default useDebtOutstanding