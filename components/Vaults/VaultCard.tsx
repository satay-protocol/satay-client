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

interface Props {
    vault: Vault
}

const iconSize = '70px'

const VaultCard : React.FC<Props> = ({ vault }) => {

    const { connected } = useWallet();

    const balance = useUserCoinBalance(vault.coinType);

    const { deposit } = useVault(vault.managerAddress, vault.vaultId);

    const [amount, setAmount] = useState(0);

    const onChange = (valueAsString : string) => {
        setAmount(parseFloat(valueAsString));
    }

    const onClick = async () => {
        await deposit(Math.round(fromAptos(amount)));
    }

    return (
        <Card>
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
                    <Text>Leveraged liquid staking on Ditto and Tortuga</Text>
                    <VStack
                        alignItems='flex-start'
                        p={4}
                        borderRadius='lg'
                        bg='gray.50'
                        flex={1}
                        spacing={4}
                    >
                        <Text
                            fontWeight='bold'
                        >
                            Deposit
                        </Text>
                        <Text
                            fontSize='sm'
                        >
                            You have {balance} {vault.symbol}
                        </Text>
                        <NumberInput
                            onChange={onChange}
                            w='100%'
                            max={balance}
                            precision={8}
                            defaultValue={0}
                            focusBorderColor='brand.500'
                        >
                            <NumberInputField />
                        </NumberInput>
                        <Flex
                            gap={4}
                        >
                            <Button
                                onClick={() => onClick()}
                                variant='solid'
                                colorScheme='brand'
                                disabled={!connected}
                            >
                                Deposit
                            </Button>
                            <Link
                                href={`/vaults/${vault.managerAddress}/${vault.vaultId}`}
                            >
                                <Button
                                    variant='outline'
                                    colorScheme='brand'
                                    rightIcon={<ArrowForwardIcon />}
                                >
                                    View
                                </Button>
                            </Link>
                        </Flex>
                    </VStack>
                </Flex>
                <Flex
                    alignItems={'center'}
                    gap={2}
                >
                    <Image 
                        src={vault.logo}
                        alt='coin logo'
                        rounded='full'
                        height={iconSize}
                        width={iconSize}
                    />
                    <ArrowForwardIcon />
                    <Image
                        src={'/tortuga_logo.jpeg'} 
                        alt='tortuga logo'
                        rounded='full'
                        height={iconSize}
                        width={iconSize}
                    />
                    <AddIcon />
                    <Image
                        src={'/ditto_logo.jpeg'}
                        alt='ditto logo' 
                        rounded='full'
                        height={iconSize}
                        width={iconSize}
                    />
                </Flex>
                
            </Flex>
        </Card>
    )
}

export default VaultCard