import React from 'react'

import { VStack } from '@chakra-ui/react'

import Card from '../utilities/Card'
import AboutVault from './AboutVault'
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
            alignItems='flex-start'
        >
            <Overview
                logo={`/${vault.baseCoinProtocol}_logo.jpeg`}
                symbol={vault.symbol}
                tvl={vault.tvl}
            />
            <Performance 
                vaultId={vault.vaultId}
                tvl={vault.tvl}
            />
        </VStack>
    </Card>
  )
}

export default VaultInfo