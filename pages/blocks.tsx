import React from 'react'

import { NextPage } from 'next'

import DefaultLayout from '../layouts/default'
import Blocks from '../components/Blocks'

const VaultsPage : NextPage = () => {
  return (
    <DefaultLayout>
        <Blocks 
          page
        />
    </DefaultLayout>
  )
}

export default VaultsPage