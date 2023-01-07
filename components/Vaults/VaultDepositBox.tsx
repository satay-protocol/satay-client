import React from 'react'
import useVaultDepositWithdraw from '../../hooks/vault/useVaultDepositWithdraw'
import { Coin } from '../../types/coin'

import DepositBox from '../utilities/DepositBox'

interface Props {
    vaultId: string,
    baseCoin: Coin
}

const VaultDepositBox: React.FC<Props> = ({ vaultId, baseCoin }) => {

    let { deposit } = useVaultDepositWithdraw(vaultId, baseCoin.coinStruct)

  return (
    <DepositBox 
        coinStruct={baseCoin.coinStruct}
        coinSymbol={baseCoin.symbol}
        onDeposit={deposit}
        viewPath={`/vaults/${vaultId}`}
    />
  )
}

export default VaultDepositBox