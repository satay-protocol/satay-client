import React from 'react'

import { Button } from '@chakra-ui/react'

import useFreezeVault from '../../../hooks/vaultManager/useFreezeVault'

import { Coin } from '../../../types/coin';

interface Props {
    baseCoin: Coin,
    isFrozen: boolean,
}

const FreezeVault: React.FC<Props> = ({ baseCoin, isFrozen }) => {

    const {
        freezeVault,
        unfreezeVault
    } = useFreezeVault(baseCoin.coinStruct);

  return (
    <Button
        onClick={() => isFrozen ? unfreezeVault() : freezeVault()}
        colorScheme='brand'
        variant='outline'
    >
        {isFrozen ? 'Unfreeze' : 'Freeze'}
    </Button>
  )
}

export default FreezeVault