import type { NextPage } from 'next'

import Home from '../components/Home'

import DefaultLayout from '../layouts/default'

const HomePage: NextPage = () => {
  return (
    <DefaultLayout>
      <Home />
    </DefaultLayout>
  )
}

export default HomePage
