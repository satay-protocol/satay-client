import React from 'react'

import DepositWithdraw from '../DepositWithdraw';

import useVaultDepositWithdraw from '../../hooks/vault/useVaultDepositWithdraw';

import { satayStakeCoin } from '../../data/blocks';

import { Coin } from '../../types/coin'

interface Props {
    vaultId: string,
    baseCoin: Coin
}

const VaultDepositWithdraw: React.FC<Props> = ({ vaultId, baseCoin }) => {

    const { deposit, withdraw } = useVaultDepositWithdraw(vaultId, baseCoin.coinStruct)

    const block = satayStakeCoin(baseCoin);

    return (
        <DepositWithdraw 
            deposit={deposit}
            withdraw={withdraw}
            block={block}
        />
    )
}

export default VaultDepositWithdraw