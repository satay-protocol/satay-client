import React from 'react'

import {
    VStack,
    Text,
    HStack,
    Image,
    Box
} from '@chakra-ui/react'
import useCoinBalances from '../../hooks/useCoinBalances';
import { toAptos } from '../../services/utils';

interface Props {
    logo: string;
    vaultAddress: string;
}

const Overview : React.FC<Props> = ({ logo, vaultAddress}) => {

    const balances = useCoinBalances(vaultAddress);

    return (
        <VStack
            alignItems='flex-start'
        >
            <Text
                fontSize="xl"
                fontWeight="bold"
            >
                Overview
            </Text>
            <HStack
                spacing={8}
            >
                <Image 
                    src={logo}
                    height="100px"
                    width="100px"
                    rounded="full"
                    alt="logo image"
                />
                <VStack
                    alignItems='flex-start'
                    justifyContent='center'
                >
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
                
            </HStack>
        </VStack>
    )
}

export default Overview