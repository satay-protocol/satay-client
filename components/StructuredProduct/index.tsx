import React from 'react'

import { HStack, Text, VStack } from '@chakra-ui/react'

import Card from '../utilities/Card'

import { StructuredProduct } from '../../types/structuredProduct'
import ProtocolList from '../utilities/ProtocolList'
import DepositBox from '../utilities/DepositBox'
import useStructuredProduct from '../../hooks/useStructuredProduct'
import { structToString } from '../../services/vaults'

interface Props {
    structuredProduct: StructuredProduct
}

const StructuredProductComponent : React.FC<Props> = ({ structuredProduct }) => {

    const { deposit } = useStructuredProduct(structuredProduct.moduleAddress);

    return (
        <Card
            gap={8}
        >
            <VStack
                alignItems='flex-start'
            >
                <Text
                    fontSize='xl'
                    fontWeight='bold'
                >
                    {structuredProduct.name}
                </Text>
                <Text>
                    {structuredProduct.description}
                </Text>
                
            </VStack>
            <HStack
                spacing={8}
            >
                <DepositBox 
                    coinStruct={structToString(structuredProduct.block.inputCoinType)}
                    coinSymbol={structuredProduct.block.inputCoinSymbol}
                    onDeposit={deposit}
                    viewPath={'/products/' + structuredProduct.moduleAddress.slice(structuredProduct.moduleAddress.indexOf('::') + 2)}
                />
                <ProtocolList 
                    protocols={structuredProduct.protocols}
                    iconSize='80px'
                />
            </HStack>
        </Card>
    )
}

export default StructuredProductComponent