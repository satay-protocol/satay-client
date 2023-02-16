import React from 'react'

import { Button, HStack } from '@chakra-ui/react'

import LabeledInput from '../../utilities/LabeledInput'

import useSetVaultManager from '../../../hooks/governance/useSetVaultManager'

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
                onChange={setNewVaultManager}
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