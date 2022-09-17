import React from 'react'

import {
    VStack,
    Text,
    HStack,
    Image
} from '@chakra-ui/react'

interface Props {
    apy: number | null;
    asset: string;
    totalAssets: number;
    logo: string;
}

const Overview : React.FC<Props> = ({ apy, asset, totalAssets, logo}) => {
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
                <Text>
                    Asset: {asset}
                </Text>
                <Text>
                    Total deposits: {totalAssets.toLocaleString()}
                </Text>
                <Text>
                    APY: {apy}%
                </Text>
            </VStack>
            
        </HStack>
    </VStack>
  )
}

export default Overview