import React from 'react'

import { NextPage } from 'next'

import DefaultLayout from '../../layouts/default'
import Vaults from '../../components/Vaults'

const VaultsPage : NextPage = () => {
  return (
    <DefaultLayout>
        <Vaults 
          page
        />
    </DefaultLayout>
  )
}

export default VaultsPage