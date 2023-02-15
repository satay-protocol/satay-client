import React from 'react'

import Link from 'next/link'

import { Button, VStack } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'

import Card from '../utilities/Card'
import Overview from './Overview'
import Performance from './Performance'

import { VaultInfo as VaultInfoType } from '../../types/vaults'

interface Props {
    vault: VaultInfoType
}

const VaultInfo: React.FC<Props> = ({ vault }) => {
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
            {/* <Performance 
                vaultId={vault.vaultId}
                symbol={vault.baseCoin.symbol}
            /> */}
        </VStack>
    </Card>
  )
}

export default VaultInfo