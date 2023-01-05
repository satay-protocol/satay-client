import { HStack, Image, Skeleton, Text, VStack } from '@chakra-ui/react';
import React from 'react'
import useVaultInfo from '../../../hooks/utility/useVaultInfo'
import { ellipsize } from '../../../services/utils';
import Copyable from '../../utilities/Copyable';
import SetVaultManager from './SetVaultManager';

interface Props {
    vaultId: string
}

const Vault: React.FC<Props> = ({ vaultId }) => {

  const vaultInfo = useVaultInfo(vaultId);

  if(!vaultInfo){
    return (
      <Skeleton 
        h={12}
      />
    )
  };

  return (
    <HStack
      w='100%'
      spacing={4}
    >
      <Image 
        src={`/${vaultInfo.baseCoin.protocol}_logo.jpeg`}
        boxSize={12}
        rounded="full"
        alt='Vault Logo'
      />
      <VStack
        alignItems="flex-start"
        spacing={1}
      >
        <Text
          fontSize='lg'
          fontWeight='semibold'
        >
          {vaultInfo.baseCoin.symbol} Vault
        </Text>
        <HStack>
          <Text>
            Manager
          </Text>
          <Copyable 
            display={ellipsize(vaultInfo.managerAddress)}
            copyText={vaultInfo.managerAddress}
          />
        </HStack>
      </VStack>
      <SetVaultManager 
        vaultAddress={vaultInfo.vaultAddress}
      />
  </HStack>
  )
}

export default Vault