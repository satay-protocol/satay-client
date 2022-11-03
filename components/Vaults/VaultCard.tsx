import React, { useState } from 'react'

import Link from 'next/link'

import { Text, Flex, Image, VStack, NumberInput, NumberInputField, Button } from '@chakra-ui/react'
import { AddIcon, ArrowForwardIcon } from '@chakra-ui/icons'

import { Vault } from '../../types/vaults'

import Card from '../utilities/Card'

import { fromAptos } from '../../services/utils'

import useUserCoinBalance from '../../hooks/useUserCoinBalance'
import useVault from '../../hooks/useVault'
import useWallet from '../../hooks/useWallet'
import DepositBox from '../utilities/DepositBox'
import Strategies from '../Strategies'

interface Props {
    vault: Vault
}

const VaultCard : React.FC<Props> = ({ vault }) => {

    const { deposit } = useVault(vault.managerAddress, vault.vaultId);

    return (
        <Card
            gap={4}
        >
            <Flex
                alignItems='center'
                gap={16}
            >
                <Flex 
                    direction='column'
                    flex={1}
                    gap={4}
                >
                    <Flex
                        alignItems='center'
                        gap={8}
                    >
                        <Text
                            fontSize='xl'
                            fontWeight='bold'
                        >
                            {vault.symbol} Vault
                        </Text>
                        <Text
                            fontSize='xl'
                            color='brand.500'
                            fontWeight='bold'
                        >
                            15% APY
                        </Text>
                    </Flex>
                    <DepositBox 
                        coinStruct={vault.coinType}
                        coinSymbol={vault.symbol}
                        onDeposit={deposit}
                        viewPath={`/vaults/${vault.managerAddress}/${vault.vaultId}`}
                    />
                </Flex>
                <Image 
                    src={vault.logo}
                    alt={vault.symbol}
                    boxSize={'100px'}
                />
            </Flex>
            <Strategies 
                strategies={vault.strategies}
            />
        </Card>
    )
}

export default VaultCard