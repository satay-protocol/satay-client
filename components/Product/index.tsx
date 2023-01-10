import React from 'react'

import { Flex } from '@chakra-ui/react';

import ProductInfo from './ProductInfo';
import Card from '../utilities/Card';
import ProductHeader from './ProductHeader';
import StructuredProductDepositWithdraw from './StructuredProductDepositWithdraw';

import { useAptos } from '../../contexts/AptosContext';

import { getStructuredProduct } from '../../data/structuredProducts';

interface Props {
  productName: string;
}

const ProductComponent : React.FC<Props> = ({ productName }) => {

  const { network } = useAptos();

  const structuredProduct = getStructuredProduct(productName, network);

  return (
    <Flex
      direction='column'
      flex={1}
      gap={4}
    >
      {
        structuredProduct && (
          <>
            <ProductHeader 
              name={structuredProduct.name}
              description={structuredProduct.description}
              protocols={structuredProduct.protocols}
            />
            <Flex
              gap={4}
              direction={{
                base: 'column',
                md: 'row'
              }}
            >
              <ProductInfo
                blocks={structuredProduct.blocks}
              />
              <Card
                justifyContent='center'
              >
                <StructuredProductDepositWithdraw 
                  structuredProduct={structuredProduct}
                />
              </Card>
            </Flex>
          </>
        )
      }
    </Flex>
  )
}

export default ProductComponent