import React from 'react'

import useVault from '../../hooks/useVault';

import { 
  Box, 
  Flex
} from '@chakra-ui/react';

import VaultInfo from './VaultInfo';
import Actions from './Actions';

import { vaultManager } from '../../data/vaultManager';

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
        )
      }
      
    </Box>
  )
}

export default Vault