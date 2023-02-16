import React from 'react'

import { HStack, Image, Skeleton, Text } from '@chakra-ui/react';

import AccentedBox from '../../utilities/AccentedBox';
import Copyable from '../../utilities/Copyable';
import SetVaultManager from './SetVaultManager';

import useGovernanceVaultInfo from '../../../hooks/governance/useGovernanceVaultInfo';

import { ellipsize } from '../../../services/utils';
import { StructData } from '../../../types/aptos';

interface Props {
  baseCoinStruct: StructData
}

const Vault: React.FC<Props> = ({ baseCoinStruct }) => {

  const vaultInfo = useGovernanceVaultInfo(baseCoinStruct);

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