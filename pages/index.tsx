import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Home from '../components/Home'
import DefaultLayout from '../layouts/default'
import styles from '../styles/Home.module.css'

const HomePage: NextPage = () => {
  return (
    <DefaultLayout>
      <Home />
    </DefaultLayout>
  )
}

export default HomePage
