import React from 'react'

import { Text, Flex, Image } from '@chakra-ui/react'

import Card from '../utilities/Card'
import DepositBox from '../utilities/DepositBox'
import Strategies from '../Strategies'

import useVault from '../../hooks/useVault'

import { structToString } from '../../services/vaults'
import { Vault } from '../../types/vaults'

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
                        coinStruct={vault.baseCoin}
                        coinSymbol={vault.symbol}
                        onDeposit={deposit}
                        viewPath={`/vaults/${vault.vaultId}`}
                    />
                </Flex>
                <Image 
                    src={`/${vault.baseCoinProtocol}_logo.jpeg`}
                    alt={vault.symbol}
                    boxSize={'100px'}
                    rounded='full'
                />
            </Flex>
            <Strategies 
                strategies={vault.strategies}
            />
        </Card>
    )
}

export default VaultCard