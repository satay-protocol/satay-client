import React from 'react'

import NotConnected from '../utilities/NotConnected';
import ManagerComponent from './ManagerComponent';

import useWallet from '../../hooks/useWallet';


const Manager : React.FC = () => {

  const { address } = useWallet();

  if(!address) {
    return (
      <NotConnected />
    )
  }

  return (
    <ManagerComponent 
      managerAddress={address}
    />
  )
  
}

export default Manager