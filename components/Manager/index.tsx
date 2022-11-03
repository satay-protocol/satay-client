import React from 'react'

import NotConnected from '../utilities/NotConnected';
import ManagerComponent from './ManagerComponent';

import useWallet from '../../hooks/useWallet';


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