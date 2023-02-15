import React from 'react'

import { 
  Box, 
  Flex,
  Skeleton,
  VStack,
} from '@chakra-ui/react';

import VaultInfo from './VaultInfo';
import Strategies from '../Strategies';
import Card from '../utilities/Card';
import Holdings from './Holdings';
import VaultDepositWithdraw from './VaultDepositWithdraw';

import useVaultInfo from '../../hooks/vault/useVaultInfo';

import { StructData } from '../../types/aptos';

interface Props {
  baseCoinStruct: StructData;
}

const Vault : React.FC<Props> = ({ baseCoinStruct }) => {

  const vault = useVaultInfo(baseCoinStruct);

  return (
    <Box>
      {
        !vault && (
          <Skeleton 
            h='200px'
            rounded='lg'
          />
        )
      }
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
                <VStack
                  justifyContent='center'
                  alignItems='flex-start'
                  h='100%'
                >
                  <VaultDepositWithdraw 
                    baseCoin={vault.baseCoin}
                  />  
                  <Holdings
                    vaultAddress={vault.vaultAddress}
                  />
                </VStack>
              </Card>
            </Flex>
            <Card>
              <Strategies 
                vaultAddress={vault.vaultAddress}
              />
            </Card>
          </Flex>
        )
      }
    </Box>
  )
}

export default Vault