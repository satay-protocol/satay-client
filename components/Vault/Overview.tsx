import React from 'react'

import {
    VStack,
    Text,
    HStack,
    Image,
} from '@chakra-ui/react'

interface Props {
    logo: string;
    asset: string;
    totalDeposits: number;
}

const Overview : React.FC<Props> = ({ logo, asset, totalDeposits}) => {

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
                        {asset} Vault
                    </Text>
                    <Text>
                        TVL: {totalDeposits} {asset}
                    </Text>
                </VStack>
                
            </HStack>
        </VStack>
    )
}

export default Overview