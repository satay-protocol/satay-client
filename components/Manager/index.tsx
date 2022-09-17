import React from 'react'

import { useWallet } from '@manahippo/aptos-wallet-adapter';
import NotConnected from '../utilities/NotConnected';
import ManagerComponent from './ManagerComponent';


const Manager : React.FC = () => {

  const { account } = useWallet();

  if(!account?.address) {
    return (
      <NotConnected />
    )
  }

  return (
    <ManagerComponent 
      managerAddress={account.address.toString()}
    />
  )
  
}

export default Manager