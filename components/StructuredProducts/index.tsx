import React from 'react'

import { getStructuredProducts } from '../../data/structuredProducts'

import { VStack, Text } from '@chakra-ui/react'

import StructuredProductComponent from '../StructuredProduct'
import Card from '../utilities/Card'
import { useWallet } from '@manahippo/aptos-wallet-adapter'
import { getNetworkSlug } from '../../services/aptosUtils'

const StructuredProducts : React.FC = () => {

    const { network } = useWallet();

    return (
        <VStack
            spacing={4}
        >
            <Card>
                <Text
                    fontSize='2xl'
                    fontWeight='bold'
                >
                    Structured Products
                </Text>
                <Text>
                    Structured Products allow you to open complex, multi-protocol positions in one click
                </Text>
            </Card>
            {
                getStructuredProducts(getNetworkSlug(network?.name)).map((structuredProduct) => (
                    <StructuredProductComponent
                        key={structuredProduct.moduleAddress}
                        structuredProduct={structuredProduct}
                    />
                ))
            }
        </VStack>
    )
}

export default StructuredProducts