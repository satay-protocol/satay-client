import React from 'react'

import NotConnected from '../utilities/NotConnected';
import KeeperComponent from './KeeperComponent';

import { useWallet } from '@manahippo/aptos-wallet-adapter';

const Keeper = () => {
    const { account } = useWallet();

    let connectedAddress = account?.address?.toString();
  
    if(!connectedAddress) {
      return (
        <NotConnected />
      )
    }
  
    return (
      <KeeperComponent 
        connectedAddress={connectedAddress}
      />
    )
}

export default Keeper