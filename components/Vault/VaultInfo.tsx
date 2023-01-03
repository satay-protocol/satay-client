import React from 'react'

import { Button, Text, VStack } from '@chakra-ui/react'

import Card from '../utilities/Card'
import Overview from './Overview'
import Performance from './Performance'

import { Vault } from '../../types/vaults'
import Link from 'next/link'
import { ArrowBackIcon } from '@chakra-ui/icons'

interface Props {
    vault: Vault
}

const VaultInfo : React.FC<Props> = ({ vault }) => {
  return (
    <Card
        gap={2}
    >
        <Link
            href={`/vaults`}
        >
            <Button
                variant='ghost'
                size='xs'
                mr='auto'
                leftIcon={<ArrowBackIcon />}
            >
                Back
            </Button>
        </Link>
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