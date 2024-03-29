import React from 'react'

import { VStack, Text, Flex } from '@chakra-ui/react'

import StructuredProductComponent from '../StructuredProduct'

import { useAptos } from '../../contexts/AptosContext'

import { getStructuredProducts } from '../../data/structuredProducts'
import {moduleToString} from "../../data/modules";

interface Props {
    page?: boolean
}

const StructuredProducts : React.FC<Props> = ({ }) => {

    const { network } = useAptos();

    const structuredProducts = getStructuredProducts(network);

    return (
        <VStack
            spacing={8}
        >
            <Flex
                flexDirection='column'
                alignItems='center'
            >
                <Text
                    fontSize='3xl'
                    fontWeight='extrabold'
                >
                    Strategies
                </Text>
                <Text
                    fontWeight='semibold'
                    textAlign='center'
                    maxW={{ base: '100%', md: '50%' }}
                >
                    Satay Strategies are composed of multiple Blocks and allow you to open complex, multi-protocol positions in one click
                </Text>
            </Flex>
            <Flex
                gap={4}
                flexDirection='column'
                w='100%'
            >
                {
                    structuredProducts.map((structuredProduct) => (
                        <StructuredProductComponent
                            key={moduleToString(structuredProduct.module)}
                            structuredProduct={structuredProduct}
                        />
                    ))
                }
            </Flex>
        </VStack>
    )
}

export default StructuredProducts