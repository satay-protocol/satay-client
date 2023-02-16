import React from 'react'

import { Box, Text, VStack } from '@chakra-ui/react'

import Vault from './Vault'

import { Coin } from '../../../types/coin'
import { structToString } from '../../../services/aptosUtils'

interface Props {
    vaultBaseCoins: Coin[]
}

const Vaults: React.FC<Props> = ({ vaultBaseCoins }) => {
  return (
    <VStack
        alignItems="flex-start"
    >
        {
            vaultBaseCoins.length > 0 ? (
                vaultBaseCoins.map((baseCoin) => (
                    <Vault 
                        key={structToString(baseCoin.coinStruct)}
                        baseCoin={baseCoin}
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