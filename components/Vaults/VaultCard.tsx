import React from 'react'

import { Text, Flex, Image, Skeleton } from '@chakra-ui/react'

import Card from '../utilities/Card'
import Strategies from '../Strategies'
import VaultDepositBox from './VaultDepositBox'

import useVaultInfo from '../../hooks/vault/useVaultInfo'

import { StructData } from '../../types/aptos'

interface Props {
    baseCoinStruct: StructData
}

const VaultCard : React.FC<Props> = ({ baseCoinStruct }) => {

    const vault = useVaultInfo(baseCoinStruct);

    if(!vault) return <Skeleton />;

    return (
        <Card
            gap={4}
            w='100%'
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
                        justifyContent={{ base: 'space-between', md: 'flex-start' }}
                        alignItems='center'
                        gap={8}
                    >
                        <Text
                            fontSize={{ base: 'lg', md: 'xl'}}
                            fontWeight='bold'
                        >
                            {vault.baseCoin.symbol} Vault
                        </Text>
                    </Flex>
                    <VaultDepositBox 
                        baseCoin={vault.baseCoin}
                    />
                </Flex>
                <Image 
                    src={`/${vault.baseCoin.protocol}_logo.jpeg`}
                    alt={vault.baseCoin.symbol}
                    boxSize={'100px'}
                    rounded='full'
                    display={{ base: 'none', md: 'block' }}
                />
            </Flex>
            <Strategies 
                vaultAddress={vault.vaultAddress}
            />
        </Card>
    )
}

export default VaultCard