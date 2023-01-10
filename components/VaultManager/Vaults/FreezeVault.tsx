import React from 'react'

import { Button } from '@chakra-ui/react'

import useFreezeVault from '../../../hooks/vaultManager/useFreezeVault'

interface Props {
    vaultId: string,
    isFrozen: boolean,
}

const FreezeVault: React.FC<Props> = ({ vaultId, isFrozen }) => {

    const {
        frozen,
        freezeVault,
        unfreezeVault
    } = useFreezeVault(vaultId, isFrozen);

  return (
    <Button
        onClick={() => frozen ? unfreezeVault() : freezeVault()}
        colorScheme='brand'
        variant='outline'
    >
        {frozen ? 'Unfreeze' : 'Freeze'}
    </Button>
  )
}

export default FreezeVault