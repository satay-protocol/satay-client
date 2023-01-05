import type { NextPage } from 'next'

import DefaultLayout from '../layouts/default'

import Bridge from '../components/Bridge'
import Head from 'next/head'

const HomePage: NextPage = () => {
  return (
    <>
        <Head>
            <script
                src="https://unpkg.com/@layerzerolabs/aptos-bridge-widget@latest/element.js"
                defer
                integrity="element.js.sha384"
                async
            ></script>
            <link
                rel="stylesheet"
                href="https://unpkg.com/@layerzerolabs/aptos-bridge-widget@latest/element.css"
            />
        </Head>
        <DefaultLayout>
            <Bridge />
        </DefaultLayout>
    </>    
  )
}

export default HomePage
