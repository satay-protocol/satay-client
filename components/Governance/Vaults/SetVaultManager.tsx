import React from 'react'

import { Button, HStack, Input } from '@chakra-ui/react'
import useSetVaultManager from '../../../hooks/governance/useSetVaultManager'

interface Props {
    vaultAddress: string
}

const SetVaultManager: React.FC<Props> = ({ vaultAddress }) => {

    const { newVaultManager, setNewVaultManager, submit } = useSetVaultManager(vaultAddress);

    return (
        <HStack
            flex={1}
        >
            <Input 
                placeholder="New Vault Manager Address"
                value={newVaultManager}
                onChange={(e) => setNewVaultManager(e.target.value)}
            />
            <Button
                colorScheme="brand"
                onClick={submit}
            >
                Submit
            </Button>
        </HStack>
    )
}

export default SetVaultManager