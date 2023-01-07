import React from 'react'

import { Button, HStack, Input } from '@chakra-ui/react'
import useSetVaultManager from '../../../hooks/governance/useSetVaultManager'
import LabeledInput from '../../utilities/LabeledInput'

interface Props {
    vaultAddress: string
}

const SetVaultManager: React.FC<Props> = ({ vaultAddress }) => {

    const { newVaultManager, setNewVaultManager, submit } = useSetVaultManager(vaultAddress);

    return (
        <HStack
            alignItems='flex-end'
        >
            <LabeledInput 
                label="New Vault Manager"
                value={newVaultManager}
                setValue={setNewVaultManager}
                placeholder="0x..."
            />
            <Button
                colorScheme="brand"
                onClick={submit}
                disabled={!newVaultManager}
            >
                Offer
            </Button>
        </HStack>
    )
}

export default SetVaultManager