import React from 'react'

import useVault from '../../hooks/useVault';

import { 
  HStack, 
  Box, 
  Flex
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
          <Flex
            gap={4}
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