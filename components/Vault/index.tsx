import React from 'react'

import useVault from '../../hooks/useVault';

import { 
  HStack, 
  Box 
} from '@chakra-ui/react';

import VaultInfo from './VaultInfo';
import Actions from './Actions';

interface Props {
  vaultId: string;
}

const Vault : React.FC<Props> = ({ vaultId }) => {

  const { vault, deposit, withdraw } = useVault(vaultId)

  return (
    <Box>
      {
        vault && (
          <HStack
            spacing={8}
          >
            <VaultInfo
              vault={vault}
            />
            <Actions 
              deposit={deposit}
              withdraw={withdraw}
              vault={vault}
            />
          </HStack>
        )
      }
      
    </Box>
  )
}

export default Vault