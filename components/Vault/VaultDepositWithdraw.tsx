import React from 'react'

import DepositWithdraw from '../DepositWithdraw';

import useVaultDepositWithdraw from '../../hooks/vault/useVaultDepositWithdraw';

import { satayStakeCoin } from '../../data/blocks';

import { Coin } from '../../types/coin'

interface Props {
    baseCoin: Coin
}

const VaultDepositWithdraw: React.FC<Props> = ({ baseCoin }) => {

    const { deposit, withdraw } = useVaultDepositWithdraw(baseCoin.coinStruct)

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