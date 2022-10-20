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
} from '@manahippo/aptos-wallet-adapter';
import { AptosProvider } from '../contexts/AptosContext';

const wallets : WalletAdapter[] = [
  new PontemWalletAdapter(),
  new AptosWalletAdapter(),
  new MartianWalletAdapter(),
  new BloctoWalletAdapter()
]

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WalletProvider
      wallets={wallets}
      autoConnect={true}
      onError={(error: Error) => {
        console.log('Handle Error Message', error);
      }}
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
