import React from 'react'

import { 
    Box, 
    VStack,
    Text,
    useColorModeValue
} from '@chakra-ui/react';

import useCoinBalances from '../../hooks/useCoinBalances';

import { toAptos } from '../../services/utils';
import AccentedBox from '../utilities/AccentedBox';

interface Props {
    vaultAddress: string;
}

const Holdings : React.FC<Props> = ({ vaultAddress }) => {

    const balances = useCoinBalances(vaultAddress);

    const balanceBg = useColorModeValue('gray.50', 'gray.800')

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
                        <AccentedBox
                            key={balance.coin}
                            w='100%'
                        >
                            <Text>
                                <span>
                                    {toAptos(balance.value).toLocaleString()}{' '}
                                </span>
                                {balance.coin}
                            </Text>
                        </AccentedBox>
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