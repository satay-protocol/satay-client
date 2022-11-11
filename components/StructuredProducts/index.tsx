import React from 'react'

import { getStructuredProducts } from '../../data/structuredProducts'

import { VStack, Text } from '@chakra-ui/react'

import StructuredProductComponent from '../StructuredProduct'
import Card from '../utilities/Card'
import { useWallet } from '@manahippo/aptos-wallet-adapter'

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
            </Card>
            {
                getStructuredProducts(network.chainId).map((structuredProduct) => (
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