import React from 'react'

import DepositBox from '../utilities/DepositBox'

import useVaultDepositWithdraw from '../../hooks/vault/useVaultDepositWithdraw'

import { Coin } from '../../types/coin'

interface Props {
    baseCoin: Coin
}

const VaultDepositBox: React.FC<Props> = ({ baseCoin }) => {

    let { deposit } = useVaultDepositWithdraw(baseCoin.coinStruct)

  return (
    <DepositBox 
        coinStruct={baseCoin.coinStruct}
        coinSymbol={baseCoin.symbol}
        onDeposit={deposit}
        viewPath={`/vaults/${baseCoin.symbol}`}
    />
  )
}

export default VaultDepositBox