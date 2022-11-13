import React from 'react'

import { 
  Flex
} from '@chakra-ui/react';

import ProductInfo from './ProductInfo';

import { vaultManager } from '../../data/vaultManager';
import useStructuredProduct from '../../hooks/useStructuredProduct';
import { getStructuredProduct } from '../../data/structuredProducts';
import DepositWithdraw from '../DepositWithdraw';
import Card from '../utilities/Card';

interface Props {
  productName: string;
}



const ProductComponent : React.FC<Props> = ({ productName }) => {

  const { deposit, withdraw } = useStructuredProduct(`${vaultManager}::${productName}`);

  const structuredProduct = getStructuredProduct(productName);

  return (
    <Flex
      direction='column'
      flex={1}
    >
      <Flex
        gap={4}
        direction={{
          base: 'column',
          md: 'row'
        }}
      >
        <ProductInfo
          name={structuredProduct.name}
          blocks={structuredProduct.blocks}
        />
        <Card>
          <DepositWithdraw 
            deposit={deposit}
            withdraw={withdraw}
            block={structuredProduct.block}
          />
        </Card>
      </Flex>
    </Flex>
  )
}

export default ProductComponent