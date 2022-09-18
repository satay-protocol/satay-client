import React from 'react'

import {
    VStack,
    Text,
    HStack,
    Image,
    Box
} from '@chakra-ui/react'
import { toAptos } from '../../services/utils';

interface Props {
    logo: string;
    asset: string;
}

const Overview : React.FC<Props> = ({ logo, asset}) => {

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
                </VStack>
                
            </HStack>
        </VStack>
    )
}

export default Overview