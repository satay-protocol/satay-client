import React from 'react'

import { structuredProducts } from '../../data/structuredProducts'

import { VStack, Text } from '@chakra-ui/react'

import StructuredProductComponent from '../StructuredProduct'
import Card from '../utilities/Card'

const StructuredProducts : React.FC = () => {
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
            structuredProducts.map((structuredProduct) => (
                <StructuredProductComponent 
                    structuredProduct={structuredProduct}
                />
            ))
        }
    </VStack>
  )
}

export default StructuredProducts