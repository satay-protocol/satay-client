import React from 'react'

import { Box, Text, VStack } from '@chakra-ui/react'

import Vault from './Vault'

interface Props {
    vaultIds: string[]
}

const Vaults: React.FC<Props> = ({ vaultIds }) => {
  return (
    <VStack
        alignItems="flex-start"
    >
        {
            vaultIds.length > 0 ? (
                vaultIds.map((vaultId) => (
                    <Vault 
                        key={vaultId}
                        vaultId={vaultId}
                    />
                ))
            ) : (
                <Box>
                    <Text>
                        You are not the manager of any vaults.
                    </Text>
                </Box>
            )
            
        }
    </VStack>
  )
}

export default Vaults