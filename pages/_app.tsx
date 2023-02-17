import { useState, useEffect } from 'react';

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
  MsafeWalletAdapter,
  SpacecyWalletAdapter,
  RiseWalletAdapter
} from '@manahippo/aptos-wallet-adapter';
import { AptosProvider } from '../contexts/AptosContext';

function MyApp({ Component, pageProps }: AppProps) {

  const [wallets, setWallets] = useState<WalletAdapter[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    setWallets([
      new PontemWalletAdapter(),
      new RiseWalletAdapter(),
      new MsafeWalletAdapter("Testnet"),
      new AptosWalletAdapter(),
      new MartianWalletAdapter(),
      new BloctoWalletAdapter({
        bloctoAppId: 'a9d395d4-4b40-4af3-bcb8-cf30fce97614',
        network: WalletAdapterNetwork.Testnet,
      }),
      new SpacecyWalletAdapter()
    ])
    setLoaded(true);
  }, [])

  if (!loaded) {
    return null;
  }

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
