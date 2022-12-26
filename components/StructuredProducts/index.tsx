import React from 'react'

import { getStructuredProducts } from '../../data/structuredProducts'

import { VStack, Text, useBreakpointValue } from '@chakra-ui/react'

import StructuredProductComponent from '../StructuredProduct'
import Card from '../utilities/Card'
import { useWallet } from '@manahippo/aptos-wallet-adapter'
import { getNetworkSlug } from '../../services/aptosUtils'

interface Props {
    page?: boolean
}

const StructuredProducts : React.FC<Props> = ({ page }) => {

    const { network } = useWallet();

    const pageHeaderSize = useBreakpointValue({ base: '2xl', md: '3xl' })
    const nonpageHeaderSize = useBreakpointValue({ base: 'xl', md: '2xl' })  

    return (
        <VStack
            spacing={4}
        >
            <Card>
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