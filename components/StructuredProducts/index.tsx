import React from 'react'

import { VStack, Text, useBreakpointValue } from '@chakra-ui/react'

import StructuredProductComponent from '../StructuredProduct'
import Card from '../utilities/Card'

import { useAptos } from '../../contexts/AptosContext'

import { getStructuredProducts } from '../../data/structuredProducts'

interface Props {
    page?: boolean
}

const StructuredProducts : React.FC<Props> = ({ page }) => {

    const { network } = useAptos();

    const pageHeaderSize = useBreakpointValue({ base: '2xl', md: '3xl' })
    const nonpageHeaderSize = useBreakpointValue({ base: 'xl', md: '2xl' })  

    const structuredProducts = getStructuredProducts(network);

    return (
        <VStack
            spacing={4}
        >
            <Card
                w='100%'
            >
                <Text
                    fontSize={page ? pageHeaderSize : nonpageHeaderSize}
                    fontWeight={page ? 'extrabold' : 'bold'}
                >
                    Structured Products
                </Text>
                <Text
                    fontWeight={page ? 'semibold' : 'normal'}
                >
                    Structured Products allow you to open complex, multi-protocol positions in one click
                </Text>
            </Card>
            {
                structuredProducts.map((structuredProduct) => (
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