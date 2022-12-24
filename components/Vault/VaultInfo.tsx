import React from 'react'

import { VStack } from '@chakra-ui/react'

import Card from '../utilities/Card'
import Overview from './Overview'
import Performance from './Performance'

import { Vault } from '../../types/vaults'

interface Props {
    vault: Vault
}

const VaultInfo : React.FC<Props> = ({ vault }) => {
  return (
    <Card>
        <VStack
            spacing={8}
        >
            <Overview
                logo={`/${vault.baseCoinProtocol}_logo.jpeg`}
                symbol={vault.symbol}
                vaultAddress={vault.vaultAddress}
            />
            <Performance 
                vaultId={vault.vaultId}
                symbol={vault.symbol}
            />
        </VStack>
    </Card>
  )
}

export default VaultInfo