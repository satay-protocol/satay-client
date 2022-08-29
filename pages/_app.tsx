import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { ChakraProvider } from '@chakra-ui/react'

import {
  PontemWalletAdapter, WalletProvider, WalletAdapter
} from '@manahippo/aptos-wallet-adapter';

const wallets : WalletAdapter[] = [
  new PontemWalletAdapter()
]

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WalletProvider
      wallets={wallets}
    >
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </WalletProvider>
  )
}

export default MyApp
