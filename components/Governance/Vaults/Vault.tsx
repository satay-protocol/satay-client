import { HStack, Image, Skeleton, Text, VStack } from '@chakra-ui/react';
import React from 'react'
import useGovernanceVaultInfo from '../../../hooks/governance/useGovernanceVaultInfo';
import useVaultInfo from '../../../hooks/utility/useVaultInfo'
import { ellipsize } from '../../../services/utils';
import AccentedBox from '../../utilities/AccentedBox';
import Copyable from '../../utilities/Copyable';
import SetVaultManager from './SetVaultManager';

interface Props {
    vaultId: string
}

const Vault: React.FC<Props> = ({ vaultId }) => {

  const vaultInfo = useGovernanceVaultInfo(vaultId);

  if(!vaultInfo){
    return (
      <Skeleton 
        h={12}
      />
    )
  };

  return (
    <AccentedBox
      w='100%'
      display='flex'
      flexDirection='column'
      gap={4}
    >
      <HStack
        w='100%'
        justifyContent='space-between'
      >
        <HStack
          spacing={4}
        >
          <Image 
            src={`/${vaultInfo.baseCoin.protocol}_logo.jpeg`}
            boxSize={12}
            rounded="full"
            alt='Vault Logo'
          />
          <Text
            fontSize='2xl'
            fontWeight='bold'
          >
            {vaultInfo.baseCoin.symbol} Vault
          </Text>
        </HStack>
        <HStack>
            <Text
              fontWeight='semibold'
            >
              Vault Manager:
            </Text>
            <Copyable 
              display={ellipsize(vaultInfo.managerAddress)}
              copyText={vaultInfo.managerAddress}
            />
          </HStack>
      </HStack>
      <SetVaultManager 
        vaultAddress={vaultInfo.vaultAddress}
      />
    </AccentedBox>
  )
}

export default Vault