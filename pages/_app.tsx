import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { ChakraProvider } from '@chakra-ui/react'
import theme from '../theme';

import {
  PontemWalletAdapter, 
  AptosWalletAdapter,
  WalletProvider,
  WalletAdapter,
  MartianWalletAdapter,
  BloctoWalletAdapter,
  WalletAdapterNetwork,
} from '@manahippo/aptos-wallet-adapter';
import { AptosProvider } from '../contexts/AptosContext';

const wallets : WalletAdapter[] = [
  new PontemWalletAdapter(),
  new AptosWalletAdapter(),
  new MartianWalletAdapter(),
  new BloctoWalletAdapter({
    bloctoAppId: 'a9d395d4-4b40-4af3-bcb8-cf30fce97614',
    network: WalletAdapterNetwork.Testnet,
  })
]

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WalletProvider
      wallets={wallets}
      autoConnect={true}
    >
      <ChakraProvider
        theme={theme}
      >
        <AptosProvider>
          <Component {...pageProps} />
        </AptosProvider>
      </ChakraProvider>
    </WalletProvider>
  )
}

export default MyApp
