import React from 'react'

import DepositWithdraw from '../DepositWithdraw'

import useStructuredProduct from '../../hooks/useStructuredProduct'

import { StructuredProduct } from '../../types/structuredProduct'

interface Props {
    structuredProduct: StructuredProduct
}

const StructuredProductDepositWithdraw: React.FC<Props> = ({ structuredProduct }) => {

    const { deposit, withdraw } = useStructuredProduct(structuredProduct.moduleAddress);

    return (
        <DepositWithdraw 
            deposit={deposit}
            withdraw={withdraw}
            block={structuredProduct.block}
            inDevelopment={structuredProduct.inDevelopment}
        />
    )
}

export default StructuredProductDepositWithdraw