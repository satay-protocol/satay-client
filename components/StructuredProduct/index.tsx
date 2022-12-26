import React from 'react'

import { Flex, HStack, Text, useBreakpointValue, VStack } from '@chakra-ui/react'

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

    const iconSize = useBreakpointValue({ base: '60px', md: '80px' })

    return (
        <Card
            gap={8}
        >
            <VStack
                alignItems='flex-start'
            >
                <Text
                    fontSize={{ base: 'lg', md: 'xl'}}
                    fontWeight='semibold'
                >
                    {structuredProduct.name}
                </Text>
                <Text>
                    {structuredProduct.description}
                </Text>
                
            </VStack>
            <Flex
                gap={8}
                flexDirection={{ base: 'column-reverse', md: 'row' }}
            >
                <DepositBox 
                    coinStruct={structuredProduct.block.inputCoinType}
                    coinSymbol={structuredProduct.block.inputCoinSymbol}
                    onDeposit={deposit}
                    viewPath={'/products/' + structuredProduct.moduleAddress.slice(structuredProduct.moduleAddress.indexOf('::') + 2)}
                />
                <ProtocolList 
                    protocols={structuredProduct.protocols}
                    iconSize={iconSize}
                />
            </Flex>
        </Card>
    )
}

export default StructuredProductComponent