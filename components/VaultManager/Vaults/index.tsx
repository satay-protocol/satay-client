import { VStack } from '@chakra-ui/react'
import React from 'react'
import Vault from './Vault'

interface Props {
    vaultIds: string[]
}

const Vaults: React.FC<Props> = ({ vaultIds }) => {
  return (
    <VStack
        alignItems="flex-start"
    >
        {vaultIds.map((vaultId) => (
            <Vault 
                key={vaultId}
                vaultId={vaultId}
            />
        ))}
    </VStack>
  )
}

export default Vaults