import type { NextPage } from 'next'

import VaultManager from '../components/VaultManager'

import DefaultLayout from '../layouts/default'

const VaultManagerPage: NextPage = () => {
  return (
    <DefaultLayout>
      <VaultManager />
    </DefaultLayout>
  )
}

export default VaultManagerPage
