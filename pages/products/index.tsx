import React from 'react'

import { NextPage } from 'next'

import DefaultLayout from '../../layouts/default'
import StructuredProducts from '../../components/StructuredProducts'

const ProductsPage : NextPage = () => {
  return (
    <DefaultLayout>
        <StructuredProducts />
    </DefaultLayout>
  )
}

export default ProductsPage