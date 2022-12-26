import React from 'react'

import { 
  Flex
} from '@chakra-ui/react';

import { useWallet } from '@manahippo/aptos-wallet-adapter';

import ProductInfo from './ProductInfo';
import DepositWithdraw from '../DepositWithdraw';
import Card from '../utilities/Card';
import ProductHeader from './ProductHeader';

import useStructuredProduct from '../../hooks/useStructuredProduct';

import { getStructuredProduct } from '../../data/structuredProducts';
import { getNetworkSlug } from '../../services/aptosUtils';
import StructuredProductDepositWithdraw from './StructuredProductDepositWithdraw';

interface Props {
  productName: string;
}

const ProductComponent : React.FC<Props> = ({ productName }) => {

  const { network } = useWallet();

  const structuredProduct = getStructuredProduct(productName, getNetworkSlug(network?.name));

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