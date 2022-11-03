import React from 'react'

import useVault from '../../hooks/useVault';

import { 
  Box, 
  Flex
} from '@chakra-ui/react';

import VaultInfo from './VaultInfo';
import Actions from './Actions';

import { vaultManager } from '../../data/vaultManager';
import PriceChart from './PriceChart';
import Strategies from './Strategies';

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
              <Actions 
                deposit={deposit}
                withdraw={withdraw}
                vault={vault}
              />
            </Flex>
            <Strategies 
              strategies={vault.strategies}
            />
            <PriceChart />
          </Flex>
        )
      }
      
    </Box>
  )
}

export default Vault