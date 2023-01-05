import type { NextPage } from 'next'
import Governance from '../components/Governance'

import Home from '../components/Home'

import DefaultLayout from '../layouts/default'

const GovernancePage: NextPage = () => {
  return (
    <DefaultLayout>
      <Governance />
    </DefaultLayout>
  )
}

export default GovernancePage
