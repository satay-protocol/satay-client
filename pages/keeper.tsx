import type { NextPage } from 'next'

import DefaultLayout from '../layouts/default'

import Keeper from '../components/Keeper'

const KeeperPage: NextPage = () => {
  return (
    <DefaultLayout>
      <Keeper />
    </DefaultLayout>
  )
}

export default KeeperPage
