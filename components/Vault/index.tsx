import React from 'react'

import useVault from '../../hooks/useVault';

import { 
  Box, 
  Flex,
} from '@chakra-ui/react';

import VaultInfo from './VaultInfo';
import DepositWithdraw from '../DepositWithdraw';

import { vaultManager } from '../../data/vaultManager';

import Strategies from '../Strategies';
import Card from '../utilities/Card';
import Holdings from './Holdings';

interface Props {
  vaultId: string;
}

const Vault : React.FC<Props> = ({ vaultId }) => {

  const { vault, deposit, withdraw } = useVault(vaultManager, vaultId)

  return (
    <Box>
      {
        vault && (
          <Flex
            direction='column'
            gap={4}
          >
            <Flex
              gap={4}
              direction={{
                base: 'column',
                md: 'row'
              }}
            >
              <VaultInfo
                vault={vault}
              />
              <Card>
                <DepositWithdraw 
                  deposit={deposit}
                  withdraw={withdraw}
                  coinAddress={vault.coinType}
                  coinSymbol={vault.symbol}
                  coinLogo={vault.logo}
                />    
                <Holdings
                  vaultAddress={vault.vaultAddress}
                />
              </Card>
            </Flex>
            <Card>
              <Strategies 
                strategies={vault.strategies}
              />
            </Card>
          </Flex>
        )
      }
      
    </Box>
  )
}

export default Vault