import React from 'react'

import {
    VStack,
    Text,
    Image,
    HStack,
} from '@chakra-ui/react'
import Copyable from '../utilities/Copyable';
import { ellipsize } from '../../services/utils';

const imageSize = "80px"

interface Props {
    logo: string;
    symbol: string;
    vaultAddress: string;
}

const Overview : React.FC<Props> = ({ logo, symbol, vaultAddress }) => {

    return (
        <HStack
            w='100%'
            spacing={4}
        >
            <Image 
                src={logo}
                height={imageSize}
                width={imageSize}
                rounded="full"
                alt="logo image"
            />
            <VStack
                alignItems="flex-start"
            >
                <Text
                    fontSize="lg"
                    fontWeight="bold"
                >
                    {symbol} Vault
                </Text>
                <HStack>
                    <Text>
                        Address:
                    </Text>
                    <Copyable
                        display={ellipsize(vaultAddress)}
                        copyText={vaultAddress}
                    />
                </HStack>
            </VStack>
        </HStack>
    )
}

export default Overview