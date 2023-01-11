import type { NextPage } from 'next'

import DefaultLayout from '../layouts/default'

import Governance from '../components/Governance'


const GovernancePage: NextPage = () => {
  return (
    <DefaultLayout>
      <Governance />
    </DefaultLayout>
  )
}

export default GovernancePage
