import { NextPage } from 'next'
import React from 'react'

import DefaultLayout from '../../layouts/default';
import ProductComponent from '../../components/Product';

import { useRouter } from 'next/router';

const ProductPage : NextPage = () => {

    const { query } = useRouter();

    const { productName } = query as { productName: string };

    return (
        <DefaultLayout>
            <ProductComponent 
                productName={productName}
            />
        </DefaultLayout>
    )
}

export default ProductPage;