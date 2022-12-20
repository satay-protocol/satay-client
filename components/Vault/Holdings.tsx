import React from 'react'

import { 
    Box, 
    VStack,
    Text,
    useColorModeValue
} from '@chakra-ui/react';

import useCoinBalances from '../../hooks/useCoinBalances';

import { toAptos } from '../../services/utils';

interface Props {
    vaultAddress: string;
}

const Holdings : React.FC<Props> = ({ vaultAddress }) => {

    const balances = useCoinBalances(vaultAddress);

    return (
        <VStack
            alignItems='flex-start'
            w='100%'
        >
            <Text
                fontSize='xl'
                fontWeight='bold'
            >
                Holdings
            </Text>
            {
                balances.length > 0 ? (
                    balances.map((balance) => (
                        <Box
                            p={4}
                            bg={useColorModeValue('gray.50', 'gray.800')}
                            rounded='lg'
                            key={balance.coin}
                            w='100%'
                        >
                            <Text>
                                <span>
                                    {toAptos(balance.value)}{' '}
                                </span>
                                {balance.coin}
                            </Text>
                        </Box>
                    ))
                ) : (
                    <Text>
                        No holdings
                    </Text>
                )
                
            }
        </VStack>
    )
}

export default Holdings