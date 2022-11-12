import React from 'react'

import useVault from '../../hooks/useVault';

import { 
  Box, 
  Flex
} from '@chakra-ui/react';

import ProductInfo from './ProductInfo';
import Actions from '../Vault/Actions';

import { vaultManager } from '../../data/vaultManager';
import PriceChart from '../Vault/PriceChart';
import Strategies from '../Strategies';
import Card from '../utilities/Card';
import useStructuredProduct from '../../hooks/useStructuredProduct';
import { getStructuredProduct } from '../../data/structuredProducts';

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
          // vault={vault}
        />
        <Actions 
          deposit={deposit}
          withdraw={withdraw}
          coinAddress={structuredProduct.coinStruct}
          coinSymbol={structuredProduct.coinSymbol}
          coinLogo={`/${structuredProduct.coinSlug}_logo.jpeg`}
        />
      </Flex>
      {/* <PriceChart /> */}
    </Flex>
  )
}

export default ProductComponent