import React from 'react'

import DepositWithdraw from '../DepositWithdraw'

import useStructuredProduct from '../../hooks/structuredProduct/useStructuredProduct'

import { StructuredProduct } from '../../types/structuredProduct'
import {moduleToString} from "../../data/modules";

interface Props {
    structuredProduct: StructuredProduct
}

const DefaultDepositBox: React.FC<Props> = ({ structuredProduct }) => {

    const { deposit, withdraw } = useStructuredProduct(moduleToString(structuredProduct.module));

    return (
        <DepositWithdraw 
            deposit={deposit}
            withdraw={withdraw}
            block={structuredProduct.block}
            inDevelopment={structuredProduct.inDevelopment}
        />
    )
}

export default DefaultDepositBox