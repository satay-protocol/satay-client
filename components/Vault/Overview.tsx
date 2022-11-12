import React from 'react'

import {
    VStack,
    Text,
    HStack,
    Image,
} from '@chakra-ui/react'
import { fromAptos, performanceArray, round2, toAptos } from '../../services/utils';

interface Props {
    logo: string;
    symbol: string;
    tvl: number;
}

const Overview : React.FC<Props> = ({ logo, symbol, tvl}) => {

    const performance = round2(performanceArray[performanceArray.length - 1].val);

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
                    <Text
                        fontSize="xl"
                        fontWeight="bold"
                    >
                        {symbol} Vault
                    </Text>
                    <Text>
                        TVL: {toAptos(tvl)} {symbol}
                    </Text>
                    <Text>
                        Performace:{' '}
                        <Text 
                            as={'span'} 
                            color='brand.500' 
                            fontWeight='bold'
                        >
                            {performance !== 0 && (performance > 0 ? '+' : '-')}{performance}%
                        </Text>
                    </Text>
                </VStack>
                
            </HStack>
        </VStack>
    )
}

export default Overview