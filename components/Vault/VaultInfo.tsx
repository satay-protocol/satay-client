import React from 'react'

import { Button, VStack } from '@chakra-ui/react'

import Card from '../utilities/Card'
import Overview from './Overview'
import Performance from './Performance'

import { VaultInfo } from '../../types/vaults'
import Link from 'next/link'
import { ArrowBackIcon } from '@chakra-ui/icons'

interface Props {
    vault: VaultInfo
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
                logo={`/${vault.baseCoin.protocol}_logo.jpeg`}
                symbol={vault.baseCoin.symbol}
                vaultAddress={vault.vaultAddress}
            />
            <Performance 
                vaultId={vault.vaultId}
                symbol={vault.baseCoin.symbol}
            />
        </VStack>
    </Card>
  )
}

export default VaultInfo