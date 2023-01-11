import React from 'react'

import NotConnected from '../utilities/NotConnected';
import GovernanceComponent from './GovernanceComponent';

import { useWallet } from '@manahippo/aptos-wallet-adapter';

const Governance = () => {
  
  const { account } = useWallet();

  let connectedAddress = account?.address?.toString();

  if(!connectedAddress) {
    return (
      <NotConnected />
    )
  }

  return (
    <GovernanceComponent 
      connectedAddress={connectedAddress}
    />
  )
}

export default Governance