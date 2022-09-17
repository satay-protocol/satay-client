import React from 'react'

import { VStack } from '@chakra-ui/react'

import Card from '../utilities/Card'
import AboutVault from './AboutVault'
import Overview from './Overview'
import Strategies from './Strategies'

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
                apy={vault.apy}
                asset={vault.asset}
                totalAssets={vault.totalAssets}
                logo={vault.logo}
            />
            <AboutVault 
                about={vault.about}
            />
            <Strategies 
                strategy={vault.strategy}
            />
        </VStack>
    </Card>
  )
}

export default VaultInfo