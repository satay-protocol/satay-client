import React from 'react'

import { Flex, Box, Text, useBreakpointValue } from '@chakra-ui/react'

import Card from '../utilities/Card'
import ProtocolList from '../utilities/ProtocolList'
import DepositBox from '../utilities/DepositBox'

import useStructuredProduct from '../../hooks/structuredProduct/useStructuredProduct'

import { StructuredProduct } from '../../types/structuredProduct'
import {moduleToString} from "../../data/modules";

interface Props {
    structuredProduct: StructuredProduct
}

const StructuredProductComponent : React.FC<Props> = ({ structuredProduct }) => {

    const { deposit } = useStructuredProduct(moduleToString(structuredProduct.module));

    const iconSize = useBreakpointValue({ base: '60px', md: '80px' })

    return (
        <Card
            gap={{ base: 4, md: 8}}
        >
            <Box>
                <Text
                    fontSize={{ base: 'lg', md: 'xl'}}
                    fontWeight='semibold'
                >
                    {structuredProduct.name}
                </Text>
                <Text>
                    {structuredProduct.description}
                </Text>
            </Box>
            <Flex
                gap={{ base: 4, md: 8 }}
                flexDirection={{ base: 'column-reverse', md: 'row' }}
            >
                <DepositBox 
                    coinStruct={structuredProduct.block.inputCoinType}
                    coinSymbol={structuredProduct.block.inputCoinSymbol}
                    onDeposit={deposit}
                    viewPath={'/products/' + structuredProduct.module.module_name}
                    inDevelopment={structuredProduct.inDevelopment}
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