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
                logo={vault.logo}
                asset={vault.asset}
                totalDeposits={vault.totalDeposits}
            />
            <AboutVault 
                about={vault.about}
            />
            <Strategies 
                strategies={vault.strategies}
            />
        </VStack>
    </Card>
  )
}

export default VaultInfo