import { useWallet } from '@manahippo/aptos-wallet-adapter';
import { useState, useEffect } from 'react';
import { getNetworkSlug } from '../../services/network';
import { fetchCreditAvailable } from '../../services/strategies';
import { StructData } from '../../types/aptos';

const useCreditAvailable = (strategyWitness: StructData, vaultId: string, baseCoinType: StructData, decimals: number) => {

    const { network } = useWallet();
    
    const [creditAvailable, setCreditAvailable] = useState(0);

    useEffect(() => {
        const loadCreditAvailable = async () => {
            const creditAvailable = await fetchCreditAvailable(strategyWitness, vaultId, baseCoinType, decimals, getNetworkSlug(network.name));
            setCreditAvailable(creditAvailable);
        }
        loadCreditAvailable();
    }, [strategyWitness, vaultId, baseCoinType, decimals])

    return creditAvailable;
}

export default useCreditAvailable