import React from 'react'

import NotConnected from '../utilities/NotConnected';
import VaultManagerComponent from './VaultManagerComponent';

import { useWallet } from '@manahippo/aptos-wallet-adapter';

const VaultManager = () => {
    const { account } = useWallet();

    let connectedAddress = account?.address?.toString();
  
    if(!connectedAddress) {
      return (
        <NotConnected />
      )
    }
  
    return (
      <VaultManagerComponent 
        connectedAddress={connectedAddress}
      />
    )
}

export default VaultManager