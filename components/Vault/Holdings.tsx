import React from 'react'

import { 
    Box, 
    VStack,
    Text
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
                balances.map((balance) => (
                    <Box
                        p={4}
                        bg='gray.50'
                        rounded='lg'
                        key={balance.coin}
                        w='100%'
                    >
                        <Text>{balance.coin}: {toAptos(balance.value)}</Text>
                    </Box>
                ))
            }
        </VStack>
    )
}

export default Holdings