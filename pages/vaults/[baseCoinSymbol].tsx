import React from 'react'

import { useRouter } from 'next/router';

import DefaultLayout from '../../layouts/default';
import Vault from '../../components/Vault';
import { getCoin } from '../../data/coins';

const VaultPage = () => {

    const { query } = useRouter();

    const { baseCoinSymbol } = query as { baseCoinSymbol: string };

    const baseCoin = getCoin(baseCoinSymbol);

    if(!baseCoin) return null;

    return (
        <DefaultLayout>
            <Vault
                baseCoinStruct={baseCoin.coinStruct}
            />
        </DefaultLayout>
    )
}

export default VaultPage